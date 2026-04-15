'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';

interface HeroSectionProps {
  newsSlides?: {
    title: string;
    slug: string;
    excerpt: string;
    coverImageUrl: string;
    categoryBadge: string;
  }[];
}

export function HeroSection({ newsSlides = [] }: HeroSectionProps) {
  const t = useTranslations('Hero');
  const tNews = useTranslations('News');
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const slides = [
    {
      type: 'main' as const,
      label: t('categoryLabel'),
      title: t('title'),
      subtitle: t('subtitle'),
      imageUrl: '/uploads/images/hero-lab.jpg',
      linkHref: '/markalar',
      linkLabel: t('ctaPrimary'),
    },
    ...newsSlides.map((news) => ({
      type: 'news' as const,
      label: news.categoryBadge,
      title: news.title,
      subtitle: news.excerpt,
      imageUrl: news.coverImageUrl,
      linkHref: `/haberler/${news.slug}`,
      linkLabel: tNews('readMore'),
    })),
  ];

  const goTo = useCallback((index: number) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setTimeout(() => setAnimating(false), 50);
    }, 300);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, slides.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, slides.length, goTo]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  const slide = slides[current];

  return (
    <section className="relative h-screen flex flex-col justify-center overflow-hidden bg-primary-container">
      {/* Background images — crossfade */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? 'opacity-40' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          <Image
            src={s.imageUrl}
            alt=""
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/60 to-transparent"
        aria-hidden="true"
      />

      {/* Content with fade animation */}
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-8">
        <div
          className={`max-w-3xl transition-all duration-300 ${
            animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-tertiary-fixed">
            {slide.label}
          </span>

          <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tighter text-white md:text-7xl">
            {slide.title}
          </h1>

          <p className="mb-8 md:mb-10 text-lg md:text-xl font-light leading-relaxed text-white/70 max-w-2xl">
            {slide.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={slide.linkHref as any}
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-secondary px-6 md:px-8 py-3 md:py-4 font-semibold text-white shadow-xl shadow-secondary/20 transition-all duration-300 hover:bg-secondary/90 text-sm md:text-base"
            >
              {slide.linkLabel}
            </Link>

            {slide.type === 'main' && (
              <Link
                href="/kurumsal"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white/20 bg-white/10 px-6 md:px-8 py-3 md:py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 text-sm md:text-base"
              >
                {t('ctaSecondary')}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Slider controls */}
      {slides.length > 1 && (
        <>
          {/* Mobile: bottom bar */}
          <div className="absolute bottom-0 left-0 right-0 z-20 flex md:hidden items-center justify-between bg-black/30 backdrop-blur-sm px-6 py-4">
            <button
              onClick={prev}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white active:bg-white/20"
              aria-label="Previous"
            >
              <Icon name="chevron_left" className="text-2xl" />
            </button>
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-white' : 'w-3 bg-white/30'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white active:bg-white/20"
              aria-label="Next"
            >
              <Icon name="chevron_right" className="text-2xl" />
            </button>
          </div>

          {/* Desktop: bottom dots */}
          <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 items-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? 'w-10 bg-white' : 'w-4 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
