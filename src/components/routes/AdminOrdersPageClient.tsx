'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminOrdersView } from '../admin/AdminOrdersView';
import { useAdminAuth } from '../../lib/adminPasscodeContext';
import type { StoredOrder } from '../../lib/orderStore';

export default function AdminOrdersPageClient() {
  const router = useRouter();
  const { getAuthHeaders } = useAdminAuth();
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/orders/', { headers: getAuthHeaders() });
      const data = await res.json();
      setOrders(data.orders || []);
    } finally {
      setIsLoading(false);
    }
  }, [getAuthHeaders]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleDeleteOrder = async (orderId: string) => {
    await fetch(`/api/admin/orders/?id=${encodeURIComponent(orderId)}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    await refresh();
  };

  if (isLoading) return <p className="text-slate-400 text-sm">Loading…</p>;

  return (
    <AdminOrdersView
      orders={orders}
      onSelectOrderForPayment={(order) => router.push(`/admin/send-payment-email/?id=${encodeURIComponent(order.id)}`)}
      onViewDetails={(order) => router.push(`/admin/orders/${encodeURIComponent(order.id)}/`)}
      onDeleteOrder={handleDeleteOrder}
    />
  );
}
