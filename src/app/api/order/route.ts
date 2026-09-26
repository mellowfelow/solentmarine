import { NextResponse } from 'next/server';
import { sendMail } from '../../../lib/mailer';
import { saveStoredOrder, StoredOrderItem, OrderChannel } from '../../../lib/orderStore';
import { buildEmailHtml } from '../../../lib/emailTemplate';
import { CONTACT, SITE, REPLY } from '../../../config/site';

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

  const currency = REPLY.currency.symbol;
  const itemsHtml = items
    .map((i) => `${i.quantity}x <strong>${i.name}</strong>${i.shaft ? ` (${i.shaft})` : ''} — ${currency}${i.price.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`)
    .join('<br/>');

  const notifyHtml = buildEmailHtml({
    title: 'New Order Reservation',
    preheader: `New order from ${customerName} — ${orderRef}`,
    refBadge: orderRef,
    intro: `A new order reservation was submitted via ${channel === 'whatsapp' ? 'WhatsApp' : 'the website'} checkout.`,
    rows: [
      { label: 'Customer', value: customerName },
      { label: 'Email', value: customerEmail },
      { label: 'Phone', value: customerPhone || '—' },
      { label: 'Delivery Address', value: deliveryAddress || '—' },
      { label: 'Delivery Method', value: deliveryMethod || '—' },
      { label: 'Items Reserved', html: itemsHtml, block: true },
      { label: 'Subtotal', value: `${currency}${subtotal.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
      { label: 'Shipping', value: `${currency}${shipping.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
      { label: 'Total Amount Due', value: `${currency}${total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, highlight: true },
      { label: 'Notes', value: notes || 'None' }
    ],
    cta: { label: 'Open Admin Portal', url: `https://${SITE.domain}/admin/` }
  });

  const notifyResult = await sendMail({
    to: CONTACT.email,
    subject: `New Order Reservation — ${orderRef}`,
    html: notifyHtml,
    replyTo: customerEmail
  });

  const ackHtml = buildEmailHtml({
    title: 'Order Reservation Received',
    preheader: `Thanks for your order, ${customerName} — ref ${orderRef}`,
    refBadge: orderRef,
    intro: `Hi ${customerName},<br/><br/>Thank you for your order reservation. Our rigging desk will confirm stock, PDI timetable and send secure payment details within ${REPLY.deadlineHours} hours.`,
    rows: [
      { label: 'Items Reserved', html: itemsHtml, block: true },
      { label: 'Total Amount Due', value: `${currency}${total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, highlight: true }
    ],
    cta: { label: 'Contact Rigging Desk', url: `mailto:${REPLY.channels.email}` }
  });

  await sendMail({
    to: customerEmail,
    subject: `Order Reservation Received — ${orderRef}`,
    html: ackHtml
  });

  return NextResponse.json({ ok: true, orderRef, emailSent: notifyResult.sent });
}
