import type { Metadata } from 'next';
import { Suspense } from 'react';
import AdminReplyEnquiryPageClient from '../../../components/routes/AdminReplyEnquiryPageClient';

export const metadata: Metadata = {
  title: 'Reply to Enquiry — Admin',
  robots: { index: false, follow: false }
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AdminReplyEnquiryPageClient />
    </Suspense>
  );
}
