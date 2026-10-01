/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import { Truck, ShieldCheck, Wrench, MessageCircle } from 'lucide-react';
import { CONTACT } from '../config/site';

export default function AnnouncementBar() {
  const announcements = [
    {
      icon: <Truck className="w-4 h-4 text-sky-400 shrink-0" />,
      text: 'Free UK Mainland Pallet Delivery on Outboards over £500',
    },
    {
      icon: <Wrench className="w-4 h-4 text-amber-400 shrink-0" />,
      text: 'Every Engine Includes Full Pre-Delivery Inspection (PDI) & Oil Fill',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />,
      text: 'Official UK Manufacturer Warranties (Up to 5–6 Years Backed)',
    },
    {
      icon: <MessageCircle className="w-4 h-4 text-sky-400 shrink-0" />,
      text: `Live Marine Rigging Consultation on WhatsApp: ${CONTACT.whatsappDisplay}`,
    }
  ];

  // One continuous row, rendered twice back-to-back, translated by exactly -50% — that's
  // the whole trick for a seamless infinite marquee: the moment the first copy has fully
  // scrolled past, the second copy is in the exact position the first one started in, so
  // the loop point is invisible. Always a single line (whitespace-nowrap), never reflows.
  const track = (keyPrefix: string) => (
    <div className="flex items-center shrink-0" aria-hidden={keyPrefix === 'b'}>
      {announcements.map((a, i) => (
        <div key={`${keyPrefix}-${i}`} className="flex items-center gap-2 whitespace-nowrap px-8">
          {a.icon}
          <span className="text-[13px] font-semibold">{a.text}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-slate-950 text-slate-200 border-b border-slate-800/80 py-2.5 text-xs font-medium tracking-wide overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center gap-4 px-4">
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex w-max animate-announcement-marquee motion-reduce:animate-none">
            {track('a')}
            {track('b')}
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400 shrink-0">
          <a
            href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 transition"
          >
            <span>WhatsApp Quick Desk</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
