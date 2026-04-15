'use client';

import { useTranslations } from 'next-intl';
import { ProductCard } from './ProductCard';
import { SortDropdown } from './SortDropdown';
import { Icon } from '@/components/ui/Icon';
import type { ProductCardProps } from '@/types';

interface ProductGridProps {
  products: ProductCardProps[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const t = useTranslations('Products');

  return (
    <div className="flex-1 min-w-0">
      {/* Header: title + sort */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-on-surface">
          {t('title')}
        </h1>
        <SortDropdown />
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Icon name="inventory_2" className="text-5xl text-on-surface-variant/40 mb-4" />
          <p className="text-on-surface-variant">{t('noProducts')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
}
