'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';

const valueIcons = ['handshake', 'public', 'support_agent', 'verified', 'inventory_2', 'speed'];

export function ValueProps() {
  const t = useTranslations('Corporate');

  const values = [
    { icon: valueIcons[0], title: t('vp1Title'), desc: t('vp1Desc') },
    { icon: valueIcons[1], title: t('vp2Title'), desc: t('vp2Desc') },
    { icon: valueIcons[2], title: t('vp3Title'), desc: t('vp3Desc') },
    { icon: valueIcons[3], title: t('vp4Title'), desc: t('vp4Desc') },
    { icon: valueIcons[4], title: t('vp5Title'), desc: t('vp5Desc') },
    { icon: valueIcons[5], title: t('vp6Title'), desc: t('vp6Desc') },
  ];

  return (
    <section className="py-24 bg-surface-container-low">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-secondary">
            {t('valuePropsLabel')}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl">
            {t('valuePropsTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((item) => (
            <div
              key={item.title}
              className="rounded-xl bg-surface-container-lowest p-8 border border-outline-variant/10 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 mb-5">
                <Icon name={item.icon} className="text-2xl text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2">{item.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
