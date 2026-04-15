import { describe, it, expect } from 'vitest';
import { getDefaultTokens, generateCSSVariables, ThemeToken } from '@/lib/theme';
import { generateSlug } from '@/lib/utils';
import { quoteFormSchema, createProductSchema, createCategorySchema } from '@/lib/validations';
import { calculatePagination, getExpectedItemCount } from '@/lib/pagination';

// ─── 1. Theme token round-trip ───────────────────────────────────────

describe('Theme token round-trip: getDefaultTokens → generateCSSVariables → parse back', () => {
  function parseCSSVariables(css: string): ThemeToken[] {
    if (css.trim() === '') return [];
    return css
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => {
        const match = line.match(/^--color-(.+?):\s*(.+?);$/);
        if (!match) throw new Error(`Invalid CSS line: "${line}"`);
        return { tokenName: match[1], tokenValue: match[2] };
      });
  }

  it('round-trips all default tokens through CSS generation and parsing', () => {
    const original = getDefaultTokens();
    const css = generateCSSVariables(original);
    const parsed = parseCSSVariables(css);

    expect(parsed).toHaveLength(original.length);

    for (let i = 0; i < original.length; i++) {
      expect(parsed[i].tokenName).toBe(original[i].tokenName);
      expect(parsed[i].tokenValue).toBe(original[i].tokenValue);
    }
  });

  it('generated CSS contains valid --color- prefixed properties', () => {
    const tokens = getDefaultTokens();
    const css = generateCSSVariables(tokens);
    const lines = css.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);

    for (const line of lines) {
      expect(line).toMatch(/^--color-[a-z0-9-]+:\s*#[0-9a-fA-F]{6};$/);
    }
  });

  it('empty token array produces empty CSS string', () => {
    expect(generateCSSVariables([])).toBe('');
  });
});

// ─── 2. Slug uniqueness ─────────────────────────────────────────────

describe('Slug uniqueness: different inputs produce different slugs', () => {
  it('distinct product names produce distinct slugs', () => {
    const names = [
      'UV-Vis Spektrofotometre',
      'Atomik Absorpsiyon Spektrometresi',
      'Dijital Büret',
      'Laboratuvar Santrifüjü',
      'pH Metre',
    ];
    const slugs = names.map(generateSlug);
    expect(new Set(slugs).size).toBe(names.length);
  });

  it('similar names with different Turkish chars produce different slugs', () => {
    const slug1 = generateSlug('Ürün A');
    const slug2 = generateSlug('Urun A');
    // Both should be 'urun-a' since ü→u
    expect(slug1).toBe(slug2);
  });

  it('case variations produce the same slug', () => {
    expect(generateSlug('Hello World')).toBe(generateSlug('hello world'));
  });

  it('different meaningful inputs produce different slugs', () => {
    const a = generateSlug('Spektrofotometre');
    const b = generateSlug('Santrifüj');
    expect(a).not.toBe(b);
  });
});

// ─── 3. Validation flow ─────────────────────────────────────────────

