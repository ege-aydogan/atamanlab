'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';

interface BreadcrumbProps {
  categoryName: string;
  categorySlug: string;
  productName: string;
}

function Breadcrumb({ categoryName, categorySlug, productName }: BreadcrumbProps) {
  const t = useTranslations('Breadcrumb');

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs tracking-widest uppercase">
      <Link
        href={"/markalar" as any}
        className="text-on-surface-variant hover:text-secondary transition-colors"
      >
        {t('products')}
      </Link>
      <Icon name="chevron_right" className="text-on-surface-variant/50 text-sm" />
      <Link
        href={`/markalar` as any}
        className="text-on-surface-variant hover:text-secondary transition-colors"
      >
        {categoryName}
      </Link>
      <Icon name="chevron_right" className="text-on-surface-variant/50 text-sm" />
      <span className="text-secondary font-medium">{productName}</span>
    </nav>
  );
}

export { Breadcrumb };
export type { BreadcrumbProps };
