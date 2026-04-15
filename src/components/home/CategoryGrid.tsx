'use client';

import { useTranslations } from 'next-intl';
import { CategoryCard } from './CategoryCard';

export interface CategoryGridProps {
  categories: {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    iconName: string;
    imageUrl: string | null;
    productCount: number;
  }[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  const t = useTranslations('Categories');

  return (
    <section className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-screen-2xl px-8">
        {/* Header row: title left + editorial description right */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            {/* Section label */}
            <span className="mb-2 block text-sm font-bold uppercase tracking-widest text-secondary">
              {t('sectionLabel')}
            </span>

            {/* Section heading */}
            <h2 className="text-4xl font-bold tracking-tight text-on-surface">
              {t('title')}
            </h2>
          </div>

          {/* Editorial description */}
          <p className="text-on-surface-variant max-w-md font-light italic border-l-2 border-secondary pl-6">
            {t('editorialDescription')}
          </p>
        </div>

        {/* Grid or empty state */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                slug={category.slug}
                description={category.description}
                iconName={category.iconName}
                imageUrl={category.imageUrl}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-on-surface-variant">{t('emptyMessage')}</p>
        )}
      </div>
    </section>
  );
}
