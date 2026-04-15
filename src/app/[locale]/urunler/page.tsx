import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { SideNavigation } from '@/components/products/SideNavigation';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Pagination } from '@/components/products/Pagination';
import type { ProductCardProps } from '@/types';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Ürünler — Atamanlab',
  description:
    'Geniş ürün yelpazemizden ihtiyacınıza uygun laboratuvar ekipmanlarını keşfedin.',
  openGraph: {
    title: 'Ürünler — Atamanlab',
    description:
      'Geniş ürün yelpazemizden ihtiyacınıza uygun laboratuvar ekipmanlarını keşfedin.',
    type: 'website',
  },
};

const PAGE_SIZE = 9;

interface PageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
    sort?: string;
    inStock?: string;
  }>;
}

export default async function UrunlerPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const categorySlug = params.category || null;
  const page = Math.max(1, parseInt(params.page || '1', 10) || 1);
  const sort = params.sort || 'newest';
  const inStockOnly = params.inStock === 'true';

  // Fetch categories with product counts
  const categoriesRaw = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: 'asc' },
  });

  const categories = categoriesRaw.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    iconName: cat.iconName,
    productCount: cat._count.products,
  }));

  // Build product query filters
  const where: Record<string, unknown> = {};
  if (categorySlug) {
    const category = categoriesRaw.find((c) => c.slug === categorySlug);
    if (category) {
      where.categoryId = category.id;
    }
  }
  if (inStockOnly) {
    where.stockStatus = true;
  }

  // Sort order
  let orderBy: Record<string, string> = { createdAt: 'desc' };
  if (sort === 'nameAZ') {
    orderBy = { name: 'asc' };
  } else if (sort === 'popularity') {
    orderBy = { createdAt: 'desc' }; // fallback — no popularity field
  }

  // Count total for pagination
  const total = await prisma.product.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  // Fetch products
  const productsRaw = await prisma.product.findMany({
    where,
    orderBy,
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: { category: true },
  });

  const products: ProductCardProps[] = productsRaw.map((p) => {
    const images: string[] = JSON.parse(p.images || '[]');
    const specs: { key: string; value: string }[] = JSON.parse(p.specifications || '[]');
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      categoryName: p.category.name,
      modelNumber: p.modelNumber,
      imageUrl: images[0] || '',
      stockStatus: p.stockStatus,
      isNew: p.isNew,
      specifications: specs,
    };
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
      <div className="flex gap-8">
        <SideNavigation categories={categories} activeCategory={categorySlug} />
        <div className="flex-1 min-w-0">
          <ProductGrid products={products} />
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </section>
  );
}
