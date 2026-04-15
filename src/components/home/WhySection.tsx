'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import { PerformanceMatrix } from './PerformanceMatrix';

export function WhySection() {
  const t = useTranslations('WhySection');

  return (
    <section className="py-32 bg-surface">
      <div className="mx-auto max-w-screen-2xl px-8">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
          {/* Left column: text + trust indicators */}
          <div>
            {/* Section label */}
            <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-secondary">
              {t('sectionLabel')}
            </span>

            {/* Title */}
            <h2 className="mb-8 text-5xl font-extrabold tracking-tight text-primary-container leading-tight">
              {t('title')}
            </h2>

            {/* Description paragraph */}
            <p className="text-base leading-relaxed text-on-surface-variant mb-10 max-w-xl">
              {t('description')}
            </p>

            {/* Trust indicators */}
            <div className="space-y-8">
              {/* Sertifikalı Güven */}
              <div className="flex items-start gap-6">
                <div className="shrink-0 rounded-lg bg-secondary-container/20 p-4">
                  <Icon name="verified" className="text-3xl text-secondary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary-container mb-1">
                    {t('certifiedTrust')}
                  </h4>
                  <p className="text-on-surface-variant font-light">
                    {t('certifiedTrustDesc')}
                  </p>
                </div>
              </div>

              {/* 7/24 Teknik Destek */}
              <div className="flex items-start gap-6">
                <div className="shrink-0 rounded-lg bg-tertiary-fixed/20 p-4">
                  <Icon name="support_agent" className="text-3xl text-on-tertiary-container" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary-container mb-1">
                    {t('support247')}
                  </h4>
                  <p className="text-on-surface-variant font-light">
                    {t('support247Desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: PerformanceMatrix */}
          <PerformanceMatrix />
        </div>
      </div>
    </section>
  );
}
