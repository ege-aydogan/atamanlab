'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import type { ProductCardProps } from '@/types';

export function ProductCard({
  name,
  slug,
  categoryName,
  modelNumber,
  imageUrl,
  stockStatus,
  isNew,
  specifications,
}: ProductCardProps) {
  const t = useTranslations('Products');

  const displaySpecs = specifications.slice(0, 2);

  return (
    <Link
      href={`/urunler/${slug}` as any}
      className="group block bg-surface-container-lowest rounded-xl border border-outline-variant/10 overflow-hidden transition-shadow duration-700 hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-surface-container-low">
        <Image
          src={imageUrl || `https://picsum.photos/seed/${slug}/600/400`}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {stockStatus && (
            <span className="bg-white text-on-surface border border-on-surface/20 px-2.5 py-0.5 text-xs font-medium rounded-lg">
              {t('stockBadge')}
            </span>
          )}
          {isNew && (
            <span className="bg-white text-on-surface border border-on-surface/20 px-2.5 py-0.5 text-xs font-medium rounded-lg">
              {t('newBadge')}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category label */}
        <span className="text-xs font-medium uppercase tracking-wider text-secondary">
          {categoryName}
        </span>

        {/* Product name */}
        <h3 className="text-base font-semibold text-on-surface line-clamp-2 leading-snug">
          {name}
        </h3>

        {/* Spec grid */}
        {displaySpecs.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {displaySpecs.map((spec, i) => (
              <div key={i} className="bg-surface-container-low rounded-lg px-2.5 py-2">
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/70 mb-0.5">
                  {spec.key}
                </p>
                <p className="text-xs font-semibold text-on-surface truncate">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Model number + CTA */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-on-surface-variant">
            {modelNumber}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary group-hover:underline">
            {t('explore')}
            <Icon name="arrow_forward" className="text-sm" />
          </span>
        </div>
      </div>
    </Link>
  );
}
