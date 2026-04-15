import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { formatDate } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = await prisma.newsArticle.findUnique({ where: { slug_locale: { slug, locale } } });
  if (!article) return { title: 'Not Found — Atamanlab' };
  return {
    title: `${article.title} — Atamanlab`,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, type: 'article' },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const t = await getTranslations('NewsPage');
  const tNews = await getTranslations('News');
  const article = await prisma.newsArticle.findUnique({ where: { slug_locale: { slug, locale } } });

  if (!article) notFound();

  return (
    <article className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest">
          <Link href="/haberler" className="text-on-surface-variant hover:text-secondary transition-colors">
            {tNews('title')}
          </Link>
          <span className="text-on-surface-variant/50">›</span>
          <span className="text-secondary font-medium">{article.categoryBadge}</span>
        </nav>

        {/* Badge + Date */}
        <div className="flex items-center gap-4 mb-6">
          <span className="bg-secondary text-white px-3 py-1 text-xs font-bold rounded">
            {article.categoryBadge}
          </span>
          <time className="text-xs font-bold text-outline-variant uppercase tracking-widest">
            {formatDate(article.publishedAt)}
          </time>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface mb-8 leading-tight">
          {article.title}
        </h1>

        {/* Cover image */}
        <div className="relative h-[400px] md:h-[500px] mb-10 overflow-hidden rounded-xl">
          <Image
            src={article.coverImageUrl}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-on-surface-variant leading-relaxed">
          {article.content.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-4">{paragraph}</p>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-outline-variant/15">
          <Link
            href="/haberler"
            className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline"
          >
            ← {t('backToNews')}
          </Link>
        </div>
      </div>
    </article>
  );
}
