import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '../../../../lib/adminAuth';
import { sendMail } from '../../../../lib/mailer';
import { getStoredEnquiryById, updateStoredEnquiryStatus } from '../../../../lib/enquiryStore';
import { enquiryReplyEmail, escapeHtml } from '../../../../lib/emailTemplates';
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

  if (!enquiryId || !subject || !message) {
    return NextResponse.json({ ok: false, error: 'enquiryId, subject and message are required.' }, { status: 400 });
  }

  const enquiry = await getStoredEnquiryById(enquiryId);
  if (!enquiry) {
    return NextResponse.json({ ok: false, error: 'Enquiry not found.' }, { status: 404 });
  }

  const mail = enquiryReplyEmail({
    customerName: enquiry.name,
    originalSubject: subject.replace(/^Re:\s*/i, ''),
    replyHtml: escapeHtml(message).replace(/\n/g, '<br>')
  });

  const result = await sendMail({
    to: enquiry.email,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
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
