import { SITE, REPLY } from '../config/site';

export interface PaymentMethodParts {
  opening: string;
  closing: string;
}

export interface ParsedPaymentField {
  label: string;
  value: string;
}

/**
 * Short, human, collision-resistant order number, generated client-side at checkout so the
 * same ref appears in the WhatsApp message, the dashboard, and the confirmation email without
 * a server round-trip first.
 */
function makeOrderNumber(prefix: string): string {
  const t = Date.now().toString(36).toUpperCase().slice(-4);
  // No 0/O/1/I/L — unambiguous when read off a screenshot or over the phone.
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = typeof crypto !== 'undefined' && crypto.getRandomValues
    ? crypto.getRandomValues(new Uint8Array(2))
    : [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
  let r = '';
  for (const b of bytes) r += alphabet[b % alphabet.length];
  return `${prefix}-${t}${r}`;
}

export function generateOrderNumber(): string {
  return makeOrderNumber(REPLY.orderPrefix);
}

export function money(n: number): string {
  return `${REPLY.currency.symbol}${Number(n || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const KNOWN_LABELS = [
  'account name', 'account number', 'sort code', 'bank name', 'branch code',
  'routing number', 'beneficiary name', 'beneficiary', 'swift code', 'swift',
  'bic code', 'bic', 'iban', 'wallet address', 'wallet', 'network', 'memo',
  'destination tag', 'tag', 'paypal email', 'paypal.me', 'paypal',
  'payment link', 'reference'
].sort((a, b) => b.length - a.length); // longest phrase wins, e.g. "account number" over "account"

const LABEL_PATTERN = new RegExp(
  `^(${KNOWN_LABELS.map((l) => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\s*[:\\-]?\\s+(.+)$`,
  'i'
);

function titleCase(s: string): string {
  return s.replace(/\S+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
}

/**
 * Splits one pasted payment-detail blob into individually-copyable fields.
 * The admin pastes real bank details / a wallet address / a payment link —
 * anything — with zero code changes required for a new country or rail.
 *
 * Three tiers, in order:
 *  1. "Label: value" on a line — the general case. ANY label works here,
 *     including ones not in KNOWN_LABELS, as long as the admin uses a colon.
 *  2. No colon, but the line starts with a recognised label word
 *     ("Sort code 00-00-00") — split there so only the value gets copied.
 *  3. No colon, no recognised label — the whole line becomes one field
 *     labelled "Detail" (numbered if there's more than one).
 */
export function parsePaymentDetail(text: string): ParsedPaymentField[] {
  const lines = String(text || '').split('\n').map((l) => l.trim()).filter(Boolean);
  let unlabeled = 0;
  return lines.map((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0 && colonIdx < line.length - 1) {
      return { label: line.slice(0, colonIdx).trim(), value: line.slice(colonIdx + 1).trim() };
    }
    const match = line.match(LABEL_PATTERN);
    if (match) return { label: titleCase(match[1]), value: match[2].trim() };
    unlabeled += 1;
    return { label: unlabeled > 1 ? `Detail ${unlabeled}` : 'Detail', value: line };
  });
}

/**
 * Replaces {amount} and {ref} tokens in payment method templates
 */
export function paymentMethodParts(
  methodId: string,
  amount: string | number,
  ref: string
): PaymentMethodParts {
  const method = REPLY.paymentMethods.find((m) => m.id === methodId) || REPLY.paymentMethods[0];
  const formattedAmount = typeof amount === 'number' 
    ? `${REPLY.currency.symbol}${amount.toLocaleString()}`
    : amount;

  const opening = method.opening
    .replace(/\{amount\}/g, formattedAmount)
    .replace(/\{ref\}/g, ref);

  const closing = method.closing
    .replace(/\{amount\}/g, formattedAmount)
    .replace(/\{ref\}/g, ref);

  return { opening, closing };
}

/**
 * Returns payment terms as bullet lines for WhatsApp, Plaintext, and UI components
 */
export function paymentTermsLines(ref: string, methodId?: string): string[] {
  const method = methodId 
    ? REPLY.paymentMethods.find((m) => m.id === methodId) 
    : undefined;

  const lines: string[] = [
    `1. Complete payment within ${REPLY.deadlineHours} hours to confirm your allocation.`,
    `2. Use your order reference — ${ref} — on the transfer so our workshop can match funds instantly.`,
  ];

  if (method?.instantRailNote) {
    lines.push(`3. ${method.instantRailNote}`);
  }

  if (REPLY.dispatchLine) {
    lines.push(`4. ${REPLY.dispatchLine}`);
  }

  const waClause = REPLY.channels.whatsapp 
    ? ` or WhatsApp ${REPLY.channels.whatsapp}` 
    : '';
  lines.push(`5. Once transferred, email receipt to ${REPLY.channels.email}${waClause} for immediate PDI priority booking.`);

  return lines;
}

/**
 * Formats payment terms as HTML <ul> for light-theme email bodies
 */
export function paymentTermsHtml(ref: string, methodId?: string): string {
  const lines = paymentTermsLines(ref, methodId);
  const listItems = lines
    .map((line) => `<li style="margin-bottom:8px; line-height:1.5; color:#475569;">${line}</li>`)
    .join('');
  return `<ul style="margin:16px 0; padding-left:20px; font-size:13px; color:#334155;">${listItems}</ul>`;
}

/**
 * Combines template opening, admin-pasted custom account/crypto details, and closing
 */
export function instructionsParts(
  opening: string,
  detail: string,
  closing: string
): string {
  return [opening, detail.trim(), closing].filter(Boolean).join('\n\n');
}
