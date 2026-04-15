import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdminAuth } from '@/lib/admin-auth';
import { createTeamMemberSchema } from '@/lib/validations';

export async function GET(req: Request) {
  return withAdminAuth(async () => {
    const members = await prisma.teamMember.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    return NextResponse.json({ success: true, data: members });
  }, req);
}

export async function POST(req: Request) {
  return withAdminAuth(async (r) => {
    const body = await r.json();
    const validated = createTeamMemberSchema.parse(body);

    const member = await prisma.teamMember.create({
      data: {
        fullName: validated.fullName,
        title: validated.title,
        expertiseLabel: validated.expertiseLabel ?? null,
        photoUrl: validated.photoUrl,
        displayOrder: validated.displayOrder,
      },
    });

    return NextResponse.json({ success: true, data: member }, { status: 201 });
  }, req);
}
