import type { Metadata } from 'next';
import { Suspense } from 'react';
import OrderConfirmPaymentView from '../../../components/pages/OrderConfirmPaymentView';

export const metadata: Metadata = {
  title: 'Confirm Payment | Solent Marine UK',
  robots: { index: false, follow: false }
};

export default function Page() {
  return (
    <Suspense fallback={<div className="max-w-lg mx-auto px-4 py-20 text-center text-slate-500">Loading…</div>}>
      <OrderConfirmPaymentView />
    </Suspense>
  );
}
