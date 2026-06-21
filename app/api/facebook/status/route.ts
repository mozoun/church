import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getFacebookConnection } from '@/lib/facebook';

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const connection = await getFacebookConnection();
  if (!connection) {
    return NextResponse.json({ connected: false });
  }

  return NextResponse.json({
    connected: true,
    pageName: connection.pageName,
    expiresAt: connection.expiresAt,
  });
}
