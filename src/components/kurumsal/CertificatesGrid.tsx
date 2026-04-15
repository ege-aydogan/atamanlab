'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';

const certificates = [
  {
    icon: 'verified',
    name: 'ISO 9001:2015',
    descriptionKey: 'Kalite Yönetim Sistemi',
  },
  {
    icon: 'eco',
    name: 'ISO 14001',
    descriptionKey: 'Çevre Yönetim Sistemi',
  },
  {
    icon: 'health_and_safety',
    name: 'ISO 45001',
    descriptionKey: 'İş Sağlığı ve Güvenliği',
  },
  {
    icon: 'science',
    name: 'ISO/IEC 17025',
    descriptionKey: 'Laboratuvar Yetkinliği',
  },
];

export function CertificatesGrid() {
  const t = useTranslations('Corporate');

  return (
    <section className="py-20">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
        {/* Centered heading */}
        <h2 className="mb-12 text-center text-3xl font-extrabold tracking-[-0.02em] text-on-surface md:text-4xl">
          {t('certificatesTitle')}
        </h2>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((cert) => (
            <div
              key={cert.name}
              className="group rounded-xl bg-surface-container-lowest p-6 text-center transition-colors duration-300 hover:bg-secondary-fixed"
            >
              <div className="mb-4 flex justify-center">
                <Icon
                  name={cert.icon}
                  className="text-4xl text-secondary group-hover:text-on-secondary-fixed"
                />
              </div>
              <h3 className="mb-2 font-bold text-on-surface group-hover:text-on-secondary-fixed">
                {cert.name}
              </h3>
              <p className="text-sm text-on-surface-variant group-hover:text-on-secondary-fixed-variant">
                {cert.descriptionKey}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
