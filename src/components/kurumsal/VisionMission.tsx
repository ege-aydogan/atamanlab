'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';

export function VisionMission() {
  const t = useTranslations('Corporate');

  return (
    <section className="bg-surface-container-low py-20">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Vizyon card */}
          <div className="rounded-xl bg-surface-container-lowest border-l-4 border-secondary p-8">
            <div className="mb-4">
              <Icon name="visibility" className="text-3xl text-secondary" />
            </div>
            <h3 className="mb-3 text-xl font-bold tracking-[-0.02em] text-on-surface">
              {t('visionTitle')}
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              {t('visionDescription')}
            </p>
          </div>

          {/* Misyon card */}
          <div className="rounded-xl bg-surface-container-lowest border-l-4 border-tertiary-container p-8">
            <div className="mb-4">
              <Icon name="rocket_launch" className="text-3xl text-tertiary-container" />
            </div>
            <h3 className="mb-3 text-xl font-bold tracking-[-0.02em] text-on-surface">
              {t('missionTitle')}
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              {t('missionDescription')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
