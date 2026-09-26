import { NextResponse } from 'next/server';
import { sendMail } from '../../../lib/mailer';
import { saveStoredOrder, StoredOrderItem, OrderChannel } from '../../../lib/orderStore';
import { orderEmail, orderConfirmationEmail, OrderEmailItem } from '../../../lib/emailTemplates';
import { CONTACT, SHOP } from '../../../config/site';

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

  if (subtotal < SHOP.minOrder) {
    return NextResponse.json(
      { ok: false, error: `Minimum order value is £${SHOP.minOrder}.` },
      { status: 400 }
    );
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

  const emailItems: OrderEmailItem[] = items.map((i) => ({
    name: i.name,
    quantity: i.quantity,
    shaft: i.shaft,
    lineTotal: i.price * i.quantity
  }));

  const orderInput = {
    orderNumber: orderRef,
    items: emailItems,
    subtotal,
    shipping,
    total,
    paymentMethod: 'UK Bank Transfer (BACS / Faster Payments)',
    channel,
    customer: {
      name: customerName,
      email: customerEmail,
      phone: customerPhone || undefined,
      address: deliveryAddress || undefined,
      notes: notes || undefined
    }
  };

  const notify = orderEmail(orderInput);
  const confirmation = orderConfirmationEmail(orderInput);

  const notifyResult = await sendMail({
    to: CONTACT.email,
    subject: notify.subject,
    html: notify.html,
    text: notify.text,
    replyTo: customerEmail
  });

  // Customer confirmation always fires on either checkout channel — the paper trail
  // exists regardless of which button the customer pressed (WebForge reply-portal §7a).
  await sendMail({
    to: customerEmail,
    subject: confirmation.subject,
    html: confirmation.html,
    text: confirmation.text,
    replyTo: CONTACT.email
  });

  return NextResponse.json({ ok: true, orderRef, emailSent: notifyResult.sent });
}
