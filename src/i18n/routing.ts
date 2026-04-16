import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  localePrefix: 'as-needed',
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/kurumsal': {
      de: '/unternehmen',
      en: '/corporate',
    },
    '/markalar': {
      de: '/marken',
      en: '/brands',
    },
    '/haberler': {
      de: '/nachrichten',
      en: '/news',
    },
    '/haberler/[slug]': {
      de: '/nachrichten/[slug]',
      en: '/news/[slug]',
    },
    '/iletisim': {
      de: '/kontakt',
      en: '/contact',
    },
    '/impressum': '/impressum',
    '/cozumler': {
      de: '/loesungen',
      en: '/solutions',
    },
  },
});
