import { NextResponse } from 'next/server';
import { validatePasscode } from '../../../../lib/adminAuth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const passcode = String(body.passcode || '');
  if (validatePasscode(passcode)) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false, error: 'Invalid admin passcode.' }, { status: 401 });
}
