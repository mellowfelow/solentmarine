import { SITE, REPLY } from '../config/site';
import { paymentTermsLines } from './order';

/**
 * WhatsApp message conventions (WebForge Reply Portal spec §7).
 *
 * Two directions, two openers — never mixed:
 *  - Admin -> customer: bold `*{SITE.name}*` brand header (buildAdminText).
 *  - Customer -> business: every message a customer originates must open with
 *    the literal greeting "Hi {SITE.name}," as its first line — not the bold
 *    label — so a business juggling several WebForge sites (or one WhatsApp
 *    number across order requests, payment confirmations, and general chat)
 *    can tell which site an inbound message is about before opening it.
 */

export const WA_HEADER = `*${SITE.name}*`;

export function toWhatsAppNumber(raw: string): string {
  const digits = String(raw || '').replace(/\D/g, '');
  if (raw.startsWith('+')) return digits;
  if (digits.startsWith('0') && REPLY.channels.whatsappCountryCode) {
    return `${REPLY.channels.whatsappCountryCode}${digits.slice(1)}`;
  }
  return digits;
}

function waGreeting(): string {
  return `Hi ${SITE.name},`;
}

function buildAdminText(body: string | string[]): string {
  const lines = Array.isArray(body) ? body : [body];
  return [WA_HEADER, '', ...lines].join('\n');
}

function buildCustomerText(body: string | string[]): string {
  const lines = Array.isArray(body) ? body : [body];
  return [waGreeting(), '', ...lines].join('\n');
}

/** Admin-side "Copy message" fallback — same framing as waLinkTo. */
export function waMessageText(body: string | string[]): string {
  return buildAdminText(body);
}

/** Admin -> a specific customer phone number. */
export function waLinkTo(phone: string, body: string | string[]): string {
  return `https://wa.me/${toWhatsAppNumber(phone)}?text=${encodeURIComponent(buildAdminText(body))}`;
}

/** Customer -> the business's own WhatsApp number. Always the greeting form. */
export function waLink(body: string | string[]): string {
  return `https://wa.me/${toWhatsAppNumber(REPLY.channels.whatsapp)}?text=${encodeURIComponent(buildCustomerText(body))}`;
}

export interface WhatsAppOrderItem {
  name: string;
  quantity: number;
  shaft?: string;
  price: number;
}

export interface WhatsAppOrderDetails {
  id: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  items: WhatsAppOrderItem[];
  total: number;
  deliveryMethod?: string;
}

/** Customer -> business: new order request, itemised. Must open with the greeting. */
export function waOrderLink(order: WhatsAppOrderDetails): string {
  const itemsSummary = order.items.map(
    (item) => `${item.quantity}x ${item.name}${item.shaft ? ` (${item.shaft})` : ''} — ${REPLY.currency.symbol}${(item.price * item.quantity).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  );

  const lines = [
    `New order request ${order.id}`,
    '',
    ...itemsSummary,
    '',
    `Total: ${REPLY.currency.symbol}${order.total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${REPLY.currency.code}`,
    `Delivery: ${order.deliveryMethod || 'UK Mainland Pallet'}`,
    '',
    `Name: ${order.customerName}`,
    order.customerEmail ? `Email: ${order.customerEmail}` : '',
    order.customerPhone ? `Phone: ${order.customerPhone}` : ''
  ].filter(Boolean);

  return waLink(lines);
}

/** Customer -> business: payment confirmation notice. */
export function waPaymentConfirmationLink(orderRef: string): string {
  return waLink([`I've completed payment for order ${orderRef}.`]);
}

/**
 * Admin -> customer: pre-filled payment-details message, mirroring the
 * payment-details email using the same parsed fields and standing terms —
 * email/WhatsApp content parity is a rule (WebForge §7).
 */
export function waPaymentDetailsMessage(opts: {
  orderRef: string;
  amountDue: number;
  opening: string;
  fields: { label: string; value: string }[];
  closing: string;
}): string[] {
  const fieldLines = opts.fields.map((f) => `${f.label}: ${f.value}`);
  const terms = paymentTermsLines(opts.orderRef).map((l) => `✅ ${l}`);
  return [
    `Payment details for order ${opts.orderRef} — ${REPLY.currency.symbol}${opts.amountDue.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} due.`,
    '',
    opts.opening,
    '',
    ...fieldLines,
    '',
    opts.closing,
    '',
    ...terms
  ];
}

export function waPaymentDetailsLink(phone: string, opts: Parameters<typeof waPaymentDetailsMessage>[0]): string {
  return waLinkTo(phone, waPaymentDetailsMessage(opts));
}
