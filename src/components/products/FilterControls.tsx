'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

export function FilterControls() {
  const t = useTranslations('Products');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const inStock = searchParams.get('inStock') === 'true';

  function handleInStockChange(checked: boolean) {
    const params = new URLSearchParams(searchParams.toString());
    if (checked) {
      params.set('inStock', 'true');
    } else {
      params.delete('inStock');
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}` as any);
  }

  return (
    <div className="mt-4 rounded-xl bg-white/70 backdrop-blur-[12px] border border-outline-variant/15 p-4">
      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={inStock}
          onChange={(e) => handleInStockChange(e.target.checked)}
          className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary accent-secondary"
        />
        <span className="text-sm text-on-surface group-hover:text-secondary transition-colors">
          {t('inStockOnly')}
        </span>
      </label>
    </div>
  );
}
