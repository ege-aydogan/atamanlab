'use client';

import { useTranslations } from 'next-intl';

export function AboutSection() {
  const t = useTranslations('Corporate');

  return (
    <section className="py-20">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left column: 5/12 — section label + heading */}
          <div className="lg:col-span-5">
            <span className="mb-2 block text-sm font-bold uppercase tracking-[0.1em] text-secondary">
              {t('aboutLabel')}
            </span>
            <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-on-surface md:text-4xl">
              {t('aboutTitle')}
            </h2>
          </div>

          {/* Right column: 7/12 — description + founder quote */}
          <div className="lg:col-span-7">
            <p className="mb-4 text-on-surface-variant leading-relaxed">
              {t('aboutDescription1')}
            </p>
            <p className="mb-8 text-on-surface-variant leading-relaxed">
              {t('aboutDescription2')}
            </p>

            {/* Founder quote */}
            <div className="border-l-4 border-secondary pl-6 py-2">
              <p className="text-on-surface italic mb-3">
                &ldquo;{t('founderQuote')}&rdquo;
              </p>
              <p className="text-sm font-bold text-on-surface">
                {t('founderName')}
              </p>
              <p className="text-xs text-secondary">
                {t('founderTitle')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
