import { NextResponse } from 'next/server';
import { sendMail } from '../../../../lib/mailer';
import { getStoredOrderById, updateStoredOrderStatus } from '../../../../lib/orderStore';
import { CONTACT, SITE } from '../../../../config/site';
import { buildEmailHtml } from '../../../../lib/emailTemplate';

export const runtime = 'nodejs';

const MAX_SIZE_BYTES = 4 * 1024 * 1024; // 4MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

/**
 * Public, no-auth route — same order-number-as-token pattern as GET /api/order/payment-details.
 * Never returns order data back to the caller beyond {ok}.
 */
export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid form data.' }, { status: 400 });
  }

  const id = String(form.get('id') || '');
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
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({ filename: file.name || 'payment-screenshot.jpg', content: buffer, contentType: file.type });
  }

  const notifyHtml = buildEmailHtml({
    title: 'Payment Confirmation Submitted',
    preheader: `${order.customerName} says they've paid order ${id}`,
    refBadge: id,
    intro: `${order.customerName} has submitted a payment confirmation for order ${id}. ${attachments.length ? 'Screenshot attached.' : 'No screenshot was attached.'}`,
    rows: [
      { label: 'Order Reference', value: id, mono: true },
      { label: 'Customer', value: order.customerName },
      { label: 'Email', value: order.customerEmail },
      { label: 'Amount Due', value: `${order.currency === 'GBP' ? '£' : ''}${order.total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, highlight: true },
      { label: 'Customer Note', value: note || 'None' }
    ],
    cta: { label: 'Open Admin Portal', url: `https://${SITE.domain}/admin/` }
  });

  const result = await sendMail({
    to: CONTACT.email,
    subject: `Payment Confirmation — Order ${id}`,
    html: notifyHtml,
    replyTo: order.customerEmail,
    attachments: attachments.length ? attachments : undefined
  });

  await updateStoredOrderStatus(id, 'paid', { paymentConfirmedAt: new Date().toISOString() });

  return NextResponse.json({ ok: true, emailSent: result.sent });
}
