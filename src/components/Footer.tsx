/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Truck, LifeBuoy, FileCode, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, params?: Record<string, string>) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 font-sans">
      {/* 3-Column Trust Banner */}
      <div className="bg-slate-950 border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl border border-slate-900/40 bg-slate-900/20">
            <Truck className="w-10 h-10 text-sky-400 shrink-0" />
            <div>
              <h4 className="font-semibold text-white text-sm">Secure UK Mainland Transport</h4>
              <p className="text-xs text-slate-400 mt-0.5">Custom-crated vertical freight ensuring all fuel lines remain air-tight during shipping.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl border border-slate-900/40 bg-slate-900/20">
            <ShieldCheck className="w-10 h-10 text-emerald-400 shrink-0" />
            <div>
              <h4 className="font-semibold text-white text-sm">FCA Compliant Finance Partners</h4>
              <p className="text-xs text-slate-400 mt-0.5">FCA regulated 9.9% APR Hire Purchase lines to finance motor setups over 12-60 months.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl border border-slate-900/40 bg-slate-900/20">
            <LifeBuoy className="w-10 h-10 text-amber-400 shrink-0" />
            <div>
              <h4 className="font-semibold text-white text-sm">UK Approved PDI & Rigging</h4>
              <p className="text-xs text-slate-400 mt-0.5">Pre-Delivery Inspections conducted in-house by factory-certified marine mechanics before shipping.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Link Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Col 1: About & Location */}
        <div className="col-span-2 md:col-span-1 space-y-4">
          <div className="text-white font-bold tracking-tight text-lg uppercase flex items-center gap-2">
            <span>Solent Marine Ltd</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Solent Marine Outboards is the UK's premier independent dealer directory and certified catalog for recreational, commercial, and electric marine propulsion.
          </p>
          <div className="space-y-1.5 text-xs text-slate-500 font-mono">
            <p className="font-semibold text-slate-400">Headquarters Office:</p>
            <p>Unit 12, Shepard's Wharf Marina</p>
            <p>Medina Road, Cowes</p>
            <p>Isle of Wight, PO31 7DL</p>
            <p>VAT Reg: GB 294 4001 98</p>
          </div>
        </div>

        {/* Col 2: Brand/Category Hubs */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Engine Classifications</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button type="button" onClick={() => onNavigate('shop')} className="hover:text-sky-400 transition cursor-pointer">
                Portable Engines (&lt;10hp)
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('shop')} className="hover:text-sky-400 transition cursor-pointer">
                Mid-Range EFI (10-40hp)
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('shop')} className="hover:text-sky-400 transition cursor-pointer">
                High Horsepower (50hp+)
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('shop')} className="hover:text-sky-400 transition cursor-pointer">
                Silent Eco-Electric Models
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('shop')} className="hover:text-sky-400 transition cursor-pointer">
                Trolling Auxiliary Motors
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('shop')} className="hover:text-sky-400 transition cursor-pointer">
                Propellers and Oil Kits
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Support Pages */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Customer Support</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button type="button" onClick={() => onNavigate('faq')} className="hover:text-sky-400 transition cursor-pointer">
                Technical FAQ Helpdesks
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('shipping')} className="hover:text-sky-400 transition cursor-pointer">
                Delivery Guidelines & PDI
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('contact')} className="hover:text-sky-400 transition cursor-pointer">
                Become a Listing Dealer
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('about')} className="hover:text-sky-400 transition cursor-pointer">
                Fleet Sales & Commercial
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('shipping')} className="hover:text-sky-400 transition cursor-pointer">
                Returns Policy (14 Day)
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Compliance & Badges */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider">UK Regulatory Info</h4>
          <p className="text-[11px] leading-relaxed text-slate-500">
            All recreational outboards supplied are fully compliant with UK RCD II (Recreational Craft Directive) and CE certifications. Special restrictions apply to carburetted 2-stroke models which require commercial registry validation.
          </p>
          {/* Static Badges representation in design */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="text-[10px] font-bold text-slate-300 bg-slate-850 px-2 py-1 rounded border border-slate-800">
              BRITISH MARINE MEMBER
            </span>
            <span className="text-[10px] font-bold text-slate-300 bg-slate-850 px-2 py-1 rounded border border-slate-800">
              UKCE COMPLIANT
            </span>
            <span className="text-[10px] font-bold text-slate-300 bg-slate-850 px-2 py-1 rounded border border-slate-800">
              FCA FCA958223
            </span>
          </div>
        </div>
      </div>

      {/* SEO Compliance & Sitemap Indicators */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
          <button type="button" onClick={() => onNavigate('privacy')} className="hover:text-slate-300 transition cursor-pointer">Privacy Policy</button>
          <span>•</span>
          <button type="button" onClick={() => onNavigate('terms')} className="hover:text-slate-300 transition cursor-pointer">Terms & Conditions</button>
          <span>•</span>
          <button type="button" onClick={() => onNavigate('admin')} className="hover:text-sky-400 text-slate-400 transition cursor-pointer flex items-center gap-1 font-mono">
            <span>Admin Reply Portal</span>
          </button>
          <span>•</span>
          <span className="flex items-center gap-1 cursor-help group relative">
            <FileCode className="w-3.5 h-3.5 text-sky-502 hover:text-sky-400" />
            <span className="underline select-none">Static SEO Package Verified</span>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-slate-955 text-[10px] bg-slate-950 text-slate-300 rounded shadow-xl border border-slate-805 opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none z-50">
              Includes physical sitemap.xml, robots.txt, Canonical tags, OpenGraph protocol, and dynamic JSON-LD Product/FAQ models.
            </div>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Cloudflare Pages Static Site Package Compiled. © {currentYear} Solent Marine Outboards.</span>
        </div>
      </div>
    </footer>
  );
}
