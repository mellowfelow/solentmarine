import React, { useState, useEffect, useCallback } from 'react';
import { useAdminPasscode } from '../../lib/useAdminPasscode';
import { PasscodeGate } from '../admin/PasscodeGate';
import { AdminLayout } from '../admin/AdminLayout';
import { AdminDashboardOverview } from '../admin/AdminDashboardOverview';
import { AdminOrdersView } from '../admin/AdminOrdersView';
import { AdminEnquiriesView } from '../admin/AdminEnquiriesView';
import { AdminSendPaymentEmailView } from '../admin/AdminSendPaymentEmailView';
import { AdminReplyEnquiryView } from '../admin/AdminReplyEnquiryView';
import type { StoredOrder, OrderStatus } from '../../lib/orderStore';
import type { StoredEnquiry } from '../../lib/enquiryStore';

interface AdminViewProps {
  onNavigateHome?: () => void;
}

export function AdminView({ onNavigateHome }: AdminViewProps) {
  const { isUnlocked, unlock, lock, error, getAuthHeaders } = useAdminPasscode();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'enquiries' | 'send-payment-email' | 'reply-enquiry'>('dashboard');
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [enquiries, setEnquiries] = useState<StoredEnquiry[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<StoredOrder | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<StoredEnquiry | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshData = useCallback(async () => {
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
    } catch (err) {
      console.error('Error fetching admin store data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [getAuthHeaders]);

  useEffect(() => {
    if (isUnlocked) {
      refreshData();
    }
  }, [isUnlocked, refreshData]);

  // Order Handlers
  const handleSelectOrderForPayment = (order: StoredOrder) => {
    setSelectedOrder(order);
    setActiveTab('send-payment-email');
  };

  const handleUpdateOrderStatus = async (orderId: string, status: OrderStatus) => {
    await fetch('/api/admin/orders/', {
      method: 'PATCH',
      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: orderId, status })
    });
    await refreshData();
  };

  const handleDeleteOrder = async (orderId: string) => {
    await fetch(`/api/admin/orders/?id=${encodeURIComponent(orderId)}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    await refreshData();
  };

  const handleSendPaymentEmail = async (orderId: string, emailHtml: string) => {
    await fetch('/api/admin/send-payment-email/', {
      method: 'POST',
      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, emailHtml })
    });
    await refreshData();
  };

  // Enquiry Handlers
  const handleSelectEnquiryForReply = (enquiry: StoredEnquiry) => {
    setSelectedEnquiry(enquiry);
    setActiveTab('reply-enquiry');
  };

  const handleDeleteEnquiry = async (enquiryId: string) => {
    await fetch(`/api/admin/enquiries/?id=${encodeURIComponent(enquiryId)}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    await refreshData();
  };

  const handleSendEnquiryReply = async (
    enquiryId: string,
    replyData: { subject: string; message: string; emailHtml: string }
  ) => {
    await fetch('/api/admin/reply-enquiry/', {
      method: 'POST',
      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ enquiryId, ...replyData })
    });
    await refreshData();
  };

  // If locked, render the secure PasscodeGate
  if (!isUnlocked) {
    return <PasscodeGate onUnlock={unlock} error={error} />;
  }

  return (
    <AdminLayout
      activeTab={activeTab}
      onTabChange={(tab) => {
        setSelectedOrder(null);
        setSelectedEnquiry(null);
        setActiveTab(tab);
      }}
      onLock={lock}
      orderCount={orders.length}
      enquiryCount={enquiries.filter((e) => e.status === 'new').length}
      onNavigateHome={onNavigateHome}
    >
      {activeTab === 'dashboard' && (
        <AdminDashboardOverview
          orders={orders}
          enquiries={enquiries}
          onNavigateToOrders={() => setActiveTab('orders')}
          onNavigateToEnquiries={() => setActiveTab('enquiries')}
          onSelectOrderForPayment={handleSelectOrderForPayment}
          onSelectEnquiryForReply={handleSelectEnquiryForReply}
        />
      )}

      {activeTab === 'orders' && (
        <AdminOrdersView
          orders={orders}
          onSelectOrderForPayment={handleSelectOrderForPayment}
          onUpdateStatus={handleUpdateOrderStatus}
          onDeleteOrder={handleDeleteOrder}
        />
      )}

      {activeTab === 'enquiries' && (
        <AdminEnquiriesView
          enquiries={enquiries}
          onSelectEnquiryForReply={handleSelectEnquiryForReply}
          onDeleteEnquiry={handleDeleteEnquiry}
        />
      )}

      {activeTab === 'send-payment-email' && selectedOrder && (
        <AdminSendPaymentEmailView
          order={selectedOrder}
          onBack={() => {
            setSelectedOrder(null);
            setActiveTab('orders');
          }}
          onPaymentSent={handleSendPaymentEmail}
        />
      )}

      {activeTab === 'reply-enquiry' && selectedEnquiry && (
        <AdminReplyEnquiryView
          enquiry={selectedEnquiry}
          onBack={() => {
            setSelectedEnquiry(null);
            setActiveTab('enquiries');
          }}
          onSendReply={handleSendEnquiryReply}
        />
      )}
    </AdminLayout>
  );
}

export default AdminView;
