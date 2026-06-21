import { NextRequest, NextResponse } from 'next/server';
import { sendAppointmentEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = await sendAppointmentEmail({
      name: body.name,
      email: body.email,
      subject: body.subject,
      preferredDate: body.preferred_date,
      preferredTime: body.preferred_time,
      message: body.message,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email notification' },
      { status: 500 }
    );
  }
}
