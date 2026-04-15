import { describe, it, expect } from 'vitest';
import { locales, defaultLocale } from '../config';

/**
 * **Validates: Requirements 29.6, 18.7**
 * Property 9: Hreflang Etiketleri Bütünlüğü
 */

const BASE_URL = 'https://atamanlab.com';

function generateHreflangTags() {
  return [
    ...locales.map((locale) => ({
      hrefLang: locale,
      href: locale === defaultLocale ? BASE_URL : `${BASE_URL}/${locale}`,
    })),
    { hrefLang: 'x-default', href: BASE_URL },
  ];
}

describe('Property 9: Hreflang Etiketleri Bütünlüğü', () => {
  const tags = generateHreflangTags();

  it('generates exactly 4 hreflang tags (3 locales + x-default)', () => {
    expect(tags.length).toBe(4);
  });

  it('includes all supported locales', () => {
    const hrefLangs = tags.map((t) => t.hrefLang);
    for (const locale of locales) {
      expect(hrefLangs).toContain(locale);
    }
    expect(hrefLangs).toContain('x-default');
  });

  it('x-default points to the default locale (German) URL', () => {
    const xDefault = tags.find((t) => t.hrefLang === 'x-default');
    expect(xDefault?.href).toBe(BASE_URL);
  });

  it('all href values are valid URLs', () => {
    for (const tag of tags) {
      expect(() => new URL(tag.href)).not.toThrow();
    }
  });

  it('non-default locales have locale prefix in URL', () => {
    for (const locale of locales) {
      if (locale === defaultLocale) continue;
      const tag = tags.find((t) => t.hrefLang === locale);
      expect(tag?.href).toBe(`${BASE_URL}/${locale}`);
    }
  });
});
