'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CreditCard, ShieldCheck, MessageCircle, Mail, Camera, AlertCircle } from 'lucide-react';
import CopyField from '../CopyField';
import { CONTACT, REPLY } from '../../config/site';
import { waPaymentConfirmationLink } from '../../lib/whatsapp';
import { paymentTermsLines } from '../../lib/order';

interface OrderPaymentDetailsData {
  id: string;
  customerName: string;
  total: number;
  currency: string;
  status: string;
  paymentDetails: {
    methodId: string;
    fields: { label: string; value: string }[];
    opening: string;
    closing: string;
    sentAt: string;
  };
}

export default function OrderPaymentDetailsView() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const [order, setOrder] = useState<OrderPaymentDetailsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setError('No order reference provided.');
      setIsLoading(false);
      return;
    }
    fetch(`/api/order/payment-details/?id=${encodeURIComponent(id)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setOrder(data.order);
        else setError(data.error || 'Payment details not found.');
      })
      .catch(() => setError('Could not load payment details. Please try again or contact us.'))
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <div id="order-payment-details-page" className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center space-y-2 mb-8">
        <div className="w-14 h-14 bg-sky-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <CreditCard className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Payment Details</h1>
        {id && <p className="text-xs font-mono text-slate-500">Order Reference: {id}</p>}
      </div>

      {isLoading && <p className="text-center text-slate-500 text-sm">Loading payment details…</p>}

      {error && !isLoading && (
        <div className="max-w-md mx-auto text-center space-y-3 py-10 border-2 border-dashed border-slate-200 rounded-2xl">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <p className="text-sm text-slate-600 px-6">{error}</p>
          <p className="text-xs text-slate-400">
            Contact us at <a href={`mailto:${CONTACT.email}`} className="text-sky-700 underline">{CONTACT.email}</a> if you believe this is a mistake.
          </p>
        </div>
      )}

      {order && !isLoading && (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 flex justify-between items-center">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">Amount Due</p>
              <p className="text-3xl font-extrabold">
                {REPLY.currency.symbol}{order.total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-sky-950 text-sky-300 px-3 py-1 rounded-full border border-sky-800">
              {order.status.replace('-', ' ')}
            </span>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">{order.paymentDetails.opening}</p>

          <div className="space-y-2">
            {order.paymentDetails.fields.map((f, i) => (
              <CopyField key={i} label={f.label} value={f.value} />
            ))}
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">{order.paymentDetails.closing}</p>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Order Terms
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
              {paymentTermsLines(order.id).map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`/order/confirm-payment/?id=${encodeURIComponent(order.id)}`}
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-3 text-sm font-bold transition"
            >
              <Camera className="w-4 h-4" />
              I've Paid — Upload Confirmation
            </a>
            <a
              href={waPaymentConfirmationLink(order.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 rounded-xl py-3 text-sm font-bold transition"
            >
              <MessageCircle className="w-4 h-4" />
              Confirm via WhatsApp
            </a>
          </div>
          <a
            href={`mailto:${REPLY.channels.email}?subject=${encodeURIComponent(`Question about order ${order.id}`)}`}
            className="flex items-center justify-center gap-2 text-sky-700 hover:text-sky-900 text-xs font-semibold py-2"
          >
            <Mail className="w-3.5 h-3.5" />
            Reply to us instead
          </a>
        </div>
      )}
    </div>
  );
}
