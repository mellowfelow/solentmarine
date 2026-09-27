import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '../../../../../lib/adminAuth';
import { getStoredEnquiryById } from '../../../../../lib/enquiryStore';

export const runtime = 'nodejs';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdminPasscode(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  const enquiry = await getStoredEnquiryById(decodeURIComponent(id));
  if (!enquiry) {
    return NextResponse.json({ ok: false, error: 'Enquiry not found.' }, { status: 404 });
  }
  return NextResponse.json({ ok: true, enquiry });
}
