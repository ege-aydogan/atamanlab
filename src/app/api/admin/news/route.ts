import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdminAuth } from '@/lib/admin-auth';
import { createNewsSchema } from '@/lib/validations';
import { generateSlug } from '@/lib/utils';

export async function GET(req: Request) {
  return withAdminAuth(async () => {
    const articles = await prisma.newsArticle.findMany({
      orderBy: { publishedAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: articles });
  }, req);
}

export async function POST(req: Request) {
  return withAdminAuth(async (r) => {
    const body = await r.json();
    const validated = createNewsSchema.parse(body);
    const slug = generateSlug(validated.title);

    const article = await prisma.newsArticle.create({
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

    return NextResponse.json({ success: true, data: article }, { status: 201 });
  }, req);
}
