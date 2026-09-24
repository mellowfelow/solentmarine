import { Review } from '../types';

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  trustScore: number;
  ratingBreakdown: {
    stars5: number;
    stars4: number;
    stars3: number;
    stars2: number;
    stars1: number;
  };
  categories: {
    id: string;
    label: string;
    count: number;
    avg: number;
  }[];
  belowStandardCount: number; // 90-120 historical below-standard reviews
}

export const TRUSTPILOT_STATS: ReviewStats = {
  totalReviews: 3642,
  averageRating: 4.7,
  trustScore: 4.7,
  belowStandardCount: 104, // accurately reflects the user's 90-120 historical below-standard reviews
  ratingBreakdown: {
    stars5: 3020, // 83%
    stars4: 412,  // 11%
    stars3: 106,  // 3%
    stars2: 58,   // 1.6%
    stars1: 46    // 1.3% (Total 2-star + 1-star = 104)
  },
  categories: [
    { id: 'all', label: 'All Reviews', count: 3642, avg: 4.7 },
    { id: 'delivery', label: 'UK Crated Freight & Delivery', count: 1240, avg: 4.8 },
    { id: 'international', label: 'International & Channel Islands', count: 480, avg: 4.6 },
    { id: 'quality', label: 'Product Quality & Performance', count: 980, avg: 4.9 },
    { id: 'service', label: 'Customer Services & Pre-Sales', count: 620, avg: 4.5 },
    { id: 'post-purchase', label: 'Post-Purchase & PDI Setup', count: 322, avg: 4.7 }
  ]
};

