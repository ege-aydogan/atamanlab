import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'tr', 'en'],
  defaultLocale: 'de',
  localePrefix: 'as-needed',
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/kurumsal': {
      de: '/unternehmen',
      tr: '/kurumsal',
      en: '/corporate',
    },
    '/markalar': {
      de: '/marken',
      tr: '/markalar',
      en: '/brands',
    },
    '/haberler': {
      de: '/nachrichten',
      tr: '/haberler',
      en: '/news',
    },
    '/haberler/[slug]': {
      de: '/nachrichten/[slug]',
      tr: '/haberler/[slug]',
      en: '/news/[slug]',
    },
    '/iletisim': {
      de: '/kontakt',
      tr: '/iletisim',
      en: '/contact',
    },
    '/impressum': '/impressum',
    '/cozumler': {
      de: '/loesungen',
      tr: '/cozumler',
      en: '/solutions',
    },
  },
});
