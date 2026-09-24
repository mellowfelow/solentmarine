/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../types';

export const OUTBOARD_PRODUCTS: Product[] = [
  // PORTABLE 4-STROKE
  {
    id: 'yamaha-f2-5-bmhs',
    name: 'Yamaha F2.5 BMHS Outboard Motor',
    brand: 'Yamaha',
    slug: 'yamaha-f2-5-bmhs',
    category: ['portable', 'four-stroke'],
    subcategories: ['Tenders', 'Inflatables', 'Auxiliary'],
    powerHp: 2.5,
    engineType: '4-Stroke',
    priceGbp: 849,
    weightKg: 17,
    shaftLengths: ['Short (S) - 15"'],
    starter: 'Manual',
    control: 'Tiller',
    fuelSystem: 'Carburettor',
    stockStatus: 'In Stock',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800', // Book/reading marine manual background representation
    description: 'The ultra-portable Yamaha F2.5 is the perfect helper for tenders, small inflatables, and as a auxiliary sailboat engine. Features an integrated internal fuel tank, 360-degree steering for maximum maneuverability, and a light weight of just 17kg. Fully compliant with UK RCD II emissions regulations for recreational boating.',
    features: [
      '360-degree steering for ultimate close-quarters control',
      'Integrated 0.9L clear-view inspection fuel tank',
      'F-N Shift (Forward & Neutral) with safety tilt-lock',
      'Auxiliary carrying handle and unique oil-leak-free storage positions',
      'Splined propeller shaft for secure torque transfer'
    ],
    applications: ['Inflatable dinghies', 'Yacht tenders', 'Small canoes', 'Auxiliary power on sailing yachts up to 20ft'],
    specs: {
      displacementHex: '72 cc',
      cylinders: '1 Cylinder, OHV',
      fullThrottleRange: '5250-5750 RPM',
      alternatorOutput: 'N/A',
      fuelCapacityLitres: '0.9L (Integrated)',
      propellerIncluded: true,
      noiseDb: '72 dB',
      warrantyYears: 5
    },
    reviews: [
      {
        id: 'r1',
        author: 'David P., Southampton',
        rating: 5,
        date: '2026-04-12',
        title: 'Perfect tender companion',
        comment: 'Fits perfectly on my dinghy transom, exceptionally light, and starts on the first pull every single time. Yamlube oil included from dealership. Brilliant purchase!',
        verified: true
      },
      {
        id: 'r2',
        author: 'Robert T., Windermere',
        rating: 4,
        date: '2026-05-02',
        title: 'Lightweight and steady',
        comment: 'Runs quiet and steady. Integrated fuel tank lasts about 45 mins at half-throttle which is exactly what I need.',
        verified: true
      }
    ]
  },
  {
    id: 'suzuki-df6as',
    name: 'Suzuki DF6AS 4-Stroke Outboard',
    brand: 'Suzuki',
    slug: 'suzuki-df6as',
    category: ['portable', 'four-stroke'],
    subcategories: ['Inflatables', 'Fishing Boats'],
    powerHp: 6,
    engineType: '4-Stroke',
    priceGbp: 1249,
    weightKg: 24,
    shaftLengths: ['Short (S) - 15"', 'Long (L) - 20"'],
    starter: 'Manual',
    control: 'Tiller',
    fuelSystem: 'Carburettor',
    stockStatus: 'In Stock',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&q=80&w=800',
    description: 'The Suzuki DF6AS represents a milestone in lightweight design, weighting just 24kg. Features an innovative offset crankshaft, digital CDI ignition, anti-corrosion protection system, and a unique gravity-feed fuel mechanism that eliminates the need to prime the fuel line after long storage.',
    features: [
      'Offset crankshaft reduces piston side-pressure for high thermal efficiency',
      'Digital CDI ignition delivers hot spark for seamless starting',
      'Built-in 1.0-litre integral petrol tank with dual connection (takes external too)',
      'Suzuki Anti-Corrosion System with multi-layer epoxy coating',
      'Low oil pressure indicator light'
    ],
    applications: ['RIBs', 'Aluminium crabbing boats', 'Dayboats', 'Inflatables up to 3.5m'],
    specs: {
      displacementHex: '138 cc',
      cylinders: '1 Cylinder, OHV',
      fullThrottleRange: '4750-5750 RPM',
      alternatorOutput: '12V 5A (Optional upgrade)',
      fuelCapacityLitres: '1.0L Integrated + External port',
      propellerIncluded: true,
      noiseDb: '75 dB',
      warrantyYears: 6
    },
    reviews: [
      {
        id: 'r3',
        author: 'Arthur M., Falmouth',
        rating: 5,
        date: '2026-03-19',
        title: 'Excellent torque for a 6hp',
        comment: 'Pushes my heavy wooden pram dinghy with absolute ease. The carry handle is wide and very ergonomic.',
        verified: true
      }
    ]
  },
  {
    id: 'honda-bf5-lhu',
    name: 'Honda BF5 LHU Outboard Motor',
    brand: 'Honda',
    slug: 'honda-bf5-lhu',
    category: ['portable', 'four-stroke'],
    subcategories: ['Fishing Boats', 'Auxiliary'],
    powerHp: 5,
    engineType: '4-Stroke',
    priceGbp: 1329,
    weightKg: 27,
    shaftLengths: ['Short (S) - 15"', 'Long (L) - 20"'],
    starter: 'Manual',
    control: 'Tiller',
    fuelSystem: 'Carburettor',
    stockStatus: 'In Stock',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1594498653385-d5272500f1ce?auto=format&fit=crop&q=80&w=800',
    description: 'Honda Marine’s legendary reliability packed into a 5hp block. Featuring the largest displacement in its category and an exceptional charging alternator output, this is the premier option for day sailing yachts requiring battery charging and power under wind-free conditions.',
    features: [
      'Largest displacement in class (127cc) provides deep torque curve',
      'Standard high-output 12V 6A battery charging coil output',
      'Low vibration mount system reduces tiller feedback arm fatigue',
      'Emergency cord stop switch & low oil alert warnings',
      'One-touch decompression mechanism for gentle starting pulls'
    ],
    applications: ['Sailing boats', 'Inflatable tenders', 'River boats'],
    specs: {
      displacementHex: '127 cc',
      cylinders: '1 Cylinder, OHV',
      fullThrottleRange: '4500-5500 RPM',
      alternatorOutput: '12V 6A (Standard on charging models)',
      fuelCapacityLitres: '1.5L Integrated + External connection',
      propellerIncluded: true,
      noiseDb: '70 dB',
      warrantyYears: 6
    },
    reviews: [
      {
        id: 'r4',
        author: 'Clive S., Weymouth',
        rating: 4,
        date: '2026-04-20',
        title: 'Extremely quiet and charges my yacht batteries!',
        comment: 'Mounted on my Hunter 19 as auxiliary power. The alternator output is a game changer for keeping my plotter and cabin lights charged up. A bit heavy, but solid.',
        verified: true
      }
    ]
  },

  // MID-RANGE EFI
  {
    id: 'suzuki-df20as',
    name: 'Suzuki DF20AS EFI Outboard Motor',
    brand: 'Suzuki',
    slug: 'suzuki-df20as',
    category: ['mid-range', 'four-stroke'],
    subcategories: ['RIBs', 'Fishing Boats', 'Workboats'],
    powerHp: 20,
    engineType: '4-Stroke',
    priceGbp: 2995,
    weightKg: 44,
    shaftLengths: ['Short (S) - 15"', 'Long (L) - 20"'],
    starter: 'Manual',
    control: 'Tiller',
    fuelSystem: 'Electronic Fuel Injection (EFI)',
    stockStatus: 'In Stock',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    description: 'This groundbreaking Suzuki contains the world’s first battery-less Electronic Fuel Injection system in the 20hp class. Enjoy quicker start times, smoother throttle feedback, and high fuel economy without a heavy on-board marine battery. Weighs only 44kg—comparable to carburetted models.',
    features: [
      'Battery-less Electronic Fuel Injection (EFI) for ultra-easy manual starting',
      'Suzuki Lean Burn Control system increases fuel efficiency by up to 14%',
      'Dual-stage fresh water flushing ports',
      'Heavy-duty rubber mounting isolates operator from hull vibration',
      'Low oil level / over-rev safety protection parameters'
    ],
    applications: ['Large inflatable RIBs', 'Fast fishing speedboats', 'Workboats', 'River cruisers'],
    specs: {
      displacementHex: '327 cc',
      cylinders: '2 Cylinders, SOHC',
      fullThrottleRange: '5300-6300 RPM',
      alternatorOutput: '12V 12A',
      fuelCapacityLitres: '12L External Marine Tank (Included)',
      propellerIncluded: true,
      noiseDb: '74 dB',
      warrantyYears: 6
    },
    reviews: [
      {
        id: 'r5',
        author: 'Nigel G., Lymington',
        rating: 5,
        date: '2026-03-05',
        title: 'Best 20hp on the market',
        comment: 'Runs wonderfully smooth and fuel consumption is negligible. Starting without a battery is flawless. Suzuki Lean Burn really works.',
        verified: true
      }
    ]
  },
  {
    id: 'yamaha-f15-fmhl',
    name: 'Yamaha F15 FMHL Outboard Motor',
    brand: 'Yamaha',
    slug: 'yamaha-f15-fmhl',
    category: ['mid-range', 'four-stroke'],
    subcategories: ['RIBs', 'Sailing'],
    powerHp: 15,
    engineType: '4-Stroke',
    priceGbp: 2795,
    weightKg: 53,
    shaftLengths: ['Long (L) - 20"'],
    starter: 'Manual',
    control: 'Tiller',
    fuelSystem: 'Carburettor',
    stockStatus: '2-3 Days Delivery',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
    description: 'Yamaha F15 is built for durable performance. Features a robust engine shroud, integrated carry handles, clean water flushing setup, and Yamaha’s PrimeStart system which eliminates cold start issues. It is highly valued as auxiliary power or RIB propulsion.',
    features: [
      'PrimeStart auto-choke system automatically adjusts fuel ratio on cold starts',
      'High-output alternator (12V 10A) with voltage rectifier',
      'Shallow-water drive system allows navigating safely in estuaries',
      'Robust CDI digital ignition with computer control timing',
      'Heavy-duty transom clamp plates'
    ],
    applications: ['Medium RIBs', 'Club safety boats', 'Sailing yacht auxiliary', 'River launches'],
    specs: {
      displacementHex: '362 cc',
      cylinders: '2 Cylinders, SOHC',
      fullThrottleRange: '5000-6000 RPM',
      alternatorOutput: '12V 10A',
      fuelCapacityLitres: '25L External Tank (Included)',
      propellerIncluded: true,
      noiseDb: '72 dB',
      warrantyYears: 5
    },
    reviews: [
      {
        id: 'r6',
        author: 'Sarah V., Cowes',
        rating: 5,
        date: '2026-05-10',
        title: 'Sturdy, quiet and pulls hard',
        comment: 'A reliable workhorse for our yacht club tender. Heavy to lift, but once bolted on, it does not complain.',
        verified: true
      }
    ]
  },

  // HIGH HORSEPOWER
  {
    id: 'yamaha-f100-fetl',
    name: 'Yamaha F100 FETL EFI Outboard',
    brand: 'Yamaha',
    slug: 'yamaha-f100-fetl',
    category: ['high-horsepower', 'four-stroke'],
    subcategories: ['RIBs', 'Speedboats'],
    powerHp: 100,
    engineType: '4-Stroke',
    priceGbp: 9945,
    weightKg: 162,
    shaftLengths: ['Long (L) - 20"', 'Extra Long (X) - 25"'],
    starter: 'Electric',
    control: 'Remote',
    fuelSystem: 'Electronic Fuel Injection (EFI)',
    stockStatus: 'Special Order',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&q=80&w=800',
    description: 'The Yamaha F100 represents high-power efficiency. Using a sophisticated 16-valve, SOHC layout, it offers superior acceleration and quietness. Fully compatible with Yamaha’s digital network gauges (LAN) and includes electronic anti-theft immobiliser system (Y-COP).',
    features: [
      '16-Valve Double Overhead Cam design enhances high-RPM breathing',
      'Yamaha Customer Outboard Protection (Y-COP) electronic engine immobiliser',
      'Variable Trolling RPM adjustment (600 - 1000 RPM) for fishing precision',
      'Optional tilt limit system blocks trailer and hull collision',
      'High-output 35A alternator keeps modern helm electronics fully powered'
    ],
    applications: ['Sea RIBs', 'High-speed speedboats', 'Sports cruisers', 'Commercial harbor patrol boats'],
    specs: {
      displacementHex: '1832 cc',
      cylinders: '4 Cylinders, In-line 16V SOHC',
      fullThrottleRange: '5000-6000 RPM',
      alternatorOutput: '12V 35A with water-cooled regulator',
      fuelCapacityLitres: 'Requires external under-deck fuel tank',
      propellerIncluded: false, // High HP usually selected separately
      noiseDb: '78 dB',
      warrantyYears: 5
    },
    reviews: [
      {
        id: 'r7',
        author: 'Mark W., Plymouth',
        rating: 5,
        date: '2026-02-14',
        title: 'Outstanding performance',
        comment: 'Pushes my 5.8m ocean RIB to 38 knots with absolute poise. Fuel consumption is surprisingly reasonable compared to my old carburetted motor.',
        verified: true
      }
    ]
  },
  {
    id: 'suzuki-df140b',
    name: 'Suzuki DF140B Drive-By-Wire Outboard',
    brand: 'Suzuki',
    slug: 'suzuki-df140b',
    category: ['high-horsepower', 'four-stroke'],
    subcategories: ['RIBs', 'Sports Boats'],
    powerHp: 140,
    engineType: '4-Stroke',
    priceGbp: 12950,
    weightKg: 186,
    shaftLengths: ['Long (L) - 20"', 'Extra Long (X) - 25"'],
    starter: 'Electric',
    control: 'Remote',
    fuelSystem: 'Electronic Fuel Injection (EFI)',
    stockStatus: 'Special Order',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=800',
    description: 'The Suzuki DF140B includes Electronic Precision Control (Drive-By-Wire) for smooth shift and throttle reaction. Features a 10.6:1 compression ratio, streamlined gearcase to minimize hydrodynamic resistance, and an integrated water-detecting fuel filter.',
    features: [
      'Suzuki Precision Control (drive-by-wire shift/throttle) suppresses mechanical cables friction',
      'Extreme 10.6:1 compression ratio yields massive thrust bands',
      'Air-intake resonator dramatically reduces intake acoustic frequencies',
      'Dual water inlets located on high & low areas of the gear housing',
      'Built-in oil-change scheduling reminders'
    ],
    applications: ['Heavy fast fisher cabins', '6+ metre family RIBs', 'Ski boats', 'Patrol craft'],
    specs: {
      displacementHex: '2045 cc',
      cylinders: '4 In-Line DOHC 16V',
      fullThrottleRange: '5600-6200 RPM',
      alternatorOutput: '12V 40A',
      fuelCapacityLitres: 'Requires under-deck vessel tank',
      propellerIncluded: false,
      noiseDb: '76 dB',
      warrantyYears: 6
    },
    reviews: [
      {
        id: 'r8',
        author: 'Geoff L., Poole',
        rating: 5,
        date: '2026-04-30',
        title: 'Instant gear shifting',
        comment: 'Upgraded from direct cable controls to this Fly-By-Wire Suzuki. Shifts into gear are completely silent with zero clunking. Magnificent.',
        verified: true
      }
    ]
  },

  // ELECTRIC OUTBOARD MOTORS
  {
    id: 'torqeedo-travel-1103c',
    name: 'Torqeedo Travel 1103 C Electric Motor',
    brand: 'Torqeedo',
    slug: 'torqeedo-travel-1103c',
    category: ['electric', 'portable'],
    subcategories: ['Tenders', 'Sailing Yachts', 'Eco-Waters'],
    powerHp: 3, // 3hp equivalent
    powerKw: 1.1,
    engineType: 'Electric',
    priceGbp: 2199,
    weightKg: 17.3, // incl. battery
    shaftLengths: ['Short (S) - 24.6"', 'Long (L) - 29.5"'],
    starter: 'Electric',
    control: 'Tiller',
    fuelSystem: 'Battery Direct',
    stockStatus: 'In Stock',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=800',
    description: 'The pinnacle of luxury electric propulsion. Torqeedo Travel 1103 C offers 1,100 watts of high-torque direct-drive motor power, comparable to a 3hp petrol motor. Extremely silent direct-drive, featuring a high-capacity 915 Wh floating lithium battery pack with onboard GPS computer showing remaining range and run-time.',
    features: [
      'Industrial-grade direct drive motor (virtually silent: only 33 dB)',
      'Floating high-performance 915 Wh polymer-lithium-ion battery',
      'Onboard GPS computer with magnetic emergency kill switch key',
      'Real-time remaining range, speed, and wattage intake dashboard screen',
      'Compatible with TorqTrac mobile app and solar panel chargers (not included)'
    ],
    applications: ['Sailing boats up to 1.5 tonnes', 'Ultra-lightweight tenders', 'Canals', 'Whisper-quiet lakes'],
    specs: {
      displacementHex: 'N/A (Direct Drive BLDC)',
      cylinders: 'N/A',
      fullThrottleRange: 'Variable throttle response',
      alternatorOutput: 'Input charging: DC 12-24V / solar capability',
      fuelCapacityLitres: '915 Wh Internal Floating Li-Ion Battery',
      propellerIncluded: true,
      noiseDb: '33 dB',
      warrantyYears: 3
    },
    reviews: [
      {
        id: 'r9',
        author: 'Julian D., Windermere',
        rating: 5,
        date: '2026-04-10',
        title: 'Revolutionary silent sailing',
        comment: 'Bought this because of local combustion restrictions. Absolutely brilliant. You hear nothing but the rush of water. Charges via solar on my trailer yacht.',
        verified: true
      }
    ]
  },
  {
    id: 'epropulsion-spirit-1-plus',
    name: 'ePropulsion Spirit 1.0 Plus Electric',
    brand: 'ePropulsion',
    slug: 'epropulsion-spirit-1-plus',
    category: ['electric', 'portable'],
    subcategories: ['Tenders', 'Eco-Waters'],
    powerHp: 3, // 3hp equivalent
    powerKw: 1.0,
    engineType: 'Electric',
    priceGbp: 1949,
    weightKg: 19.3,
    shaftLengths: ['Extra Short (XS)', 'Short (S) - 24.6"', 'Long (L) - 29.5"'],
    starter: 'Electric',
    control: 'Tiller',
    fuelSystem: 'Battery Direct',
    stockStatus: 'In Stock',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?auto=format&fit=crop&q=80&w=800',
    description: 'The ePropulsion Spirit 1.0 Plus delivers efficient 3hp-equivalent electric power. Outdated cables are avoided with a floating 1276 Wh lithium-iron battery which provides up to 5 hours of continuous runtime at half-throttle operations. Zero fossil fuel emissions, zero oil spills, and minimum maintenance.',
    features: [
      'Huge 1276 Wh battery capacity—largest standard pack in the category',
      'Positive buoyancy battery floats for easy recovery if dropped',
      'Direct-drive brushless motor eliminates gears friction wear',
      'Magnetic safety kill wristband sensor options available',
      'Dual-charging support (home mains AC and solar panel input)'
    ],
    applications: ['Tenders', 'Sailing yacht auxiliary', 'Dinghy racing safety patrol', 'Canal day barges'],
    specs: {
      displacementHex: 'N/A (Field-Oriented Brushless)',
      cylinders: 'N/A',
      fullThrottleRange: 'Step-less digital throttle',
      alternatorOutput: 'N/A',
      fuelCapacityLitres: '1276 Wh Floating Li-Po Battery',
      propellerIncluded: true,
      noiseDb: '55 dB (high load)',
      warrantyYears: 3
    },
    reviews: [
      {
        id: 'r10',
        author: 'Tom S., Norfolk Broads',
        rating: 5,
        date: '2026-05-15',
        title: 'Unbelievable runtime',
        comment: 'We did a three-hour tour around the Broads and used less than 40% of the battery at cruising speed. Highly recommend over noisy petrol units!',
        verified: true
      }
    ]
  },

  // COMMERCIAL DIRECT-INJECTION 2-STROKE
  {
    id: 'tohatsu-m50D2-commercial',
    name: 'Tohatsu M50D2 2-Stroke Outboard (Commercial)',
    brand: 'Tohatsu',
    slug: 'tohatsu-m50D2-commercial',
    category: ['two-stroke', 'mid-range'],
    subcategories: ['Workboats', 'Commercial Fishing'],
    powerHp: 50,
    engineType: '2-Stroke',
    priceGbp: 4350,
    weightKg: 72,
    shaftLengths: ['Long (L) - 20"'],
    starter: 'Manual',
    control: 'Tiller',
    fuelSystem: 'Carburettor',
    stockStatus: 'Special Order',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
    description: 'IMPORTANT UK LEGISLATION NOTE: This carburetted 2-stroke outboard is strictly restricted for professional use, workboats, emergency rescue, and racing configurations under RCD II guidelines. High power-to-weight ratio makes it the ultimate workhorse for rugged fleet operations, high torque, and easy mechanical field repairs.',
    features: [
      'UK Commercial Authorization required for purchase confirmation',
      'High grade marine aluminum alloy construction provides strength',
      'Loop-charged induction supplies smooth power and ultimate fuel economy',
      'Anodized water jacket chambers for durable salt-water defense',
      'Through-the-propeller exhaust directs gasses down into water'
    ],
    applications: ['Professional crabbing boats', 'Offshore work fleets', 'Search and Rescue RIBs'],
    specs: {
      displacementHex: '697 cc',
      cylinders: '3 Cylinders',
      fullThrottleRange: '5150-5850 RPM',
      alternatorOutput: '12V 11A',
      fuelCapacityLitres: '25L External Tank (Included)',
      propellerIncluded: true,
      noiseDb: '84 dB',
      warrantyYears: 2
    },
    reviews: [
      {
        id: 'r11',
        author: 'Alan G., Aberdeen Marine Services',
        rating: 5,
        date: '2026-01-22',
        title: 'Indestructible workhorse',
        comment: 'Perfect for our commercial harbor fleet. Light, high torque, starts instantly and repairs are incredibly cheap. Note that we had to supply our commercial fishing registration to buy.',
        verified: true
      }
    ]
  },

  // TROLLING MOTORS
  {
    id: 'minn-kota-endura-max-55',
    name: 'Minn Kota Endura Max 55 Trolling Motor',
    brand: 'Minn Kota',
    slug: 'minn-kota-endura-max-55',
    category: ['trolling', 'electric'],
    subcategories: ['Fishing Boats', 'Eco-Waters'],
    powerHp: 0.8, // Approx thrust horsepower
    powerKw: 0.6,
    engineType: 'Electric',
    priceGbp: 399,
    weightKg: 11,
    shaftLengths: ['36" Adjustable Composite Shaft'],
    starter: 'Electric',
    control: 'Tiller',
    fuelSystem: 'Battery Direct',
    stockStatus: 'In Stock',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800',
    description: 'The Minn Kota Endura Max 55 features Digital Maximizer technology which optimizes current draw to give you up to 5 times longer runtime on a single charge. Fitted with an ergonomic telescoping tiller, direct-battery power status indicator, and an indestructible composite motor shaft.',
    features: [
      'Digital Maximizer controls battery drain dynamically as speed changes',
      'Telescoping tiller handle extends 6 inches for convenient piloting positions',
      'Indestructible composite shaft guaranteed for life under stresses',
      'Lever-lock transom mounting bracket with quick-release system',
      'Power Prop propeller designed to cut through thick underwater weeds'
    ],
    applications: ['Small fishing dinghies', 'Lake boats', 'Flat water bass fishing'],
    specs: {
      displacementHex: 'N/A (Trolling)',
      cylinders: 'N/A',
      fullThrottleRange: 'Variable throttle ratios',
      alternatorOutput: 'Input 12V DC Deep Cycle battery required',
      fuelCapacityLitres: 'Requires External 12V Deep Cycle Marine Battery',
      propellerIncluded: true,
      noiseDb: '25 dB',
      warrantyYears: 2
    },
    reviews: [
      {
        id: 'r12',
        author: 'Gordon K., Loch Katrine',
        rating: 4,
        date: '2026-04-05',
        title: 'Incredible battery life',
        comment: 'Mounted on my lake angling boat. Pushes beautifully against the wind, and with a 100Ah battery, I can troll for half-days on wind-swept reservoirs.',
        verified: true
      }
    ]
  },

  // PARTS & ACCESSORIES
  {
    id: 'yamlube-4m-10w30-oil',
    name: 'Yamlube 4-Stroke Outboard Motor Oil 4L',
    brand: 'Yamaha',
    slug: 'yamlube-4-stroke-oil-4l',
    category: ['parts'],
    subcategories: ['Maintenance', 'Lubricants'],
    powerHp: 0,
    engineType: '4-Stroke',
    priceGbp: 49,
    weightKg: 3.7,
    shaftLengths: ['N/A'],
    starter: 'Manual',
    control: 'Tiller',
    fuelSystem: 'External Tank',
    stockStatus: 'In Stock',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    description: 'Official Yamlube 10W-30 4M FC-W mineral oil. Formulated specifically to operate under salt-water moisture, high-piston pressures, and low running temperatures characteristic of water-cooled marine outboard configurations. Prevents rust, ring-sticking, and sludge formation.',
    features: [
      'Official NMMA FC-W certification for 4-stroke marine outboards',
      'Advanced anti-rust and anti-wear protection in salt environments',
      'Stops spark plug fouling and hot-carbon ring sticking',
      'Formulated for high cold-start viscosity response'
    ],
    applications: ['ALL four-stroke petrol outboards (Yamaha, Suzuki, Honda, Mercury)'],
    specs: {
      displacementHex: 'N/A',
      cylinders: 'N/A',
      fullThrottleRange: 'N/A',
      alternatorOutput: 'N/A',
      fuelCapacityLitres: 'N/A',
      propellerIncluded: false,
      noiseDb: 'N/A',
      warrantyYears: 1
    },
    reviews: [
      {
        id: 'r13',
        author: 'Harry F., Brixham',
        rating: 5,
        date: '2026-05-18',
        title: 'Essential for warranty protection',
        comment: 'Excellent official oil. Keeps my Yamaha F150 happy and within the terms of my 5-year UK warranty. Do not buy cheap automotive substitutes!',
        verified: true
      }
    ]
  }
];
