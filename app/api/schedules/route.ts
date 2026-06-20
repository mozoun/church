import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const schedules = await prisma.schedule.findMany({
      where: { isActive: true },
      orderBy: { dayOfWeek: 'asc' },
    });

    return NextResponse.json(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return NextResponse.json(
      { error: 'Failed to fetch schedules' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const schedule = await prisma.schedule.create({
      data: {
        dayOfWeek: body.dayOfWeek,
        serviceName: body.serviceName,
        startTime: body.startTime,
        endTime: body.endTime,
        description: body.description,
        isActive: body.isActive ?? true,
      },
    });

    return NextResponse.json(schedule, { status: 201 });
  } catch (error) {
    console.error('Error creating schedule:', error);
    return NextResponse.json(
      { error: 'Failed to create schedule' },
      { status: 500 }
    );
  }
}
