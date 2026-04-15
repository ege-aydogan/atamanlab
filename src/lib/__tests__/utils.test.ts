import { describe, it, expect } from 'vitest';
import { generateSlug, formatDate, formatDateShort } from '../utils';

describe('generateSlug', () => {
  it('converts a simple string to a slug', () => {
    expect(generateSlug('Hello World')).toBe('hello-world');
  });

  it('converts Turkish characters to ASCII equivalents', () => {
    expect(generateSlug('Çözümler ve Ürünler')).toBe('cozumler-ve-urunler');
    expect(generateSlug('Şişe Öğütücü')).toBe('sise-ogutucu');
    expect(generateSlug('İstanbul Güneşi')).toBe('istanbul-gunesi');
  });

  it('handles uppercase Turkish characters', () => {
    expect(generateSlug('ÇĞİÖŞÜ')).toBe('cgiosu');
  });

  it('removes special characters and replaces with hyphens', () => {
    expect(generateSlug('test@#$%value')).toBe('test-value');
  });

  it('collapses consecutive hyphens', () => {
    expect(generateSlug('a---b')).toBe('a-b');
    expect(generateSlug('hello   world')).toBe('hello-world');
  });

  it('trims leading and trailing hyphens', () => {
    expect(generateSlug('--hello--')).toBe('hello');
    expect(generateSlug('  hello  ')).toBe('hello');
  });

  it('returns "untitled" for empty string', () => {
    expect(generateSlug('')).toBe('untitled');
  });

  it('returns "untitled" for whitespace-only input', () => {
    expect(generateSlug('   ')).toBe('untitled');
  });

  it('returns "untitled" for special-characters-only input', () => {
    expect(generateSlug('!@#$%')).toBe('untitled');
  });

  it('preserves numbers', () => {
    expect(generateSlug('ISO 9001:2015')).toBe('iso-9001-2015');
  });

  it('handles mixed Turkish and ASCII', () => {
    expect(generateSlug('Laboratuvar Ekipmanları 2025')).toBe('laboratuvar-ekipmanlari-2025');
  });
});

describe('formatDate', () => {
  it('formats a Date object in Turkish locale by default', () => {
    const date = new Date(2025, 0, 15); // January 15, 2025
    const result = formatDate(date);
    expect(result).toBe('15 Ocak 2025');
  });

  it('formats an ISO string in Turkish locale by default', () => {
    const result = formatDate('2025-01-15T00:00:00.000Z');
    expect(result).toContain('Ocak');
    expect(result).toContain('2025');
  });

  it('respects a custom locale', () => {
    const date = new Date(2025, 0, 15);
    const result = formatDate(date, 'en-US');
    expect(result).toContain('January');
    expect(result).toContain('2025');
  });

  it('formats with German locale', () => {
    const date = new Date(2025, 0, 15);
    const result = formatDate(date, 'de-DE');
    expect(result).toContain('Januar');
    expect(result).toContain('2025');
  });
});

describe('formatDateShort', () => {
  it('formats a Date object as DD.MM.YYYY', () => {
    const date = new Date(2025, 0, 15);
    expect(formatDateShort(date)).toBe('15.01.2025');
  });

  it('pads single-digit day and month', () => {
    const date = new Date(2025, 2, 5); // March 5, 2025
    expect(formatDateShort(date)).toBe('05.03.2025');
  });

  it('formats an ISO string as DD.MM.YYYY', () => {
    // Use a date that won't shift across timezone boundaries
    const date = new Date(2025, 11, 31); // December 31, 2025
    expect(formatDateShort(date)).toBe('31.12.2025');
  });
});
