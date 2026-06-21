import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { disconnectFacebook } from '@/lib/facebook';

export async function POST() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await disconnectFacebook();
  return NextResponse.json({ success: true });
}
