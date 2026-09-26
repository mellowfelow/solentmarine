import { NextResponse } from 'next/server';
import { getStoredOrderById } from '../../../../lib/orderStore';

export const runtime = 'nodejs';

/**
 * Public, no-auth route — the order number itself is the access token, the same pattern
 * banks and payment processors use for a payment-details link. Never exposes anything
 * beyond what was already sent to the customer in the payment-details email.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ ok: false, error: 'Order id is required.' }, { status: 400 });
  }

  const order = await getStoredOrderById(id);
  if (!order || !order.paymentDetails) {
    return NextResponse.json({ ok: false, error: 'No payment details found for this order yet.' }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    order: {
      id: order.id,
      customerName: order.customerName,
      total: order.total,
      currency: order.currency,
      status: order.status,
      paymentDetails: order.paymentDetails
    }
  });
}
