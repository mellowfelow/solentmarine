'use client';

import { useRouter } from 'next/navigation';
import { AdminView } from '../pages/AdminView';

export default function AdminClient() {
  const router = useRouter();
  return <AdminView onNavigateHome={() => router.push('/')} />;
}
