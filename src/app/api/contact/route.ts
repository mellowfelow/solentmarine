import { NextResponse } from 'next/server';
import { sendMail } from '../../../lib/mailer';
import { saveStoredEnquiry } from '../../../lib/enquiryStore';
import { buildEmailHtml } from '../../../lib/emailTemplate';
import { CONTACT, SITE } from '../../../config/site';

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

  await saveStoredEnquiry({
    id,
    type: 'contact',
    status: 'new',
    createdAt: new Date().toISOString(),
    name,
    email,
    phone: phone || undefined,
    subject: 'Website contact form enquiry',
    vesselModel: hull || undefined,
    engineInterest: shaft || undefined,
    message
  });

  const notifyHtml = buildEmailHtml({
    title: 'New Website Enquiry',
    preheader: `New enquiry from ${name} — ${id}`,
    refBadge: id,
    intro: `A new contact form enquiry was submitted on ${SITE.name}.`,
    rows: [
      { label: 'Name', value: name },
      { label: 'Email', value: email },
      { label: 'Phone', value: phone || '—' },
      { label: 'Vessel / Hull', value: hull || '—' },
      { label: 'Interested Shaft', value: shaft || '—' },
      { label: 'Message', html: message.replace(/\n/g, '<br/>'), block: true }
    ],
    cta: { label: 'Reply via Admin Portal', url: `https://${SITE.domain}/admin/` },
    secondaryCta: { label: 'Reply by Email', url: `mailto:${email}` }
  });

  const notifyResult = await sendMail({
    to: CONTACT.email,
    subject: `New Contact Enquiry — ${name} (${id})`,
    html: notifyHtml,
    replyTo: email
  });

  const ackHtml = buildEmailHtml({
    title: 'We’ve received your enquiry',
    preheader: `Thanks for contacting ${SITE.name} — ref ${id}`,
    refBadge: id,
    intro: `Hi ${name},<br/><br/>Thank you for contacting ${SITE.name}. A factory-certified advisor will get back to you within 2-4 working hours.`,
    rows: [{ label: 'Your Message', html: message.replace(/\n/g, '<br/>'), block: true }],
    cta: { label: 'Browse Our Stock', url: `https://${SITE.domain}/shop/` }
  });

  await sendMail({
    to: email,
    subject: `We've received your enquiry — ${id}`,
    html: ackHtml
  });

  return NextResponse.json({ ok: true, id, emailSent: notifyResult.sent });
}
