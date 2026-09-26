'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * The persistent site chrome (announcement bar, nav, footer, chat, drawers, toast) that used to be
 * inlined in App.tsx's render. It now lives in the root layout and wraps whatever page Next.js
 * routes to — `children` is a Server Component subtree, so this is the one place that needs to be
 * a Client Component to hold cart/compare UI state and drive navigation.
 */

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Scale, Check, X } from 'lucide-react';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatHub from './ChatHub';
import CompareDrawer from './CompareDrawer';
import BasketDrawer from './BasketDrawer';
import { useStore } from '../context/store';
import { pathForView, viewForPath } from '../lib/navigate';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    cart,
    compareList,
    isCartOpen,
    isCompareOpen,
    isMobileMenuOpen,
    toastMessage,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    removeFromCompare,
    clearCompare,
    setIsCartOpen,
    setIsCompareOpen,
    setIsMobileMenuOpen
  } = useStore();

  const currentView = viewForPath(pathname || '/');

  const onNavigate = (view: string, params: Record<string, string> = {}) => {
    setIsMobileMenuOpen(false);
    router.push(pathForView(view, params));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-slate-800 antialiased font-sans">
      <AnnouncementBar />

      <Navbar
        currentView={currentView}
        onNavigate={onNavigate}
        cart={cart}
        compareList={compareList}
        onToggleCart={() => setIsCartOpen(!isCartOpen)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {compareList.length > 0 && (
        <div id="floating-compare-trigger" className="fixed bottom-20 left-6 z-40 bg-slate-900 border border-slate-700 text-white p-3 rounded-full shadow-2xl flex items-center gap-3 animate-slide-up select-none">
          <div className="bg-sky-600 p-2 rounded-full">
            <Scale className="w-4 h-4 text-white" />
          </div>
          <div className="text-xs font-sans pr-2">
            <p className="font-bold text-white">Compare {compareList.length}/3 Outboards</p>
            <button
              type="button"
              onClick={() => setIsCompareOpen(true)}
              className="text-[10px] text-sky-400 font-semibold hover:underline block leading-tight text-left cursor-pointer"
            >
              Open specs table &rarr;
            </button>
          </div>
          <button
            type="button"
            onClick={clearCompare}
            title="Empty comparison tray"
            className="p-1 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
            aria-label="Clear compare tray"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <main id="main" className="flex-grow animate-fade-in">
        {children}
      </main>

      <Footer onNavigate={onNavigate} />

      <ChatHub />

      <BasketDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

      <CompareDrawer
        isOpen={isCompareOpen}
        compareList={compareList}
        onRemove={removeFromCompare}
        onClear={clearCompare}
        onClose={() => setIsCompareOpen(false)}
      />

      {toastMessage && (
        <div id="global-action-toast" className="fixed bottom-6 right-20 z-50 bg-slate-950 border border-slate-800 text-slate-100 p-4 rounded-xl shadow-2xl flex items-center gap-3 max-w-sm animate-slide-left border-l-4 border-l-sky-500">
          <div className="bg-sky-950 p-2 rounded-lg text-sky-400">
            <Check className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-white uppercase tracking-wider text-[9px] font-mono select-none">Solent Marine Alert</p>
            <p className="text-slate-300 mt-0.5 leading-snug">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
