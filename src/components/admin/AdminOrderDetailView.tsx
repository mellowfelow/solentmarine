import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Trash2, Mail, MessageCircle, MapPin, Send, CheckCircle2, Package } from 'lucide-react';
import type { StoredOrder, OrderStatus } from '../../lib/orderStore';
import { REPLY } from '../../config/site';

interface AdminOrderDetailViewProps {
  order: StoredOrder;
  onUpdateStatus: (status: OrderStatus) => void;
  onDelete: () => void;
}

export function AdminOrderDetailView({ order, onUpdateStatus, onDelete }: AdminOrderDetailViewProps) {
  return (
    <div className="max-w-3xl space-y-6">
      <Link
        href="/admin/orders/"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-semibold transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to orders
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-mono">{order.id}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-400">
            <span className="font-mono">{new Date(order.createdAt).toLocaleString()}</span>
            <span className="inline-flex items-center gap-1">
              {order.channel === 'whatsapp' ? <MessageCircle className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
              {order.channel}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-xl transition cursor-pointer"
          title="Delete order"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Customer</span>
          <p className="text-white font-bold">{order.customerName}</p>
          <p className="text-slate-300 text-sm">{order.customerEmail}</p>
          {order.customerPhone && <p className="text-slate-400 text-xs mt-0.5">{order.customerPhone}</p>}
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Total Due</span>
          <p className="text-2xl font-black text-white font-mono">{REPLY.currency.symbol}{order.total.toLocaleString()} {order.currency}</p>
        </div>
      </div>

      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Purchased Outboards & Rigging</span>
        <div className="space-y-1.5">
          {order.items.map((it, idx) => (
            <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-sm">
              <div>
                <span className="font-bold text-white block">{it.quantity}x {it.name}</span>
                {it.shaft && <span className="text-[11px] text-slate-400">Shaft: {it.shaft}</span>}
              </div>
              <span className="font-mono font-bold text-slate-200">
                {REPLY.currency.symbol}{(it.price * it.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Delivery & Yard Logistics</span>
        <p className="text-slate-300 text-sm">{order.deliveryMethod || 'UK Mainland Pallet Express with PDI'}</p>
        {order.deliveryAddress && (
          <p className="text-slate-400 text-xs flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" /> {order.deliveryAddress}
          </p>
        )}
      </div>

      {order.notes && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block mb-1">Customer Notes</span>
          <p className="text-slate-300 text-sm">{order.notes}</p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800">
        <Link
          href={`/admin/send-payment-email/?id=${encodeURIComponent(order.id)}`}
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-sky-950/40"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{order.status === 'pending' ? 'Send Payment Details' : 'Resend Payment Details'}</span>
        </Link>
        <button
          type="button"
          onClick={() => onUpdateStatus('paid')}
          className="px-3.5 py-2.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/80 hover:bg-emerald-900 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
        >
          <CheckCircle2 className="w-3.5 h-3.5" /> Mark Paid
        </button>
        <button
          type="button"
          onClick={() => onUpdateStatus('dispatched')}
          className="px-3.5 py-2.5 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800/80 hover:bg-indigo-900 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
        >
          <Package className="w-3.5 h-3.5" /> Mark Dispatched (PDI Complete)
        </button>
      </div>

      {order.status === 'paid' && (
        <p className="text-emerald-400 text-xs">✓ Customer has confirmed payment — check your email for their screenshot.</p>
      )}
    </div>
  );
}

export default AdminOrderDetailView;
