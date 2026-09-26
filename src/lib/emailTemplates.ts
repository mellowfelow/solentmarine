/**
 * Branded transactional emails — ported from the aged & amber reference build's
 * src/utils/emailTemplates.ts (WebForge Reply Portal), adapted to Solent Marine's
 * brand palette, currency and data shapes. Same structure: a small set of
 * table-based inline-CSS primitives (`shell`, `label`, `field`, `divider`,
 * `callout`, `button`) shared by one function per email type — not a generic
 * buildEmailHtml(rows[]) call.
 *
 * Table + inline-style layout — the subset that renders consistently in Zoho
 * Mail, Gmail (web + app), and Apple Mail. Light-mode locked (every surface
 * sets an explicit background) so a client's dark mode can't invert it. No
 * web fonts, no background images, no <style> block — everything is inlined.
 */
import { SITE, CONTACT, REPLY } from '../config/site';
import { paymentTermsHtml, paymentTermsLines } from './order';
import { waPaymentConfirmationLink } from './whatsapp';

const C = {
  page: '#F1F5F9', // slate-100 — the mount the card sits on
  card: '#FFFFFF',
  head: REPLY.brand.headerDark, // slate-900 header band
  accent: REPLY.brand.primary, // sky-600
  accentInk: '#0369A1', // sky-700 — deeper accent that holds contrast on white (links)
  cream: '#F8FAFC',
  headMeta: '#94A3B8', // slate-400
  ink: '#0F172A', // slate-900
  soft: '#475569', // slate-600
  faint: '#94A3B8', // slate-400
  rule: '#E2E8F0', // slate-200
  panel: '#F0F9FF', // sky-50
  good: '#059669' // emerald-600
};

const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export const escapeHtml = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
const esc = escapeHtml;

const money = (n: number) => `${REPLY.currency.symbol}${Number(n || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const stamp = () =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(new Date()) + ' UK';

/* ---------------------------- shared pieces --------------------------- */

function shell(o: { eyebrow: string; title: string; meta: string; body: string; internal?: boolean }) {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(o.eyebrow)}</title>
</head>
<body style="margin:0;padding:0;background:${C.page};-webkit-text-size-adjust:100%;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.page};">
<tr><td align="center" style="padding:28px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;border:1px solid ${C.rule};border-radius:12px;overflow:hidden;">

  <tr><td style="background:${C.head};padding:27px 34px 24px;">
    <div style="font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.accent};">${esc(o.eyebrow)}</div>
    <div style="font-family:${SANS};font-size:22px;font-weight:800;line-height:1.25;color:#FFFFFF;margin-top:8px;">${esc(o.title)}</div>
    <div style="font-family:${SANS};font-size:12px;line-height:1.5;color:${C.headMeta};margin-top:8px;">${esc(o.meta)}</div>
  </td></tr>
  <tr><td style="height:3px;background:${C.accent};font-size:0;line-height:0;">&nbsp;</td></tr>

  <tr><td style="background:${C.card};padding:26px 34px 30px;font-family:${SANS};color:${C.ink};">
    ${o.body}
  </td></tr>

  <tr><td style="background:${C.page};padding:15px 34px;border-top:1px solid ${C.rule};font-family:${SANS};font-size:11px;line-height:1.6;color:${C.faint};">
    ${esc(SITE.name)}${o.internal ? ' &nbsp;&middot;&nbsp; internal notification, not sent to the customer' : ''}<br>
    ${esc(CONTACT.address)}
  </td></tr>

</table>
</td></tr></table>
</body></html>`;
}

const label = (t: string) =>
  `<div style="font-family:${SANS};font-size:10px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:${C.faint};margin-bottom:5px;">${esc(t)}</div>`;

function field(l: string, valueHtml: string, marginBottom = 18) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 ${marginBottom}px;"><tr><td>
    ${label(l)}
    <div style="font-family:${SANS};font-size:14px;line-height:1.6;color:${C.ink};">${valueHtml}</div>
  </td></tr></table>`;
}

const divider = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 18px;"><tr><td style="border-top:1px solid ${C.rule};font-size:0;line-height:0;">&nbsp;</td></tr></table>`;

