import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { withAdminAuth } from '@/lib/admin-auth';
import { getDefaultTokens } from '@/lib/theme';

export async function POST(req: Request) {
  return withAdminAuth(async () => {
    const defaults = getDefaultTokens();

    // Delete all existing tokens and recreate from defaults
    await prisma.themeSetting.deleteMany();

    for (const token of defaults) {
      await prisma.themeSetting.create({
        data: { tokenName: token.tokenName, tokenValue: token.tokenValue },
      });
    }

    revalidatePath('/');

    return NextResponse.json({ success: true, data: defaults });
  }, req);
}
