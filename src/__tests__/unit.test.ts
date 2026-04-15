import { describe, it, expect } from 'vitest';
import { getDefaultTokens, generateCSSVariables } from '@/lib/theme';
import { generateSlug } from '@/lib/utils';
import { quoteFormSchema } from '@/lib/validations';
import { calculatePagination, getExpectedItemCount } from '@/lib/pagination';
import { locales, defaultLocale } from '@/i18n/config';

// ─── 1. Theme defaults ───────────────────────────────────────────────

describe('Theme defaults — getDefaultTokens()', () => {
  it('returns exactly 47 tokens', () => {
    const tokens = getDefaultTokens();
    expect(tokens).toHaveLength(47);
  });

  it('every token has a valid 6-digit hex value', () => {
    const tokens = getDefaultTokens();
    for (const token of tokens) {
      expect(token.tokenValue).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });

  it('every token has a non-empty tokenName', () => {
    const tokens = getDefaultTokens();
    for (const token of tokens) {
      expect(token.tokenName.length).toBeGreaterThan(0);
    }
  });

  it('token names are unique', () => {
    const tokens = getDefaultTokens();
    const names = tokens.map((t) => t.tokenName);
    expect(new Set(names).size).toBe(names.length);
  });
});

// ─── 2. Slug generation ──────────────────────────────────────────────

describe('Slug generation — Turkish character handling', () => {
  it('converts Turkish lowercase characters', () => {
    expect(generateSlug('çğışöü')).toBe('cgisou');
  });

  it('converts Turkish uppercase characters', () => {
    expect(generateSlug('ÇĞİŞÖÜ')).toBe('cgisou');
  });

  it('handles mixed Turkish text', () => {
    expect(generateSlug('Ürün Çeşitleri')).toBe('urun-cesitleri');
  });

  it('returns "untitled" for empty input', () => {
    expect(generateSlug('')).toBe('untitled');
  });

  it('returns "untitled" for whitespace-only input', () => {
    expect(generateSlug('   ')).toBe('untitled');
  });

  it('returns "untitled" for special-characters-only input', () => {
    expect(generateSlug('!@#$%^&*()')).toBe('untitled');
  });
});

// ─── 3. Form validation — quoteFormSchema ────────────────────────────

describe('Form validation — quoteFormSchema', () => {
  const validData = {
    fullName: 'Test User',
    email: 'test@example.com',
    company: 'Atamanlab',
    message: 'I need a quote',
  };

  it('accepts valid data', () => {
    const result = quoteFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects missing fullName', () => {
    const result = quoteFormSchema.safeParse({ ...validData, fullName: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toContain('fullName');
    }
  });

  it('rejects missing company', () => {
    const result = quoteFormSchema.safeParse({ ...validData, company: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toContain('company');
    }
  });

  it('rejects invalid email', () => {
    const result = quoteFormSchema.safeParse({ ...validData, email: 'not-an-email' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toContain('email');
    }
  });

  it('rejects empty message', () => {
    const result = quoteFormSchema.safeParse({ ...validData, message: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toContain('message');
    }
  });

  it('rejects completely empty object', () => {
    const result = quoteFormSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

// ─── 4. Category delete protection concept ───────────────────────────

describe('Category delete protection — logic test', () => {
  function canDeleteCategory(productCount: number): boolean {
    return productCount === 0;
  }

  it('allows deletion when product count is 0', () => {
    expect(canDeleteCategory(0)).toBe(true);
  });

  it('prevents deletion when product count > 0', () => {
    expect(canDeleteCategory(1)).toBe(false);
    expect(canDeleteCategory(5)).toBe(false);
    expect(canDeleteCategory(100)).toBe(false);
  });
});

// ─── 5. i18n config ──────────────────────────────────────────────────

describe('i18n config', () => {
  it('default locale is "de"', () => {
    expect(defaultLocale).toBe('de');
  });

  it('supported locales include "tr", "en", "de"', () => {
    expect(locales).toContain('tr');
    expect(locales).toContain('en');
    expect(locales).toContain('de');
  });

  it('has exactly 3 supported locales', () => {
    expect(locales).toHaveLength(3);
  });
});

// ─── 6. Pagination edge cases ────────────────────────────────────────

describe('Pagination — edge cases', () => {
  it('handles 0 total items', () => {
    const result = calculatePagination(0, 1, 10);
    expect(result.totalPages).toBe(1);
    expect(result.currentPage).toBe(1);
    expect(result.offset).toBe(0);
    expect(result.totalItems).toBe(0);
  });

  it('clamps page beyond total pages', () => {
    const result = calculatePagination(5, 100, 10);
    expect(result.currentPage).toBe(1);
    expect(result.offset).toBe(0);
  });

  it('clamps page 0 to page 1', () => {
    const result = calculatePagination(20, 0, 10);
    expect(result.currentPage).toBe(1);
    expect(result.offset).toBe(0);
  });

  it('clamps negative page to page 1', () => {
    const result = calculatePagination(20, -5, 10);
    expect(result.currentPage).toBe(1);
  });

  it('getExpectedItemCount returns 0 for 0 items', () => {
    expect(getExpectedItemCount(0, 1, 10)).toBe(0);
  });

  it('getExpectedItemCount returns 0 for page beyond total', () => {
    expect(getExpectedItemCount(5, 2, 10)).toBe(0);
  });

  it('getExpectedItemCount returns remainder on last page', () => {
    expect(getExpectedItemCount(15, 2, 10)).toBe(5);
  });
});
