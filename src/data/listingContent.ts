/**
 * On-page SEO content for the shop hub, category pages and brand pages. One entry per URL so each
 * page owns a distinct primary keyword (see docs/keyword-map.md v3) and has real buying advice
 * rather than just a product grid.
 */
export interface ListingSection {
  h2: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface ListingContent {
  h1: string;
  metaTitle: string; // without the brand suffix; fitTitle() adds it when it fits
  metaDescription: string;
  intro: string;
  sections: ListingSection[];
  faqs: { q: string; a: string }[];
}

const DELIVERY = 'Orders over £500 ship free to the UK mainland, with a flat £25 charge below that. Every engine goes through our Pre-Delivery Inspection before dispatch.';

export const SHOP_CONTENT: ListingContent = {
  h1: 'Outboard Engines for Sale: Full UK Stock Directory',
  metaTitle: 'Outboard Engines for Sale UK',
  metaDescription: 'Outboard engines for sale in the UK: Yamaha, Suzuki, Honda, Mercury, Tohatsu and electric from Torqeedo and ePropulsion. PDI checked, delivered nationwide.',
  intro: 'Browse every outboard engine, boat motor, electric motor, oil and spare we stock. Filter by brand, power, shaft length and price, or jump straight to the right category below.',
  sections: [
    {
      h2: 'How to choose an outboard engine',
      paragraphs: [
        'Start with the maximum power rating on your boat\'s capacity plate, then pick the shaft length that matches your transom. Power decides how the boat performs; shaft length decides whether the propeller works properly in the water.',
        'For dinghies, tenders and small inflatables, a 2.5HP–6HP portable engine is usually plenty. Larger inflatables, small RIBs and fishing boats tend to suit 8HP–40HP, while offshore boats and bigger RIBs sit in the 50HP+ range. If you want silent, fuel-free running, look at our electric outboards.'
      ],
      bullets: [
        'Under 6HP: tenders, dinghies and auxiliary power. See small outboard motors.',
        '8HP–40HP: inflatables, RIBs and day boats. See 10HP–40HP outboards.',
        '50HP and above: offshore boats and workboats. See high-power outboards.',
        'Zero-emission: electric outboards and trolling motors.'
      ]
    },
    {
      h2: 'Every engine is new, inspected and warranted',
      paragraphs: [
        `All engines are supplied new with the UK manufacturer warranty and a Pre-Delivery Inspection: we unbox, check and tank-test each outboard before it leaves our Cowes base. ${DELIVERY}`,
        'Not sure what fits? Message us on WhatsApp or email with your boat make, transom height and intended use and we will recommend an engine before you order.'
      ]
    }
  ],
  faqs: [
    { q: 'Do your outboard engines come with a warranty?', a: 'Yes. Every engine is supplied new with the UK manufacturer warranty, and we complete a Pre-Delivery Inspection with a test run before dispatch.' },
    { q: 'How do I pay?', a: 'We accept UK bank transfer (BACS or Faster Payments). Place your order online and we email payment details, then dispatch once payment clears.' },
    { q: 'What is the minimum order?', a: 'The minimum order is £150. Orders over £500 ship free to the UK mainland; below £500 a flat £25 delivery charge applies.' }
  ]
};

export const CATEGORY_CONTENT: Record<string, ListingContent> = {
  portable: {
    h1: 'Small Outboard Motors for Sale (2.5HP–6HP)',
    metaTitle: 'Small Outboard Motors for Sale (2.5-6HP)',
    metaDescription: 'Small outboard motors for sale: 2.5HP to 6HP four-strokes from Yamaha, Suzuki, Honda, Mercury and Tohatsu for tenders and dinghies. PDI checked, UK delivery.',
    intro: 'Lightweight four-stroke outboards from 2.5HP to 6HP for dinghies, yacht tenders, small inflatables and auxiliary power. All new, PDI checked and delivered across the UK.',
    sections: [
      {
        h2: 'Which small outboard do I need?',
        paragraphs: [
          'Small outboards are chosen by boat weight and hull type rather than length alone. A 2.5HP engine will push a light dinghy or tender at displacement speed, a 5HP or 6HP engine gives a small inflatable enough power to plane with one or two people, and the same engines work as auxiliary power for a sailing yacht.',
          'Always stay within the maximum power on the boat\'s capacity plate. If the plate is missing, ask us and we will help work out a safe rating.'
        ],
        bullets: [
          '2.5HP–3.5HP: light dinghies and yacht tenders, easiest to carry.',
          '4HP–5HP: inflatables and small fishing dinghies, with more flexibility for two people.',
          '6HP: the largest portable class, good for heavier tenders and small planing inflatables.'
        ]
      },
      {
        h2: 'Shaft length matters',
        paragraphs: [
          'Measure from the top of the transom to the bottom of the hull. Around 15 inches (38cm) needs a short shaft, around 20 inches (51cm) a long shaft. Too short and the propeller sucks air; too long and it drags in the water and slows the boat.',
          'Most portable engines here are offered in short and long shaft. See our shaft length guide in the FAQ, or read the small outboard buying guide for a full walk-through.'
        ]
      },
      {
        h2: 'Petrol or electric for a tender?',
        paragraphs: [
          'Four-stroke petrol gives long range and fast refuelling. Electric suits short trips, marinas and anywhere noise or fuel storage is a concern. Compare our electric outboards if you only need a few hours of use at a time.'
        ]
      }
    ],
    faqs: [
      { q: 'What size outboard do I need for a dinghy?', a: 'Most dinghies and tenders need 2.5HP to 5HP. Check the maximum power on the boat\'s capacity plate and never exceed it.' },
      { q: 'Are small outboards four-stroke or two-stroke?', a: 'All the petrol engines we sell are four-stroke. They run on plain unleaded petrol, with no oil to mix into the fuel, and meet UK recreational craft rules.' },
      { q: 'Do small outboards come with oil?', a: 'No. For safe courier delivery they ship without engine oil, so fill the crankcase with the correct four-stroke oil before first use.' },
      { q: 'How much does delivery cost?', a: DELIVERY }
    ]
  },
  'mid-range': {
    h1: '10HP–40HP Outboard Motors for Sale',
    metaTitle: '10-40HP Outboard Motors for Sale',
    metaDescription: 'Boat motors from 8HP to 40HP: 10HP, 15HP, 20HP, 25HP and 30HP outboard motors from Yamaha, Suzuki, Honda, Mercury and Tohatsu. PDI checked, UK delivery.',
    intro: 'Mid-range four-stroke outboards from 8HP to 40HP for larger inflatables, small RIBs, fishing boats and day boats. Every engine is new, PDI checked and warrantied.',
    sections: [
      {
        h2: 'Choosing between 10HP, 15HP, 20HP and 30HP',
        paragraphs: [
          'The right power depends on hull weight, load and how you use the boat. A 10HP boat motor or 15HP outboard suits a larger inflatable or light fishing boat; 20HP to 30HP is the sweet spot for small RIBs and dayboats; 40HP gives a heavier boat the performance to plane quickly with passengers and gear.',
          'Fuel-injected models start easily and are efficient, while simpler engines are easier to service. Check the power limit on the boat before you buy.'
        ],
        bullets: [
          '8HP–15HP: inflatables, small fishing boats and tenders that need more than a portable.',
          '20HP–30HP: small RIBs and dayboats.',
          '40HP: heavier RIBs and cabin boats where speed and load capacity matter.'
        ]
      },
      {
        h2: 'Shaft length, controls and starting',
        paragraphs: [
          'Mid-range engines come with tiller or remote steering, manual or electric start and different shaft lengths depending on the model. Measure your transom (15in short, 20in long, 25in extra long) and check the specification of the model you like, or ask us to confirm before you order.'
        ]
      },
      {
        h2: 'What is included',
        paragraphs: [`Every engine is new with the UK manufacturer warranty and our Pre-Delivery Inspection. ${DELIVERY}`]
      }
    ],
    faqs: [
      { q: 'What boat is a 10HP outboard good for?', a: 'A 10HP outboard suits larger inflatables, small fishing boats and light tenders. Check the boat\'s maximum power rating first.' },
      { q: 'Is a 15HP or 20HP outboard better?', a: '15HP is good for light boats and economy; 20HP gives more reserve for heavier boats or more passengers. Match the choice to the boat\'s weight and rating.' },
      { q: 'Do I need a long shaft or short shaft?', a: 'Measure the transom from top to the bottom of the hull: about 15in for short shaft, 20in for long shaft, 25in for extra long.' },
      { q: 'How much does delivery cost?', a: DELIVERY }
    ]
  },
  used: {
    h1: 'Used Outboard Motors for Sale UK',
    metaTitle: 'Used Outboard Motors for Sale UK',
    metaDescription: 'Used outboard motors for sale in the UK: Yamaha, Suzuki and Mercury four-strokes, each individually priced. Ask us for condition details. UK delivery.',
    intro: 'Used four-stroke outboards from Yamaha, Suzuki and Mercury, each listed individually with its own price. Every engine is a single unit, so when it is sold it comes off the site.',
    sections: [
      {
        h2: 'Buying a used outboard motor',
        paragraphs: [
          'A used outboard can be a sensible way to get on the water for less, particularly for a tender, a small fishing boat or a second engine. The things that matter most are the age and running hours, how it has been stored and serviced, and whether it starts, idles and revs cleanly under load.',
          'Before you order, message us on WhatsApp or email and ask about the specific engine: condition, running hours and service history. We would rather answer every question up front than have you buy blind.'
        ],
        bullets: [
          'Check the engine suits your boat: power rating on the capacity plate and shaft length for your transom.',
          'Ask about running hours, service history and any known faults.',
          'Remember a used engine will not carry a new manufacturer warranty.'
        ]
      },
      {
        h2: 'New or used?',
        paragraphs: [
          'If you want the full UK manufacturer warranty and a Pre-Delivery Inspection, choose from our new outboards. Used stock is individually priced, so the right engine at the right price goes quickly.'
        ]
      },
      {
        h2: 'Delivery',
        paragraphs: ['Used engines are delivered like the rest of our range. Orders over £500 ship free to the UK mainland, with a flat £25 charge below that, and the minimum order is £150.']
      }
    ],
    faqs: [
      { q: 'Do used outboards come with a warranty?', a: 'Used engines are not covered by a new manufacturer warranty. Ask us before you order and we will tell you exactly what is offered with the engine you are looking at.' },
      { q: 'Can I get the running hours and service history?', a: 'Yes. Message us on WhatsApp or email with the engine you are interested in and we will confirm its condition, running hours and service history before you pay.' },
      { q: 'How is a used outboard delivered?', a: 'Used engines are delivered the same way as new ones. Orders over £500 ship free to the UK mainland, with a flat £25 charge below that.' }
    ]
  },
  'high-horsepower': {
    h1: 'High-Power Outboards for Sale (50HP–400HP)',
    metaTitle: 'High Power Outboards for Sale 50-400HP',
    metaDescription: 'High-power outboards for sale from 50HP to 400HP: 60HP, 115HP, 150HP, 200HP and Verado engines from Yamaha, Suzuki, Mercury, Honda and Tohatsu.',
    intro: 'Four-stroke outboards from 50HP to 400HP for offshore boats, larger RIBs, cabin cruisers and commercial craft, supplied new with a Pre-Delivery Inspection and UK warranty.',
    sections: [
      {
        h2: 'Sizing a high-power outboard',
        paragraphs: [
          'At this level, the boat\'s maximum power rating and weight set the limits. 50HP to 90HP suit larger RIBs and cabin boats; 100HP to 150HP are popular on offshore day boats; 200HP and above power big RIBs and centre consoles, often as twin installations.',
          'Larger outboards are heavy, so check transom strength, controls (remote throttle and shift) and the right shaft length before ordering. We can advise on rigging if you give us the boat details.'
        ],
        bullets: [
          '50HP–90HP: larger RIBs, workboats and cabin boats.',
          '100HP–150HP: offshore day boats and fast RIBs.',
          '200HP–400HP: big offshore boats, twin and triple installations.'
        ]
      },
      {
        h2: 'Delivery of heavy engines',
        paragraphs: ['Larger outboards travel on a pallet with tail-lift delivery on a booked slot. ' + DELIVERY]
      }
    ],
    faqs: [
      { q: 'What size outboard does my boat need?', a: 'Use the maximum power on the boat\'s capacity plate as your limit, then choose within it based on weight, load and how you use the boat. Contact us with your boat details for advice.' },
      { q: 'How are heavy outboards delivered?', a: 'Large engines are strapped to a pallet and delivered with tail lift on a booked slot across England, Wales and Scotland.' },
      { q: 'Do high-power engines need special controls?', a: 'Most use remote throttle and shift controls and often a digital or gauge interface. Check the engine specification and your boat\'s existing controls before ordering.' }
    ]
  },
  electric: {
    h1: 'Electric Outboard Motors for Sale UK',
    metaTitle: 'Electric Outboard Motors for Sale UK',
    metaDescription: 'Electric outboard motors for sale in the UK: Torqeedo, ePropulsion, TEMO, Haswing, Minn Kota and Blade Electric. Zero emissions, quiet running, UK delivery.',
    intro: 'Electric outboards and trolling motors for tenders, kayaks, dinghies, sailing yachts and RIBs. Quiet, zero-emission and simple to run: no fuel, no oil and no servicing routine.',
    sections: [
      {
        h2: 'How do electric outboards compare with petrol?',
        paragraphs: [
          'Electric outboards are rated in kilowatts and given a horsepower-equivalent figure so you can compare them with a petrol engine. They deliver strong torque immediately, run almost silently and need no fuel or oil.',
          'Range depends on the battery and how fast you run. At displacement speed an electric outboard can run for hours; flat out the battery empties much faster. Most owners match motor and battery to their typical trip, and carry a spare battery for long days.'
        ],
        bullets: [
          'Tenders and dinghies: compact 0.5kW–1kW motors and integrated batteries.',
          'Sailing auxiliaries and daysailers: 1.6kW–6kW outboards with larger batteries.',
          'RIBs and cabin boats: pod drives and high-power systems from 12kW.',
          'Kayaks and small boats: low-cost trolling motors from Haswing and Minn Kota.'
        ]
      },
      {
        h2: 'Batteries, charging and accessories',
        paragraphs: [
          'Integrated-battery models are the simplest: charge and go. Pod drives and larger motors use separate battery packs. Check the battery capacity and charging time on the data sheet, and see our parts category for spare batteries, bags, chargers and controls.'
        ]
      },
      {
        h2: 'Who should choose electric?',
        paragraphs: [
          'Electric suits short trips, marinas and lakes, sailing tenders, inland waterways, and anywhere petrol engines are restricted. If you cruise long distances at speed, a petrol outboard is still the better choice. Read how electric outboards work before you buy.'
        ]
      }
    ],
    faqs: [
      { q: 'How far will an electric outboard go on one charge?', a: 'It depends on battery size, speed and boat weight. At displacement speed you can expect several hours; at full throttle far less. Tell us your boat and trip and we will give an honest estimate.' },
      { q: 'What is HP equivalent?', a: 'A comparison figure that tells you which petrol outboard an electric motor roughly matches in performance. Electric motors produce full torque from standstill so they often feel stronger than the number.' },
      { q: 'Do electric outboards need servicing?', a: 'Very little. There is no fuel system, oil or spark plugs. Keep the battery charged and rinse the unit after salt water use.' },
      { q: 'Can I use an electric outboard on a RIB?', a: 'Yes. Our range includes pod drives up to 20kW suitable for RIBs and day boats. Check boat weight and required speed.' }
    ]
  },
  parts: {
    h1: 'Outboard Motor Spares, Oils & Accessories UK',
    metaTitle: 'Outboard Motor Spares & Accessories UK',
    metaDescription: 'Outboard motor spares and accessories: Mercury outboard motor spares, Yamaha outboard spares, oils, service kits, impellers, propellers and outboard motor fuel tanks.',
    intro: 'Genuine engine oils, service kits, impellers, spark plugs, outboard motor fuel tanks, propellers and electric propulsion accessories, including Mercury outboard motor spares and Yamaha outboard spares. UK delivery, including regular supply across the Solent.',
    sections: [
      {
        h2: 'Outboard spares, servicing and consumables',
        paragraphs: [
          'Using the manufacturer-approved oil and service parts helps keep your engine reliable and your warranty intact. Our range covers Yamalube, Suzuki ECSTAR and Quicksilver oils, brand service kits, water pump impellers and spark plugs.',
          'We carry Mercury outboard motor spares, Yamaha outboard spares and Suzuki service parts, from impellers and thermostats to spark plugs. Not sure which part fits your engine? Send us the make, model and serial number and we will confirm.'
        ]
      },
      {
        h2: 'Outboard motor fuel tanks, lines and propellers',
        paragraphs: [
          'A good outboard motor fuel tank with a gauge and a primer-bulb fuel line are the most common replacements on small outboards. We also stock aluminium propellers; confirm pitch and diameter against your owner\'s manual before ordering.'
        ]
      },
      {
        h2: 'Electric propulsion accessories',
        paragraphs: [
          'Spare batteries, carry bags, remote throttles, solar charge controllers and smartphone adapters for ePropulsion, Torqeedo and TEMO motors are listed here too. See our electric outboards if you are choosing a motor.'
        ]
      },
      {
        h2: 'Solent delivery',
        paragraphs: ['As well as standard UK mainland delivery we regularly supply parts to customers around the Solent, including Hamble, Hythe, Lymington, Portsmouth and Swanwick.']
      }
    ],
    faqs: [
      { q: 'Will this part fit my outboard?', a: 'Email or WhatsApp us your engine make, model and serial number and we will confirm fit before you order.' },
      { q: 'Which oil should I use in my four-stroke outboard?', a: 'Use the oil grade your engine manufacturer specifies in the owner\'s manual. Branded marine four-stroke oils such as Yamalube, Suzuki ECSTAR and Quicksilver are designed for outboards.' },
      { q: 'How often should I service an outboard?', a: 'Most manufacturers recommend an annual service or every 100 hours, whichever comes first. Check your manual.' }
    ]
  }
};

export const BRAND_CONTENT: Record<string, ListingContent> = {
  yamaha: {
    h1: 'Yamaha Outboards for Sale UK',
    metaTitle: 'Yamaha Outboards for Sale UK',
    metaDescription: 'Yamaha outboards for sale in the UK: F2.5 to F300 four-strokes, authorised Yamaha Marine dealer, PDI checked before dispatch with UK warranty. Buy online.',
    intro: 'New Yamaha outboards from the 2.5HP tender engine to the 300HP offshore V6. We have supplied Yamaha engines as an authorised dealer since 2016, and every engine is PDI checked and covered by the UK manufacturer warranty.',
    sections: [
      {
        h2: 'Choosing your Yamaha outboard',
        paragraphs: [
          'Yamaha four-strokes cover the whole range. Small F2.5 to F6 models suit dinghies and tenders, the F9.9 to F25 class powers inflatables and small fishing boats, and the F40 to F300 range suits RIBs and offshore boats.',
          'Model codes carry useful information: the number is the horsepower, and the letters at the end tell you things like shaft length and controls. If you are not sure which code suits your boat, ask us before you order.'
        ]
      },
      {
        h2: 'Oils, parts and servicing',
        paragraphs: ['We stock Yamalube oil and Yamaha service kits in our parts category so you can service the engine yourself using genuine consumables. For identifying the age of an older Yamaha, read our serial number guide.']
      }
    ],
    faqs: [
      { q: 'Are you an authorised Yamaha dealer?', a: 'Yes. Solent Marine has supplied Yamaha Marine engines as an authorised dealer since 2016.' },
      { q: 'Which Yamaha outboard is best for a small tender?', a: 'The F2.5 to F6 range is designed for dinghies and tenders; choose by boat weight and the capacity plate.' },
      { q: 'Do Yamaha outboards come with oil?', a: 'No, they ship without engine oil. Fill the crankcase with the recommended oil before first use.' }
    ]
  },
  mercury: {
    h1: 'Mercury Outboards for Sale UK',
    metaTitle: 'Mercury Outboards for Sale UK',
    metaDescription: 'Mercury outboards for sale in the UK: FourStroke 3.5HP to Verado 400HP outboard motors, plus Pro XS. PDI checked, UK manufacturer warranty, delivered nationwide.',
    intro: 'New Mercury outboards for sale, from 3.5HP portable FourStroke engines to Pro XS performance units and Verado V10 flagships. Each Mercury outboard motor is new, PDI checked and covered by the UK manufacturer warranty.',
    sections: [
      {
        h2: 'The Mercury outboard range',
        paragraphs: [
          'Mercury covers every kind of boat. FourStroke engines suit tenders, inflatables and fishing boats; Pro XS engines are tuned for performance on RIBs and sport boats; Verado engines power large offshore craft with smooth, quiet running.',
          'Match the engine to the boat\'s power limit, check the shaft length and controls, and remember that the larger engines need pallet delivery.'
        ]
      },
      {
        h2: 'Mercury oils and parts',
        paragraphs: ['Our parts category has Quicksilver oil and Mercury impellers. Older Mercury owners may find our serial number guide useful for identifying model year.']
      }
    ],
    faqs: [
      { q: 'What is the difference between FourStroke, Pro XS and Verado?', a: 'FourStroke is the general-purpose range, Pro XS is the performance-tuned range, and Verado is the premium large-engine range for big offshore boats.' },
      { q: 'Do Mercury outboards have a UK warranty?', a: 'Yes, they are supplied new with the UK manufacturer warranty.' }
    ]
  },
  honda: {
    h1: 'Honda Outboards for Sale UK',
    metaTitle: 'Honda Outboards for Sale UK',
    metaDescription: 'Honda outboards for sale in the UK: BF2.3 to BF100 outboard engines, backed by the UK manufacturer warranty. PDI checked before dispatch with UK delivery.',
    intro: 'New Honda outboards for sale, from the ultra-light BF2.3 to the BF100 outboard engines, known for smooth, dependable running. Supplied new, PDI checked and warrantied.',
    sections: [
      {
        h2: 'Choosing a Honda outboard',
        paragraphs: [
          'Honda\'s small engines are popular as tender and auxiliary power; the BF10 and BF20 suit inflatables and small boats; the BF50 and BF100 power larger RIBs and cruisers. Check shaft length, controls and the power limit on your boat before ordering.',
          'Browse the full list below, or compare with other brands in our 10HP–40HP outboards and small outboard motors categories.'
        ]
      }
    ],
    faqs: [
      { q: 'Do Honda outboards come with a warranty?', a: 'Yes. They are supplied new with the UK manufacturer warranty and our Pre-Delivery Inspection.' },
      { q: 'Which Honda is best for a tender?', a: 'The lightweight small-block engines are designed for dinghies and tenders; choose by boat weight and the capacity plate.' }
    ]
  },
  suzuki: {
    h1: 'Suzuki Outboards for Sale UK',
    metaTitle: 'Suzuki Outboards for Sale UK',
    metaDescription: 'Suzuki outboards for sale in the UK: DF2.5 to DF350A four-strokes, authorised Suzuki dealer, PDI checked before dispatch with UK warranty. Buy online.',
    intro: 'New Suzuki outboards from lightweight DF2.5 portables to the 350HP DF350A flagship. We have been an authorised Suzuki Outboards UK dealer since 2016; every engine is PDI checked and warrantied.',
    sections: [
      {
        h2: 'Choosing your Suzuki outboard',
        paragraphs: [
          'Suzuki\'s DF range includes compact portables, mid-range engines for inflatables and RIBs, and large V6 engines for offshore use. Model numbers show the horsepower; letters tell you about shaft length and controls.',
          'Check the power limit on your boat, the transom height and controls, and ask us if you want help choosing.'
        ]
      },
      {
        h2: 'Suzuki oil and parts',
        paragraphs: ['Our parts category stocks Suzuki ECSTAR oil and service kits so you can service the engine with approved consumables.']
      }
    ],
    faqs: [
      { q: 'Are you an authorised Suzuki dealer?', a: 'Yes. Solent Marine has been an authorised Suzuki Outboards UK dealer since 2016.' },
      { q: 'How do I read a Suzuki outboard model number?', a: 'The number is the horsepower and the letters that follow indicate things like shaft length and controls. Ask us to confirm the exact model for your boat before you order.' }
    ]
  },
  tohatsu: {
    h1: 'Tohatsu Outboards for Sale UK',
    metaTitle: 'Tohatsu Outboards for Sale UK',
    metaDescription: 'Tohatsu outboards for sale in the UK: MFS3.5C to MFS115A four-stroke outboard motors, lightweight and practical. PDI checked, UK manufacturer warranty and delivery.',
    intro: 'New Tohatsu outboards for sale, from the 3.5HP MFS3.5C to the 115HP MFS115A four-stroke, known for good power-to-weight. Every Tohatsu outboard is supplied new, PDI checked and warrantied.',
    sections: [
      {
        h2: 'Why choose a Tohatsu outboard',
        paragraphs: [
          'Tohatsu builds practical, lightweight outboards that are popular with tender, RIB and workboat owners. Choose your Tohatsu outboard by power, shaft length and controls, and check your boat\'s power limit first.',
          'Compare with other brands in our small outboard motors and 10HP–40HP outboards categories.'
        ]
      }
    ],
    faqs: [
      { q: 'Do Tohatsu outboards come with a warranty?', a: 'Yes. Every Tohatsu outboard is supplied new with the UK manufacturer warranty and a Pre-Delivery Inspection.' }
    ]
  },
  epropulsion: {
    h1: 'ePropulsion Electric Outboards for Sale UK',
    metaTitle: 'ePropulsion Outboards for Sale UK',
    metaDescription: 'ePropulsion electric outboards for sale in the UK: eLite, Spirit 1.0, Navy and X pod drives, plus batteries and accessories. Zero-emission power, UK delivery.',
    intro: 'ePropulsion electric outboards, from the compact eLite 0.5kW and Spirit 1.0 to the X20 pod drive, with integrated batteries on the smaller models and spare batteries and accessories available.',
    sections: [
      {
        h2: 'Which ePropulsion outboard suits my boat?',
        paragraphs: [
          'The ePropulsion eLite and Spirit 1.0 ranges suit tenders, dinghies and small sailing yachts, the Navy range suits heavier tenders and daysailers, and the X pod drives power larger boats. Pick by boat weight and the speed and range you want.',
          'Our parts category has spare batteries, bags, remote throttles and solar charge controllers. For a deeper explanation read how electric outboards work.'
        ]
      }
    ],
    faqs: [
      { q: 'Does an ePropulsion outboard include a battery?', a: 'Smaller models such as the eLite and Spirit 1.0 use an integrated battery; larger systems use separate battery packs. Check each product page for details.' }
    ]
  }
};
