import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  MessageSquare, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Trash2, 
  Send, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Package,
  MapPin,
  FileText
} from 'lucide-react';
import type { StoredOrder, OrderStatus, OrderChannel } from '../../lib/orderStore';
import { REPLY } from '../../config/site';

interface AdminOrdersViewProps {
  orders: StoredOrder[];
  onSelectOrderForPayment: (order: StoredOrder) => void;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  onDeleteOrder: (orderId: string) => void;
}

export function AdminOrdersView({
  orders,
  onSelectOrderForPayment,
  onUpdateStatus,
  onDeleteOrder,
}: AdminOrdersViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || ord.status === statusFilter;
    const matchesChannel = channelFilter === 'all' || ord.channel === channelFilter;

    return matchesSearch && matchesStatus && matchesChannel;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-800">
            <Clock className="w-3 h-3" />
            Pending Payment
          </span>
        );
      case 'payment-sent':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-950/80 text-sky-300 border border-sky-800">
            <Send className="w-3 h-3" />
            Payment Sent
          </span>
        );
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
            <CheckCircle2 className="w-3 h-3" />
            Paid & Verified
          </span>
        );
      case 'dispatched':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-800">
            <Package className="w-3 h-3" />
            Dispatched (PDI Done)
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-950/80 text-rose-300 border border-rose-800">
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  const getChannelBadge = (channel: OrderChannel) => {
    if (channel === 'whatsapp') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30">
          <MessageSquare className="w-3 h-3 fill-current" />
          WhatsApp
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">
        <Mail className="w-3 h-3" />
        Email Form
      </span>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by order ref, customer name, or email..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending Payment</option>
            <option value="payment-sent">Payment Sent</option>
            <option value="paid">Paid</option>
            <option value="dispatched">Dispatched</option>
          </select>

          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-500"
          >
            <option value="all">All Channels</option>
            <option value="whatsapp">WhatsApp Orders</option>
            <option value="email">Email Checkout</option>
          </select>
        </div>

      </div>

      {/* Orders List Table */}
      {filteredOrders.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">No orders found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or status filter to see customer orders.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isExpanded = expandedOrderId === order.id;

            return (
              <div
                key={order.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition"
              >
                {/* Main Row summary */}
                <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-sm text-sky-400">
                        {order.id}
                      </span>
                      {getChannelBadge(order.channel)}
                      {getStatusBadge(order.status)}
                      <span className="text-[11px] text-slate-500 font-mono">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-white text-base">
                        {order.customerName}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {order.customerEmail} {order.customerPhone ? `· ${order.customerPhone}` : ''}
                      </p>
                    </div>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
                    <div className="text-right pr-2">
                      <span className="text-xs text-slate-400 block">Total Due</span>
                      <span className="text-lg font-black text-white font-mono">
                        {REPLY.currency.symbol}{order.total.toLocaleString()} {order.currency}
                      </span>
                    </div>

                    {/* Send Payment Details Button */}
                    <button
                      type="button"
                      onClick={() => onSelectOrderForPayment(order)}
                      className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-sky-950/40 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Payment Details</span>
                    </button>

                    {/* Expand Details button */}
                    <button
                      type="button"
                      onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs transition cursor-pointer"
                      title="View order breakdown"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {/* Delete Order button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete order ${order.id}?`)) {
                          onDeleteOrder(order.id);
                        }
                      }}
                      className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-xl transition cursor-pointer"
                      title="Delete order"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-3 border-t border-slate-800/80 bg-slate-950/60 space-y-4 text-xs animate-fade-in">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Items Ordered */}
                      <div className="space-y-2">
                        <span className="font-semibold text-slate-400 text-[11px] uppercase tracking-wider block">
                          Purchased Outboards & Rigging
                        </span>
                        <div className="space-y-1.5">
                          {order.items.map((it, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between"
                            >
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

                      {/* Delivery and Status Controls */}
                      <div className="space-y-3">
                        <div>
                          <span className="font-semibold text-slate-400 text-[11px] uppercase tracking-wider block">
                            Delivery & Yard Logistics
                          </span>
                          <p className="text-slate-300 mt-1">
                            {order.deliveryMethod || 'UK Mainland Pallet Express with PDI'}
                          </p>
                          {order.deliveryAddress && (
                            <p className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                              {order.deliveryAddress}
                            </p>
                          )}
                        </div>

                        {order.notes && (
                          <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                            <span className="font-semibold text-sky-400 block mb-0.5">Customer Notes:</span>
                            {order.notes}
                          </div>
                        )}

                        <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                          <span className="text-[11px] text-slate-400">Update Status:</span>
                          <button
                            type="button"
                            onClick={() => onUpdateStatus(order.id, 'paid')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/80 hover:bg-emerald-900 text-xs font-medium transition cursor-pointer"
                          >
                            Mark Paid
                          </button>
                          <button
                            type="button"
                            onClick={() => onUpdateStatus(order.id, 'dispatched')}
                            className="px-2.5 py-1 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800/80 hover:bg-indigo-900 text-xs font-medium transition cursor-pointer"
                          >
                            Mark Dispatched (PDI Complete)
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

export default AdminOrdersView;
