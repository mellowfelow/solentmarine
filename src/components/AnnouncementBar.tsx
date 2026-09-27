/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import { useState, useEffect } from 'react';
import { Truck, ShieldCheck, Wrench, MessageCircle } from 'lucide-react';
import { CONTACT } from '../config/site';

const ROTATE_MS = 4500;

export default function AnnouncementBar() {
  const announcements = [
    {
      icon: <Truck className="w-3.5 h-3.5 text-sky-400 shrink-0" />,
      text: 'Free UK Mainland Pallet Delivery on Outboards over £500',
    },
    {
      icon: <Wrench className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
      text: 'Every Engine Includes Full Pre-Delivery Inspection (PDI) & Oil Fill',
    },
    {
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
      text: 'Official UK Manufacturer Warranties (Up to 5–6 Years Backed)',
    },
    {
      icon: <MessageCircle className="w-3.5 h-3.5 text-sky-400 shrink-0" />,
      text: `Live Marine Rigging Consultation on WhatsApp: ${CONTACT.whatsappDisplay}`,
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <div className="bg-slate-950 text-slate-200 border-b border-slate-800/80 py-2 px-4 text-xs font-medium tracking-wide">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Sliding track — each message is a fixed-height row; the whole track translates
            vertically so the next message genuinely slides up into place rather than
            snapping in, with reduced-motion users getting an instant swap instead. */}
        <div
          className="relative h-4 overflow-hidden mx-auto sm:mx-0 w-full sm:w-auto motion-reduce:h-auto motion-reduce:overflow-visible"
          aria-live="polite"
        >
          <div
            className="transition-transform duration-500 ease-in-out motion-reduce:transition-none"
            style={{ transform: `translateY(-${currentIndex * 1}rem)` }}
          >
            {announcements.map((a, i) => (
              <div
                key={i}
                className="h-4 flex items-center gap-2 justify-center sm:justify-start whitespace-nowrap"
                aria-hidden={i !== currentIndex}
              >
                {a.icon}
                <span className="truncate">{a.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400 shrink-0 pl-4">
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
