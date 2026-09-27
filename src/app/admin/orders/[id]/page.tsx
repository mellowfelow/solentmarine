import type { Metadata } from 'next';
import AdminOrderDetailPageClient from '../../../../components/routes/AdminOrderDetailPageClient';

export const metadata: Metadata = {
  title: 'Order — Admin',
  robots: { index: false, follow: false }
};

export default function Page() {
  return <AdminOrderDetailPageClient />;
}
