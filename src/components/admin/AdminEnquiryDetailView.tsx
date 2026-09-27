import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Trash2, Send, CornerDownRight } from 'lucide-react';
import type { StoredEnquiry } from '../../lib/enquiryStore';

interface AdminEnquiryDetailViewProps {
  enquiry: StoredEnquiry;
  onDelete: () => void;
}

export function AdminEnquiryDetailView({ enquiry, onDelete }: AdminEnquiryDetailViewProps) {
  return (
    <div className="max-w-3xl space-y-6">
      <Link
        href="/admin/enquiries/"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-semibold transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to enquiries
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-mono">{enquiry.id}</h1>
          <p className="text-xs text-slate-500 font-mono mt-1">{new Date(enquiry.createdAt).toLocaleString()}</p>
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-xl transition cursor-pointer"
          title="Delete enquiry"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
          {enquiry.name}{enquiry.company ? ` (${enquiry.company})` : ''}
        </span>
        <p className="text-slate-300 text-sm">{enquiry.email}</p>
        {enquiry.phone && <p className="text-slate-400 text-xs">{enquiry.phone}</p>}
        {enquiry.subject && <p className="text-white font-semibold text-sm mt-2">Subject: "{enquiry.subject}"</p>}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
        <span className="font-semibold text-slate-400 text-[11px] uppercase tracking-wider block">Original Message</span>
        <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{enquiry.message}</p>
        {(enquiry.vesselModel || enquiry.engineInterest) && (
          <div className="pt-2 mt-2 border-t border-slate-800 flex flex-wrap gap-4 text-[11px] text-slate-400">
            {enquiry.vesselModel && <span>Vessel: <strong className="text-white">{enquiry.vesselModel}</strong></span>}
            {enquiry.engineInterest && <span>Engine Interest: <strong className="text-white">{enquiry.engineInterest}</strong></span>}
          </div>
        )}
      </div>

      {enquiry.replies && enquiry.replies.length > 0 && (
        <div className="space-y-2">
          <span className="font-semibold text-emerald-400 text-[11px] uppercase tracking-wider block">
            Official Reply History ({enquiry.replies.length})
          </span>
          {enquiry.replies.map((rep, idx) => (
            <div key={idx} className="p-3 bg-emerald-950/20 border border-emerald-900/40 rounded-xl space-y-1">
              <div className="flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
                <CornerDownRight className="w-3.5 h-3.5" />
                <span>Sent by {rep.sender}</span>
                <span className="text-slate-500 text-[10px] ml-auto font-normal">
                  {new Date(rep.date).toLocaleString()}
                </span>
              </div>
              <p className="text-slate-300 text-xs whitespace-pre-wrap pl-4">{rep.message}</p>
            </div>
          ))}
        </div>
      )}

      <Link
        href={`/admin/reply-enquiry/?id=${encodeURIComponent(enquiry.id)}`}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-emerald-950/40"
      >
        <Send className="w-3.5 h-3.5" />
        <span>{enquiry.status === 'replied' ? 'Send Follow-up' : 'Compose Reply'}</span>
      </Link>
    </div>
  );
}

export default AdminEnquiryDetailView;
