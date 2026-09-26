import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '../../../../lib/adminAuth';
import { sendMail } from '../../../../lib/mailer';
import { getStoredEnquiryById, updateStoredEnquiryStatus } from '../../../../lib/enquiryStore';
import { REPLY } from '../../../../config/site';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!checkAdminPasscode(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const enquiryId = String(body.enquiryId || '');
  const subject = String(body.subject || '');
  const message = String(body.message || '');
  const emailHtml = String(body.emailHtml || '');

  if (!enquiryId || !subject || !emailHtml) {
    return NextResponse.json({ ok: false, error: 'enquiryId, subject and emailHtml are required.' }, { status: 400 });
  }

  const enquiry = await getStoredEnquiryById(enquiryId);
  if (!enquiry) {
    return NextResponse.json({ ok: false, error: 'Enquiry not found.' }, { status: 404 });
  }

  const result = await sendMail({
    to: enquiry.email,
    subject,
    html: emailHtml,
    replyTo: REPLY.channels.email
  });

  const updated = await updateStoredEnquiryStatus(enquiryId, 'replied', {
    date: new Date().toISOString(),
    subject,
    message,
    sender: 'Solent Marine Technical Desk'
  });

  return NextResponse.json({ ok: true, enquiry: updated, emailSent: result.sent });
}
