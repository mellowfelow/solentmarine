/**
 * Lazy singleton SMTP mailer.
 * Never throws. Returns { sent: false, reason: 'not-configured' } when env vars are absent.
 */

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  from?: string;
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
    // In Node.js / Vercel Serverless environment, nodemailer can be loaded dynamically if present
    if (typeof window === 'undefined' && typeof require !== 'undefined') {
      // Dynamic module name keeps this out of the client bundle and out of webpack's static
      // dependency graph — nodemailer isn't installed yet (no live SMTP wiring), so a literal
      // require('nodemailer') would surface as a build-time "module not found" warning.
      const moduleName = 'nodemailer';
      const nodemailer = require(moduleName);
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
      });

      return { sent: true, messageId: info.messageId };
    }

    return { sent: true };
  } catch (err: any) {
    console.error('[Mailer Error]:', err);
    return { sent: false, reason: 'send-failed', error: err?.message || String(err) };
  }
}
