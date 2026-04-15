'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/config';

const localeLabels: Record<Locale, string> = {
  tr: 'TR',
  en: 'EN',
  de: 'DE',
};

interface LanguageSwitcherProps {
  isTransparent?: boolean;
}

export function LanguageSwitcher({ isTransparent = false }: LanguageSwitcherProps) {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSwitch = (locale: Locale) => {
    router.replace(pathname as any, { locale });
    setOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <>
      {/* Desktop: inline */}
      <div className="hidden md:flex items-center gap-0.5 text-[13px]">
        {(['tr', 'en', 'de'] as Locale[]).map((locale, index) => (
          <span key={locale} className="flex items-center">
            {index > 0 && (
              <span className={`mx-1.5 transition-colors duration-300 ${isTransparent ? 'text-white/25' : 'text-on-surface-variant/25'}`}>/</span>
            )}
            <button
              type="button"
              onClick={() => handleSwitch(locale)}
              className={`px-1 py-0.5 rounded transition-all duration-300 ${
                currentLocale === locale
                  ? isTransparent ? 'text-white font-bold' : 'text-secondary font-bold'
                  : isTransparent ? 'text-white/60 hover:text-white font-medium' : 'text-on-surface-variant/60 hover:text-on-surface font-medium'
              }`}
              aria-label={`Switch to ${localeLabels[locale]}`}
            >
              {localeLabels[locale]}
            </button>
          </span>
        ))}
      </div>

      {/* Mobile: dropdown */}
      <div ref={ref} className="relative md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-bold transition-all ${
            isTransparent
              ? 'text-white/80 hover:bg-white/10'
              : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          {localeLabels[currentLocale]}
          <span className={`material-symbols-outlined text-sm transition-transform ${open ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-1 rounded-xl bg-white shadow-xl border border-outline-variant/15 overflow-hidden min-w-[100px] z-50">
            {(['de', 'tr', 'en'] as Locale[]).map((locale) => (
              <button
                key={locale}
                onClick={() => handleSwitch(locale)}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                  currentLocale === locale
                    ? 'bg-secondary/10 text-secondary font-semibold'
                    : 'text-on-surface hover:bg-surface-container-low'
                }`}
              >
                {localeLabels[locale]}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
