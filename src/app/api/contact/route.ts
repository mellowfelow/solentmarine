import { NextResponse } from 'next/server';
import { sendMail } from '../../../lib/mailer';
import { saveStoredEnquiry } from '../../../lib/enquiryStore';
import { contactEmail } from '../../../lib/emailTemplates';
import { CONTACT } from '../../../config/site';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const phone = String(body.phone || '').trim();
  const message = String(body.message || '').trim();
  const hull = String(body.hull || '').trim();
  const shaft = String(body.shaft || '').trim();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: 'Name, email and message are required.' }, { status: 400 });
  }

  const id = `ENQ-${Math.floor(1000 + Math.random() * 9000)}`;
  const subjectLine = 'Website contact form enquiry';

  await saveStoredEnquiry({
    id,
    type: 'contact',
    status: 'new',
    createdAt: new Date().toISOString(),
    name,
    email,
    phone: phone || undefined,
    subject: subjectLine,
    vesselModel: hull || undefined,
    engineInterest: shaft || undefined,
    message
  });

  const fullMessage = [
    message,
    hull ? `Vessel / Hull: ${hull}` : '',
    shaft ? `Interested Shaft: ${shaft}` : ''
  ]
    .filter(Boolean)
    .join('\n\n');

  const mail = contactEmail({ name, email, phone: phone || undefined, subject: subjectLine, message: fullMessage, enquiryId: id });

  const result = await sendMail({
    to: CONTACT.email,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    replyTo: email
  });

  return NextResponse.json({ ok: true, id, emailSent: result.sent });
}
