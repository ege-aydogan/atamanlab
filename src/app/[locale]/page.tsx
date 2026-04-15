import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { HeroSection } from '@/components/home/HeroSection';
import { BrandSlider } from '@/components/home/BrandSlider';
import { WhySection } from '@/components/home/WhySection';
import { NewsSection } from '@/components/home/NewsSection';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Atamanlab — Laboratuvar Ekipmanları',
  description:
    'Laboratuvar ekipmanlarında yenilikçi çözümler ve güvenilir teknoloji.',
  openGraph: {
    title: 'Atamanlab — Laboratuvar Ekipmanları',
    description:
      'Laboratuvar ekipmanlarında yenilikçi çözümler ve güvenilir teknoloji.',
    type: 'website',
  },
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const articles = await prisma.newsArticle.findMany({
    where: { locale },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  const newsData = articles.map((article) => ({
    id: article.id,
    title: article.title,
    slug: article.slug,
    categoryBadge: article.categoryBadge,
    excerpt: article.excerpt,
    coverImageUrl: article.coverImageUrl,
    publishedAt: article.publishedAt.toISOString(),
  }));

  return (
    <>
      <HeroSection newsSlides={newsData.map((a) => ({
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        coverImageUrl: a.coverImageUrl,
        categoryBadge: a.categoryBadge,
      }))} />
      <BrandSlider />
      <WhySection />
      <NewsSection articles={newsData} />
    </>
  );
}
