import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    const data = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      iconName: cat.iconName,
      imageUrl: cat.imageUrl,
      productCount: cat._count.products,
    }));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("GET /api/public/categories error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Kategoriler yüklenemedi", code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}