describe('Validation flow: valid data passes, invalid data fails with correct error paths', () => {
  describe('quoteFormSchema', () => {
    const validQuote = {
      fullName: 'Ali Veli',
      email: 'ali@example.com',
      company: 'Atamanlab',
      message: 'Teklif istiyorum',
    };

    it('valid data passes', () => {
      expect(quoteFormSchema.safeParse(validQuote).success).toBe(true);
    });

    it('valid data with optional fields passes', () => {
      const result = quoteFormSchema.safeParse({
        ...validQuote,
        productId: 42,
        productName: 'UV-Vis',
      });
      expect(result.success).toBe(true);
    });

    it('each required field missing individually produces error on that field', () => {
      const requiredFields = ['fullName', 'email', 'company', 'message'] as const;
      for (const field of requiredFields) {
        const data = { ...validQuote, [field]: '' };
        const result = quoteFormSchema.safeParse(data);
        expect(result.success).toBe(false);
        if (!result.success) {
          const errorPaths = result.error.issues.map((i) => i.path[0]);
          expect(errorPaths).toContain(field);
        }
      }
    });
  });

  describe('createCategorySchema', () => {
    const validCategory = {
      name: 'Spektroskopi',
      iconName: 'biotech',
    };

    it('valid data passes', () => {
      expect(createCategorySchema.safeParse(validCategory).success).toBe(true);
    });

    it('missing name fails', () => {
      const result = createCategorySchema.safeParse({ ...validCategory, name: '' });
      expect(result.success).toBe(false);
    });

    it('missing iconName fails', () => {
      const result = createCategorySchema.safeParse({ ...validCategory, iconName: '' });
      expect(result.success).toBe(false);
    });
  });

  describe('createProductSchema', () => {
    const validProduct = {
      name: 'UV-Vis Spektrofotometre',
      categoryId: 1,
      modelNumber: 'UV-2600i',
    };

    it('valid minimal data passes', () => {
      expect(createProductSchema.safeParse(validProduct).success).toBe(true);
    });

    it('missing name fails', () => {
      const result = createProductSchema.safeParse({ ...validProduct, name: '' });
      expect(result.success).toBe(false);
    });

    it('invalid categoryId fails', () => {
      const result = createProductSchema.safeParse({ ...validProduct, categoryId: -1 });
      expect(result.success).toBe(false);
    });
  });
});

// ─── 4. Pagination flow ─────────────────────────────────────────────

describe('Pagination flow: calculate pagination for various combos', () => {
  it('10 items, page 1, size 5 → 2 pages, offset 0', () => {
    const r = calculatePagination(10, 1, 5);
    expect(r.totalPages).toBe(2);
    expect(r.currentPage).toBe(1);
    expect(r.offset).toBe(0);
    expect(r.limit).toBe(5);
    expect(getExpectedItemCount(10, 1, 5)).toBe(5);
  });

  it('10 items, page 2, size 5 → offset 5', () => {
    const r = calculatePagination(10, 2, 5);
    expect(r.currentPage).toBe(2);
    expect(r.offset).toBe(5);
    expect(getExpectedItemCount(10, 2, 5)).toBe(5);
  });

  it('13 items, page 2, size 10 → last page has 3 items', () => {
    const r = calculatePagination(13, 2, 10);
    expect(r.totalPages).toBe(2);
    expect(r.currentPage).toBe(2);
    expect(r.offset).toBe(10);
    expect(getExpectedItemCount(13, 2, 10)).toBe(3);
  });

  it('0 items → 1 total page, page 1, offset 0', () => {
    const r = calculatePagination(0, 1, 10);
    expect(r.totalPages).toBe(1);
    expect(r.currentPage).toBe(1);
    expect(r.offset).toBe(0);
    expect(getExpectedItemCount(0, 1, 10)).toBe(0);
  });

  it('page beyond total clamps to last page', () => {
    const r = calculatePagination(25, 10, 10);
    expect(r.totalPages).toBe(3);
    expect(r.currentPage).toBe(3);
    expect(r.offset).toBe(20);
  });

  it('1 item, page 1, size 1 → single page', () => {
    const r = calculatePagination(1, 1, 1);
    expect(r.totalPages).toBe(1);
    expect(r.currentPage).toBe(1);
    expect(r.offset).toBe(0);
    expect(getExpectedItemCount(1, 1, 1)).toBe(1);
  });

  it('large dataset pagination is consistent', () => {
    const total = 1000;
    const pageSize = 25;
    const r = calculatePagination(total, 5, pageSize);
    expect(r.totalPages).toBe(40);
    expect(r.currentPage).toBe(5);
    expect(r.offset).toBe(100);
    expect(r.limit).toBe(25);
    expect(getExpectedItemCount(total, 5, pageSize)).toBe(25);
  });
});
