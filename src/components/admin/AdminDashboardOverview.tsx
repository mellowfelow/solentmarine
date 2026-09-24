import React from 'react';
import { 
  ShoppingBag, 
  MessageSquareText, 
  TrendingUp, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  Server, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  Mail,
  Zap,
  PackageCheck
} from 'lucide-react';
import { StoredOrder } from '../../lib/orderStore';
import { StoredEnquiry } from '../../lib/enquiryStore';
import { REPLY, SITE } from '../../config/site';

interface AdminDashboardOverviewProps {
  orders: StoredOrder[];
  enquiries: StoredEnquiry[];
  onNavigateToOrders: () => void;
  onNavigateToEnquiries: () => void;
  onSelectOrderForPayment: (order: StoredOrder) => void;
  onSelectEnquiryForReply: (enquiry: StoredEnquiry) => void;
}

export function AdminDashboardOverview({
  orders,
  enquiries,
  onNavigateToOrders,
  onNavigateToEnquiries,
  onSelectOrderForPayment,
  onSelectEnquiryForReply,
}: AdminDashboardOverviewProps) {
  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const paidOrders = orders.filter((o) => o.status === 'paid' || o.status === 'dispatched');
  const newEnquiries = enquiries.filter((e) => e.status === 'new');
  
  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.total, 0);
  const pendingRevenue = pendingOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Reply Portal Live Engine
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Cowes Yard Operations Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
            Manage incoming outboard orders, compose branded Light-Shell payment instructions, and dispatch customer support inquiries across UK marine channels.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            type="button"
            onClick={onNavigateToOrders}
            className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-sky-950/50 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Process Orders ({orders.length})</span>
          </button>

          <button
            type="button"
            onClick={onNavigateToEnquiries}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-2 border border-slate-700 cursor-pointer"
          >
            <MessageSquareText className="w-4 h-4" />
            <span>Pending Queries ({newEnquiries.length})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending Orders</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {pendingOrders.length}
          </div>
          <p className="text-[11px] text-amber-400 font-mono">
            {REPLY.currency.symbol}{pendingRevenue.toLocaleString()} awaiting payment
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Verified Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {REPLY.currency.symbol}{totalRevenue.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-400">
            {paidOrders.length} paid / dispatched units
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Customer Enquiries</span>
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <MessageSquareText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {enquiries.length}
          </div>
          <p className="text-[11px] text-sky-400">
            {newEnquiries.length} requiring immediate response
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Environment & Store</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Server className="w-4 h-4" />
            </div>
          </div>
          <div className="text-sm font-bold text-white flex items-center gap-1.5 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Vercel / SMTP Ready</span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            Auth: Passcode Gated
          </p>
        </div>

      </div>

      {/* Two Columns: Recent Orders Requiring Action & Recent Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Recent Orders */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Orders</h3>
            </div>
            <button
              type="button"
              onClick={onNavigateToOrders}
              className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({orders.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 4).map((ord) => (
              <div
                key={ord.id}
                className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-sky-400">{ord.id}</span>
                    <span className="text-[11px] text-slate-400 font-semibold">{ord.customerName}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {ord.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-xs text-white">
                    {REPLY.currency.symbol}{ord.total.toLocaleString()}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectOrderForPayment(ord)}
                    className="px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Inquiries */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <MessageSquareText className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Customer Inquiries</h3>
            </div>
            <button
              type="button"
              onClick={onNavigateToEnquiries}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({enquiries.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {enquiries.slice(0, 4).map((enq) => (
              <div
                key={enq.id}
                className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition"
              >
                <div className="space-y-1 max-w-[65%]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-emerald-400">{enq.id}</span>
                    <span className="text-[11px] text-white font-semibold truncate">{enq.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    {enq.subject || enq.message}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectEnquiryForReply(enq)}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <span>Answer</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Vercel Environment Configuration Callout */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 text-xs text-slate-400 space-y-3">
        <div className="flex items-center gap-2 font-bold text-slate-200">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Vercel Deployment Environment Checklist</span>
        </div>
        <p className="leading-relaxed">
          When deployed to Vercel, set <code className="text-sky-300 font-mono">ADMIN_PASSCODE</code>, <code className="text-sky-300 font-mono">UPSTASH_REDIS_REST_URL</code>, and <code className="text-sky-300 font-mono">EMAIL_SERVER_*</code> in your project settings. In local preview mode, all features work with pre-seeded data and browser persistence.
        </p>
      </div>

    </div>
  );
}

export default AdminDashboardOverview;
