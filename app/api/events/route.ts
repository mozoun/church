import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const events = await prisma.specialEvent.findMany({
      where: { isPublished: true },
      orderBy: { eventDate: 'asc' },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const event = await prisma.specialEvent.create({
      data: {
        title: body.title,
        description: body.description,
        eventDate: body.eventDate,
        startTime: body.startTime,
        endTime: body.endTime,
        location: body.location,
        imageUrl: body.imageUrl,
        isPublished: body.isPublished ?? true,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
