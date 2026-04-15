'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface CategoryCardProps {
  name: string;
  slug: string;
  description: string | null;
  iconName: string;
  imageUrl: string | null;
}

export function CategoryCard({ name, slug, description, iconName, imageUrl }: CategoryCardProps) {
  const t = useTranslations('Categories');

  return (
    <Link
      href={`/markalar` as any}
      className="group relative block aspect-[3/4] overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 focus:outline-2 focus:outline-offset-2 focus:outline-secondary"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <Image
            src={`https://picsum.photos/seed/${slug}/600/800`}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}
      </div>

      {/* Gradient overlay: 3-stop stronger gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-primary-container/95 via-primary-container/40 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-8 text-white">
        {/* Material Symbols icon */}
        <span
          className="material-symbols-outlined block text-4xl mb-4 text-tertiary-fixed whitespace-nowrap overflow-hidden w-10 h-10"
          aria-hidden="true"
        >
          {iconName}
        </span>

        {/* Category name */}
        <h3 className="text-2xl font-bold mb-2">{name}</h3>

        {/* Description */}
        {description && (
          <p className="text-on-primary-container text-sm mb-6 line-clamp-3">{description}</p>
        )}

        {/* Explore link */}
        <span className="inline-flex items-center gap-2 font-semibold text-secondary-container hover:gap-4 transition-all">
          {t('explore')}
          <span className="material-symbols-outlined text-sm" aria-hidden="true">
            arrow_forward
          </span>
        </span>
      </div>
    </Link>
  );
}
