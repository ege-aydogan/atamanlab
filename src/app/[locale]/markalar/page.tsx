import { prisma } from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('BrandsPage');
  return {
    title: `${t('title')} — Atamanlab`,
    description: t('description'),
  };
}

export default async function BrandsPage() {
  const t = await getTranslations('BrandsPage');
  const brands = await prisma.brand.findMany({
    orderBy: { displayOrder: 'asc' },
    include: { _count: { select: { products: true } } },
  });

  return (
    <section className="pt-28 pb-20 bg-white">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="mb-16 text-center">
          <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-secondary">
            {t('label')}
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-on-surface-variant max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="group flex flex-col items-center justify-center rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-8 hover:shadow-lg hover:border-secondary/20 transition-all duration-300 cursor-default"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.logoUrl}
                alt={brand.name}
                className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <span className="mt-4 text-xs font-semibold text-on-surface-variant group-hover:text-secondary transition-colors duration-300">
                {brand.name}
              </span>
              {brand._count.products > 0 && (
                <span className="mt-1 text-[10px] text-on-surface-variant/50">
                  {brand._count.products} {t('productCount')}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
