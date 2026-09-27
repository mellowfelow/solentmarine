'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminEnquiriesView } from '../admin/AdminEnquiriesView';
import { useAdminAuth } from '../../lib/adminPasscodeContext';
import type { StoredEnquiry } from '../../lib/enquiryStore';

export default function AdminEnquiriesPageClient() {
  const router = useRouter();
  const { getAuthHeaders } = useAdminAuth();
  const [enquiries, setEnquiries] = useState<StoredEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/enquiries/', { headers: getAuthHeaders() });
      const data = await res.json();
      setEnquiries(data.enquiries || []);
    } finally {
      setIsLoading(false);
    }
  }, [getAuthHeaders]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleDeleteEnquiry = async (enquiryId: string) => {
    await fetch(`/api/admin/enquiries/?id=${encodeURIComponent(enquiryId)}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    await refresh();
  };

  if (isLoading) return <p className="text-slate-400 text-sm">Loading…</p>;

  return (
    <AdminEnquiriesView
      enquiries={enquiries}
      onSelectEnquiryForReply={(enquiry) => router.push(`/admin/reply-enquiry/?id=${encodeURIComponent(enquiry.id)}`)}
      onViewDetails={(enquiry) => router.push(`/admin/enquiries/${encodeURIComponent(enquiry.id)}/`)}
      onDeleteEnquiry={handleDeleteEnquiry}
    />
  );
}
