'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdminOrderDetailView } from '../admin/AdminOrderDetailView';
import { useAdminAuth } from '../../lib/adminPasscodeContext';
import type { StoredOrder, OrderStatus } from '../../lib/orderStore';

export default function AdminOrderDetailPageClient() {
  const params = useParams();
  const router = useRouter();
  const { getAuthHeaders } = useAdminAuth();
  const id = decodeURIComponent(String(params?.id || ''));

  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${encodeURIComponent(id)}/`, { headers: getAuthHeaders() });
      const data = await res.json();
      setOrder(data.order || null);
    } finally {
      setIsLoading(false);
    }
  }, [id, getAuthHeaders]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleUpdateStatus = async (status: OrderStatus) => {
    await fetch('/api/admin/orders/', {
      method: 'PATCH',
      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    await refresh();
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete order ${id}? This can't be undone.`)) return;
    await fetch(`/api/admin/orders/?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    router.push('/admin/orders/');
  };

  if (isLoading) return <p className="text-slate-400 text-sm">Loading…</p>;

  if (!order) {
    return (
      <div className="space-y-4">
        <p className="text-slate-400 text-sm">Order {id} not found.</p>
        <Link href="/admin/orders/" className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to orders
        </Link>
      </div>
    );
  }

  return <AdminOrderDetailView order={order} onUpdateStatus={handleUpdateStatus} onDelete={handleDelete} />;
}
