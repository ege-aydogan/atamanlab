import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { formatDate } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('NewsPage');
  return {
    title: `${t('title')} — Atamanlab`,
    description: t('title'),
  };
}

export default async function NewsListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('NewsPage');
  const articles = await prisma.newsArticle.findMany({
    where: { locale },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <section className="pt-28 pb-20">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="mb-16">
          <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-secondary">
            {t('label')}
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">
            {t('title')}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/haberler/${article.slug}` as any}
              className="group"
            >
              <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                <Image
                  src={article.coverImageUrl}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-secondary text-white px-3 py-1 text-xs font-bold rounded">
                    {article.categoryBadge}
                  </span>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-3 group-hover:text-secondary transition-colors">
                {article.title}
              </h2>
              <p className="text-on-surface-variant font-light mb-4 line-clamp-2">
                {article.excerpt}
              </p>
              <time className="text-xs font-bold text-outline-variant uppercase tracking-widest">
                {formatDate(article.publishedAt)}
              </time>
            </Link>
          ))}
        </div>

        {articles.length === 0 && (
          <p className="text-center text-on-surface-variant py-20">
            {t('empty')}
          </p>
        )}
      </div>
    </section>
  );
}
