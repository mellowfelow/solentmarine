import { redisGet, redisSet, redisDel, redisKeys } from './redis';

export type EnquiryType = 'contact' | 'wholesale' | 'technical';
export type EnquiryStatus = 'new' | 'replied' | 'archived';

export interface StoredEnquiryReply {
  date: string;
  subject: string;
  message: string;
  sender: string;
}

export interface StoredEnquiry {
  id: string; // e.g. ENQ-9281
  type: EnquiryType;
  status: EnquiryStatus;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  vesselModel?: string;
  engineInterest?: string;
  replies?: StoredEnquiryReply[];
}

const LOCAL_STORAGE_KEY = 'solent_marine_reply_enquiries';

const SEED_ENQUIRIES: StoredEnquiry[] = [
  {
    id: 'ENQ-4921',
    type: 'technical',
    status: 'new',
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(), // 25 mins ago
    name: 'Gareth Vance',
    email: 'gareth.vance@foweyharbour.co.uk',
    phone: '07700 900543',
    subject: 'Transom height calculation on Hardy 20 with auxiliary bracket',
    vesselModel: 'Hardy 20 Pilot',
    engineInterest: 'Tohatsu MFS9.9E Sail Pro Long Shaft',
    message: 'We want to mount a 9.9HP Sail Pro as a backup engine alongside our inboard. Transom auxiliary drop is 11 inches. Will the 20" Long shaft be deep enough in a chop or should we opt for the 25" Ultra Long shaft?'
  },
  {
    id: 'ENQ-3810',
    type: 'wholesale',
    status: 'new',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    name: 'Sarah MacGillivray',
    email: 'purchasing@westernislescharters.co.uk',
    phone: '01851 702999',
    company: 'Western Isles Marine Charters Ltd',
    subject: 'Fleet order of 4x Yamaha F25 High Thrust outboards',
    engineInterest: 'Yamaha F25 GETL High Thrust',
    message: 'Requesting trade wholesale discount and delivery schedule to Ullapool harbour for 4 identical units with electric start and remote rigging kits.'
  },
  {
    id: 'ENQ-2944',
    type: 'contact',
    status: 'replied',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), // 1 day ago
    name: 'Oliver Thorne',
    email: 'oliver.thorne@poolemarina.com',
    phone: '07890 334455',
    subject: 'Torqeedo Travel 1103 spare battery availability',
    message: 'Do you have the 915Wh lithium battery pack in stock for same day pickup in Cowes or express dispatch to Poole?',
    replies: [
      {
        date: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
        subject: 'Re: Torqeedo Travel 1103 spare battery availability',
        message: 'Hi Oliver, yes we have 3 units of the Torqeedo 915Wh battery in our Cowes yard ready for immediate collection or next-day courier delivery.',
        sender: 'Solent Marine Support Desk'
      }
    ]
  }
];

function getLocalEnquiries(): StoredEnquiry[] {
  if (typeof window === 'undefined') return SEED_ENQUIRIES;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(SEED_ENQUIRIES));
      return SEED_ENQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_ENQUIRIES;
  }
}

function setLocalEnquiries(enquiries: StoredEnquiry[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(enquiries));
  } catch (e) {
    console.error('Failed saving enquiries to localStorage', e);
  }
}

export async function getStoredEnquiries(): Promise<StoredEnquiry[]> {
  const keys = await redisKeys('enquiry:*');
  if (keys.length > 0) {
    const enquiries: StoredEnquiry[] = [];
    for (const key of keys) {
      const enq = await redisGet<StoredEnquiry>(key);
      if (enq) enquiries.push(enq);
    }
    enquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return enquiries;
  }
  return getLocalEnquiries();
}

export async function getStoredEnquiryById(id: string): Promise<StoredEnquiry | null> {
  const fromRedis = await redisGet<StoredEnquiry>(`enquiry:${id}`);
  if (fromRedis) return fromRedis;
  const local = getLocalEnquiries();
  return local.find((e) => e.id === id) || null;
}

export async function saveStoredEnquiry(enquiry: StoredEnquiry): Promise<void> {
  await redisSet(`enquiry:${enquiry.id}`, enquiry);
  const local = getLocalEnquiries();
  const index = local.findIndex((e) => e.id === enquiry.id);
  if (index >= 0) {
    local[index] = enquiry;
  } else {
    local.unshift(enquiry);
  }
  setLocalEnquiries(local);
}

export async function deleteStoredEnquiry(id: string): Promise<void> {
  await redisDel(`enquiry:${id}`);
  const local = getLocalEnquiries();
  const filtered = local.filter((e) => e.id !== id);
  setLocalEnquiries(filtered);
}

export async function updateStoredEnquiryStatus(
  id: string,
  status: EnquiryStatus,
  newReply?: StoredEnquiryReply
): Promise<StoredEnquiry | null> {
  const enquiry = await getStoredEnquiryById(id);
  if (!enquiry) return null;
  const replies = enquiry.replies ? [...enquiry.replies] : [];
  if (newReply) {
    replies.push(newReply);
  }
  const updated: StoredEnquiry = {
    ...enquiry,
    status,
    replies,
  };
  await saveStoredEnquiry(updated);
  return updated;
}
