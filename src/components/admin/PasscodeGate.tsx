import React, { useState } from 'react';
import { Lock, KeyRound, ShieldAlert, CheckCircle2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { SITE } from '../../config/site';

interface PasscodeGateProps {
  onUnlock: (passcode: string) => boolean;
  error?: string | null;
}

export function PasscodeGate({ onUnlock, error }: PasscodeGateProps) {
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!passcode.trim()) {
      setLocalError('Please enter the administrative passcode.');
      return;
    }
    const success = onUnlock(passcode);
    if (!success) {
      setLocalError('Invalid passcode. Access denied.');
    }
  };

  const handleQuickDemoFill = () => {
    setPasscode('solent-admin-2026');
    setLocalError(null);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-slate-950">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-center space-y-6">
        
        {/* Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-sky-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="w-16 h-16 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-sky-400 font-bold bg-sky-950/80 px-3 py-1 rounded-full border border-sky-800/60">
            Passcode Protected Hub
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Solent Marine Reply Portal
          </h2>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm mx-auto">
            Authorized administrative access for managing WhatsApp / email customer orders, sending payment instructions, and replying to enquiries.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Admin Passcode</span>
              <span className="text-[10px] text-slate-400 font-normal">Stored in Vercel Env (ADMIN_PASSCODE)</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode..."
                autoFocus
                className="w-full bg-slate-950 border border-slate-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 rounded-xl px-4 py-3 text-sm text-white font-mono placeholder:text-slate-600 transition outline-none pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {(error || localError) && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2 animate-fade-in">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error || localError}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-sky-950/50 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Unlock Admin Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Development / Demo Quick Passcode Helper */}
        <div className="pt-4 border-t border-slate-800/80 text-center">
          <button
            type="button"
            onClick={handleQuickDemoFill}
            className="text-[11px] text-slate-400 hover:text-sky-300 underline transition cursor-pointer flex items-center justify-center gap-1 mx-auto"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Use demo passcode: <code className="font-mono text-sky-400">solent-admin-2026</code></span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default PasscodeGate;
