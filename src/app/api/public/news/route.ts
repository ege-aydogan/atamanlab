import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Math.max(1, parseInt(limitParam, 10) || 10) : undefined;

    const articles = await prisma.newsArticle.findMany({
      orderBy: { publishedAt: "desc" },
      ...(limit ? { take: limit } : {}),
    });

    return NextResponse.json({ success: true, data: articles });
  } catch (error) {
    console.error("GET /api/public/news error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Haberler yüklenemedi", code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}
