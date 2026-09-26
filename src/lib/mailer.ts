/**
 * Lazy singleton SMTP mailer.
 * Never throws. Returns { sent: false, reason: 'not-configured' } when env vars are absent.
 *
 * Only ever imported by server-only API route handlers (never a client component), so nodemailer
 * is imported statically here — a dynamic require(variableName) previously hid this module from
 * both webpack's client bundle AND Vercel's serverless function file-tracer, so nodemailer never
 * actually shipped with the deployed function even though it was a real dependency.
 */
import nodemailer from 'nodemailer';

export interface MailAttachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
}

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  from?: string;
  attachments?: MailAttachment[];
}

export type MailResult = 
  | { sent: true; messageId?: string }
  | { sent: false; reason: 'not-configured' | 'send-failed'; error?: string };

export async function sendMail(opts: MailOptions): Promise<MailResult> {
  const host = typeof process !== 'undefined' ? process.env?.EMAIL_SERVER_HOST : undefined;
  const port = typeof process !== 'undefined' ? process.env?.EMAIL_SERVER_PORT : undefined;
  const user = typeof process !== 'undefined' ? process.env?.EMAIL_SERVER_USER : undefined;
  const pass = typeof process !== 'undefined' ? process.env?.EMAIL_SERVER_PASSWORD : undefined;
  const from = typeof process !== 'undefined' ? (process.env?.EMAIL_FROM || opts.from) : opts.from;

  // Check if configured
  if (!host || !user || !pass) {
    console.info(
      '[Mailer] SMTP credentials not set in environment. Returning { sent: false, reason: "not-configured" } gracefully.'
    );
    // In preview / browser simulation, we log the email payload so the user can inspect it
    console.log('[Mailer Simulation Payload]:', {
      to: opts.to,
      subject: opts.subject,
      previewText: opts.text || 'HTML Content provided',
    });
    return { sent: false, reason: 'not-configured' };
  }

  try {
    // In Node.js / Vercel Serverless environment, nodemailer is available
    if (typeof window === 'undefined') {
      const secure = port === '465' || process.env.EMAIL_SERVER_SECURE === 'true';

      const transporter = nodemailer.createTransport({
        host,
        port: Number(port) || 465,
        secure,
        auth: {
          user,
          pass,
        },
      });

      const info = await transporter.sendMail({
        from: from || user,
        to: opts.to,
        replyTo: opts.replyTo,
        subject: opts.subject,
        html: opts.html,
        text: opts.text || 'Please view this message in an HTML-compatible email viewer.',
        ...(opts.attachments ? { attachments: opts.attachments } : {}),
      });

      return { sent: true, messageId: info.messageId };
    }

    return { sent: true };
  } catch (err: any) {
    console.error('[Mailer Error]:', err);
    return { sent: false, reason: 'send-failed', error: err?.message || String(err) };
  }
}
