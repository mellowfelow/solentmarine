import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '../../../../lib/adminAuth';
import { sendMail } from '../../../../lib/mailer';
import { getStoredOrderById, updateStoredOrderStatus } from '../../../../lib/orderStore';
import { paymentMethodParts, instructionsParts, parsePaymentDetail } from '../../../../lib/order';
import { paymentDetailsEmail, escapeHtml } from '../../../../lib/emailTemplates';
import { REPLY } from '../../../../config/site';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!checkAdminPasscode(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const orderId = String(body.orderId || '');
  const methodId = String(body.methodId || REPLY.paymentMethods[0]?.id || '');
  const detail = String(body.detail || '');

  if (!orderId || !methodId) {
    return NextResponse.json({ ok: false, error: 'orderId and methodId are required.' }, { status: 400 });
  }

  const order = await getStoredOrderById(orderId);
  if (!order) {
    return NextResponse.json({ ok: false, error: 'Order not found.' }, { status: 404 });
  }

  const parts = paymentMethodParts(methodId, order.total, order.id);
  const instructions = instructionsParts(parts.opening, detail, parts.closing);
  const instructionsHtml = escapeHtml(instructions).replace(/\n/g, '<br>');

  const mail = paymentDetailsEmail({
    orderNumber: order.id,
    amountDue: order.total,
    customerName: order.customerName,
    instructionsHtml,
    methodId
  });

  const result = await sendMail({
    to: order.customerEmail,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    replyTo: REPLY.channels.email
  });

  const updated = await updateStoredOrderStatus(orderId, 'payment-sent', {
    paymentSentAt: new Date().toISOString(),
    paymentMethodId: methodId,
    paymentDetails: {
      methodId,
      fields: detail ? parsePaymentDetail(detail) : [],
      opening: parts.opening,
      closing: parts.closing,
      sentAt: new Date().toISOString()
    }
  });

  return NextResponse.json({ ok: true, order: updated, emailSent: result.sent });
}
