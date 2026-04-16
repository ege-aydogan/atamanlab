'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';

export function ContactSection() {
  const t = useTranslations('Corporate');

  return (
    <section className="py-20">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left column: 5/12 — contact info */}
          <div className="lg:col-span-5">
            <h2 className="mb-8 text-3xl font-extrabold tracking-[-0.02em] text-on-surface md:text-4xl">
              {t('contactTitle')}
            </h2>

            <div className="flex flex-col gap-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary-container/20">
                  <Icon name="location_on" className="text-2xl text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-on-surface mb-1">Ataman Lab</p>
                  <p className="text-on-surface-variant leading-relaxed">
                    Geistenbecker Feld 68<br />
                    41199 Mönchengladbach<br />
                    Deutschland
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary-container/20">
                  <Icon name="call" className="text-2xl text-secondary" />
                </div>
                <div>
                  <p className="text-on-surface-variant">Tel: +49 2166 2786926</p>
                  <p className="text-on-surface-variant">Fax: +49 2166 2786921</p>
                  <p className="text-on-surface-variant">Mobil: +49 173 5870579</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary-container/20">
                  <Icon name="mail" className="text-2xl text-secondary" />
                </div>
                <a href="mailto:info@atamanlab.com" className="text-secondary hover:underline">
                  info@atamanlab.com
                </a>
              </div>
            </div>
          </div>

          {/* Right column: 7/12 — Google Maps */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-xl h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.8!2d6.3886!3d51.1547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8b4e8c0000001%3A0x1!2sGeistenbecker+Feld+68%2C+41199+M%C3%B6nchengladbach!5e0!3m2!1sde!2sde!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Atamanlab Standort"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