export const FEATURED_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: 'Capt. David MacLeod',
    rating: 5,
    date: '2 days ago',
    title: 'Timber crated freight arrived in Oban in pristine condition',
    comment: 'Ordered a Yamaha F25 EFI for our tender fleet. Heavy-duty timber freight packaging was immaculate with tip-and-tell indicators untampered. Pallet delivery driver with tail-lift placed it directly into our workshop yard. Genuine UK pre-delivery inspection stamped in manual.',
    verified: true,
    category: 'delivery',
    location: 'Oban, Scottish Highlands',
    purchasedItem: 'Yamaha F25 GETL Outboard Motor',
    helpfulCount: 38
  },
  {
    id: 'rev-02',
    author: 'Marc de Vries',
    rating: 5,
    date: '5 days ago',
    title: 'Export to Rotterdam with clean customs & VAT zero-rating',
    comment: 'Exceptional international logistics service from Solent Marine. Export declaration documentation and EUR.1 certificate were completely seamless. Delivered via maritime freight directly to our marina berth in Netherlands within 4 business days.',
    verified: true,
    category: 'international',
    location: 'Rotterdam, Netherlands',
    purchasedItem: 'Suzuki DF60A High-Efficiency Outboard',
    helpfulCount: 29
  },
  {
    id: 'rev-03',
    author: 'Gareth Evans',
    rating: 5,
    date: '1 week ago',
    title: 'Spot on shaft-length advice saved us from a costly blunder',
    comment: 'I was on the verge of buying a standard short shaft for an Orkney 520 with an aux bracket. Solent Marine tech team asked for photos of the transom and recommended the 20" Long shaft with high-thrust prop. Trolls at 1.8 knots with zero cavitation. Outstanding technical knowledge.',
    verified: true,
    category: 'service',
    location: 'Falmouth, Cornwall',
    purchasedItem: 'Tohatsu MFS9.9E Long Shaft',
    helpfulCount: 44
  },
  {
    id: 'rev-04',
    author: 'Henri Levasseur',
    rating: 4,
    date: '2 weeks ago',
    title: 'Great engine, minor delay clearing French customs at Le Havre',
    comment: 'The Honda BF15 is quiet, light on fuel, and starts on the first gentle pull. Delivery to Brittany took 6 days instead of 4 due to standard EU border inspection formalities, but tracking updates from Solent Marine team kept us well informed throughout.',
    verified: true,
    category: 'international',
    location: 'Brest, Brittany, France',
    purchasedItem: 'Honda BF15 SHU Portable Outboard',
    helpfulCount: 16,
    merchantReply: {
      author: 'Solent Marine Export Support',
      date: '2 weeks ago',
      message: 'Merci Henri! We appreciate your patience during the Le Havre clearance window. Enjoy the smooth cruising in Brittany!'
    }
  },
  {
    id: 'rev-05',
    author: 'Sarah Pendelton',
    rating: 5,
    date: '3 weeks ago',
    title: 'Torqeedo Travel 1103 on Lake Windermere is pure silence',
    comment: 'Swapped our old noisy 2-stroke auxiliary for this electric Torqeedo. No fuel smell in the car trunk, battery charges rapidly on 230V mains, and gliding across the lake without fumes is bliss. Customer service helped with the spare battery bag order.',
    verified: true,
    category: 'quality',
    location: 'Windermere, Cumbria',
    purchasedItem: 'Torqeedo Travel 1103 C Electric Motor',
    helpfulCount: 31
  },
  {
    id: 'rev-06',
    author: 'Brian T. Halloway',
    rating: 2,
    date: '1 month ago',
    title: 'Freight carrier missed delivery slot & communication delay',
    comment: 'Ordered during the peak May bank holiday. The freight pallet company failed to show up on the scheduled Wednesday afternoon without calling, which meant taking time off work twice. Engine is great once it arrived on Friday, but initial phone follow up from support was slow.',
    verified: true,
    category: 'delivery',
    location: 'Swansea, South Wales',
    purchasedItem: 'Suzuki DF20AS Fuel Injection Outboard',
    helpfulCount: 24,
    merchantReply: {
      author: 'Operations Director, Solent Marine',
      date: '1 month ago',
      message: 'Brian, we sincerely apologize for the regional courier missed slot during the bank holiday backlog. We have since switched our South Wales pallet partner to a direct dedicated appointment service with 1-hour SMS ETA tracking to prevent this.'
    }
  },
  {
    id: 'rev-07',
    author: 'Robert Sterling',
    rating: 1,
    date: '2 months ago',
    title: 'Misunderstanding over remote control cables inclusion',
    comment: 'I assumed standard steering linkage cables were included in the crate for the DF50. Had to wait 48 hours to order the specific 14ft length after engine arrived. Better clarity on the product page needed for first-time remote riggers.',
    verified: true,
    category: 'post-purchase',
    location: 'Plymouth, Devon',
    purchasedItem: 'Suzuki DF50A Remote Outboard',
    helpfulCount: 19,
    merchantReply: {
      author: 'Solent Rigging Support',
      date: '2 months ago',
      message: 'Robert, thank you for the honest feedback. We completely understood the frustration and have updated our shop rigging builder so steering cable length must be confirmed before checkout, plus dispatched the complimentary Teleflex 14ft harness to get you on the water.'
    }
  },
  {
    id: 'rev-08',
    author: 'Alistair Vance',
    rating: 3,
    date: '2 months ago',
    title: 'Solid product but initial sump oil guide had confusing diagram',
    comment: 'Engine arrived in sturdy crate. 3 stars because the hazardous freight flyer regarding sump oil draining was slightly confusing for a DIYer. Solent Marine technician walked me through the 10W-30 fill volume on WhatsApp video within 15 minutes, which rescued the situation.',
    verified: true,
    category: 'post-purchase',
    location: 'Belfast, Northern Ireland',
    purchasedItem: 'Tohatsu MFS6D Sail Pro',
    helpfulCount: 22,
    merchantReply: {
      author: 'Technical Workshop Team',
      date: '2 months ago',
      message: 'Alistair, glad the video call resolved the sump fill immediately! We have completely redesigned the included bright yellow engine tag with a photo step-by-step.'
    }
  },
  {
    id: 'rev-09',
    author: 'James W. Collins',
    rating: 5,
    date: '2 months ago',
    title: 'Isle of Wight ferry pallet freight delivered on time',
    comment: 'Delivering heavy goods across the Solent to Cowes can be a nightmare with most mainland suppliers. Solent Marine handled the Red Funnel freight booking directly without extra offshore surcharges. Engine arrived on a dry tail-lift pallet.',
    verified: true,
    category: 'delivery',
    location: 'Cowes, Isle of Wight',
    purchasedItem: 'Yamaha F9.9J High Thrust Aux',
    helpfulCount: 27
  },
  {
    id: 'rev-10',
    author: 'Liam O\'Connor',
    rating: 5,
    date: '3 months ago',
    title: 'Commercial fishing standby engine - robust & reliable',
    comment: 'We run a 7m potting boat out of Castletownbere. Bought a Tohatsu 9.9 aux for security. Starts reliably in choppy seas, charges our auxiliary radio batteries, and delivery to Ireland was handled with zero customs headaches. Genuine 7-year warranty backing.',
    verified: true,
    category: 'quality',
    location: 'County Cork, Ireland',
    purchasedItem: 'Tohatsu MFS9.9 High Output',
    helpfulCount: 35
  },
  {
    id: 'rev-11',
    author: 'Simon Bradshaw',
    rating: 4,
    date: '3 months ago',
    title: 'High quality build, good post-purchase setup check',
    comment: 'The Suzuki 2.5 is remarkably light (13.5 kg) for our inflatable dinghy tender. Easy to carry down the slipway. Had a quick query on cold-start choke setting and support answered via live chat in under 2 minutes.',
    verified: true,
    category: 'service',
    location: 'Poole Harbour, Dorset',
    purchasedItem: 'Suzuki DF2.5S Portable Outboard',
    helpfulCount: 18
  },
  {
    id: 'rev-12',
    author: 'Duncan Fraser',
    rating: 5,
    date: '4 months ago',
    title: 'Best price in the UK with prompt warranty registration',
    comment: 'Saved over £350 compared to our local chandlery on a Yamaha F40. Pre-delivery inspection certificate was signed by their master certified marine engineer, and UK 5-year warranty was registered with Yamaha UK before dispatch.',
    verified: true,
    category: 'quality',
    location: 'Inverness, Scotland',
    purchasedItem: 'Yamaha F40 FETL Fuel Injected',
    helpfulCount: 41
  }
];
