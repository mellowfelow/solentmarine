import { useState, useEffect, useCallback } from 'react';

const SESSION_KEY = 'solent_marine_admin_passcode';

export function useAdminPasscode() {
  const [passcode, setPasscode] = useState<string>('');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = sessionStorage.getItem(SESSION_KEY);
        if (stored) {
          const ok = await verifyPasscode(stored);
          if (ok) {
            setPasscode(stored);
            setIsUnlocked(true);
          } else {
            sessionStorage.removeItem(SESSION_KEY);
          }
        }
      } catch {
        // Ignore sessionStorage access errors
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  async function verifyPasscode(candidate: string): Promise<boolean> {
    try {
      const res = await fetch('/api/admin/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: candidate })
      });
      const data = await res.json();
      return Boolean(data.ok);
    } catch {
      return false;
    }
  }

  const unlock = async (inputPasscode: string): Promise<boolean> => {
    setError(null);
    const clean = inputPasscode.trim();
    const ok = await verifyPasscode(clean);
    if (ok) {
      setPasscode(clean);
      setIsUnlocked(true);
      try {
        sessionStorage.setItem(SESSION_KEY, clean);
      } catch {
        // Ignore
      }
      return true;
    }
    setError('Invalid admin passcode. Please check your credentials.');
    return false;
  };

  const lock = () => {
    setPasscode('');
    setIsUnlocked(false);
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignore
    }
  };

  const getAuthHeaders = useCallback((): Record<string, string> => {
    return {
      'X-Admin-Passcode': passcode
    };
  }, [passcode]);

  return {
    passcode,
    isUnlocked,
    isLoading,
    error,
    unlock,
    lock,
    getAuthHeaders
  };
}
