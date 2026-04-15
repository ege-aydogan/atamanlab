import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { withAdminAuth } from '@/lib/admin-auth';
import { updateThemeSchema } from '@/lib/validations';

export async function GET(req: Request) {
  return withAdminAuth(async () => {
    const tokens = await prisma.themeSetting.findMany({
      select: { id: true, tokenName: true, tokenValue: true },
      orderBy: { tokenName: 'asc' },
    });
    return NextResponse.json({ success: true, data: tokens });
  }, req);
}

export async function PUT(req: Request) {
  return withAdminAuth(async (r) => {
    const body = await r.json();
    const validated = updateThemeSchema.parse(body);

    for (const token of validated.tokens) {
      await prisma.themeSetting.upsert({
        where: { tokenName: token.tokenName },
        update: { tokenValue: token.tokenValue },
        create: { tokenName: token.tokenName, tokenValue: token.tokenValue },
      });
    }

    revalidatePath('/');

    const updated = await prisma.themeSetting.findMany({
      select: { id: true, tokenName: true, tokenValue: true },
      orderBy: { tokenName: 'asc' },
    });

    return NextResponse.json({ success: true, data: updated });
  }, req);
}
