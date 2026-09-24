import React from 'react';
import { 
  ShoppingBag, 
  MessageSquareText, 
  Lock, 
  LogOut, 
  LayoutDashboard, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  ArrowLeft,
  CircleDollarSign,
  Send
} from 'lucide-react';
import { SITE, REPLY } from '../../config/site';

interface AdminLayoutProps {
  activeTab: 'dashboard' | 'orders' | 'enquiries' | 'send-payment-email' | 'reply-enquiry';
  onTabChange: (tab: 'dashboard' | 'orders' | 'enquiries') => void;
  onLock: () => void;
  orderCount?: number;
  enquiryCount?: number;
  children: React.ReactNode;
  onNavigateHome?: () => void;
}

export function AdminLayout({
  activeTab,
  onTabChange,
  onLock,
  orderCount = 0,
  enquiryCount = 0,
  children,
  onNavigateHome,
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left: Brand / Title */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold">
                SM
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-bold text-white tracking-tight">
                    {SITE.shortName}
                  </h1>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/80 font-semibold">
                    Reply Portal v10
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Order & Enquiry Command Center
                </p>
              </div>
            </div>

            {/* Middle: Main Navigation Tabs */}
            <nav className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => onTabChange('dashboard')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                  activeTab === 'dashboard'
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Overview</span>
              </button>

              <button
                type="button"
                onClick={() => onTabChange('orders')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                  activeTab === 'orders' || activeTab === 'send-payment-email'
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Orders</span>
                {orderCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-sky-950 text-sky-300 font-mono font-bold border border-sky-800">
                    {orderCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => onTabChange('enquiries')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                  activeTab === 'enquiries' || activeTab === 'reply-enquiry'
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <MessageSquareText className="w-3.5 h-3.5" />
                <span>Enquiries</span>
                {enquiryCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-950 text-amber-300 font-mono font-bold border border-amber-800">
                    {enquiryCount}
                  </span>
                )}
              </button>
            </nav>

            {/* Right: Return to Store & Lock */}
            <div className="flex items-center gap-2">
              {onNavigateHome && (
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition hidden md:flex items-center gap-1.5 border border-slate-700"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Public Store</span>
                </button>
              )}

              <button
                type="button"
                onClick={onLock}
                className="p-2 rounded-lg bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 text-xs font-semibold transition flex items-center gap-1.5"
                title="Lock admin session"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Lock Portal</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {children}
      </div>

    </div>
  );
}

export default AdminLayout;
