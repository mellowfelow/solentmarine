'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, MessageSquareText, LogOut, LayoutDashboard, ArrowLeft } from 'lucide-react';
import { SITE } from '../../config/site';

const LINKS = [
  { href: '/admin/', label: 'Overview', icon: LayoutDashboard, match: (p: string) => p === '/admin' || p === '/admin/' },
  { href: '/admin/orders/', label: 'Orders', icon: ShoppingBag, match: (p: string) => p.startsWith('/admin/orders') || p.startsWith('/admin/send-payment-email') },
  { href: '/admin/enquiries/', label: 'Enquiries', icon: MessageSquareText, match: (p: string) => p.startsWith('/admin/enquiries') || p.startsWith('/admin/reply-enquiry') },
];

interface AdminLayoutProps {
  onLock: () => void;
  children: React.ReactNode;
  onNavigateHome?: () => void;
}

export function AdminLayout({ onLock, children, onNavigateHome }: AdminLayoutProps) {
  const pathname = usePathname() || '/admin/';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">

      {/* Top Admin Navigation Header */}
      <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 h-14 sm:h-16">

            {/* Left: Brand / Title */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold text-xs sm:text-sm">
                SM
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h1 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                    {SITE.shortName}
                  </h1>
                  <span className="hidden lg:inline text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/80 font-semibold shrink-0">
                    Reply Portal v11
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden lg:block">
                  Order & Enquiry Command Center
                </p>
              </div>
            </div>

            {/* Right: Return to Store & Lock */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {onNavigateHome && (
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition hidden sm:flex items-center gap-1.5 border border-slate-700"
                  title="Back to public store"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Public Store</span>
                </button>
              )}

              <button
                type="button"
                onClick={onLock}
                className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 text-xs font-semibold transition flex items-center gap-1.5"
                title="Lock admin session"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Lock Portal</span>
              </button>
            </div>

          </div>

          {/* Main Navigation — real links, real URLs, browser back/forward and bookmarking
              all just work since these are genuine Next.js routes, not tab state. */}
          <nav className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto no-scrollbar mb-3">
            {LINKS.map((l) => {
              const Icon = l.icon;
              const active = l.match(pathname);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`shrink-0 px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                    active
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-950'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{l.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        {children}
      </div>

    </div>
  );
}

export default AdminLayout;
