import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdminAuth } from '@/lib/admin-auth';
import { z } from 'zod';
import { generateSlug } from '@/lib/utils';

const createBrandSchema = z.object({
  name: z.string().min(1, 'Marka adı zorunludur'),
  logoUrl: z.string().min(1, 'Logo zorunludur'),
  websiteUrl: z.string().optional(),
  displayOrder: z.number().int().min(0).default(0),
});

export async function GET(req: Request) {
  return withAdminAuth(async () => {
    const brands = await prisma.brand.findMany({
      orderBy: { displayOrder: 'asc' },
      include: { _count: { select: { products: true } } },
    });
    return NextResponse.json({ success: true, data: brands });
  }, req);
}

export async function POST(req: Request) {
  return withAdminAuth(async (r) => {
    const body = await r.json();
    const validated = createBrandSchema.parse(body);
    const slug = generateSlug(validated.name);

    const brand = await prisma.brand.create({
      data: {
        name: validated.name,
        slug,
        logoUrl: validated.logoUrl,
        websiteUrl: validated.websiteUrl ?? null,
        displayOrder: validated.displayOrder,
      },
    });

    return NextResponse.json({ success: true, data: brand }, { status: 201 });
  }, req);
}
