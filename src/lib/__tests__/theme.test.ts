import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { generateCSSVariables, ThemeToken } from '../theme';

/**
 * **Validates: Requirements 1.2, 2.2**
 *
 * Property 1: CSS Custom Property Üretimi Bütünlüğü
 * Round-trip test: generate arbitrary ThemeToken arrays → call generateCSSVariables()
 * → parse the output CSS → verify each token appears as `--color-{tokenName}: {tokenValue};`
 */

// Arbitrary for valid token names (lowercase ASCII + hyphens, non-empty)
const tokenNameArb = fc
  .stringMatching(/^[a-z][a-z\-]{0,28}[a-z]$/)
  .filter((s) => !s.includes('--'));

// Arbitrary for valid hex color values
const hexColorArb = fc
  .stringMatching(/^#[0-9a-f]{6}$/);

// Arbitrary for a single ThemeToken
const themeTokenArb: fc.Arbitrary<ThemeToken> = fc.record({
  tokenName: tokenNameArb,
  tokenValue: hexColorArb,
});

// Arbitrary for arrays of ThemeTokens with unique tokenNames
const themeTokenArrayArb = fc
  .uniqueArray(themeTokenArb, {
    comparator: (a, b) => a.tokenName === b.tokenName,
    minLength: 0,
    maxLength: 20,
  });

/**
 * Parse a CSS custom properties string back into token pairs.
 * Each line should be `--color-{name}: {value};`
 */
function parseCSSVariables(css: string): { name: string; value: string }[] {
  if (css.trim() === '') return [];
  return css
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const match = line.match(/^--color-(.+?):\s*(.+?);$/);
      if (!match) throw new Error(`Invalid CSS custom property line: "${line}"`);
      return { name: match[1], value: match[2] };
    });
}

describe('generateCSSVariables — Property 1: CSS Custom Property Üretimi Bütünlüğü', () => {
  it('every input token appears in the output as --color-{tokenName}: {tokenValue};', () => {
    fc.assert(
      fc.property(themeTokenArrayArb, (tokens) => {
        const css = generateCSSVariables(tokens);
        const parsed = parseCSSVariables(css);

        // Every input token must appear in the output
        expect(parsed.length).toBe(tokens.length);

        for (const token of tokens) {
          const found = parsed.find((p) => p.name === token.tokenName);
          expect(found).toBeDefined();
          expect(found!.value).toBe(token.tokenValue);
        }
      }),
      { numRuns: 200 },
    );
  });

  it('output contains only valid CSS custom property lines', () => {
    fc.assert(
      fc.property(themeTokenArrayArb, (tokens) => {
        const css = generateCSSVariables(tokens);
        if (tokens.length === 0) {
          expect(css).toBe('');
          return;
        }

        const lines = css
          .split('\n')
          .map((l) => l.trim())
          .filter((l) => l.length > 0);

        for (const line of lines) {
          expect(line).toMatch(/^--color-.+:\s*.+;$/);
        }
      }),
      { numRuns: 200 },
    );
  });

  it('output preserves token order from input', () => {
    fc.assert(
      fc.property(themeTokenArrayArb, (tokens) => {
        const css = generateCSSVariables(tokens);
        const parsed = parseCSSVariables(css);

        expect(parsed.length).toBe(tokens.length);
        for (let i = 0; i < tokens.length; i++) {
          expect(parsed[i].name).toBe(tokens[i].tokenName);
          expect(parsed[i].value).toBe(tokens[i].tokenValue);
        }
      }),
      { numRuns: 200 },
    );
  });
});
