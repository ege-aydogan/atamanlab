'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import Image from 'next/image';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-[#0f172a] text-slate-50">
      {/* Top section: Logo + tagline */}
      <div className="mx-auto max-w-screen-2xl px-8 pt-16 pb-10 border-b border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Image
            src="/atamanlab-logo.png"
            alt="Atamanlab"
            width={200}
            height={50}
            className="h-12 w-auto brightness-0 invert"
          />
          <div className="md:border-l md:border-slate-700 md:pl-6">
            <p className="text-white text-lg font-semibold leading-snug max-w-md">
              {t('description')}
            </p>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto max-w-screen-2xl grid grid-cols-1 gap-10 py-12 px-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Kurumsal */}
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-sky-400">
            {t('companyTitle')}
          </h4>
          <ul className="space-y-3">
            <li>
              <Link href="/kurumsal" className="text-slate-400 hover:text-white transition-colors text-sm">
                {t('aboutUs')}
              </Link>
            </li>
            <li>
              <Link href="/kurumsal" className="text-slate-400 hover:text-white transition-colors text-sm">
                {t('team')}
              </Link>
            </li>
            <li>
              <Link href="/haberler" className="text-slate-400 hover:text-white transition-colors text-sm">
                {t('news')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: Hızlı Linkler */}
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-sky-400">
            {t('quickLinksTitle')}
          </h4>
          <ul className="space-y-3">
            <li>
              <Link href="/markalar" className="text-slate-400 hover:text-white transition-colors text-sm">
                {t('brands')}
              </Link>
            </li>
            <li>
              <Link href="/iletisim" className="text-slate-400 hover:text-white transition-colors text-sm">
                {t('support')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: İletişim */}
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-sky-400">
            {t('contactTitle')}
          </h4>
          <div className="space-y-3 text-sm">
            <a href="https://maps.google.com/?q=Geistenbecker+Feld+68,+41199+Mönchengladbach" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors">
              <Icon name="location_on" className="text-sky-400 shrink-0 mt-0.5" />
              <span>{t('address')}</span>
            </a>
            <a href="tel:+492166278692" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
              <Icon name="call" className="text-sky-400 shrink-0" />
              <span>{t('phone')}</span>
            </a>
            <a href="mailto:info@atamanlab.com" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
              <Icon name="mail" className="text-sky-400 shrink-0" />
              <span>{t('email')}</span>
            </a>
          </div>
        </div>

        {/* Column 4: Çalışma Saatleri + Social */}
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-sky-400">
            Mönchengladbach, DE
          </h4>
          <div className="space-y-3 text-sm text-slate-400 mb-6">
            <div className="flex items-center gap-3">
              <Icon name="schedule" className="text-sky-400 shrink-0" />
              <span>Mo–Fr: 08:00 – 17:00</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="public" className="text-sky-400 shrink-0" />
              <a href="https://www.atamanlab.com" className="hover:text-white transition-colors">www.atamanlab.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800 py-6 px-8">
        <div className="mx-auto max-w-screen-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">{t('copyright')}</p>
          <div className="flex items-center gap-4 text-slate-500 text-xs">
            <Link href="/impressum" className="hover:text-slate-300 transition-colors">Impressum</Link>
            <span>·</span>
            <Link href="/iletisim" className="hover:text-slate-300 transition-colors">{t('contactTitle')}</Link>
            <span>·</span>
            <span className="text-slate-600">
              Crafted by{' '}
              <a href="https://nimvola.com" target="_blank" rel="noopener noreferrer" className="text-sky-400/70 hover:text-sky-400 transition-colors">
                Nimvola
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
