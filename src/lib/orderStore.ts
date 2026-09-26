import { redisGet, redisSet, redisDel, redisKeys } from './redis';
import { REPLY, SITE } from '../config/site';

// The Redis database backing this store may be shared with other unrelated projects/businesses
// (a single Upstash instance connected to multiple Vercel projects) — every key is namespaced by
// site domain so orders here can never collide with, or leak into, another site's admin dashboard.
const REDIS_KEY_PREFIX = `${SITE.domain}:order:`;

export type OrderChannel = 'whatsapp' | 'email';
export type OrderStatus = 'pending' | 'payment-sent' | 'paid' | 'dispatched' | 'cancelled';

export interface StoredOrderItem {
  id?: string;
  name: string;
  quantity: number;
  shaft?: string;
  price: number;
}

export interface StoredOrder {
  id: string; // e.g. SM-UK-849201
  channel: OrderChannel;
  status: OrderStatus;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  deliveryAddress?: string;
  deliveryMethod?: string;
  paymentMethodId: string;
  items: StoredOrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
  notes?: string;
  paymentSentAt?: string;
  /** Parsed fields from the admin's pasted payment blob — re-rendered on the customer's
   * live /order/payment-details/ page so it still shows the same details if they return. */
  paymentDetails?: {
    methodId: string;
    fields: { label: string; value: string }[];
    opening: string;
    closing: string;
    sentAt: string;
  };
  paymentConfirmedAt?: string;
}

const LOCAL_STORAGE_KEY = 'solent_marine_reply_orders';

// Demo initial orders to populate dashboard when first launching
const SEED_ORDERS: StoredOrder[] = [
  {
    id: `${REPLY.orderPrefix}-749201`,
    channel: 'whatsapp',
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    customerName: 'Capt. Alistair MacIntyre',
    customerEmail: 'a.macintyre@highlandmarine.co.uk',
    customerPhone: '+447700900123',
    deliveryAddress: 'Highland Rigging Yard, Oban Marina, PA34 4AG',
    deliveryMethod: 'UK Mainland Crated Pallet with PDI',
    paymentMethodId: 'bacs',
    items: [
      { name: 'Yamaha F25 GETL Outboard Motor', quantity: 1, shaft: 'Long (20")', price: 4320 },
      { name: 'Yamlube 4-Stroke Marine Engine Oil 4L', quantity: 2, price: 38 }
    ],
    subtotal: 4396,
    shipping: 0,
    total: 4396,
    currency: 'GBP',
    notes: 'Please verify transom clamp bolts and provide PDI signoff sheet.'
  },
  {
    id: `${REPLY.orderPrefix}-891042`,
    channel: 'email',
    status: 'payment-sent',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    customerName: 'Jeremy Pemberton',
    customerEmail: 'jeremy.pemberton@solentsailing.org',
    customerPhone: '+447890123456',
    deliveryAddress: 'Lymington Yacht Haven, Slipway Office, SO41 3QD',
    deliveryMethod: 'Express Solent Courier',
    paymentMethodId: 'card',
    items: [
      { name: 'Suzuki DF60A High-Efficiency Outboard', quantity: 1, shaft: 'Long (20")', price: 6850 }
    ],
    subtotal: 6850,
    shipping: 0,
    total: 6850,
    currency: 'GBP',
    paymentSentAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    notes: 'Require invoice addressed to Solent Sailing Trust.'
  },
  {
    id: `${REPLY.orderPrefix}-612948`,
    channel: 'whatsapp',
    status: 'paid',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    customerName: 'Henri de Beaufort',
    customerEmail: 'h.beaufort@maritimerennes.fr',
    customerPhone: '+33612345678',
    deliveryAddress: 'Quai de la Douane, Brest Marina Berth 42, 29200, France',
    deliveryMethod: 'European Maritime Freight (Zero-VAT Export)',
    paymentMethodId: 'bacs',
    items: [
      { name: 'Honda BF15 SHU Portable Outboard', quantity: 1, shaft: 'Short (15")', price: 2940 }
    ],
    subtotal: 2940,
    shipping: 45,
    total: 2985,
    currency: 'GBP',
    notes: 'EUR.1 export certificate requested.'
  }
];

function getLocalOrders(): StoredOrder[] {
  if (typeof window === 'undefined') return SEED_ORDERS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(SEED_ORDERS));
      return SEED_ORDERS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_ORDERS;
  }
}

function setLocalOrders(orders: StoredOrder[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Failed saving to localStorage', e);
  }
}

/**
 * Fetch all stored orders
 */
export async function getStoredOrders(): Promise<StoredOrder[]> {
  const keys = await redisKeys(`${REDIS_KEY_PREFIX}*`);
  if (keys.length > 0) {
    const orders: StoredOrder[] = [];
    for (const key of keys) {
      const ord = await redisGet<StoredOrder>(key);
      if (ord) orders.push(ord);
    }
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return orders;
  }
  return getLocalOrders();
}

/**
 * Fetch single order by ID
 */
export async function getStoredOrderById(id: string): Promise<StoredOrder | null> {
  const fromRedis = await redisGet<StoredOrder>(`${REDIS_KEY_PREFIX}${id}`);
  if (fromRedis) return fromRedis;
  const local = getLocalOrders();
  return local.find((o) => o.id === id) || null;
}

/**
 * Save / Update order
 */
export async function saveStoredOrder(order: StoredOrder): Promise<void> {
  await redisSet(`${REDIS_KEY_PREFIX}${order.id}`, order);
  const local = getLocalOrders();
  const index = local.findIndex((o) => o.id === order.id);
  if (index >= 0) {
    local[index] = order;
  } else {
    local.unshift(order);
  }
  setLocalOrders(local);
}

/**
 * Delete order
 */
export async function deleteStoredOrder(id: string): Promise<void> {
  await redisDel(`${REDIS_KEY_PREFIX}${id}`);
  const local = getLocalOrders();
  const filtered = local.filter((o) => o.id !== id);
  setLocalOrders(filtered);
}

/**
 * Update order status
 */
export async function updateStoredOrderStatus(
  id: string,
  status: OrderStatus,
  extra?: Partial<StoredOrder>
): Promise<StoredOrder | null> {
  const order = await getStoredOrderById(id);
  if (!order) return null;
  const updated: StoredOrder = {
    ...order,
    ...extra,
    status,
  };
  await saveStoredOrder(updated);
  return updated;
}
