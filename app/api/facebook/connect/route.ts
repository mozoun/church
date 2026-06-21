import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';
import { getSession } from '@/lib/auth';
import { getOAuthDialogUrl } from '@/lib/facebook';

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
  }

  const state = randomBytes(16).toString('hex');
  const cookieStore = await cookies();
  cookieStore.set('fb_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 10,
  });

  return NextResponse.redirect(getOAuthDialogUrl(state));
}
