/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatHub from './components/ChatHub';
import CompareDrawer from './components/CompareDrawer';
import BasketDrawer from './components/BasketDrawer';
import HomeView from './components/pages/HomeView';
import ShopView from './components/pages/ShopView';
import ProductDetailsView from './components/pages/ProductDetailsView';
import AdminView from './components/pages/AdminView';
import { FAQView, ContactView, AboutView, ShippingView, PrivacyView, TermsView } from './components/pages/StaticViews';
import { OUTBOARD_PRODUCTS } from './data/products';
import { Product, CartItem } from './types';
import { Scale, Check, X } from 'lucide-react';

export default function App() {
  // Navigation / Routing State
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParams, setViewParams] = useState<Record<string, string>>({});

  // E-commerce state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);

  // UI States
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll to top automatically on route swap
  const handleNavigate = (view: string, params: Record<string, string> = {}) => {
    setCurrentView(view);
    setViewParams(params);
    setIsMobileMenuOpen(false);
    
    // Smooth scroll page back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update browser URL cleanly
    if (view === 'home') {
      window.history.pushState({}, '', '/');
    } else if (view === 'product-details' && params.slug) {
      window.history.pushState({}, '', `/product/${params.slug}`);
    } else {
      window.history.pushState({}, '', `/${view}`);
    }
  };

  // Sync back/forward browser arrows
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/' || path === '') {
        setCurrentView('home');
      } else if (path.startsWith('/product/')) {
        const slug = path.replace('/product/', '').replace(/\/$/, '');
        setCurrentView('product-details');
        setViewParams({ slug });
      } else {
        const view = path.replace(/^\//, '').replace(/\/$/, '');
        setCurrentView(view || 'home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Toast message controller
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // E-commerce cart controls
  const handleAddToBasket = (product: Product, shaft: string) => {
    setCart((prev) => {
      const match = prev.find(
        (item) => item.product.id === product.id && item.selectedShaft === shaft
      );
      if (match) {
        triggerToast(`Updated quantity of ${product.name} inside basket.`);
        return prev.map((item) =>
          item.product.id === product.id && item.selectedShaft === shaft
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      triggerToast(`Added ${product.name} to shopping basket.`);
      return [...prev, { product, quantity: 1, selectedShaft: shaft }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, shaft: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedShaft === shaft
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string, shaft: string) => {
    setCart((prev) => {
      const match = prev.find(item => item.product.id === productId && item.selectedShaft === shaft);
      if (match) {
        triggerToast(`Removed ${match.product.name} from basket.`);
      }
      return prev.filter(
        (item) => !(item.product.id === productId && item.selectedShaft === shaft)
      );
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Specification comparison controls
  const handleAddToCompare = (product: Product) => {
    if (compareList.some((p) => p.id === product.id)) {
      triggerToast('Engine is already in specifications comparison list.');
      return;
    }
    if (compareList.length >= 3) {
      triggerToast('Maximum specifications limit reached (Max 3 outboards side-by-side).');
      return;
    }
    setCompareList((prev) => [...prev, product]);
    triggerToast(`Added ${product.name} to side-by-side technical table.`);
  };

  const handleRemoveFromCompare = (product: Product) => {
    setCompareList((prev) => prev.filter((p) => p.id !== product.id));
    triggerToast(`Removed ${product.name} from comparison.`);
  };

  const handleClearCompare = () => {
    setCompareList([]);
    triggerToast('Cleared comparison table.');
  };

  // Render view router helper
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView
            products={OUTBOARD_PRODUCTS}
            onNavigate={handleNavigate}
            onAddToCompare={handleAddToCompare}
            compareList={compareList}
          />
        );
      case 'shop':
        return (
          <ShopView
            products={OUTBOARD_PRODUCTS}
            onNavigate={handleNavigate}
            onAddToCompare={handleAddToCompare}
            compareList={compareList}
            onAddToBasket={handleAddToBasket}
          />
        );
      case 'product-details':
        return (
          <ProductDetailsView
            slug={viewParams.slug || ''}
            products={OUTBOARD_PRODUCTS}
            onNavigate={handleNavigate}
            onAddToCompare={handleAddToCompare}
            compareList={compareList}
            onAddToBasket={handleAddToBasket}
          />
        );
      case 'about':
        return <AboutView onNavigate={handleNavigate} />;
      case 'faq':
        return <FAQView onNavigate={handleNavigate} />;
      case 'shipping':
        return <ShippingView onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactView onNavigate={handleNavigate} />;
      case 'privacy':
        return <PrivacyView />;
      case 'terms':
        return <TermsView />;
      case 'admin':
        return <AdminView onNavigateHome={() => handleNavigate('home')} />;
      default:
        return (
          <HomeView
            products={OUTBOARD_PRODUCTS}
            onNavigate={handleNavigate}
            onAddToCompare={handleAddToCompare}
            compareList={compareList}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-slate-800 antialiased font-sans">
      {/* Top Announcement Ribbon */}
      <AnnouncementBar />

      {/* Main Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        cart={cart}
        compareList={compareList}
        onToggleCart={() => setIsCartOpen(!isCartOpen)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Floating specifications comparison ticker ribbon */}
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
            onClick={handleClearCompare}
            title="Empty comparison tray"
            className="p-1 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
            aria-label="Clear compare tray"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Dynamic Main Body Content Area */}
      <main id="main" className="flex-grow animate-fade-in">
        {renderView()}
      </main>

      {/* Footer Anchor */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Connect & Support Hub */}
      <ChatHub />

      {/* Side Basket Drawer overlay */}
      <BasketDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Side Specs Table Comparison Modal overlay */}
      <CompareDrawer
        isOpen={isCompareOpen}
        compareList={compareList}
        onRemove={handleRemoveFromCompare}
        onClear={handleClearCompare}
        onClose={() => setIsCompareOpen(false)}
      />

      {/* Absolute Dynamic Notification Toast */}
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
