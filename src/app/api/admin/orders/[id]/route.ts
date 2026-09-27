import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '../../../../../lib/adminAuth';
import { getStoredOrderById } from '../../../../../lib/orderStore';

export const runtime = 'nodejs';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdminPasscode(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  const order = await getStoredOrderById(decodeURIComponent(id));
  if (!order) {
    return NextResponse.json({ ok: false, error: 'Order not found.' }, { status: 404 });
  }
  return NextResponse.json({ ok: true, order });
}
