/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Truck, CheckCircle, MessageCircle, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { CONTACT, SHOP, REPLY } from '../config/site';
import CopyField from './CopyField';

interface BasketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, selectedShaft: string, quantity: number) => void;
  onRemoveItem: (productId: string, selectedShaft: string) => void;
  onClearCart: () => void;
}

export default function BasketDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: BasketDrawerProps) {
  const [shippingOption, setShippingOption] = useState<'mainland' | 'highlands' | 'collection'>('mainland');
  const [checkoutStep, setCheckoutStep] = useState<'basket' | 'details' | 'success'>('basket');
  const [checkoutChannel, setCheckoutChannel] = useState<'whatsapp' | 'email'>('whatsapp');
  const [orderRef, setOrderRef] = useState('SM-84920');

  // Checkout Form Details
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [notes, setNotes] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Pricing calculations
  const itemsSubtotal = cart.reduce((acc, item) => acc + (item.product.priceGbp * item.quantity), 0);

  // UK Standard Mainland Delivery: FREE over £1,500, else £45. Islands/Highlands: £125. Collection: Free.
  let shippingCost = 0;
  if (shippingOption === 'mainland') {
    shippingCost = itemsSubtotal >= SHOP.freeShippingThreshold ? 0 : SHOP.shippingFee;
  } else if (shippingOption === 'highlands') {
    shippingCost = 125;
  } else {
    shippingCost = 0; // Isle of Wight Marina Collection
  }

  const grandTotal = itemsSubtotal + shippingCost;
  const vatAmount = parseFloat((grandTotal * (20 / 120)).toFixed(2)); // UK 20% VAT breakdown

  const generateOrderReference = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `${REPLY.orderPrefix}-${randomNum}`;
  };

  const handleStartCheckout = (channel: 'whatsapp' | 'email') => {
    setCheckoutChannel(channel);
    const newRef = generateOrderReference();
    setOrderRef(newRef);
    setCheckoutStep('details');
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError(null);

    if (checkoutChannel === 'whatsapp') {
      const itemsList = cart.map(item => `• ${item.quantity}x ${item.product.name} (${item.selectedShaft}) - £${(item.product.priceGbp * item.quantity).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`).join('\n');
      const text = `*SOLENT MARINE OUTBOARDS ORDER RESERVATION*\n\n*Order Ref:* ${orderRef}\n*Customer:* ${fullname}\n*Phone:* ${phone}\n*Email:* ${email}\n*Delivery Address:* ${address}, ${city}, ${postcode}\n*Logistics Method:* ${shippingOption.toUpperCase()}\n\n*Selected Engines & Accessories:*\n${itemsList}\n\n*Subtotal:* £${itemsSubtotal.toLocaleString()}\n*Shipping:* £${shippingCost.toLocaleString()}\n*Grand Total (inc. 20% UK VAT):* £${grandTotal.toLocaleString()}\n\n*Notes:* ${notes || 'None'}\n\nPlease confirm stock reservation, PDI timetable, and send BACS/Bank payment details.`;

      const waUrl = `https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${encodeURIComponent(text)}`;
      // Window open synchronously (must happen before the await below, or popup blockers kill it)
      window.open(waUrl, '_blank');
    }

    setIsPlacingOrder(true);
    try {
      const res = await fetch('/api/order/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderRef,
          channel: checkoutChannel,
          customerName: fullname,
          customerEmail: email,
          customerPhone: phone,
          deliveryAddress: `${address}, ${city}, ${postcode}`,
          deliveryMethod: shippingOption,
          notes,
          items: cart.map((item) => ({
            name: item.product.name,
            quantity: item.quantity,
            shaft: item.selectedShaft,
            price: item.product.priceGbp
          })),
          subtotal: itemsSubtotal,
          shipping: shippingCost,
          total: grandTotal
        })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Failed to save order.');
      }
    } catch (err: any) {
      setOrderError(err?.message || 'Order could not be saved, but your reservation message was sent. Our team will still follow up — please also call us to confirm.');
    } finally {
      setIsPlacingOrder(false);
    }

    setCheckoutStep('success');
  };

  const resetAllBasketFlow = () => {
    onClearCart();
    setCheckoutStep('basket');
    onClose();
  };

  return (
    <div id="basket-sidebar-backdrop" className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
      <div 
        id="basket-sidebar-content"
        className="bg-white w-full max-w-lg h-full flex flex-col justify-between shadow-2xl border-l border-slate-200 py-6 px-4 sm:px-6 overflow-y-auto animate-slide-left font-sans text-xs sm:text-sm text-slate-800"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-sky-600" />
            <h2 className="font-sans font-extrabold text-slate-900 text-lg">Your Boating Basket</h2>
          </div>
          <button
            type="button"
            id="close-basket-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"
            aria-label="Close basket"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic step rendering */}
        {checkoutStep === 'basket' && (
          <div className="flex-1 flex flex-col justify-between overflow-y-auto pt-4">
            {/* Cart list */}
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-3.5 text-slate-400 py-16">
                <ShoppingBag className="w-12 h-12 text-slate-200" />
                <p className="font-medium text-slate-500">Your basket is empty of outboard engines.</p>
                <p className="text-xs text-center px-4">Browse our Suzuki, Yamaha, Honda, Tohatsu, and Torqeedo catalog to locate suitable power specs.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3 divide-y divide-slate-100">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.selectedShaft}`} className="pt-3 flex gap-3.5 items-start">
                      <div className="w-16 h-16 rounded-lg bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-1">
                        <img
                          src={item.product.imageUrl || item.product.images?.[0] || ''}
                          alt={item.product.name}
                          className="max-h-full max-w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">{item.product.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                          <span className="font-medium text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
                            {item.selectedShaft} Shaft
                          </span>
                          <span>{item.product.powerHp} HP</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedShaft, Math.max(1, item.quantity - 1))}
                              className="px-2 py-1 hover:bg-slate-200 text-slate-700 font-bold transition"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="px-2.5 text-xs font-semibold">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedShaft, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-slate-200 text-slate-700 font-bold transition"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-slate-900 text-sm">
                              £{(item.product.priceGbp * item.quantity).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.product.id, item.selectedShaft)}
                              className="text-slate-400 hover:text-red-600 transition p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Option Selector */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2.5">
                  <span className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    UK Pallet Delivery & Collection:
                  </span>
                  <div className="grid grid-cols-1 gap-1.5 text-xs">
                    <label className="flex items-center justify-between p-2 rounded-lg border border-slate-200 bg-white cursor-pointer hover:border-sky-300">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingOption === 'mainland'}
                          onChange={() => setShippingOption('mainland')}
                          className="text-sky-600 focus:ring-sky-500"
                        />
                        <span className="font-medium text-slate-800">UK Mainland Tail-Lift Pallet</span>
                      </div>
                      <span className="font-bold text-slate-900">
                        {itemsSubtotal >= SHOP.freeShippingThreshold ? 'FREE' : `£${SHOP.shippingFee}`}
                      </span>
                    </label>

                    <label className="flex items-center justify-between p-2 rounded-lg border border-slate-200 bg-white cursor-pointer hover:border-sky-300">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingOption === 'collection'}
                          onChange={() => setShippingOption('collection')}
                          className="text-sky-600 focus:ring-sky-500"
                        />
                        <span className="font-medium text-slate-800">Cowes Marina Collection (IoW)</span>
                      </div>
                      <span className="font-bold text-emerald-600">FREE</span>
                    </label>

                    <label className="flex items-center justify-between p-2 rounded-lg border border-slate-200 bg-white cursor-pointer hover:border-sky-300">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingOption === 'highlands'}
                          onChange={() => setShippingOption('highlands')}
                          className="text-sky-600 focus:ring-sky-500"
                        />
                        <span className="font-medium text-slate-800">Scottish Highlands & UK Offshore Islands</span>
                      </div>
                      <span className="font-bold text-slate-900">£125</span>
                    </label>
                  </div>
                </div>

                {/* Free Delivery Tracker */}
                {itemsSubtotal < SHOP.freeShippingThreshold && shippingOption === 'mainland' && (
                  <div className="p-2.5 bg-sky-50 border border-sky-200 rounded-lg text-sky-900 text-xs flex items-center gap-2">
                    <Truck className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Add <strong>£{(SHOP.freeShippingThreshold - itemsSubtotal).toLocaleString()}</strong> more to qualify for <strong>FREE Mainland Pallet Delivery</strong>!</span>
                  </div>
                )}
              </div>
            )}

            {/* Footer calculations & checkout actions */}
            {cart.length > 0 && (
              <div className="border-t border-slate-200 pt-4 space-y-3 mt-4">
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Items Subtotal:</span>
                    <span className="font-medium text-slate-900">£{itemsSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pallet Delivery (Specialist Secure Box):</span>
                    <span className="font-medium text-slate-900">
                      {shippingCost === 0 ? 'FREE' : `£${shippingCost.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Includes 20% UK VAT:</span>
                    <span>£{vatAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-slate-900 border-t border-slate-100 pt-2">
                    <span>Total Payable:</span>
                    <span className="text-base text-sky-600">£{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Dual Direct Checkout Channels */}
                <div className="space-y-2 pt-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Choose how to reserve your order</p>
                  <button
                    type="button"
                    onClick={() => handleStartCheckout('whatsapp')}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-3 px-4 font-bold flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Checkout via WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStartCheckout('email')}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-3 px-4 font-bold flex items-center justify-center gap-2 shadow transition cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Checkout via Email</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step: Details Form */}
        {checkoutStep === 'details' && (
          <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col justify-between overflow-y-auto pt-4 space-y-4">
            <div className="space-y-3">
              <div className="bg-sky-50 border border-sky-200 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-sky-800">Generated Order Ref:</span>
                  <span className="text-xs font-mono font-bold text-sky-950">{orderRef}</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] uppercase font-bold text-sky-800">Total Order:</span>
                  <span className="text-xs font-bold text-sky-950">£{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label htmlFor="chk-fullname" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  id="chk-fullname"
                  required
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="block w-full border border-slate-300 rounded-lg p-2 bg-white text-slate-900 text-xs focus:ring-2 focus:ring-sky-500"
                  placeholder="e.g. Captain Edward Smith"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="chk-phone" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    UK Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="chk-phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full border border-slate-300 rounded-lg p-2 bg-white text-slate-900 text-xs focus:ring-2 focus:ring-sky-500"
                    placeholder="e.g. 07123 456789"
                  />
                </div>
                <div>
                  <label htmlFor="chk-email" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="chk-email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full border border-slate-300 rounded-lg p-2 bg-white text-slate-900 text-xs focus:ring-2 focus:ring-sky-500"
                    placeholder="e.g. marina@boating.co.uk"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="chk-address" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  id="chk-address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="block w-full border border-slate-300 rounded-lg p-2 bg-white text-slate-900 text-xs focus:ring-2 focus:ring-sky-500"
                  placeholder="Street address or marina pontoon number"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="chk-city" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Town / Port / City *
                  </label>
                  <input
                    type="text"
                    id="chk-city"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="block w-full border border-slate-300 rounded-lg p-2 bg-white text-slate-900 text-xs focus:ring-2 focus:ring-sky-500"
                    placeholder="e.g. Lymington, Southampton"
                  />
                </div>
                <div>
                  <label htmlFor="chk-postcode" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    UK Postcode *
                  </label>
                  <input
                    type="text"
                    id="chk-postcode"
                    required
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                    className="block w-full border border-slate-300 rounded-lg p-2 bg-white text-slate-900 text-xs focus:ring-2 focus:ring-sky-500"
                    placeholder="e.g. SO41 9AL"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="chk-notes" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Rigging & Delivery Notes (Optional)
                </label>
                <textarea
                  id="chk-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="block w-full border border-slate-300 rounded-lg p-2 bg-white text-slate-900 text-xs focus:ring-2 focus:ring-sky-500"
                  placeholder="e.g. Tail-lift required, boat model: Zodiac Cadet 310"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-slate-600 text-[11px]">
                <div className="flex items-center gap-1 font-bold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Solent Marine Authorized UK Dealership Protection</span>
                </div>
                <p>
                  Every outboard undergoes full factory PDI (Pre-Delivery Inspection), oil top-up, serial number registration, and is strapped securely inside a reinforced heavy-duty pallet box.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={isPlacingOrder}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl py-3 text-sm font-bold shadow-md transition cursor-pointer"
              >
                {isPlacingOrder
                  ? 'Placing your order...'
                  : checkoutChannel === 'whatsapp'
                    ? 'Confirm & Send to WhatsApp Rigging Desk'
                    : 'Confirm & Email Order Reservation'}
              </button>
              <button
                type="button"
                onClick={() => setCheckoutStep('basket')}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-semibold py-1.5"
              >
                &larr; Return to basket items
              </button>
            </div>
          </form>
        )}

        {/* Step: Checkout Success / Payment Details Receipt */}
        {checkoutStep === 'success' && (
          <div className="flex-1 flex flex-col items-center justify-between text-center py-6 space-y-4 overflow-y-auto">
            <div className="space-y-3 w-full">
              <div className="mx-auto w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-slate-900 text-lg">Order Reserved Successfully</h3>
                <p className="text-slate-500 text-xs">
                  Reference: <span className="font-mono font-bold text-slate-900">{orderRef}</span>
                </p>
                {orderError && (
                  <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 text-[11px] mt-2">{orderError}</p>
                )}
              </div>

              {/* BACS / Bank Transfer Details with Click-To-Copy Fields */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-left space-y-3 w-full">
                <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Official BACS Bank Transfer</span>
                  <span className="text-xs font-bold text-emerald-600 font-mono">£{grandTotal.toLocaleString()}</span>
                </div>

                <div className="space-y-2">
                  <CopyField label="Account Name" value="Solent Marine Outboards Ltd" mono={false} />
                  <CopyField label="Sort Code" value="20-45-45" />
                  <CopyField label="Account Number" value="83920194" />
                  <CopyField label="Payment Reference" value={orderRef} />
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                  Please quote <strong>{orderRef}</strong> on your bank transfer so our Cowes yard can immediately match your payment and release your outboard for courier collection.
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-left text-[11px] text-emerald-900 space-y-1">
                <span className="font-bold block">Need immediate proof or technical assistance?</span>
                <p>Send a screenshot of your BACS transfer to our WhatsApp desk at <strong>{CONTACT.whatsappDisplay}</strong>.</p>
              </div>
            </div>

            <div className="w-full pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={resetAllBasketFlow}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-3 text-xs font-bold transition cursor-pointer"
              >
                Close & Return to Marine Shop
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