function callout(innerHtml: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;"><tr>
    <td style="background:${C.panel};border:1px solid ${C.rule};border-left:3px solid ${C.accentInk};border-radius:8px;padding:16px 18px;font-family:${SANS};font-size:13px;line-height:1.6;color:${C.ink};">
      ${innerHtml}
    </td></tr></table>`;
}

function button(href: string, text: string) {
  return `<a href="${esc(href)}" style="display:inline-block;background:${C.head};color:#FFFFFF;font-family:${SANS};font-size:13px;font-weight:700;line-height:1;text-decoration:none;padding:11px 22px;border-radius:8px;margin:4px 6px 4px 0;">${esc(text)} &rarr;</a>`;
}

const mailLink = (e: string) =>
  `<a href="mailto:${esc(e)}" style="color:${C.accentInk};text-decoration:none;font-weight:700;">${esc(e)}</a>`;

const telLink = (p: string) =>
  `<a href="tel:${esc(String(p).replace(/[^\d+]/g, ''))}" style="color:${C.accentInk};text-decoration:none;font-weight:700;">${esc(p)}</a>`;

/* ------------------------------- ORDER ------------------------------- */

export interface OrderEmailItem {
  name: string;
  quantity: number;
  shaft?: string;
  lineTotal: number;
}

export interface OrderEmailInput {
  orderNumber: string;
  items: OrderEmailItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  channel: 'whatsapp' | 'email';
  customer: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    notes?: string;
  };
}

function itemRows(items: OrderEmailItem[]) {
  return items
    .map(
      (i) => `<tr>
      <td style="padding:12px 0;border-bottom:1px solid ${C.rule};font-family:${SANS};font-size:14px;line-height:1.4;color:${C.ink};">${esc(i.name)}${i.shaft ? `<br><span style="font-size:12px;color:${C.faint};">${esc(i.shaft)}</span>` : ''}</td>
      <td align="center" style="padding:12px 10px;border-bottom:1px solid ${C.rule};font-family:${SANS};font-size:13px;color:${C.soft};white-space:nowrap;">&times;${i.quantity}</td>
      <td align="right" style="padding:12px 0;border-bottom:1px solid ${C.rule};font-family:${SANS};font-size:14px;font-weight:700;color:${C.ink};white-space:nowrap;">${money(i.lineTotal)}</td>
    </tr>`
    )
    .join('');
}

/** Admin-facing "new order" notification — this order has not been paid yet. */
export function orderEmail(o: OrderEmailInput): { subject: string; text: string; html: string } {
  const c = o.customer;
  const ts = stamp();
  const units = o.items.reduce((n, i) => n + i.quantity, 0);

  const th = `padding:0 0 10px;border-bottom:2px solid ${C.head};font-family:${SANS};font-size:10px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:${C.faint};`;

  const body = `
  ${callout(
    `<strong style="font-family:${SANS};">Payment not yet collected.</strong> This order was submitted via ${o.channel === 'whatsapp' ? 'WhatsApp' : 'the website'} checkout — reply to the customer to confirm stock and send payment details for <strong>${esc(o.paymentMethod)}</strong>.
     <div style="margin-top:13px;">${button(`https://${SITE.domain}/admin/orders/?order=${encodeURIComponent(o.orderNumber)}`, 'View Order in Dashboard')}</div>`
  )}

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="${th}">Item</td>
      <td align="center" style="${th}">Qty</td>
      <td align="right" style="${th}">Amount</td>
    </tr>
    ${itemRows(o.items)}
  </table>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;">
    <tr>
      <td align="right" style="padding:4px 16px 4px 0;font-family:${SANS};font-size:13px;color:${C.soft};">Subtotal</td>
      <td align="right" width="118" style="padding:4px 0 4px;font-family:${SANS};font-size:14px;color:${C.ink};white-space:nowrap;">${money(o.subtotal)}</td>
    </tr>
    <tr>
      <td align="right" style="padding:4px 16px 4px 0;font-family:${SANS};font-size:13px;color:${C.soft};">Shipping</td>
      <td align="right" width="118" style="padding:4px 0 4px;font-family:${SANS};font-size:14px;color:${C.ink};white-space:nowrap;">${o.shipping === 0 ? 'Free' : money(o.shipping)}</td>
    </tr>
    <tr>
      <td align="right" style="padding:13px 16px 4px 0;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:${C.soft};border-top:2px solid ${C.head};">Total</td>
      <td align="right" width="118" style="padding:13px 0 4px;font-family:${SANS};font-size:20px;font-weight:800;color:${C.accentInk};white-space:nowrap;border-top:2px solid ${C.head};">${money(o.total)}</td>
    </tr>
  </table>

  ${divider}

  ${field('Delivery Address', esc(c.address || 'Not provided'), 16)}
  ${field('Customer', `${mailLink(c.email)}${c.phone ? `<br>${telLink(c.phone)}` : ''}`, 16)}
  ${field('Payment Method', `<strong>${esc(o.paymentMethod)}</strong>`, c.notes ? 16 : 0)}
  ${c.notes ? divider + field('Order Notes', esc(c.notes).replace(/\n/g, '<br>'), 0) : ''}
  `;

  const text =
    `NEW ORDER  ${o.orderNumber}\n${ts}  ·  ${units} unit${units === 1 ? '' : 's'}  ·  via ${o.channel}\n\n` +
    `** Payment not yet collected — arrange ${o.paymentMethod} via the admin portal **\n\n` +
    `ITEMS\n${o.items.map((i) => `  ${i.name}${i.shaft ? ` (${i.shaft})` : ''}  x${i.quantity}  ${money(i.lineTotal)}`).join('\n')}\n\n` +
    `Subtotal  ${money(o.subtotal)}\n` +
    `Shipping  ${o.shipping === 0 ? 'Free' : money(o.shipping)}\n` +
    `TOTAL  ${money(o.total)}\n\n` +
    `DELIVERY ADDRESS\n  ${c.address || 'Not provided'}\n\n` +
    `CUSTOMER\n  ${c.email}\n  ${c.phone || ''}\n\n` +
    `PAYMENT METHOD\n  ${o.paymentMethod}\n` +
    (c.notes ? `\nORDER NOTES\n  ${c.notes}\n` : '');

  return {
    subject: `New order · ${o.orderNumber} · ${money(o.total)} · ${c.name}`,
    text,
    html: shell({
      eyebrow: 'New Order',
      title: o.orderNumber,
      meta: `${ts}  ·  ${units} unit${units === 1 ? '' : 's'}`,
      body,
      internal: true
    })
  };
}

/**
 * Customer-facing "we've received your order" receipt — sent immediately on
 * checkout, alongside (not instead of) the admin notification above. Carries
 * no payment routing details (those go out separately once the workshop
 * confirms stock); it exists so the customer has an immediate written
 * record instead of waiting with no confirmation at all.
 */
export function orderConfirmationEmail(o: OrderEmailInput): { subject: string; text: string; html: string } {
  const c = o.customer;
  const ts = stamp();
  const units = o.items.reduce((n, i) => n + i.quantity, 0);

  const body = `
  ${callout(
    `<strong style="font-family:${SANS};">Thanks, ${esc(c.name)} — we've received your order.</strong> Keep this email as your reference. You'll receive a second email shortly with payment instructions for <strong>${esc(o.paymentMethod)}</strong>; once that's confirmed we'll book your Pre-Delivery Inspection and dispatch.`
  )}

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    ${itemRows(o.items)}
  </table>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;">
    <tr>
      <td align="right" style="padding:13px 16px 4px 0;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:${C.soft};border-top:2px solid ${C.head};">Total</td>
      <td align="right" width="118" style="padding:13px 0 4px;font-family:${SANS};font-size:20px;font-weight:800;color:${C.accentInk};white-space:nowrap;border-top:2px solid ${C.head};">${money(o.total)}</td>
    </tr>
  </table>

  ${divider}

  ${callout(
    `<strong style="font-family:${SANS};">Before delivery</strong>
     <ul style="margin:10px 0 0;padding-left:18px;">${paymentTermsHtml(o.orderNumber)}</ul>`
  )}

  <div>${button(`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Question about order ${o.orderNumber}`)}`, 'Contact Us')}</div>
  `;

  const text =
    `ORDER RECEIVED — ${o.orderNumber}\n${ts}\n\n` +
    `Thanks, ${c.name} — we've received your order. You'll get a second email shortly with payment instructions for ${o.paymentMethod}.\n\n` +
    `ITEMS\n${o.items.map((i) => `  ${i.name}${i.shaft ? ` (${i.shaft})` : ''}  x${i.quantity}  ${money(i.lineTotal)}`).join('\n')}\n\n` +
    `TOTAL  ${money(o.total)}\n\n` +
    paymentTermsLines(o.orderNumber)
      .map((l) => `- ${l}`)
      .join('\n') +
    '\n';

  return {
    subject: `Order received — ${o.orderNumber} · ${money(o.total)} · ${SITE.name}`,
    text,
    html: shell({
      eyebrow: 'Order Received',
      title: `Hi ${c.name || 'there'}`,
      meta: `${ts}  ·  ${units} unit${units === 1 ? '' : 's'}  ·  ${o.orderNumber}`,
      body
    })
  };
}

