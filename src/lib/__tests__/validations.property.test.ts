import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  quoteFormSchema,
  createProductSchema,
  updateThemeSchema,
} from '../validations';

/**
 * Property 3: Zod Şema Doğrulama Tutarlılığı
 *
 * Validates: Requirements 15.5, 15.6, 22.6, 28.4
 */
describe('Property 3: Zod Şema Doğrulama Tutarlılığı', () => {
  // ── Arbitraries ──

  const nonEmptyStringArb = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0);

  const validEmailArb = fc
    .tuple(
      fc.stringMatching(/^[a-z][a-z0-9]{0,9}$/),
      fc.stringMatching(/^[a-z][a-z0-9]{0,5}$/),
      fc.constantFrom('com', 'org', 'net', 'de', 'tr'),
    )
    .map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

  const validHexColorArb = fc
    .stringMatching(/^[0-9a-fA-F]{6}$/)
    .map((hex) => `#${hex}`);

  const invalidHexColorArb = fc.oneof(
    fc.constant('#GGG000'),
    fc.constant('#12345'),
    fc.constant('123456'),
    fc.constant('#1234567'),
    fc.constant('red'),
    fc.constant(''),
  );

  const positiveIntArb = fc.integer({ min: 1, max: 100000 });

  // ── quoteFormSchema ──

  describe('quoteFormSchema', () => {
    const validQuoteFormArb = fc
      .tuple(nonEmptyStringArb, validEmailArb, nonEmptyStringArb, nonEmptyStringArb)
      .map(([fullName, email, company, message]) => ({
        fullName,
        email,
        company,
        message,
      }));

    it('valid data → safeParse succeeds', () => {
      fc.assert(
        fc.property(validQuoteFormArb, (data) => {
          const result = quoteFormSchema.safeParse(data);
          expect(result.success).toBe(true);
        }),
      );
    });

    it('missing required fields → safeParse fails', () => {
      const partialArb = fc.constantFrom(
        {},
        { fullName: 'Test' },
        { email: 'a@b.com' },
        { company: 'Firma' },
        { message: 'Mesaj' },
        { fullName: 'Test', email: 'a@b.com' },
      );

      fc.assert(
        fc.property(partialArb, (data) => {
          const result = quoteFormSchema.safeParse(data);
          expect(result.success).toBe(false);
        }),
      );
    });

    it('empty required string fields → safeParse fails', () => {
      fc.assert(
        fc.property(
          validEmailArb,
          fc.constantFrom('fullName', 'company', 'message') as fc.Arbitrary<'fullName' | 'company' | 'message'>,
          (email, field) => {
            const data = {
              fullName: 'Test',
              email,
              company: 'Firma',
              message: 'Mesaj',
              [field]: '',
            };
            const result = quoteFormSchema.safeParse(data);
            expect(result.success).toBe(false);
          },
        ),
      );
    });

    it('invalid email format → fails with email error', () => {
      const invalidEmailArb = fc.oneof(
        fc.constant('notanemail'),
        fc.constant('missing@'),
        fc.constant('@nodomain.com'),
        fc.constant('spaces in@email.com'),
        fc.constant('no-at-sign.com'),
      );

      fc.assert(
        fc.property(invalidEmailArb, (badEmail) => {
          const data = {
            fullName: 'Test',
            email: badEmail,
            company: 'Firma',
            message: 'Mesaj',
          };
          const result = quoteFormSchema.safeParse(data);
          expect(result.success).toBe(false);
          if (!result.success) {
            const emailIssue = result.error.issues.find((i) =>
              i.path.includes('email'),
            );
            expect(emailIssue).toBeDefined();
          }
        }),
      );
    });

    it('optional fields can be omitted', () => {
      fc.assert(
        fc.property(
          nonEmptyStringArb,
          validEmailArb,
          nonEmptyStringArb,
          nonEmptyStringArb,
          (fullName, email, company, message) => {
            const result = quoteFormSchema.safeParse({
              fullName,
              email,
              company,
              message,
              // productId and productName omitted
            });
            expect(result.success).toBe(true);
          },
        ),
      );
    });
  });

  // ── createProductSchema ──

  describe('createProductSchema', () => {
    const validProductArb = fc
      .tuple(nonEmptyStringArb, positiveIntArb, nonEmptyStringArb)
      .map(([name, categoryId, modelNumber]) => ({
        name,
        categoryId,
        modelNumber,
      }));

    it('valid required fields → safeParse succeeds', () => {
      fc.assert(
        fc.property(validProductArb, (data) => {
          const result = createProductSchema.safeParse(data);
          expect(result.success).toBe(true);
        }),
      );
    });

    it('missing required fields → safeParse fails', () => {
      const partialArb = fc.constantFrom(
        {},
        { name: 'Product' },
        { categoryId: 1 },
        { modelNumber: 'M-100' },
        { name: 'Product', categoryId: 1 },
      );

      fc.assert(
        fc.property(partialArb, (data) => {
          const result = createProductSchema.safeParse(data);
          expect(result.success).toBe(false);
        }),
      );
    });

    it('empty name or modelNumber → safeParse fails', () => {
      fc.assert(
        fc.property(
          positiveIntArb,
          fc.constantFrom('name', 'modelNumber') as fc.Arbitrary<'name' | 'modelNumber'>,
          (categoryId, field) => {
            const data = {
              name: 'Product',
              categoryId,
              modelNumber: 'M-100',
              [field]: '',
            };
            const result = createProductSchema.safeParse(data);
            expect(result.success).toBe(false);
          },
        ),
      );
    });

    it('non-positive categoryId → safeParse fails', () => {
      fc.assert(
        fc.property(
          nonEmptyStringArb,
          fc.integer({ min: -1000, max: 0 }),
          nonEmptyStringArb,
          (name, categoryId, modelNumber) => {
            const result = createProductSchema.safeParse({
              name,
              categoryId,
              modelNumber,
            });
            expect(result.success).toBe(false);
          },
        ),
      );
    });

    it('defaults are applied for optional array fields', () => {
      fc.assert(
        fc.property(validProductArb, (data) => {
          const result = createProductSchema.safeParse(data);
          expect(result.success).toBe(true);
          if (result.success) {
            expect(Array.isArray(result.data.features)).toBe(true);
            expect(Array.isArray(result.data.specifications)).toBe(true);
            expect(Array.isArray(result.data.images)).toBe(true);
            expect(Array.isArray(result.data.documents)).toBe(true);
            expect(Array.isArray(result.data.accessories)).toBe(true);
          }
        }),
      );
    });
  });

  // ── updateThemeSchema ──

  describe('updateThemeSchema', () => {
    it('valid hex colors → safeParse succeeds', () => {
      const validTokenArb = fc
        .tuple(nonEmptyStringArb, validHexColorArb)
        .map(([tokenName, tokenValue]) => ({ tokenName, tokenValue }));

      fc.assert(
        fc.property(fc.array(validTokenArb, { minLength: 1, maxLength: 10 }), (tokens) => {
          const result = updateThemeSchema.safeParse({ tokens });
          expect(result.success).toBe(true);
        }),
      );
    });

    it('invalid hex color → fails with regex error', () => {
      fc.assert(
        fc.property(nonEmptyStringArb, invalidHexColorArb, (tokenName, badColor) => {
          const result = updateThemeSchema.safeParse({
            tokens: [{ tokenName, tokenValue: badColor }],
          });
          expect(result.success).toBe(false);
          if (!result.success) {
            const colorIssue = result.error.issues.find((i) =>
              i.path.includes('tokenValue'),
            );
            expect(colorIssue).toBeDefined();
          }
        }),
      );
    });

    it('empty tokens array → safeParse succeeds', () => {
      const result = updateThemeSchema.safeParse({ tokens: [] });
      expect(result.success).toBe(true);
    });
  });
});
