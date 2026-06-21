import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession } from '@/lib/auth';
import {
  exchangeCodeForUserToken,
  exchangeForLongLivedUserToken,
  getManagedPages,
  saveFacebookConnection,
} from '@/lib/facebook';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

function redirectToDashboard(status: string, message?: string) {
  const url = new URL('/admin/dashboard', siteUrl);
  url.searchParams.set('fb', status);
  if (message) url.searchParams.set('fb_msg', message);
  return NextResponse.redirect(url);
}

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', siteUrl));
  }

  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  const error = request.nextUrl.searchParams.get('error_description');

  if (error) {
    return redirectToDashboard('error', error);
  }

  const cookieStore = await cookies();
  const expectedState = cookieStore.get('fb_oauth_state')?.value;
  cookieStore.delete('fb_oauth_state');

  if (!code || !state || !expectedState || state !== expectedState) {
    return redirectToDashboard('error', 'Invalid or expired connection request');
  }

  try {
    const shortLivedToken = await exchangeCodeForUserToken(code);
    const longLivedToken = await exchangeForLongLivedUserToken(shortLivedToken);
    const pages = await getManagedPages(longLivedToken);

    if (pages.length === 0) {
      return redirectToDashboard('error', 'No Facebook Page found for this account');
    }

    const page = pages[0];
    await saveFacebookConnection(page);

    return redirectToDashboard('connected', page.name);
  } catch (err) {
    console.error('Facebook OAuth callback error:', err);
    const message = err instanceof Error ? err.message : 'Connection failed';
    return redirectToDashboard('error', message);
  }
}
