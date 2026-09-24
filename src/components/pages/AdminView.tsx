import React, { useState, useEffect } from 'react';
import { useAdminPasscode } from '../../lib/useAdminPasscode';
import { PasscodeGate } from '../admin/PasscodeGate';
import { AdminLayout } from '../admin/AdminLayout';
import { AdminDashboardOverview } from '../admin/AdminDashboardOverview';
import { AdminOrdersView } from '../admin/AdminOrdersView';
import { AdminEnquiriesView } from '../admin/AdminEnquiriesView';
import { AdminSendPaymentEmailView } from '../admin/AdminSendPaymentEmailView';
import { AdminReplyEnquiryView } from '../admin/AdminReplyEnquiryView';
import { 
  getStoredOrders, 
  deleteStoredOrder, 
  updateStoredOrderStatus, 
  StoredOrder, 
  OrderStatus 
} from '../../lib/orderStore';
import { 
  getStoredEnquiries, 
  deleteStoredEnquiry, 
  updateStoredEnquiryStatus, 
  StoredEnquiry 
} from '../../lib/enquiryStore';
import { sendMail } from '../../lib/mailer';
import { REPLY, SITE } from '../../config/site';

interface AdminViewProps {
  onNavigateHome?: () => void;
}

export function AdminView({ onNavigateHome }: AdminViewProps) {
  const { isUnlocked, unlock, lock, error } = useAdminPasscode();
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'enquiries' | 'send-payment-email' | 'reply-enquiry'>('dashboard');
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [enquiries, setEnquiries] = useState<StoredEnquiry[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<StoredOrder | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<StoredEnquiry | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const [ordList, enqList] = await Promise.all([
        getStoredOrders(),
        getStoredEnquiries(),
      ]);
      setOrders(ordList);
      setEnquiries(enqList);
    } catch (err) {
      console.error('Error fetching admin store data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isUnlocked) {
      refreshData();
    }
  }, [isUnlocked]);

  // Order Handlers
  const handleSelectOrderForPayment = (order: StoredOrder) => {
    setSelectedOrder(order);
    setActiveTab('send-payment-email');
  };

  const handleUpdateOrderStatus = async (orderId: string, status: OrderStatus) => {
    await updateStoredOrderStatus(orderId, status);
    await refreshData();
  };

  const handleDeleteOrder = async (orderId: string) => {
    await deleteStoredOrder(orderId);
    await refreshData();
  };

  const handleSendPaymentEmail = async (orderId: string, emailHtml: string) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (targetOrder) {
      // Send mail via lazy mailer singleton
      await sendMail({
        to: targetOrder.customerEmail,
        subject: `Payment Instructions for Solent Marine Order ${orderId}`,
        html: emailHtml,
        replyTo: REPLY.channels.email,
      });

      // Update status in store
      await updateStoredOrderStatus(orderId, 'payment-sent', {
        paymentSentAt: new Date().toISOString(),
      });
      await refreshData();
    }
  };

  // Enquiry Handlers
  const handleSelectEnquiryForReply = (enquiry: StoredEnquiry) => {
    setSelectedEnquiry(enquiry);
    setActiveTab('reply-enquiry');
  };

  const handleDeleteEnquiry = async (enquiryId: string) => {
    await deleteStoredEnquiry(enquiryId);
    await refreshData();
  };

  const handleSendEnquiryReply = async (
    enquiryId: string,
    replyData: { subject: string; message: string; emailHtml: string }
  ) => {
    const target = enquiries.find((e) => e.id === enquiryId);
    if (target) {
      // Send mail via lazy mailer
      await sendMail({
        to: target.email,
        subject: replyData.subject,
        html: replyData.emailHtml,
        replyTo: REPLY.channels.email,
      });

      // Update in store
      await updateStoredEnquiryStatus(enquiryId, 'replied', {
        date: new Date().toISOString(),
        subject: replyData.subject,
        message: replyData.message,
        sender: 'Solent Marine Technical Desk',
      });
      await refreshData();
    }
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