/* ------------------------------ CONTACT ------------------------------ */

export interface ContactEmailInput {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  enquiryId?: string;
}

/** Admin-facing notification only — no customer-facing ack for a plain enquiry. */
export function contactEmail(i: ContactEmailInput): { subject: string; text: string; html: string } {
  const ts = stamp();
  const dashLink = i.enquiryId ? `https://${SITE.domain}/admin/enquiries/` : '';

  const body = `
  ${field('Email', mailLink(i.email), 14)}
  ${i.phone ? field('Phone', telLink(i.phone), 14) : ''}
  ${field('Subject', esc(i.subject), 0)}
  ${divider}
  ${field('Message', esc(i.message).replace(/\n/g, '<br>'), 20)}
  <div>${dashLink ? button(dashLink, 'View in Dashboard') : ''}${button(
    `mailto:${i.email}?subject=${encodeURIComponent(`Re: ${i.subject}`)}`,
    'Reply by Email'
  )}</div>
  `;

  const text =
    `CONTACT MESSAGE\n${ts}\n\n` +
    `From: ${i.name} <${i.email}>${i.phone ? ` · ${i.phone}` : ''}\nSubject: ${i.subject}\n\n${i.message}\n`;

  return {
    subject: `Contact · ${i.subject} · ${i.name}`,
    text,
    html: shell({ eyebrow: 'Contact Message', title: i.name || 'New message', meta: ts, body, internal: true })
  };
}

