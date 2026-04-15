import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdminAuth } from '@/lib/admin-auth';
import { z } from 'zod';
import { generateSlug } from '@/lib/utils';

const updateBrandSchema = z.object({
  name: z.string().min(1),
  logoUrl: z.string().min(1),
  websiteUrl: z.string().optional(),
  displayOrder: z.number().int().min(0).default(0),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: Request, context: RouteContext) {
  return withAdminAuth(async () => {
    const { id } = await context.params;
    const brand = await prisma.brand.findUnique({ where: { id: Number(id) } });
    if (!brand) {
      return NextResponse.json(
        { success: false, error: { message: 'Marka bulunamadı', code: 'NOT_FOUND' } },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: brand });
  }, req);
}

export async function PUT(req: Request, context: RouteContext) {
  return withAdminAuth(async (r) => {
    const { id } = await context.params;
    const body = await r.json();
    const validated = updateBrandSchema.parse(body);
    const slug = generateSlug(validated.name);

    const brand = await prisma.brand.update({
      where: { id: Number(id) },
      data: {
        name: validated.name,
        slug,
        logoUrl: validated.logoUrl,
        websiteUrl: validated.websiteUrl ?? null,
        displayOrder: validated.displayOrder,
      },
    });
    return NextResponse.json({ success: true, data: brand });
  }, req);
}

export async function DELETE(req: Request, context: RouteContext) {
  return withAdminAuth(async () => {
    const { id } = await context.params;
    await prisma.brand.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true, data: null });
  }, req);
}
