import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: { select: { id: true, name: true, slug: true, iconName: true } },
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: { message: "Ürün bulunamadı", code: "NOT_FOUND" } },
        { status: 404 }
      );
    }

    const data = {
      ...product,
      features: JSON.parse(product.features),
      specifications: JSON.parse(product.specifications),
      images: JSON.parse(product.images),
      documents: JSON.parse(product.documents),
      accessories: JSON.parse(product.accessories),
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("GET /api/public/products/[slug] error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Ürün yüklenemedi", code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}
