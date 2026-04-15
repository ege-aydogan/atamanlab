import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdminAuth } from '@/lib/admin-auth';
import { createTeamMemberSchema } from '@/lib/validations';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: Request, context: RouteContext) {
  return withAdminAuth(async () => {
    const { id } = await context.params;
    const member = await prisma.teamMember.findUnique({
      where: { id: Number(id) },
    });

    if (!member) {
      return NextResponse.json(
        { success: false, error: { message: 'Ekip üyesi bulunamadı', code: 'NOT_FOUND' } },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: member });
  }, req);
}

export async function PUT(req: Request, context: RouteContext) {
  return withAdminAuth(async (r) => {
    const { id } = await context.params;
    const body = await r.json();
    const validated = createTeamMemberSchema.parse(body);

    const member = await prisma.teamMember.update({
      where: { id: Number(id) },
      data: {
        fullName: validated.fullName,
        title: validated.title,
        expertiseLabel: validated.expertiseLabel ?? null,
        photoUrl: validated.photoUrl,
        displayOrder: validated.displayOrder,
      },
    });

    return NextResponse.json({ success: true, data: member });
  }, req);
}

export async function DELETE(req: Request, context: RouteContext) {
  return withAdminAuth(async () => {
    const { id } = await context.params;
    await prisma.teamMember.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true, data: null });
  }, req);
}
