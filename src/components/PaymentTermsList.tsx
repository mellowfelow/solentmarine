import React from 'react';
import { ShieldAlert, Clock, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { paymentTermsLines } from '../lib/order';
import { REPLY } from '../config/site';

interface PaymentTermsListProps {
  orderRef: string;
  methodId?: string;
  className?: string;
}

export function PaymentTermsList({ orderRef, methodId, className = '' }: PaymentTermsListProps) {
  const lines = paymentTermsLines(orderRef, methodId);

  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 text-xs text-slate-300 space-y-3 ${className}`}>
      <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-sky-400 font-bold uppercase tracking-wider text-[11px]">
        <ShieldAlert className="w-4 h-4" />
        <span>Official Solent Marine UK Payment & Dispatch Terms</span>
      </div>

      <ul className="space-y-2.5">
        {lines.map((line, idx) => (
          <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
            <span className="w-5 h-5 rounded-full bg-sky-950 text-sky-400 border border-sky-800/60 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5 font-bold">
              {idx + 1}
            </span>
            <span className="text-slate-300">{line}</span>
          </li>
        ))}
      </ul>

      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span>Payment Window: <strong className="text-white">{REPLY.deadlineHours} Hours</strong></span>
        <span>Ref: <strong className="text-sky-300 font-mono">{orderRef}</strong></span>
      </div>
    </div>
  );
}

export default PaymentTermsList;
