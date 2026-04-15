import { describe, it, expect } from 'vitest';
import tr from '../../../messages/tr.json';
import en from '../../../messages/en.json';
import de from '../../../messages/de.json';

/**
 * **Validates: Requirements 29.3, 29.10**
 * Property 6: Mesaj Dosyası Anahtar Tutarlılığı
 */

function getKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return getKeys(value as Record<string, unknown>, fullKey);
    }
    return [fullKey];
  });
}

describe('Property 6: Mesaj Dosyası Anahtar Tutarlılığı', () => {
  const trKeys = getKeys(tr).sort();
  const enKeys = getKeys(en).sort();
  const deKeys = getKeys(de).sort();

  it('tr and en have identical key sets', () => {
    expect(trKeys).toEqual(enKeys);
  });

  it('tr and de have identical key sets', () => {
    expect(trKeys).toEqual(deKeys);
  });

  it('en and de have identical key sets', () => {
    expect(enKeys).toEqual(deKeys);
  });

  it('no empty string values in any locale', () => {
    const checkNoEmpty = (obj: Record<string, unknown>, locale: string, prefix = '') => {
      for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'string') {
          expect(value.trim().length, `${locale}:${fullKey} is empty`).toBeGreaterThan(0);
        } else if (typeof value === 'object' && value !== null) {
          checkNoEmpty(value as Record<string, unknown>, locale, fullKey);
        }
      }
    };
    checkNoEmpty(tr, 'tr');
    checkNoEmpty(en, 'en');
    checkNoEmpty(de, 'de');
  });
});
