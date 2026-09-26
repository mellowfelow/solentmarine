/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// src/config/site.ts - Single Source of Truth
export const SITE = {
  name: 'Solent Marine Outboards UK',
  shortName: 'Solent Marine UK',
  tagline: "UK's Premier Outboard Motors, Marine Engines & Rigging Specialists",
  domain: 'solentmarineoutboards.co.uk',
  locale: 'en-GB',
  currency: 'GBP',
  currencySymbol: '£',
  target: 'vercel',
  primaryColor: '#0284c7', // Sky 600
  secondaryColor: '#0f172a', // Slate 900
  gscVerification: 'google-site-verification-solent-marine-uk-2026',
  indexNowKey: 'om-indexnow-solent-marine-key',
  cartKey: 'solent-marine-cart-v1',
};

export const CONTACT = {
  email: 'sales@solentmarineoutboards.co.uk',
  phone: '01983 294400',
  phoneInternational: '+441983294400',
  whatsapp: '+447700900888',
  whatsappDisplay: '07700 900888',
  address: 'Cowes Yacht Haven, High Street, Cowes, Isle of Wight, PO31 7BD, United Kingdom',
  hq: 'Cowes, Isle of Wight, United Kingdom',
  country: 'United Kingdom',
};

export const SHOP = {
  minOrder: 50,
  freeShippingThreshold: 500,
  shippingFee: 25,
  cryptoDiscount: 5, // 5% discount for verified bank/crypto
  paymentMethods: [
    'Direct Bank Transfer (BACS / Faster Payments)',
    'Debit / Credit Card (Visa, Mastercard)',
    'Official Marine Proforma Invoice',
    'Marine Commercial Finance / Hire Purchase'
  ],
};

export const FORMS = {
  provider: 'smtp', // 'smtp' | 'web3forms' | 'resend'
  smtpFrom: 'sales@solentmarineoutboards.co.uk',
  web3formsKey: '',
  resendFrom: 'sales@solentmarineoutboards.co.uk',
  turnstileSiteKey: '',
};

export const REPLY = {
  brand: {
    primary: '#0284c7',
    headerDark: '#0f172a',
  },
  currency: {
    code: 'GBP',
    symbol: '£',
  },
  orderPrefix: 'SM-UK',
  headerTagline: 'Solent Marine Outboards · Cowes Yacht Haven & Southampton Delivery',
  dispatchLine: 'UK Mainland Pallet Express with Pre-Delivery Inspection (PDI) and Oil Filling included.',
  bizNumber: {
    label: 'UK Company No.',
    value: '09842114',
  },
  channels: {
    email: 'sales@solentmarineoutboards.co.uk',
    whatsapp: '+447700900888',
    whatsappCountryCode: '44',
  },
  deadlineHours: 48,
  paymentMethods: [
    {
      id: 'bacs',
      label: 'UK Faster Payments / BACS Transfer',
      opening: 'Please transfer {amount} using reference {ref} to our official UK marine dealership account:',
      closing: 'Account details: Solent Marine Outboards UK Ltd, Sort Code: 20-45-45, Account: 83920194.',
      instantRailNote: 'Faster Payments usually arrive within 10 minutes.',
    },
    {
      id: 'card',
      label: 'Debit / Credit Card Online Payment',
      opening: 'Secure card payment link for {amount} (Ref: {ref}):',
      closing: 'Click the link sent via your invoice email to complete payment via our 3D-Secure portal.',
    },
    {
      id: 'finance',
      label: 'Marine Finance / Monthly Installments',
      opening: 'Your provisional application for {amount} against reference {ref} is logged.',
      closing: 'Our marine finance desk will contact you within 2 hours to finalize 12-60 month paperwork.',
    }
  ],
};

export const CHAT = {
  channels: [
    { type: 'whatsapp', value: '+447700900888', label: 'WhatsApp Marine Helpline' },
    { type: 'phone', value: '01983 294400', label: 'Cowes Yard Desk' },
    { type: 'email', value: 'sales@solentmarineoutboards.co.uk', label: 'Sales & Rigging Desk' }
  ],
};

