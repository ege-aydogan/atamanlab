'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <Icon name="search_off" className="text-7xl text-on-surface-variant/30 mb-6" />
      <h1 className="text-3xl font-bold text-on-surface mb-3">{t('title')}</h1>
      <p className="text-on-surface-variant mb-8 max-w-md">{t('description')}</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-primary-container text-on-primary-container px-6 py-3 font-medium text-sm transition-opacity hover:opacity-90 min-h-[44px] focus:outline-2 focus:outline-offset-2 focus:outline-secondary"
      >
        <Icon name="arrow_back" className="text-lg" />
        {t('backToProducts')}
      </Link>
    </section>
  );
}
