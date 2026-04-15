import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdminAuth } from '@/lib/admin-auth';
import { createNewsSchema } from '@/lib/validations';
import { generateSlug } from '@/lib/utils';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: Request, context: RouteContext) {
  return withAdminAuth(async () => {
    const { id } = await context.params;
    const article = await prisma.newsArticle.findUnique({
      where: { id: Number(id) },
    });

    if (!article) {
      return NextResponse.json(
        { success: false, error: { message: 'Haber bulunamadı', code: 'NOT_FOUND' } },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: article });
  }, req);
}

export async function PUT(req: Request, context: RouteContext) {
  return withAdminAuth(async (r) => {
    const { id } = await context.params;
    const body = await r.json();
    const validated = createNewsSchema.parse(body);
    const slug = generateSlug(validated.title);

    const article = await prisma.newsArticle.update({
      where: { id: Number(id) },
      data: {
        title: validated.title,
        slug,
        categoryBadge: validated.categoryBadge,
        excerpt: validated.excerpt,
        content: validated.content,
        coverImageUrl: validated.coverImageUrl,
        publishedAt: new Date(validated.publishedAt),
      },
    });

    return NextResponse.json({ success: true, data: article });
  }, req);
}

export async function DELETE(req: Request, context: RouteContext) {
  return withAdminAuth(async () => {
    const { id } = await context.params;
    await prisma.newsArticle.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true, data: null });
  }, req);
}
