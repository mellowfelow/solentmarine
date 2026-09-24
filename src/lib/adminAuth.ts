/**
 * Server-side Admin Passcode authentication check.
 * Reads X-Admin-Passcode header from request and validates against process.env.ADMIN_PASSCODE.
 * ADMIN_PASSCODE is server-only and NEVER exposed via NEXT_PUBLIC_*.
 */

export const DEFAULT_DEV_PASSCODE = 'solent-admin-2026';

export function getAdminPasscode(): string {
  if (typeof process !== 'undefined' && process.env && process.env.ADMIN_PASSCODE) {
    return process.env.ADMIN_PASSCODE;
  }
  return DEFAULT_DEV_PASSCODE;
}

export function checkAdminPasscode(request: Request | { headers: { get: (name: string) => string | null } }): boolean {
  const expectedPasscode = getAdminPasscode();
  if (!expectedPasscode) return false;

  const headerPasscode = request.headers.get('x-admin-passcode') || request.headers.get('X-Admin-Passcode');
  if (headerPasscode && headerPasscode === expectedPasscode) {
    return true;
  }

  // Also support authorization bearer format
  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    if (token === expectedPasscode) return true;
  }

  return false;
}

export function validatePasscode(inputPasscode: string): boolean {
  const expected = getAdminPasscode();
  return Boolean(inputPasscode && inputPasscode.trim() === expected);
}
