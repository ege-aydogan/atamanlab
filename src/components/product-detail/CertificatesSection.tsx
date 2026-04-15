'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';

const certificates = [
  { icon: 'verified', name: 'ISO 9001:2015', description: 'Kalite Yönetim Sistemi' },
  { icon: 'shield', name: 'CE', description: 'Avrupa Uygunluk İşareti' },
  { icon: 'bolt', name: 'LVD & EMC', description: 'Düşük Gerilim & Elektromanyetik Uyumluluk' },
  { icon: 'science', name: 'GLP/GMP', description: 'İyi Laboratuvar & Üretim Uygulamaları' },
  { icon: 'local_hospital', name: 'ISO 13485', description: 'Tıbbi Cihaz Kalite Yönetimi' },
];

function CertificatesSection() {
  const t = useTranslations('ProductDetail');

  return (
    <section>
      <h2 className="text-xs uppercase tracking-widest text-secondary font-medium mb-6">
        {t('certificates')}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {certificates.map((cert) => (
          <div
            key={cert.name}
            className="flex flex-col items-center text-center p-4 rounded-xl bg-surface-container-low hover:bg-secondary-fixed/20 transition-colors"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-secondary-container/20 mb-3">
              <Icon name={cert.icon} className="text-2xl text-secondary" />
            </div>
            <p className="text-sm font-semibold text-on-surface">{cert.name}</p>
            <p className="text-xs text-on-surface-variant mt-1">{cert.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export { CertificatesSection };
