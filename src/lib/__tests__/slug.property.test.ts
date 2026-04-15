import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { generateSlug } from '../utils';

/**
 * Property 2: Slug Üretimi URL Güvenliği ve Determinizmi
 *
 * Validates: Requirements 22.2, 23.2, 24.2
 */
describe('Property 2: Slug Üretimi URL Güvenliği ve Determinizmi', () => {
  // Arbitrary that produces strings with Turkish and other unicode characters
  const unicodeArb = fc.stringMatching(/^[\u0000-\uFFFF]*$/);

  it('output contains only lowercase ASCII letters, digits, and hyphens (or is "untitled")', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const slug = generateSlug(input);
        expect(slug === 'untitled' || /^[a-z0-9-]+$/.test(slug)).toBe(true);
      }),
    );
  });

  it('output contains only lowercase ASCII letters, digits, and hyphens for unicode input (or is "untitled")', () => {
    fc.assert(
      fc.property(unicodeArb, (input) => {
        const slug = generateSlug(input);
        expect(slug === 'untitled' || /^[a-z0-9-]+$/.test(slug)).toBe(true);
      }),
    );
  });

  it('determinism: same input always produces same output', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const slug1 = generateSlug(input);
        const slug2 = generateSlug(input);
        expect(slug1).toBe(slug2);
      }),
    );
  });

  it('non-empty output: always returns a non-empty string', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const slug = generateSlug(input);
        expect(slug.length).toBeGreaterThan(0);
      }),
    );
  });

  it('non-empty output for unicode strings', () => {
    fc.assert(
      fc.property(unicodeArb, (input) => {
        const slug = generateSlug(input);
        expect(slug.length).toBeGreaterThan(0);
      }),
    );
  });

  it('no leading or trailing hyphens', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const slug = generateSlug(input);
        expect(slug.startsWith('-')).toBe(false);
        expect(slug.endsWith('-')).toBe(false);
      }),
    );
  });

  it('no consecutive hyphens', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const slug = generateSlug(input);
        expect(slug.includes('--')).toBe(false);
      }),
    );
  });

  it('no consecutive hyphens for unicode strings', () => {
    fc.assert(
      fc.property(unicodeArb, (input) => {
        const slug = generateSlug(input);
        expect(slug.includes('--')).toBe(false);
      }),
    );
  });
});
