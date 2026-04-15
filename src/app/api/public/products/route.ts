import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 9;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const categorySlug = searchParams.get("category");
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const sort = searchParams.get("sort") || "popularity";
    const inStock = searchParams.get("inStock");

    // Build where clause
    const where: Record<string, unknown> = {};

    if (categorySlug) {
      const category = await prisma.category.findUnique({
        where: { slug: categorySlug },
        select: { id: true },
      });
      if (category) {
        where.categoryId = category.id;
      } else {
        return NextResponse.json({
          success: true,
          data: { products: [], total: 0, page, pageSize: PAGE_SIZE },
        });
      }
    }

    if (inStock === "true") {
      where.stockStatus = true;
    }

    // Build orderBy
    let orderBy: Record<string, string>;
    switch (sort) {
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      case "name-az":
        orderBy = { name: "asc" };
        break;
      default:
        orderBy = { createdAt: "desc" };
        break;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        include: {
          category: { select: { name: true, slug: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    const data = products.map((product) => ({
      ...product,
      features: JSON.parse(product.features),
      specifications: JSON.parse(product.specifications),
      images: JSON.parse(product.images),
      documents: JSON.parse(product.documents),
      accessories: JSON.parse(product.accessories),
      categoryName: product.category.name,
      categorySlug: product.category.slug,
    }));

    return NextResponse.json({
      success: true,
      data: { products: data, total, page, pageSize: PAGE_SIZE },
    });
  } catch (error) {
    console.error("GET /api/public/products error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Ürünler yüklenemedi", code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}
