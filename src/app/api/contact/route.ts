import { NextResponse } from 'next/server';
import { sendMail } from '../../../lib/mailer';
import { saveStoredEnquiry } from '../../../lib/enquiryStore';
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

  const notifyHtml = `
    <div style="font-family:sans-serif;font-size:14px;color:#0f172a;">
      <h2 style="color:#0284c7;">New Website Enquiry — ${id}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || '—'}</p>
      <p><strong>Vessel / Hull:</strong> ${hull || '—'}</p>
      <p><strong>Interested Shaft:</strong> ${shaft || '—'}</p>
      <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
    </div>
  `;

  const notifyResult = await sendMail({
    to: CONTACT.email,
    subject: `New Contact Enquiry — ${name} (${id})`,
    html: notifyHtml,
    replyTo: email
  });

  const ackHtml = `
    <div style="font-family:sans-serif;font-size:14px;color:#0f172a;">
      <h2 style="color:#0284c7;">Thanks for contacting ${SITE.name}</h2>
      <p>Hi ${name},</p>
      <p>We've received your enquiry (ref <strong>${id}</strong>) and a factory-certified advisor will get back to you within 2-4 working hours.</p>
      <p>Your message:</p>
      <blockquote style="border-left:3px solid #0284c7;padding-left:12px;color:#475569;">${message.replace(/\n/g, '<br/>')}</blockquote>
      <p>— The ${SITE.shortName} Team</p>
    </div>
  `;

  await sendMail({
    to: email,
    subject: `We've received your enquiry — ${id}`,
    html: ackHtml
  });

  return NextResponse.json({ ok: true, id, emailSent: notifyResult.sent });
}
