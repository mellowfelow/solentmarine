'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdminEnquiryDetailView } from '../admin/AdminEnquiryDetailView';
import { useAdminAuth } from '../../lib/adminPasscodeContext';
import type { StoredEnquiry } from '../../lib/enquiryStore';

export default function AdminEnquiryDetailPageClient() {
  const params = useParams();
  const router = useRouter();
  const { getAuthHeaders } = useAdminAuth();
  const id = decodeURIComponent(String(params?.id || ''));

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

  const handleDelete = async () => {
    if (!window.confirm(`Delete enquiry ${id}? This can't be undone.`)) return;
    await fetch(`/api/admin/enquiries/?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    router.push('/admin/enquiries/');
  };

  if (isLoading) return <p className="text-slate-400 text-sm">Loading…</p>;

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

  return <AdminEnquiryDetailView enquiry={enquiry} onDelete={handleDelete} />;
}
