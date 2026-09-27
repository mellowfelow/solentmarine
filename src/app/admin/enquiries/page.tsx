import type { Metadata } from 'next';
import AdminEnquiriesPageClient from '../../../components/routes/AdminEnquiriesPageClient';

export const metadata: Metadata = {
  title: 'Enquiries — Admin',
  robots: { index: false, follow: false }
};

export default function Page() {
  return <AdminEnquiriesPageClient />;
}
