'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';

interface TechSpecMatrixProps {
  specifications: { key: string; value: string }[];
}

function TechSpecMatrix({ specifications }: TechSpecMatrixProps) {
  const t = useTranslations('ProductDetail');

  if (!specifications.length) return null;

  return (
    <section>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-medium">
          {t('techSpecs')}
        </h2>
        <Badge variant="outline">ISO</Badge>
      </div>

      {/* Spec grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {specifications.map((spec, idx) => (
          <div
            key={idx}
            className="bg-surface-container-low rounded-xl p-5"
          >
            <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">
              {spec.key}
            </p>
            <p className="text-2xl font-bold text-on-surface">{spec.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export { TechSpecMatrix };
export type { TechSpecMatrixProps };
