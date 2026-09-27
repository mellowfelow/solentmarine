'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminDashboardOverview } from '../admin/AdminDashboardOverview';
import { useAdminAuth } from '../../lib/adminPasscodeContext';
import type { StoredOrder } from '../../lib/orderStore';
import type { StoredEnquiry } from '../../lib/enquiryStore';

export default function AdminDashboardPageClient() {
  const router = useRouter();
  const { getAuthHeaders } = useAdminAuth();
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [enquiries, setEnquiries] = useState<StoredEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const headers = getAuthHeaders();
      const [ordRes, enqRes] = await Promise.all([
        fetch('/api/admin/orders/', { headers }),
        fetch('/api/admin/enquiries/', { headers })
      ]);
      const ordData = await ordRes.json();
      const enqData = await enqRes.json();
      setOrders(ordData.orders || []);
      setEnquiries(enqData.enquiries || []);
    } finally {
      setIsLoading(false);
    }
  }, [getAuthHeaders]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (isLoading) return <p className="text-slate-400 text-sm">Loading…</p>;

  return (
    <AdminDashboardOverview
      orders={orders}
      enquiries={enquiries}
      onNavigateToOrders={() => router.push('/admin/orders/')}
      onNavigateToEnquiries={() => router.push('/admin/enquiries/')}
      onSelectOrderForPayment={(order) => router.push(`/admin/send-payment-email/?id=${encodeURIComponent(order.id)}`)}
      onSelectEnquiryForReply={(enquiry) => router.push(`/admin/reply-enquiry/?id=${encodeURIComponent(enquiry.id)}`)}
    />
  );
}
