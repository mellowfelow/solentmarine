import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '../../../../lib/adminAuth';
import { sendMail } from '../../../../lib/mailer';
import { getStoredOrderById, updateStoredOrderStatus } from '../../../../lib/orderStore';
import { REPLY } from '../../../../config/site';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!checkAdminPasscode(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const orderId = String(body.orderId || '');
  const emailHtml = String(body.emailHtml || '');
  const paymentDetails = body.paymentDetails as
    | { methodId: string; fields: { label: string; value: string }[]; opening: string; closing: string }
    | undefined;

  if (!orderId || !emailHtml) {
    return NextResponse.json({ ok: false, error: 'orderId and emailHtml are required.' }, { status: 400 });
  }

  const order = await getStoredOrderById(orderId);
  if (!order) {
    return NextResponse.json({ ok: false, error: 'Order not found.' }, { status: 404 });
  }

  const result = await sendMail({
    to: order.customerEmail,
    subject: `Payment Instructions for Solent Marine Order ${orderId}`,
    html: emailHtml,
    replyTo: REPLY.channels.email
  });

  const updated = await updateStoredOrderStatus(orderId, 'payment-sent', {
    paymentSentAt: new Date().toISOString(),
    paymentMethodId: paymentDetails?.methodId || order.paymentMethodId,
    paymentDetails: paymentDetails
      ? { ...paymentDetails, sentAt: new Date().toISOString() }
      : order.paymentDetails
  });

  return NextResponse.json({ ok: true, order: updated, emailSent: result.sent });
}
