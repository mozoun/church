import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();

    if (!session.isLoggedIn) {
      return NextResponse.json({ isLoggedIn: false });
    }

    return NextResponse.json({
      isLoggedIn: true,
      user: {
        userId: session.userId,
        email: session.email,
      },
    });
  } catch (error) {
    return NextResponse.json({ isLoggedIn: false });
  }
}
