'use client';

import { Link } from '@/i18n/navigation';
import { formatDate } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface NewsSectionProps {
  articles: {
    id: number;
    title: string;
    slug: string;
    categoryBadge: string;
    excerpt: string;
    coverImageUrl: string;
    publishedAt: string;
  }[];
}

export function NewsSection({ articles }: NewsSectionProps) {
  const t = useTranslations('News');

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-surface-container-low overflow-hidden">
      <div className="mx-auto max-w-screen-2xl px-8">
        {/* Header row: title + view all link */}
        <div className="mb-10 sm:mb-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
            {t('title')}
          </h2>
          <Link
            href="/haberler"
            className="text-secondary font-bold transition-colors hover:underline text-sm sm:text-base"
          >
            {t('viewAll')} →
          </Link>
        </div>

        {/* News cards grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/haberler/${article.slug}` as any}
              className="group block"
            >
              {/* Image container */}
              <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                <Image
                  src={article.coverImageUrl}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Category badge overlay */}
                <div className="absolute top-4 left-4">
                  <span className="bg-secondary text-white px-3 py-1 text-xs font-bold rounded">
                    {article.categoryBadge}
                  </span>
                </div>
              </div>

              {/* Card content */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-secondary transition-colors">
                {article.title}
              </h3>
              <p className="text-on-surface-variant font-light mb-4 line-clamp-2">
                {article.excerpt}
              </p>
              <time className="text-xs font-bold text-outline-variant uppercase tracking-widest">
                {formatDate(article.publishedAt)}
              </time>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
