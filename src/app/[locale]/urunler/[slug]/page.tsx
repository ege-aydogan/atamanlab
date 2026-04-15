import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Breadcrumb } from '@/components/product-detail/Breadcrumb';
import { ImageGallery } from '@/components/product-detail/ImageGallery';
import { ProductInfo } from '@/components/product-detail/ProductInfo';
import { TechSpecMatrix } from '@/components/product-detail/TechSpecMatrix';
import { CertificatesSection } from '@/components/product-detail/CertificatesSection';
import { DocumentsList } from '@/components/product-detail/DocumentsList';
import { AccessoriesGrid } from '@/components/product-detail/AccessoriesGrid';
import { QuoteForm } from '@/components/product-detail/QuoteForm';
import type {
  ProductSpecification,
  ProductDocument,
  ProductAccessory,
} from '@/types';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    return { title: 'Ürün Bulunamadı — Atamanlab' };
  }

  const title = `${product.name} — Atamanlab`;
  const description = product.shortDescription || `${product.name} teknik detayları ve özellikleri.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  // Parse JSON fields
  const features: string[] = JSON.parse(product.features || '[]');
  const specifications: ProductSpecification[] = JSON.parse(product.specifications || '[]');
  const images: string[] = JSON.parse(product.images || '[]');
  const documents: ProductDocument[] = JSON.parse(product.documents || '[]');
  const accessories: ProductAccessory[] = JSON.parse(product.accessories || '[]');

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 space-y-12">
      {/* Breadcrumb */}
      <Breadcrumb
        categoryName={product.category.name}
        categorySlug={product.category.slug}
        productName={product.name}
      />

      {/* Hero: Image Gallery + Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <ImageGallery images={images} productName={product.name} />
        </div>
        <div className="lg:col-span-5">
          <ProductInfo
            name={product.name}
            modelNumber={product.modelNumber}
            categoryName={product.category.name}
            shortDescription={product.shortDescription}
            features={features}
            isNew={product.isNew}
            stockStatus={product.stockStatus}
            documents={documents}
          />
        </div>
      </div>

      {/* Tech Specs */}
      <TechSpecMatrix specifications={specifications} />

      {/* Certificates */}
      <CertificatesSection />

      {/* Documents & Accessories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DocumentsList documents={documents} />
        <AccessoriesGrid accessories={accessories} />
      </div>

      {/* Quote Form */}
      <QuoteForm productId={product.id} productName={product.name} />
    </article>
  );
}
