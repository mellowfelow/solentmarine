import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '../../../../lib/adminAuth';
import { getStoredOrders, deleteStoredOrder, updateStoredOrderStatus, OrderStatus } from '../../../../lib/orderStore';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  if (!checkAdminPasscode(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const orders = await getStoredOrders();
  return NextResponse.json({ ok: true, orders });
}

export async function PATCH(request: Request) {
  if (!checkAdminPasscode(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  const id = String(body.id || '');
  const status = body.status as OrderStatus;
  if (!id || !status) {
    return NextResponse.json({ ok: false, error: 'id and status are required.' }, { status: 400 });
  }
  const updated = await updateStoredOrderStatus(id, status, body.extra || undefined);
  return NextResponse.json({ ok: true, order: updated });
}

export async function DELETE(request: Request) {
  if (!checkAdminPasscode(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ ok: false, error: 'id is required.' }, { status: 400 });
  }
  await deleteStoredOrder(id);
  return NextResponse.json({ ok: true });
}
