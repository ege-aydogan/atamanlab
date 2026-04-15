'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';

interface AccessoriesGridProps {
  accessories: { name: string; description: string; imageUrl?: string }[];
}

function AccessoriesGrid({ accessories }: AccessoriesGridProps) {
  const t = useTranslations('ProductDetail');

  if (!accessories.length) return null;

  return (
    <section>
      <h2 className="text-xs uppercase tracking-widest text-secondary font-medium mb-4">
        {t('accessories')}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {accessories.map((acc, idx) => (
          <div
            key={idx}
            className="flex gap-4 p-4 rounded-xl bg-surface-container-low"
          >
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-surface-container shrink-0">
              {acc.imageUrl ? (
                <Image
                  src={acc.imageUrl}
                  alt={acc.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="extension" className="text-2xl text-on-surface-variant/30" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-on-surface">{acc.name}</p>
              <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{acc.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export { AccessoriesGrid };
export type { AccessoriesGridProps };
