'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdminSendPaymentEmailView } from '../admin/AdminSendPaymentEmailView';
import { useAdminAuth } from '../../lib/adminPasscodeContext';
import type { StoredOrder } from '../../lib/orderStore';

export default function AdminSendPaymentEmailPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getAuthHeaders } = useAdminAuth();
  const id = searchParams.get('id') || '';

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

  const handlePaymentSent = async (orderId: string, methodId: string, detail: string) => {
    await fetch('/api/admin/send-payment-email/', {
      method: 'POST',
      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, methodId, detail })
    });
  };

  if (!id || isLoading) return <p className="text-slate-400 text-sm">Loading…</p>;

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

  return (
    <AdminSendPaymentEmailView
      order={order}
      onBack={() => router.push(`/admin/orders/${encodeURIComponent(order.id)}/`)}
      onPaymentSent={handlePaymentSent}
    />
  );
}
