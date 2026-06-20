import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    // Check authentication
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const appointment = await prisma.appointment.create({
      data: {
        name: body.name,
        email: body.email,
        subject: body.subject,
        preferredDate: body.preferred_date,
        preferredTime: body.preferred_time,
        message: body.message,
        status: 'pending',
      },
    });

    // Send email notification
    try {
      await fetch('/api/send-appointment-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the appointment creation if email fails
    }

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}
