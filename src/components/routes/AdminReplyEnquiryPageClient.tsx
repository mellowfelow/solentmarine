'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdminReplyEnquiryView } from '../admin/AdminReplyEnquiryView';
import { useAdminAuth } from '../../lib/adminPasscodeContext';
import type { StoredEnquiry } from '../../lib/enquiryStore';

export default function AdminReplyEnquiryPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getAuthHeaders } = useAdminAuth();
  const id = searchParams.get('id') || '';

  const [enquiry, setEnquiry] = useState<StoredEnquiry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${encodeURIComponent(id)}/`, { headers: getAuthHeaders() });
      const data = await res.json();
      setEnquiry(data.enquiry || null);
    } finally {
      setIsLoading(false);
    }
  }, [id, getAuthHeaders]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleSendReply = async (enquiryId: string, replyData: { subject: string; message: string }) => {
    await fetch('/api/admin/reply-enquiry/', {
      method: 'POST',
      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ enquiryId, ...replyData })
    });
  };

  if (!id || isLoading) return <p className="text-slate-400 text-sm">Loading…</p>;

  if (!enquiry) {
    return (
      <div className="space-y-4">
        <p className="text-slate-400 text-sm">Enquiry {id} not found.</p>
        <Link href="/admin/enquiries/" className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to enquiries
        </Link>
      </div>
    );
  }

  return (
    <AdminReplyEnquiryView
      enquiry={enquiry}
      onBack={() => router.push(`/admin/enquiries/${encodeURIComponent(enquiry.id)}/`)}
      onSendReply={handleSendReply}
    />
  );
}
