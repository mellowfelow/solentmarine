import React, { useState } from 'react';
import {
  MessageSquareText,
  Search,
  Mail,
  Send,
  Clock,
  CheckCircle2,
  Trash2,
  Eye,
  Building,
  Anchor
} from 'lucide-react';
import type { StoredEnquiry, EnquiryType, EnquiryStatus } from '../../lib/enquiryStore';

interface AdminEnquiriesViewProps {
  enquiries: StoredEnquiry[];
  onSelectEnquiryForReply: (enquiry: StoredEnquiry) => void;
  onViewDetails: (enquiry: StoredEnquiry) => void;
  onDeleteEnquiry: (enquiryId: string) => void;
}

export function AdminEnquiriesView({
  enquiries,
  onSelectEnquiryForReply,
  onViewDetails,
  onDeleteEnquiry,
}: AdminEnquiriesViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = enquiries.filter((enq) => {
    const matchesSearch =
      enq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (enq.subject && enq.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
      enq.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'all' || enq.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || enq.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeBadge = (type: EnquiryType) => {
    switch (type) {
      case 'wholesale':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-950 text-purple-300 border border-purple-800">
            <Building className="w-3 h-3" />
            Wholesale B2B
          </span>
        );
      case 'technical':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-950 text-sky-300 border border-sky-800">
            <Anchor className="w-3 h-3" />
            Technical Rigging
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            <Mail className="w-3 h-3" />
            General Contact
          </span>
        );
    }
  };

  const getStatusBadge = (status: EnquiryStatus) => {
    if (status === 'replied') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
          <CheckCircle2 className="w-3 h-3" />
          Replied
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950 text-amber-300 border border-amber-800">
        <Clock className="w-3 h-3" />
        New Enquiry
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
            placeholder="Search enquiries by customer, vessel, or keyword..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-500"
          >
            <option value="all">All Enquiry Types</option>
            <option value="contact">General Contact</option>
            <option value="wholesale">Wholesale B2B</option>
            <option value="technical">Technical Rigging</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-500"
          >
            <option value="all">All Statuses</option>
            <option value="new">New Enquiries</option>
            <option value="replied">Replied</option>
          </select>
        </div>

      </div>

      {/* Enquiry List */}
      {filtered.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <MessageSquareText className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">No enquiries match your filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            All customer requests have been responded to.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((enquiry) => (
            <div
              key={enquiry.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition"
            >
              <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                <button
                  type="button"
                  onClick={() => onViewDetails(enquiry)}
                  className="space-y-2 text-left cursor-pointer"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-xs text-sky-400">
                      {enquiry.id}
                    </span>
                    {getTypeBadge(enquiry.type)}
                    {getStatusBadge(enquiry.status)}
                    <span className="text-[11px] text-slate-500 font-mono">
                      {new Date(enquiry.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-base flex items-center gap-2">
                      <span>{enquiry.name}</span>
                      {enquiry.company && (
                        <span className="text-xs text-purple-300 font-normal">
                          ({enquiry.company})
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {enquiry.email} {enquiry.phone ? `· ${enquiry.phone}` : ''}
                    </p>
                  </div>

                  {enquiry.subject && (
                    <p className="text-xs font-semibold text-slate-300">
                      Subject: "{enquiry.subject}"
                    </p>
                  )}
                </button>

                {/* Actions */}
                <div className="flex items-center gap-3 self-start lg:self-center">
                  <button
                    type="button"
                    onClick={() => onSelectEnquiryForReply(enquiry)}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-emerald-950/40 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{enquiry.status === 'replied' ? 'Send Follow-up' : 'Compose Reply'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onViewDetails(enquiry)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs transition cursor-pointer"
                    title="View full enquiry"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Delete enquiry ${enquiry.id}?`)) {
                        onDeleteEnquiry(enquiry.id);
                      }
                    }}
                    className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-xl transition cursor-pointer"
                    title="Delete enquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default AdminEnquiriesView;
