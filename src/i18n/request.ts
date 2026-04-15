import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

async function loadMessages(locale: string) {
  switch (locale) {
    case 'tr':
      return (await import('../../messages/tr.json')).default;
    case 'en':
      return (await import('../../messages/en.json')).default;
    case 'de':
    default:
      return (await import('../../messages/de.json')).default;
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !hasLocale(routing.locales, locale)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: await loadMessages(locale),
  };
});
