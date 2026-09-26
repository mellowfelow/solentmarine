import type { Metadata } from 'next';
import { Suspense } from 'react';
import AdminClient from '../../components/routes/AdminClient';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false }
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AdminClient />
    </Suspense>
  );
}
