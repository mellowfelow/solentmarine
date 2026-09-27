import type { Metadata } from 'next';
import AdminEnquiryDetailPageClient from '../../../../components/routes/AdminEnquiryDetailPageClient';

export const metadata: Metadata = {
  title: 'Enquiry — Admin',
  robots: { index: false, follow: false }
};

export default function Page() {
  return <AdminEnquiryDetailPageClient />;
}
