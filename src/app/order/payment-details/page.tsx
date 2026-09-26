import type { Metadata } from 'next';
import { Suspense } from 'react';
import OrderPaymentDetailsView from '../../../components/pages/OrderPaymentDetailsView';

export const metadata: Metadata = {
  title: 'Payment Details | Solent Marine UK',
  robots: { index: false, follow: false }
};

export default function Page() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto px-4 py-20 text-center text-slate-500">Loading…</div>}>
      <OrderPaymentDetailsView />
    </Suspense>
  );
}