/* -------------------------- PAYMENT DETAILS (Reply Portal, customer-facing) -------------------------- */

export interface PaymentDetailsEmailInput {
  orderNumber: string;
  amountDue: number;
  customerName: string;
  instructionsHtml: string; // admin-composed, pre-escaped HTML
}

export function paymentDetailsEmail(i: PaymentDetailsEmailInput): { subject: string; text: string; html: string } {
  const ts = stamp();

  const body = `
  ${field('Order', `<strong>${esc(i.orderNumber)}</strong>`, 14)}
  ${field('Amount Due', `<span style="font-family:${SANS};font-size:20px;font-weight:800;color:${C.accentInk};">${money(i.amountDue)}</span>`, 20)}
  ${divider}
  <div style="font-family:${SANS};font-size:14px;line-height:1.7;color:${C.ink};margin-bottom:20px;">${i.instructionsHtml}</div>
  ${callout(
    `<strong style="font-family:${SANS};">Before your order ships</strong>
     <ul style="margin:10px 0 0;padding-left:18px;">${paymentTermsHtml(i.orderNumber)}</ul>`
  )}
  <div>${button(
    `https://${SITE.domain}/order/confirm-payment/?id=${encodeURIComponent(i.orderNumber)}`,
    "I've Paid — Upload Confirmation"
  )}${button(waPaymentConfirmationLink(i.orderNumber), 'Confirm via WhatsApp')}${button(
    `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Re: Payment for ${i.orderNumber}`)}`,
    'Reply to Us'
  )}</div>
  `;

  const text =
    `PAYMENT DETAILS — ${i.orderNumber}\n${ts}\n\n` +
    `Amount due: ${money(i.amountDue)}\n\n` +
    `${i.instructionsHtml.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '')}\n\n` +
    paymentTermsLines(i.orderNumber)
      .map((l) => `- ${l}`)
      .join('\n') +
    `\nPaid already? Upload a screenshot: https://${SITE.domain}/order/confirm-payment/?id=${i.orderNumber}\n` +
    `Or confirm on WhatsApp: ${waPaymentConfirmationLink(i.orderNumber)}\n`;

  return {
    subject: `Payment details for order ${i.orderNumber} · ${money(i.amountDue)} due`,
    text,
    html: shell({
      eyebrow: 'Payment Details',
      title: `Hi ${i.customerName || 'there'}`,
      meta: ts,
      body
    })
  };
}

