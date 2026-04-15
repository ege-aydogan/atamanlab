import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdminAuth } from '@/lib/admin-auth';
import { createProductSchema } from '@/lib/validations';
import { generateSlug } from '@/lib/utils';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: Request, context: RouteContext) {
  return withAdminAuth(async () => {
    const { id } = await context.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: { category: { select: { id: true, name: true } } },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: { message: 'Ürün bulunamadı', code: 'NOT_FOUND' } },
        { status: 404 },
      );
    }

    const data = {
      ...product,
      features: JSON.parse(product.features),
      specifications: JSON.parse(product.specifications),
      images: JSON.parse(product.images),
      documents: JSON.parse(product.documents),
      accessories: JSON.parse(product.accessories),
    };

    return NextResponse.json({ success: true, data });
  }, req);
}

export async function PUT(req: Request, context: RouteContext) {
  return withAdminAuth(async (r) => {
    const { id } = await context.params;
    const body = await r.json();
    const validated = createProductSchema.parse(body);
    const slug = generateSlug(validated.name);

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: validated.name,
        slug,
        categoryId: validated.categoryId,
        modelNumber: validated.modelNumber,
        shortDescription: validated.shortDescription ?? null,
        fullDescription: validated.fullDescription ?? null,
        features: JSON.stringify(validated.features),
        specifications: JSON.stringify(validated.specifications),
        stockStatus: validated.stockStatus,
        isNew: validated.isNew,
        images: JSON.stringify(validated.images),
        documents: JSON.stringify(validated.documents),
        accessories: JSON.stringify(validated.accessories),
      },
    });

    return NextResponse.json({ success: true, data: product });
  }, req);
}

export async function DELETE(req: Request, context: RouteContext) {
  return withAdminAuth(async () => {
    const { id } = await context.params;
    await prisma.product.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true, data: null });
  }, req);
}
