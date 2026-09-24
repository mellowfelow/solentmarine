import { SITE, REPLY } from '../config/site';

export interface PaymentMethodParts {
  opening: string;
  closing: string;
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
