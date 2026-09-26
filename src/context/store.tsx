'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Cart/compare/toast state, lifted out of the old App.tsx router component into a context so it
 * can be shared between the root layout (Navbar badge, drawers) and whichever page is active —
 * Next.js App Router pages are separate server components, so this can no longer live in one
 * top-level component the way it did in the Vite SPA.
 */

import React, { createContext, useCallback, useContext, useState } from 'react';
import { Product, CartItem } from '../types';

interface StoreContextValue {
  cart: CartItem[];
  compareList: Product[];
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  toastMessage: string | null;
  addToBasket: (product: Product, shaft: string) => void;
  updateCartQuantity: (productId: string, shaft: string, quantity: number) => void;
  removeFromCart: (productId: string, shaft: string) => void;
  clearCart: () => void;
  addToCompare: (product: Product) => void;
  removeFromCompare: (product: Product) => void;
  clearCompare: () => void;
  setIsCartOpen: (open: boolean) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  triggerToast: (message: string) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  }, []);

  const addToBasket = useCallback((product: Product, shaft: string) => {
    setCart((prev) => {
      const match = prev.find((item) => item.product.id === product.id && item.selectedShaft === shaft);
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
  }, [triggerToast]);

  const updateCartQuantity = useCallback((productId: string, shaft: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedShaft === shaft ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeFromCart = useCallback((productId: string, shaft: string) => {
    setCart((prev) => {
      const match = prev.find((item) => item.product.id === productId && item.selectedShaft === shaft);
      if (match) triggerToast(`Removed ${match.product.name} from basket.`);
      return prev.filter((item) => !(item.product.id === productId && item.selectedShaft === shaft));
    });
  }, [triggerToast]);

  const clearCart = useCallback(() => setCart([]), []);

  const addToCompare = useCallback((product: Product) => {
    setCompareList((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        triggerToast('Engine is already in specifications comparison list.');
        return prev;
      }
      if (prev.length >= 4) {
        triggerToast('Maximum comparison limit reached (max 4 items side-by-side).');
        return prev;
      }
      triggerToast(`Added ${product.name} to side-by-side technical table.`);
      return [...prev, product];
    });
  }, [triggerToast]);

  const removeFromCompare = useCallback((product: Product) => {
    setCompareList((prev) => prev.filter((p) => p.id !== product.id));
    triggerToast(`Removed ${product.name} from comparison.`);
  }, [triggerToast]);

  const clearCompare = useCallback(() => {
    setCompareList([]);
    triggerToast('Cleared comparison table.');
  }, [triggerToast]);

  return (
    <StoreContext.Provider
      value={{
        cart,
        compareList,
        isCartOpen,
        isMobileMenuOpen,
        toastMessage,
        addToBasket,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        addToCompare,
        removeFromCompare,
        clearCompare,
        setIsCartOpen,
        setIsMobileMenuOpen,
        triggerToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