/* -------------------------- PAYMENT CONFIRMATION SUBMITTED (Reply Portal, admin-facing) -------------------------- */

export interface PaymentConfirmationNotifyInput {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  amountDue: number;
  note?: string;
  hasScreenshot: boolean;
}

/** Admin-facing notification when a customer submits proof of payment via /order/confirm-payment/. */
export function paymentConfirmationNotifyEmail(i: PaymentConfirmationNotifyInput): { subject: string; text: string; html: string } {
  const ts = stamp();

  const body = `
  ${callout(
    `<strong style="font-family:${SANS};">${esc(i.customerName)}</strong> says they've paid order <strong>${esc(i.orderNumber)}</strong>. ${i.hasScreenshot ? 'A screenshot is attached.' : 'No screenshot was attached.'}
     <div style="margin-top:13px;">${button(`https://${SITE.domain}/admin/orders/?order=${encodeURIComponent(i.orderNumber)}`, 'Open Admin Portal')}</div>`
  )}
  ${field('Order', `<strong>${esc(i.orderNumber)}</strong>`, 14)}
  ${field('Customer', `${esc(i.customerName)}<br>${mailLink(i.customerEmail)}`, 14)}
  ${field('Amount Due', money(i.amountDue), i.note ? 16 : 0)}
  ${i.note ? divider + field('Customer Note', esc(i.note).replace(/\n/g, '<br>'), 0) : ''}
  `;

  const text =
    `PAYMENT CONFIRMATION SUBMITTED — ${i.orderNumber}\n${ts}\n\n` +
    `${i.customerName} says they've paid. ${i.hasScreenshot ? 'Screenshot attached.' : 'No screenshot attached.'}\n\n` +
    `Customer: ${i.customerName} <${i.customerEmail}>\nAmount due: ${money(i.amountDue)}\n` +
    (i.note ? `\nCustomer note: ${i.note}\n` : '');

  return {
    subject: `Payment confirmation — order ${i.orderNumber}`,
    text,
    html: shell({ eyebrow: 'Payment Confirmation Submitted', title: i.orderNumber, meta: ts, body, internal: true })
  };
}

/* -------------------------- ENQUIRY REPLY (Reply Portal, customer-facing) -------------------------- */

export interface EnquiryReplyEmailInput {
  customerName: string;
  originalSubject: string;
  replyHtml: string; // admin-composed, pre-escaped HTML
}

export function enquiryReplyEmail(i: EnquiryReplyEmailInput): { subject: string; text: string; html: string } {
  const ts = stamp();

  const body = `
  <div style="font-family:${SANS};font-size:14px;line-height:1.7;color:${C.ink};">${i.replyHtml}</div>
  <div style="margin-top:22px;">${button(`mailto:${CONTACT.email}`, 'Reply to Us')}</div>
  `;

  const text = `${i.replyHtml.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '')}\n\n— ${SITE.name}\n${CONTACT.email}\n`;

  return {
    subject: `Re: ${i.originalSubject}`,
    text,
    html: shell({ eyebrow: SITE.name, title: `Hi ${i.customerName || 'there'}`, meta: ts, body })
  };
}
