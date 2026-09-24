import { SITE, REPLY } from '../config/site';

export interface WhatsAppOrderDetails {
  id: string;
  customerName: string;
  items: Array<{ name: string; quantity: number; shaft?: string; price: number }>;
  total: number;
  deliveryMethod?: string;
  phone?: string;
}

/**
 * Normalises phone numbers (e.g. UK 07xxx or +447xxx) to international format without plus or spaces (e.g. 447700900888)
 */
export function toWhatsAppNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (raw.startsWith('+')) {
    return digits;
  }
  // If UK domestic number starting with 0, replace 0 with country code
  if (digits.startsWith('0') && REPLY.channels.whatsappCountryCode) {
    return `${REPLY.channels.whatsappCountryCode}${digits.slice(1)}`;
  }
  return digits;
}

/**
 * Generates wa.me link with encoded message
 */
export function waLink(number: string, message: string): string {
  const cleanNumber = toWhatsAppNumber(number);
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates pre-filled WhatsApp message for customer order checkout
 */
export function waOrderLink(order: WhatsAppOrderDetails): string {
  const itemsSummary = order.items
    .map((item) => `• ${item.quantity}x ${item.name} (${item.shaft || 'Standard'}) - ${REPLY.currency.symbol}${(item.price * item.quantity).toLocaleString()}`)
    .join('\n');

  const text = [
    `*${SITE.name}* — New Order Request`,
    `Order Ref: *${order.id}*`,
    `Customer: ${order.customerName}`,
    `Delivery: ${order.deliveryMethod || 'UK Mainland Pallet'}`,
    ``,
    `*Items:*`,
    itemsSummary,
    ``,
    `*Total Due:* ${REPLY.currency.symbol}${order.total.toLocaleString()} ${REPLY.currency.code}`,
    ``,
    `Please confirm bank/card payment instructions and PDI inspection schedule.`,
  ].join('\n');

  return waLink(REPLY.channels.whatsapp, text);
}

/**
 * Generates pre-filled WhatsApp payment details message from admin to customer
 */
export function waPaymentDetailsMessage(
  order: WhatsAppOrderDetails,
  paymentDetails: string,
  methodId?: string
): string {
  const method = methodId ? REPLY.paymentMethods.find((m) => m.id === methodId) : undefined;
  
  const text = [
    `*${SITE.name}*`,
    `Official Payment Instructions for Order: *${order.id}*`,
    ``,
    `Hello ${order.customerName},`,
    `Your order for ${REPLY.currency.symbol}${order.total.toLocaleString()} ${REPLY.currency.code} has been provisionally reserved.`,
    ``,
    `*Payment Method:* ${method?.label || 'Direct Bank Transfer'}`,
    `----------------------------------------`,
    paymentDetails.trim(),
    `----------------------------------------`,
    ``,
    `*Important Terms:*`,
    `1. Please complete within ${REPLY.deadlineHours} hours.`,
    `2. Payment Reference: *${order.id}*`,
    method?.instantRailNote ? `3. ${method.instantRailNote}` : '',
    `4. Once paid, please reply with a screenshot for same-day PDI dispatch.`,
  ].filter(Boolean).join('\n');

  const customerPhone = order.phone || REPLY.channels.whatsapp;
  return waLink(customerPhone, text);
}
