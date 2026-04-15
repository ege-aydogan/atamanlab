'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { FilterControls } from './FilterControls';

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  iconName: string;
  productCount: number;
}

interface SideNavigationProps {
  categories: CategoryItem[];
  activeCategory: string | null;
}

export function SideNavigation({ categories, activeCategory }: SideNavigationProps) {
  const t = useTranslations('Products');

  return (
    <aside className="hidden lg:block sticky top-[88px] self-start w-72 shrink-0">
      <nav
        className="rounded-xl bg-white/70 backdrop-blur-[12px] border border-outline-variant/15 p-4 space-y-1"
        aria-label={t('title')}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.slug;
          return (
            <Link
              key={category.id}
              href={
                isActive
                  ? '/markalar' as any
                  : `/markalar` as any
              }
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'border-l-[3px] border-secondary bg-gradient-to-r from-secondary/10 to-transparent shadow-[inset_0_0_12px_rgba(0,101,145,0.08)]'
                  : 'hover:bg-surface-container-low'
              }`}
            >
              <Icon
                name={category.iconName}
                className={`text-xl ${isActive ? 'text-secondary' : 'text-on-surface-variant'}`}
              />
              <span
                className={`flex-1 text-sm ${
                  isActive ? 'font-semibold text-secondary' : 'text-on-surface'
                }`}
              >
                {category.name}
              </span>
              <span
                className={`inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-md text-xs font-medium ${
                  isActive
                    ? 'bg-secondary text-on-secondary'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {category.productCount}
              </span>
            </Link>
          );
        })}
      </nav>

      <FilterControls />

      {/* Teknik Destek promo card */}
      <div className="mt-4 rounded-xl border border-outline-variant/15 bg-surface-container-lowest p-5">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="support_agent" className="text-secondary text-xl" />
          <h3 className="text-sm font-semibold text-on-surface">
            {t('techSupport')}
          </h3>
        </div>
        <p className="text-xs text-on-surface-variant mb-3">
          {t('description')}
        </p>
        <button className="text-xs font-semibold text-secondary hover:underline underline-offset-2 focus:outline-2 focus:outline-offset-2 focus:outline-secondary rounded">
          {t('askExpert')} →
        </button>
      </div>
    </aside>
  );
}
