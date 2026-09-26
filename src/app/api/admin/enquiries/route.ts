import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '../../../../lib/adminAuth';
import { getStoredEnquiries, deleteStoredEnquiry } from '../../../../lib/enquiryStore';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  if (!checkAdminPasscode(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const enquiries = await getStoredEnquiries();
  return NextResponse.json({ ok: true, enquiries });
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
  await deleteStoredEnquiry(id);
  return NextResponse.json({ ok: true });
}
