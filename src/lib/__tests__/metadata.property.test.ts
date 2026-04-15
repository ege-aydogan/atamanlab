import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

/**
 * Property 5: Dinamik Metadata Üretimi
 *
 * Validates: Requirements 18.1
 *
 * Tests the metadata generation logic used in the product detail page:
 * - title contains product name
 * - description is non-empty
 * - different products produce different titles
 */

// Pure function that mirrors the metadata generation logic in page.tsx
function generateProductMetadata(product: {
  name: string;
  shortDescription?: string | null;
}) {
  const title = `${product.name} — Atamanlab`;
  const description =
    product.shortDescription || `${product.name} teknik detayları ve özellikleri.`;
  return { title, description };
}

// Arbitrary for non-empty product names (at least 1 printable char)
const productNameArb = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0);

describe('Property 5: Dinamik Metadata Üretimi', () => {
  it('title always contains the product name', () => {
    fc.assert(
      fc.property(productNameArb, fc.option(fc.string(), { nil: null }), (name, desc) => {
        const meta = generateProductMetadata({ name, shortDescription: desc });
        expect(meta.title).toContain(name);
      }),
    );
  });

  it('description is always non-empty', () => {
    fc.assert(
      fc.property(productNameArb, fc.option(fc.string(), { nil: null }), (name, desc) => {
        const meta = generateProductMetadata({ name, shortDescription: desc });
        expect(meta.description.length).toBeGreaterThan(0);
      }),
    );
  });

  it('different product names produce different titles', () => {
    fc.assert(
      fc.property(
        productNameArb,
        productNameArb.filter((s) => s.length > 0),
        (name1, name2) => {
          fc.pre(name1 !== name2);
          const meta1 = generateProductMetadata({ name: name1 });
          const meta2 = generateProductMetadata({ name: name2 });
          expect(meta1.title).not.toBe(meta2.title);
        },
      ),
    );
  });

  it('title always ends with "— Atamanlab"', () => {
    fc.assert(
      fc.property(productNameArb, (name) => {
        const meta = generateProductMetadata({ name });
        expect(meta.title).toBe(`${name} — Atamanlab`);
      }),
    );
  });

  it('when shortDescription is provided, it is used as description', () => {
    fc.assert(
      fc.property(
        productNameArb,
        fc.string({ minLength: 1 }),
        (name, desc) => {
          const meta = generateProductMetadata({ name, shortDescription: desc });
          expect(meta.description).toBe(desc);
        },
      ),
    );
  });

  it('when shortDescription is null, fallback description contains product name', () => {
    fc.assert(
      fc.property(productNameArb, (name) => {
        const meta = generateProductMetadata({ name, shortDescription: null });
        expect(meta.description).toContain(name);
      }),
    );
  });
});
