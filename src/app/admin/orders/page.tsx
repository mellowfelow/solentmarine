import type { Metadata } from 'next';
import AdminOrdersPageClient from '../../../components/routes/AdminOrdersPageClient';

export const metadata: Metadata = {
  title: 'Orders — Admin',
  robots: { index: false, follow: false }
};

export default function Page() {
  return <AdminOrdersPageClient />;
}
