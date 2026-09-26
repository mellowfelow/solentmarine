/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MessageCircle, Phone, Mail, X, ChevronUp, Anchor } from 'lucide-react';
import { CONTACT } from '../config/site';
import { waLink } from '../lib/whatsapp';

export default function ChatHub() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="mb-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="bg-sky-600 p-2 rounded-lg text-white">
                <Anchor className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Solent Marine Rigging Desk</h3>
                <p className="text-[11px] text-sky-300 font-medium">Cowes, Isle of Wight Marine Center</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded transition"
              aria-label="Close Chat Hub"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-2.5 bg-slate-50/50">
            <p className="text-xs text-slate-600 leading-relaxed">
              Need technical advice on transom heights, propeller selection, or UK pallet delivery times? Connect directly with our marine engineers:
            </p>

            {/* WhatsApp Link */}
            <a
              href={waLink('I would like advice on an outboard motor.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 hover:bg-emerald-100 transition group"
            >
              <div className="bg-emerald-600 text-white p-2 rounded-lg">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-xs font-bold text-emerald-950">WhatsApp Marine Chat</span>
                <span className="block text-[11px] text-emerald-700">{CONTACT.whatsappDisplay} (Fast Response)</span>
              </div>
            </a>

            {/* Phone Link */}
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-3 p-3 bg-sky-50 border border-sky-200 rounded-xl text-sky-900 hover:bg-sky-100 transition group"
            >
              <div className="bg-sky-600 text-white p-2 rounded-lg">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-xs font-bold text-sky-950">Call Cowes Office</span>
                <span className="block text-[11px] text-sky-700">{CONTACT.phone} (Mon–Fri 8:30–17:30)</span>
              </div>
            </a>

            {/* Email Link (Entity encoded fallback in text) */}
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl text-slate-800 hover:bg-slate-100 transition group"
            >
              <div className="bg-slate-800 text-white p-2 rounded-lg">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-xs font-bold text-slate-900">Email Rigging Desk</span>
                <span className="block text-[11px] text-slate-600 truncate">{CONTACT.email}</span>
              </div>
            </a>
          </div>

          <div className="bg-slate-100 px-4 py-2 border-t border-slate-200 text-[10px] text-slate-500 text-center font-medium">
            Pre-Delivery Inspection (PDI) included with all orders.
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-slate-900 text-white hover:bg-slate-800 rounded-full shadow-2xl border border-slate-700 transition cursor-pointer group focus:outline-none"
        aria-label="Open Marine Support Hub"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse" />
        </div>
        <span className="text-xs font-bold tracking-tight">Need Advice?</span>
        <ChevronUp className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}
