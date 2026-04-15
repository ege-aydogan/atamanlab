'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';

const SORT_OPTIONS = ['newest', 'nameAZ', 'popularity'] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

const SORT_KEYS: Record<SortOption, string> = {
  newest: 'sortNewest',
  nameAZ: 'sortNameAZ',
  popularity: 'sortPopularity',
};

export function SortDropdown() {
  const t = useTranslations('Products');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = (searchParams.get('sort') as SortOption) || 'newest';

  function handleSortChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'newest') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}` as any);
  }

  return (
    <div className="relative inline-flex items-center gap-2">
      <Icon name="sort" className="text-on-surface-variant text-lg" />
      <select
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="appearance-none bg-transparent text-sm font-medium text-on-surface cursor-pointer pr-6 focus:outline-2 focus:outline-offset-2 focus:outline-secondary rounded"
        aria-label="Sort products"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {t(SORT_KEYS[option])}
          </option>
        ))}
      </select>
      <Icon name="expand_more" className="absolute right-0 text-on-surface-variant text-lg pointer-events-none" />
    </div>
  );
}
