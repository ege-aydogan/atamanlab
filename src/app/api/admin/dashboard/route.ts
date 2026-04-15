import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [products, categories, news, team] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.newsArticle.count(),
      prisma.teamMember.count(),
    ]);

    return NextResponse.json({
      success: true,
      data: { products, categories, news, team },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: { message: 'Veriler yüklenemedi', code: 'INTERNAL_ERROR' } },
      { status: 500 }
    );
  }
}
