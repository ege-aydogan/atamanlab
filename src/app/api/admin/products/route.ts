import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdminAuth } from '@/lib/admin-auth';
import { createProductSchema } from '@/lib/validations';
import { generateSlug } from '@/lib/utils';

export async function GET(req: Request) {
  return withAdminAuth(async () => {
    const products = await prisma.product.findMany({
      include: { category: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });

    const data = products.map((p) => ({
      ...p,
      features: JSON.parse(p.features),
      specifications: JSON.parse(p.specifications),
      images: JSON.parse(p.images),
      documents: JSON.parse(p.documents),
      accessories: JSON.parse(p.accessories),
    }));

    return NextResponse.json({ success: true, data });
  }, req);
}

export async function POST(req: Request) {
  return withAdminAuth(async (r) => {
    const body = await r.json();
    const validated = createProductSchema.parse(body);
    const slug = generateSlug(validated.name);

    const product = await prisma.product.create({
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

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  }, req);
}
