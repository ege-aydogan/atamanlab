import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdminAuth } from '@/lib/admin-auth';
import { createCategorySchema } from '@/lib/validations';
import { generateSlug } from '@/lib/utils';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: Request, context: RouteContext) {
  return withAdminAuth(async () => {
    const { id } = await context.params;
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
      include: { _count: { select: { products: true } } },
    });

    if (!category) {
      return NextResponse.json(
        { success: false, error: { message: 'Kategori bulunamadı', code: 'NOT_FOUND' } },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: category });
  }, req);
}

export async function PUT(req: Request, context: RouteContext) {
  return withAdminAuth(async (r) => {
    const { id } = await context.params;
    const body = await r.json();
    const validated = createCategorySchema.parse(body);
    const slug = generateSlug(validated.name);

    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: {
        name: validated.name,
        slug,
        description: validated.description ?? null,
        iconName: validated.iconName,
        imageUrl: validated.imageUrl ?? null,
      },
    });

    return NextResponse.json({ success: true, data: category });
  }, req);
}

export async function DELETE(req: Request, context: RouteContext) {
  return withAdminAuth(async () => {
    const { id } = await context.params;

    const productCount = await prisma.product.count({
      where: { categoryId: Number(id) },
    });

    if (productCount > 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Bu kategoride ürünler var, önce ürünleri silin veya taşıyın',
            code: 'CONFLICT',
          },
        },
        { status: 409 },
      );
    }

    await prisma.category.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true, data: null });
  }, req);
}
