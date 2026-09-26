import { NextResponse, after } from 'next/server';
import { sendMail } from '../../../../lib/mailer';
import { getStoredOrderById, updateStoredOrderStatus } from '../../../../lib/orderStore';
import { CONTACT } from '../../../../config/site';
import { paymentConfirmationNotifyEmail } from '../../../../lib/emailTemplates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 15;

const MAX_SIZE_BYTES = 4 * 1024 * 1024; // 4MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid form data.' }, { status: 400 });
  }

  const id = String(form.get('id') || '').trim();
  const note = String(form.get('note') || '').trim();
  const file = form.get('screenshot');

  if (!id) {
    return NextResponse.json({ ok: false, error: 'Order id is required.' }, { status: 400 });
  }

  const order = await getStoredOrderById(id);
  if (!order) {
    return NextResponse.json({ ok: false, error: 'Order not found.' }, { status: 404 });
  }

  const attachments: { filename: string; content: Buffer; contentType?: string }[] = [];
  if (file instanceof File) {
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ ok: false, error: 'File too large (max 4MB).' }, { status: 400 });
    }
    if (file.type && !ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ ok: false, error: 'Unsupported file type. Use JPG, PNG, WebP or HEIC.' }, { status: 400 });
    }
    const ext = file.type.split('/')[1] || 'jpg';
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({ filename: file.name || `payment-confirmation-${id}.${ext}`, content: buffer, contentType: file.type });
  }

  after(async () => {
    const mail = paymentConfirmationNotifyEmail({
      orderNumber: id,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      amountDue: order.total,
      note: note || undefined,
      hasScreenshot: attachments.length > 0
    });

    await sendMail({
      to: CONTACT.email,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      replyTo: order.customerEmail,
      attachments: attachments.length ? attachments : undefined
    });

    await updateStoredOrderStatus(id, 'paid', { paymentConfirmedAt: new Date().toISOString() });
  });

  return NextResponse.json({ ok: true });
}
