'use client';

import { useTranslations } from 'next-intl';

interface TeamMemberData {
  id: number;
  fullName: string;
  title: string;
  expertiseLabel: string | null;
  photoUrl: string;
}

interface TeamGridProps {
  members: TeamMemberData[];
}

export function TeamGrid({ members }: TeamGridProps) {
  const t = useTranslations('Corporate');

  if (members.length === 0) return null;

  const founder = members[0];

  return (
    <section className="py-24 bg-surface">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          {/* Left: Placeholder photo */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-container to-primary-container/70 flex items-center justify-center">
              {/* Decorative blur */}
              <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-secondary/20 blur-[80px]" aria-hidden="true" />
              <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-tertiary-fixed/20 blur-[60px]" aria-hidden="true" />

              {/* Initials + icon */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <span className="text-5xl font-bold text-white/80 tracking-tight">MA</span>
                </div>
              </div>

              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary-container/60 to-transparent" />
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-7">
            <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-secondary">
              {t('teamLabel')}
            </span>

            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 md:text-5xl">
              {founder.fullName}
            </h2>

            <p className="text-lg text-secondary font-medium mb-2">
              {founder.title}
            </p>

            {founder.expertiseLabel && (
              <p className="text-sm text-on-surface-variant mb-8">
                {founder.expertiseLabel}
              </p>
            )}

            {/* Founder quote */}
            <blockquote className="border-l-4 border-secondary pl-6 py-2 mb-8">
              <p className="text-xl text-on-surface italic leading-relaxed">
                &ldquo;{t('founderQuote')}&rdquo;
              </p>
            </blockquote>

            {/* Key highlights */}
            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-2 border-tertiary-fixed pl-4">
                <p className="text-3xl font-bold text-on-surface tracking-tight">15+</p>
                <p className="text-sm text-on-surface-variant mt-1">{t('statYears')}</p>
              </div>
              <div className="border-l-2 border-tertiary-fixed pl-4">
                <p className="text-3xl font-bold text-on-surface tracking-tight">40+</p>
                <p className="text-sm text-on-surface-variant mt-1">{t('statBrands')}</p>
              </div>
              <div className="border-l-2 border-tertiary-fixed pl-4">
                <p className="text-3xl font-bold text-on-surface tracking-tight">2009</p>
                <p className="text-sm text-on-surface-variant mt-1">{t('statFounded')}</p>
              </div>
              <div className="border-l-2 border-tertiary-fixed pl-4">
                <p className="text-3xl font-bold text-on-surface tracking-tight">DE</p>
                <p className="text-sm text-on-surface-variant mt-1">{t('statHQ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
