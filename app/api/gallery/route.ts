import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { postPhotoToPage } from '@/lib/facebook';

export async function GET(request: NextRequest) {
  try {
    const showAll = request.nextUrl.searchParams.get('all') === 'true';
    const session = await getSession();

    const images = await prisma.galleryImage.findMany({
      where: showAll && session.isLoggedIn ? {} : { isActive: true },
      orderBy: { displayOrder: 'asc' },
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const image = await prisma.galleryImage.create({
      data: {
        title: body.title,
        description: body.description || null,
        imageUrl: body.imageUrl,
        displayOrder: body.displayOrder ?? 0,
        isActive: body.isActive ?? true,
      },
    });

    let facebook: { posted: boolean; reason?: string } = { posted: false };
    try {
      const caption = body.description ? `${body.title} - ${body.description}` : body.title;
      facebook = await postPhotoToPage(body.imageUrl, caption);
    } catch (fbError) {
      console.error('Facebook post failed:', fbError);
    }

    return NextResponse.json({ ...image, facebook }, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to create gallery image' },
      { status: 500 }
    );
  }
}