export const BRAND = {
  foundingYear: '2011',
  foundingLocation: 'Cowes, Isle of Wight, United Kingdom',
  description: 'Solent Marine Outboards UK is a trusted British marine engine dealer and service center, supplying brand-new Yamaha, Suzuki, Honda, Mercury and Tohatsu petrol outboards alongside ePropulsion, Torqeedo, TEMO, Haswing, Minn Kota and Blade Electric electric propulsion, with nationwide UK delivery and certified PDI inspection.',
  milestones: [
    { year: '2011', event: 'Established at Cowes Yacht Haven servicing Solent yacht tenders and safety craft.' },
    { year: '2016', event: 'Appointed authorized main dealer for Yamaha Marine and Suzuki Outboards UK.' },
    { year: '2020', event: 'Launched UK nationwide tracked pallet delivery with certified Pre-Delivery Inspection (PDI).' },
    { year: '2024', event: 'Expanded dedicated E-Outboard electric marine propulsion division (Torqeedo & ePropulsion).' }
  ],
  differentiation: [
    'Every engine undergoes full Pre-Delivery Inspection (PDI) with test tank run before dispatch',
    'Authorized official UK dealer warranties (up to 5 years manufacturer backed coverage on Yamaha, Suzuki, Honda, Mercury and Tohatsu)',
    'Dedicated electric propulsion range from ePropulsion, Torqeedo, TEMO, Haswing, Minn Kota and Blade Electric',
    'Specialist technical advice from certified RYA marine engineers and rigging technicians',
    'Free UK Mainland pallet delivery on all outboards 2.5HP to 400HP+'
  ],
  sameAs: [
    'https://www.facebook.com/solentmarineuk',
    'https://www.youtube.com/@solentmarineuk',
    'https://www.instagram.com/solentmarineoutboards'
  ],
  awards: [
    'South Coast Marine Dealer Customer Excellence 2023',
    'British Marine Federation Member #BM-49021'
  ]
};

export const CATEGORIES = [
  {
    slug: 'portable',
    name: 'Portable Outboards (2.5HP - 6HP)',
    description: 'Lightweight, single-cylinder 4-stroke petrol engines ideal for dinghies, inflatables, and yacht tenders.',
    image: '/images/placeholders/portable.svg'
  },
  {
    slug: 'mid-range',
    name: 'Mid-Range Outboards (8HP - 40HP)',
    description: 'Twin-cylinder and EFI engines offering the balance of torque, fuel economy, and power for RIBs, fishing vessels, and dayboats.',
    image: '/images/placeholders/mid-range.svg'
  },
  {
    slug: 'high-horsepower',
    name: 'High-Power Outboards (50HP - 400HP+)',
    description: 'Advanced multi-valve engines with electronic fuel injection, drive-by-wire, and high-thrust gearcases for offshore and commercial craft.',
    image: '/images/placeholders/high-horsepower.svg'
  },
  {
    slug: 'electric',
    name: 'Electric & Eco Outboards',
    description: 'Zero-emission electric outboards, pod drives, and trolling motors from ePropulsion, Torqeedo, TEMO, Haswing, Minn Kota and Blade Electric.',
    image: '/images/placeholders/electric.svg'
  },
  {
    slug: 'parts',
    name: 'Genuine Oils, Rigging & Spares',
    description: 'Manufacturer-approved engine oils, batteries, chargers, service kits, propellers and rigging hardware to maintain your warranty.',
    image: '/images/placeholders/parts.svg'
  }
];

export const FAQ = [
  {
    question: 'What is included in the Pre-Delivery Inspection (PDI)?',
    answer: 'Every outboard motor purchased from Solent Marine UK is unboxed, inspected, filled with genuine manufacturer engine oil, and test-run in our certified marine tank prior to secure pallet dispatch. This ensures the motor starts instantly on arrival and your manufacturer warranty is officially activated.'
  },
  {
    question: 'How do I choose between a Short (S) and Long (L) shaft length?',
    answer: 'Measure your boat transom height vertically from the top edge to the bottom of the keel: 15 inches (38cm) requires a Short Shaft (S); 20 inches (51cm) requires a Long Shaft (L); 25 inches (63cm) requires an Extra Long Shaft (X). Our technicians are available to verify your boat model.'
  },
  {
    question: 'How are outboard motors delivered across the UK?',
    answer: 'Portable engines (2.5HP - 6HP) arrive via tracked express courier in reinforced packaging. Mid-range and high-power engines (9.9HP+) are strapped to custom timber pallets and delivered via tail-lift transport with booked delivery slots across England, Wales, Scotland, and offshore islands.'
  },
  {
    question: 'Can I purchase an engine using monthly marine finance?',
    answer: 'Yes, we partner with leading UK marine lenders offering flexible finance packages spanning 12 to 60 months with competitive APR rates. Use our interactive finance calculator on any product page or contact our finance team.'
  },
  {
    question: 'What are the rules regarding 2-stroke outboard motors in the UK?',
    answer: 'Under UK Recreational Craft Regulations (RCD II), carburetted 2-stroke outboards can only be purchased for registered commercial fishing, harbor workboats, rescue services, or closed-course powerboat racing. Recreational users should select clean 4-Stroke or Electric alternatives.'
  }
];

export const COMPLIANCE = {
  bannedTerms: [],
  requiredFramings: ['UK RCD II compliant', 'Official UK Manufacturer Warranty', 'Certified Pre-Delivery Inspection (PDI)'],
  prohibitedClaims: ['unlicensed 2-stroke for leisure use'],
  ageGate: false,
  ageMinimum: null,
  gdpr: true,
  disclaimer: 'All outboard engines sold comply with UK Recreational Craft Regulations 2017 (RCD II). Specifications, prices, and availability are subject to verification.',
};
