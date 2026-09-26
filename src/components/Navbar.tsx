/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { Menu, X, ShoppingCart, Scale, Phone, Mail, MapPin, Compass, ChevronDown } from 'lucide-react';
import { Product, CartItem } from '../types';
import { CONTACT, CATEGORIES, BRANDS } from '../config/site';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, params?: Record<string, string>) => void;
  cart: CartItem[];
  compareList: Product[];
  onToggleCart: () => void;
  onOpenCompare: () => void;
  onOpenMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export default function Navbar({
  currentView,
  onNavigate,
  cart,
  compareList,
  onToggleCart,
  onOpenCompare,
  onOpenMobileMenu,
  isMobileMenuOpen
}: NavbarProps) {
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [{ label: 'Home', view: 'home' }];
  const navItemsAfterShop = [
    { label: 'Guides', view: 'blog' },
    { label: 'About Us', view: 'about' },
    { label: 'Technical FAQ', view: 'faq' },
    { label: 'Shipping & Delivery', view: 'shipping' },
    { label: 'Contact Us', view: 'contact' }
  ];

  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const shopMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (shopMenuRef.current && !shopMenuRef.current.contains(event.target as Node)) {
        setIsShopOpen(false);
      }
    }
    if (isShopOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isShopOpen]);

  function goToShop(slug?: string) {
    setIsShopOpen(false);
    setIsMobileShopOpen(false);
    if (slug) onNavigate('shop-category', { slug });
    else onNavigate('shop');
  }

  return (
    <header className="w-full bg-slate-900 text-white shadow-md z-40 relative">
      {/* Top Banner - Policy and Trust Anchors */}
      <div className="bg-slate-950 border-b border-slate-800 text-[11px] font-medium font-sans py-2.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-slate-300">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 hover:text-white transition">
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>UK Head Office: 01983 294400 (Isle of Wight Boating Hub)</span>
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>{CONTACT.email}</span>
            </span>
          </div>
          <div className="flex items-center gap-5 font-mono">
            <span className="flex items-center gap-1 bg-sky-950 px-2.5 py-0.5 rounded text-sky-400 border border-sky-900/40">
              <MapPin className="w-3.5 h-3.5" />
              <span>UK Mainland Courier Delivery & Rigging</span>
            </span>
            <span className="text-emerald-400">● Live Stock Feed</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group text-left focus:outline-none"
        >
          <div className="bg-sky-600 p-2.5 rounded-xl text-white group-hover:bg-sky-500 transition shadow-inner">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="font-sans font-extrabold text-white text-lg tracking-tight leading-none uppercase">
              Solent Marine
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-sky-400 font-semibold mt-0.5">
              Outboards UK Ltd
            </div>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                type="button"
                id={`nav-${item.view}`}
                onClick={() => onNavigate(item.view)}
                className={`transition-colors py-2 border-b-2 hover:text-white cursor-pointer ${
                  isActive
                    ? 'text-sky-400 border-sky-400 font-semibold'
                    : 'text-slate-300 border-transparent hover:border-slate-400'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* Shop Motors dropdown */}
          <div ref={shopMenuRef} className="relative">
            <button
              type="button"
              id="nav-shop"
              onClick={() => setIsShopOpen((v) => !v)}
              aria-expanded={isShopOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1 transition-colors py-2 border-b-2 hover:text-white cursor-pointer ${
                currentView === 'shop' || currentView === 'shop-category'
                  ? 'text-sky-400 border-sky-400 font-semibold'
                  : 'text-slate-300 border-transparent hover:border-slate-400'
              }`}
            >
              Shop Motors
              <ChevronDown className={`w-4 h-4 transition-transform ${isShopOpen ? 'rotate-180' : ''}`} />
            </button>

            {isShopOpen && (
              <div
                id="nav-shop-menu"
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[560px] max-w-[90vw] bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 p-5 grid grid-cols-2 gap-6 z-50"
              >
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Shop by Category
                  </p>
                  <button
                    type="button"
                    onClick={() => goToShop()}
                    className="block w-full text-left px-2.5 py-1.5 rounded-md text-sm font-semibold text-sky-600 hover:bg-sky-50 transition mb-1"
                  >
                    All Stock →
                  </button>
                  <ul className="space-y-0.5">
                    {CATEGORIES.map((cat) => (
                      <li key={cat.slug}>
                        <button
                          type="button"
                          onClick={() => goToShop(cat.slug)}
                          className="block w-full text-left px-2.5 py-1.5 rounded-md text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
                        >
                          {cat.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Shop by Brand
                  </p>
                  <ul className="space-y-0.5">
                    {BRANDS.map((brand) => (
                      <li key={brand.slug}>
                        <button
                          type="button"
                          onClick={() => goToShop(brand.slug)}
                          className="block w-full text-left px-2.5 py-1.5 rounded-md text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
                        >
                          {brand.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {navItemsAfterShop.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                type="button"
                id={`nav-${item.view}`}
                onClick={() => onNavigate(item.view)}
                className={`transition-colors py-2 border-b-2 hover:text-white cursor-pointer ${
                  isActive
                    ? 'text-sky-400 border-sky-400 font-semibold'
                    : 'text-slate-300 border-transparent hover:border-slate-400'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Buttons / Tools */}
        <div className="flex items-center gap-4">
          {/* Compare Trigger button */}
          <button
            type="button"
            id="nav-compare-btn"
            onClick={onOpenCompare}
            title="Open Outboard Specifications Comparison Table"
            className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition flex items-center gap-1"
          >
            <Scale className="w-5 h-5" />
            {compareList.length > 0 && (
              <span className="bg-sky-505 bg-sky-600 text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border border-slate-900 animate-pulse">
                {compareList.length}
              </span>
            )}
            <span className="hidden xl:inline text-xs font-semibold">Compare specs</span>
          </button>

          {/* Cart Trigger button */}
          <button
            type="button"
            id="nav-cart-btn"
            onClick={onToggleCart}
            title="Open Shopping Basket"
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition flex items-center gap-1.5 border border-slate-700 hover:border-slate-500"
          >
            <ShoppingCart className="w-5 h-5 text-sky-405" />
            <span className="font-semibold text-sm text-slate-100 hidden sm:inline">Basket</span>
            <span className="bg-amber-500 text-slate-950 font-mono text-xs font-extrabold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            id="nav-mobile-toggle"
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div id="nav-mobile-menu" className="lg:hidden bg-slate-950 border-t border-slate-800 py-4 px-4 space-y-2 absolute top-full left-0 w-full shadow-xl">
          <div className="space-y-1 pb-3 mb-3 border-b border-slate-800">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  type="button"
                  id={`nav-mob-${item.view}`}
                  onClick={() => onNavigate(item.view)}
                  className={`block w-full text-left px-3 py-2.5 rounded-md text-sm font-semibold transition ${
                    isActive
                      ? 'bg-sky-900 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Shop Motors accordion */}
            <div>
              <button
                type="button"
                id="nav-mob-shop"
                onClick={() => setIsMobileShopOpen((v) => !v)}
                aria-expanded={isMobileShopOpen}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold transition ${
                  currentView === 'shop' || currentView === 'shop-category'
                    ? 'bg-sky-900 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                Shop Motors
                <ChevronDown className={`w-4 h-4 transition-transform ${isMobileShopOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMobileShopOpen && (
                <div id="nav-mob-shop-menu" className="mt-1 pl-3 border-l-2 border-slate-800 space-y-3 py-2">
                  <div>
                    <button
                      type="button"
                      onClick={() => goToShop()}
                      className="block w-full text-left px-3 py-1.5 rounded-md text-sm font-semibold text-sky-400 hover:bg-slate-800 transition"
                    >
                      All Stock →
                    </button>
                    <p className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      Categories
                    </p>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.slug}
                        type="button"
                        onClick={() => goToShop(cat.slug)}
                        className="block w-full text-left px-3 py-1.5 rounded-md text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                  <div>
                    <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      Brands
                    </p>
                    {BRANDS.map((brand) => (
                      <button
                        key={brand.slug}
                        type="button"
                        onClick={() => goToShop(brand.slug)}
                        className="block w-full text-left px-3 py-1.5 rounded-md text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition"
                      >
                        {brand.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navItemsAfterShop.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  type="button"
                  id={`nav-mob-${item.view}`}
                  onClick={() => onNavigate(item.view)}
                  className={`block w-full text-left px-3 py-2.5 rounded-md text-sm font-semibold transition ${
                    isActive
                      ? 'bg-sky-900 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile contacts banner */}
          <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-2.5 text-slate-350">
            <p className="font-bold text-sky-400 uppercase tracking-widest text-[10px]">Customer Help lines</p>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-sky-500 shrink-0" />
              <span>01983 294400 (Cowes Office)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-500 shrink-0" />
              <span>{CONTACT.email}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
