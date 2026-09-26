'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { AdminView } from '../pages/AdminView';

export default function AdminClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const highlightOrderId = searchParams.get('order') || undefined;
  return <AdminView onNavigateHome={() => router.push('/')} initialOrderId={highlightOrderId} />;
}
