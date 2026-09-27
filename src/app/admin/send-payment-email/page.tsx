import type { Metadata } from 'next';
import { Suspense } from 'react';
import AdminSendPaymentEmailPageClient from '../../../components/routes/AdminSendPaymentEmailPageClient';

export const metadata: Metadata = {
  title: 'Send Payment Details — Admin',
  robots: { index: false, follow: false }
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AdminSendPaymentEmailPageClient />
    </Suspense>
  );
}
