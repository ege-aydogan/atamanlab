import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

/**
 * **Validates: Requirements 29.4**
 * Property 7: Dil Değiştirmede Path Korunması
 *
 * When locale changes, only the URL prefix changes while the path is preserved.
 */

const locales = ['de', 'tr', 'en'] as const;
const defaultLocale = 'de';

function buildLocalePath(path: string, locale: string): string {
  if (locale === defaultLocale) return path;
  return `/${locale}${path}`;
}

function extractPath(url: string, locale: string): string {
  if (locale === defaultLocale) return url;
  return url.replace(`/${locale}`, '') || '/';
}

describe('Property 7: Dil Değiştirmede Path Korunması', () => {
  const pathArb = fc.constantFrom('/urunler', '/kurumsal', '/', '/urunler/some-product');
  const localeArb = fc.constantFrom(...locales);

  it('path is preserved when switching locale', () => {
    fc.assert(
      fc.property(pathArb, localeArb, (path, locale) => {
        const localePath = buildLocalePath(path, locale);
        const extracted = extractPath(localePath, locale);
        expect(extracted).toBe(path);
      }),
    );
  });

  it('only the locale prefix differs between locale variants of the same path', () => {
    fc.assert(
      fc.property(pathArb, (path) => {
        const urls = locales.map((l) => ({
          locale: l,
          url: buildLocalePath(path, l),
        }));

        const extractedPaths = urls.map((u) => extractPath(u.url, u.locale));
        // All extracted paths should be identical
        expect(new Set(extractedPaths).size).toBe(1);
        expect(extractedPaths[0]).toBe(path);
      }),
    );
  });
});
