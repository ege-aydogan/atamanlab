import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const tokens = await prisma.themeSetting.findMany({
      select: { tokenName: true, tokenValue: true },
    });

    return NextResponse.json({ success: true, data: tokens });
  } catch (error) {
    console.error("GET /api/public/theme error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Tema ayarları yüklenemedi", code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}
