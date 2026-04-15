import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    console.error("GET /api/public/team error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Ekip üyeleri yüklenemedi", code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}
