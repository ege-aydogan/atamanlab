import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdminAuth } from '@/lib/admin-auth';
import { createCategorySchema } from '@/lib/validations';
import { generateSlug } from '@/lib/utils';

export async function GET(req: Request) {
  return withAdminAuth(async () => {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json({ success: true, data: categories });
  }, req);
}

export async function POST(req: Request) {
  return withAdminAuth(async (r) => {
    const body = await r.json();
    const validated = createCategorySchema.parse(body);
    const slug = generateSlug(validated.name);

    const category = await prisma.category.create({
      data: {
        name: validated.name,
        slug,
        description: validated.description ?? null,
        iconName: validated.iconName,
        imageUrl: validated.imageUrl ?? null,
      },
    });

    return NextResponse.json({ success: true, data: category }, { status: 201 });
  }, req);
}
