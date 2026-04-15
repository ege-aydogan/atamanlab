'use client';

import { useTranslations } from 'next-intl';

export function PerformanceMatrix() {
  const t = useTranslations('WhySection');

  const metrics = [
    { label: t('successRate'), value: t('successRateValue') },
    { label: t('supportResponse'), value: t('supportResponseValue') },
    { label: t('activeInstallations'), value: t('activeInstallationsValue') },
    { label: t('productVariety'), value: t('productVarietyValue') },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary-container p-6 sm:p-8 md:p-12 text-white shadow-2xl">
      {/* Decorative blur */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full bg-secondary opacity-20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-bold">{t('performanceTitle')}</h3>
          <span className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 text-xs font-bold rounded uppercase tracking-wider whitespace-nowrap">
            {t('liveStatus')}
          </span>
        </div>

        {/* Metrics — 1 col mobile, 2 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-y-12 sm:gap-x-8">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex items-center gap-4 sm:block border-l-2 border-secondary/30 pl-4 sm:pl-6"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-on-primary-container sm:block sm:mb-2 whitespace-nowrap">
                {metric.label}
              </span>
              <div className="text-2xl sm:text-4xl font-bold tracking-tighter">
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mt-8 sm:mt-16 p-4 sm:p-6 bg-white/5 rounded-lg border border-white/10">
          <p className="text-sm font-light text-on-primary-container italic">
            &ldquo;{t('testimonialQuote')}&rdquo;
          </p>
          <div className="mt-3 sm:mt-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold text-white">
              {t('testimonialAuthor')}, {t('testimonialRole')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
