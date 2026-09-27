'use client';

import React, { createContext, useContext } from 'react';

interface AdminPasscodeContextValue {
  getAuthHeaders: () => Record<string, string>;
  lock: () => void;
}

const AdminPasscodeContext = createContext<AdminPasscodeContextValue | null>(null);

export function AdminPasscodeProvider({
  value,
  children
}: {
  value: AdminPasscodeContextValue;
  children: React.ReactNode;
}) {
  return <AdminPasscodeContext.Provider value={value}>{children}</AdminPasscodeContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminPasscodeContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminPasscodeProvider (i.e. under /admin/layout.tsx)');
  return ctx;
}
