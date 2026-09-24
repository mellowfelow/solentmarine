import { useState, useEffect } from 'react';
import { validatePasscode, DEFAULT_DEV_PASSCODE } from './adminAuth';

const SESSION_KEY = 'solent_marine_admin_passcode';

export function useAdminPasscode() {
  const [passcode, setPasscode] = useState<string>('');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored && validatePasscode(stored)) {
        setPasscode(stored);
        setIsUnlocked(true);
      }
    } catch {
      // Ignore sessionStorage access errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const unlock = (inputPasscode: string): boolean => {
    setError(null);
    const clean = inputPasscode.trim();
    if (validatePasscode(clean)) {
      setPasscode(clean);
      setIsUnlocked(true);
      try {
        sessionStorage.setItem(SESSION_KEY, clean);
      } catch {
        // Ignore
      }
      return true;
    } else {
      setError('Invalid admin passcode. Please check your credentials.');
      return false;
    }
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

  const getAuthHeaders = (): Record<string, string> => {
    return {
      'X-Admin-Passcode': passcode || DEFAULT_DEV_PASSCODE,
    };
  };

  return {
    passcode,
    isUnlocked,
    isLoading,
    error,
    unlock,
    lock,
    getAuthHeaders,
  };
}
