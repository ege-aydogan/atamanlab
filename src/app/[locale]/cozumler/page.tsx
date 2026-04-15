import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@/components/ui/Icon';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Solutions');
  return {
    title: `${t('title')} — Atamanlab`,
    description: t('subtitle'),
  };
}

export default async function SolutionsPage() {
  const t = await getTranslations('Solutions');

  const solutions = [
    { icon: 'biotech', titleKey: 's1Title', descKey: 's1Desc', image: '/uploads/images/sol-equipment.jpg' },
    { icon: 'science', titleKey: 's2Title', descKey: 's2Desc', image: '/uploads/images/sol-consumables.jpg' },
    { icon: 'health_and_safety', titleKey: 's3Title', descKey: 's3Desc', image: '/uploads/images/news-safety.jpg' },
    { icon: 'precision_manufacturing', titleKey: 's4Title', descKey: 's4Desc', image: '/uploads/images/sol-consulting.jpg' },
    { icon: 'local_shipping', titleKey: 's5Title', descKey: 's5Desc', image: '/uploads/images/news-business.jpg' },
    { icon: 'support_agent', titleKey: 's6Title', descKey: 's6Desc', image: '/uploads/images/news-website.jpg' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-primary-container overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-tertiary-fixed/10 rounded-full blur-[100px]" aria-hidden="true" />
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8">
          <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-tertiary-fixed">
            {t('label')}
          </span>
          <h1 className="text-5xl font-extrabold tracking-tighter text-white md:text-6xl mb-4">
            {t('title')}
          </h1>
          <p className="text-xl font-light text-white/70 max-w-2xl">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((sol, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl bg-surface-container-lowest border border-outline-variant/10 hover:shadow-xl transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={sol.image}
                    alt={t(sol.titleKey)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                      <span className="material-symbols-outlined text-2xl text-white">{sol.icon}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-on-surface mb-3 group-hover:text-secondary transition-colors">
                    {t(sol.titleKey)}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {t(sol.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl mb-4">
            {t('ctaTitle')}
          </h2>
          <p className="text-on-surface-variant max-w-xl mx-auto mb-8">
            {t('ctaDesc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 rounded-xl bg-secondary px-8 py-3.5 font-semibold text-white shadow-lg shadow-secondary/20 hover:bg-secondary/90 transition-all"
            >
              <Icon name="mail" className="text-lg" />
              {t('ctaButton')}
            </Link>
            <Link
              href="/markalar"
              className="inline-flex items-center gap-2 rounded-xl border border-outline-variant/30 px-8 py-3.5 font-semibold text-on-surface hover:bg-surface-container transition-all"
            >
              {t('ctaBrands')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
