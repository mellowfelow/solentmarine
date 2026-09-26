import { NextResponse } from 'next/server';
import { sendMail } from '../../../lib/mailer';
import { saveStoredOrder, StoredOrderItem, OrderChannel } from '../../../lib/orderStore';
import { CONTACT, SITE } from '../../../config/site';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const orderRef = String(body.orderRef || '').trim();
  const channel = (body.channel === 'email' ? 'email' : 'whatsapp') as OrderChannel;
  const customerName = String(body.customerName || '').trim();
  const customerEmail = String(body.customerEmail || '').trim();
  const customerPhone = String(body.customerPhone || '').trim();
  const deliveryAddress = String(body.deliveryAddress || '').trim();
  const deliveryMethod = String(body.deliveryMethod || '').trim();
  const notes = String(body.notes || '').trim();
  const items = Array.isArray(body.items) ? (body.items as StoredOrderItem[]) : [];
  const subtotal = Number(body.subtotal) || 0;
  const shipping = Number(body.shipping) || 0;
  const total = Number(body.total) || subtotal + shipping;

  if (!orderRef || !customerName || !customerEmail || items.length === 0) {
    return NextResponse.json({ ok: false, error: 'Missing required order fields.' }, { status: 400 });
  }

  await saveStoredOrder({
    id: orderRef,
    channel,
    status: 'pending',
    createdAt: new Date().toISOString(),
    customerName,
    customerEmail,
    customerPhone: customerPhone || undefined,
    deliveryAddress: deliveryAddress || undefined,
    deliveryMethod: deliveryMethod || undefined,
    paymentMethodId: 'bacs',
    items,
    subtotal,
    shipping,
    total,
    currency: 'GBP',
    notes: notes || undefined
  });

  const itemsHtml = items
    .map((i) => `<li>${i.quantity}x ${i.name}${i.shaft ? ` (${i.shaft})` : ''} — £${i.price.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</li>`)
    .join('');

  const notifyHtml = `
    <div style="font-family:sans-serif;font-size:14px;color:#0f172a;">
      <h2 style="color:#0284c7;">New Order Reservation — ${orderRef}</h2>
      <p><strong>Channel:</strong> ${channel.toUpperCase()}</p>
      <p><strong>Customer:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <p><strong>Phone:</strong> ${customerPhone || '—'}</p>
      <p><strong>Delivery Address:</strong> ${deliveryAddress || '—'}</p>
      <p><strong>Delivery Method:</strong> ${deliveryMethod || '—'}</p>
      <p><strong>Items:</strong></p>
      <ul>${itemsHtml}</ul>
      <p><strong>Subtotal:</strong> £${subtotal.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      <p><strong>Shipping:</strong> £${shipping.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      <p><strong>Total:</strong> £${total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      <p><strong>Notes:</strong> ${notes || 'None'}</p>
    </div>
  `;

  const notifyResult = await sendMail({
    to: CONTACT.email,
    subject: `New Order Reservation — ${orderRef}`,
    html: notifyHtml,
    replyTo: customerEmail
  });

  const ackHtml = `
    <div style="font-family:sans-serif;font-size:14px;color:#0f172a;">
      <h2 style="color:#0284c7;">Order Reservation Received — ${orderRef}</h2>
      <p>Hi ${customerName},</p>
      <p>Thank you for your order reservation. Our rigging desk will confirm stock, PDI timetable and send secure payment details within ${SITE.name ? '48 hours' : ''}.</p>
      <p><strong>Items:</strong></p>
      <ul>${itemsHtml}</ul>
      <p><strong>Total:</strong> £${total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      <p>— The ${SITE.shortName} Team</p>
    </div>
  `;

  await sendMail({
    to: customerEmail,
    subject: `Order Reservation Received — ${orderRef}`,
    html: ackHtml
  });

  return NextResponse.json({ ok: true, orderRef, emailSent: notifyResult.sent });
}
