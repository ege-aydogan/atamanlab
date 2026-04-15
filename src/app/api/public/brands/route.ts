import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: { displayOrder: 'asc' },
      include: { _count: { select: { products: true } } },
    });

    const data = brands.map((b) => ({
      id: b.id,
      name: b.name,
      slug: b.slug,
      logoUrl: b.logoUrl,
      websiteUrl: b.websiteUrl,
      productCount: b._count.products,
    }));

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { success: false, error: { message: 'Markalar yüklenemedi', code: 'INTERNAL_ERROR' } },
      { status: 500 },
    );
  }
}
