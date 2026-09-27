'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAdminPasscode } from '../../lib/useAdminPasscode';
import { AdminPasscodeProvider } from '../../lib/adminPasscodeContext';
import { PasscodeGate } from '../../components/admin/PasscodeGate';
import { AdminLayout } from '../../components/admin/AdminLayout';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isUnlocked, isLoading, unlock, lock, error, getAuthHeaders } = useAdminPasscode();

  if (isLoading) return null;

  if (!isUnlocked) {
    return <PasscodeGate onUnlock={unlock} error={error} />;
  }

  return (
    <AdminLayout onLock={lock} onNavigateHome={() => router.push('/')}>
      <AdminPasscodeProvider value={{ getAuthHeaders, lock }}>{children}</AdminPasscodeProvider>
    </AdminLayout>
  );
}
