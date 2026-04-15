'use client';

import { useTranslations } from 'next-intl';

export function KurumsalHero() {
  const t = useTranslations('Corporate');

  return (
    <section className="relative flex min-h-[614px] items-center overflow-hidden bg-primary-container">
      {/* Background image placeholder at 40% opacity with mix-blend-overlay */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          background:
            'linear-gradient(135deg, #0a1628 0%, #1a2a4a 40%, #0d1f3c 70%, #06101f 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-6 py-24 lg:px-12">
        <div className="max-w-2xl">
          {/* Category label */}
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.1em] text-tertiary-fixed">
            {t('heroLabel')}
          </span>

          {/* Main heading */}
          <h1 className="text-5xl font-extrabold leading-tight tracking-[-0.02em] text-white md:text-6xl lg:text-7xl">
            {t('heroTitle')}
          </h1>
        </div>
      </div>
    </section>
  );
}
