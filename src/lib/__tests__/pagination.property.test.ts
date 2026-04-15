import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { calculatePagination, getExpectedItemCount } from '../pagination';

/**
 * Property 4: Sayfalama Doğruluğu
 *
 * Validates: Requirements 12.5
 */
describe('Property 4: Sayfalama Doğruluğu', () => {
  const totalItemsArb = fc.integer({ min: 0, max: 1000 });
  const pageArb = fc.integer({ min: 1, max: 100 });
  const pageSizeArb = fc.integer({ min: 1, max: 50 });

  it('expected item count = min(s, N - (p-1)*s) for valid pages', () => {
    fc.assert(
      fc.property(totalItemsArb, pageArb, pageSizeArb, (totalItems, page, pageSize) => {
        const totalPages = totalItems > 0 ? Math.ceil(totalItems / pageSize) : 0;
        const count = getExpectedItemCount(totalItems, page, pageSize);

        if (totalItems <= 0 || page > totalPages) {
          expect(count).toBe(0);
        } else {
          const expected = Math.min(pageSize, totalItems - (page - 1) * pageSize);
          expect(count).toBe(expected);
        }
      }),
    );
  });

  it('total pages = ceil(N/s) for positive N', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 1000 }),
        pageSizeArb,
        (totalItems, pageSize) => {
          const result = calculatePagination(totalItems, 1, pageSize);
          expect(result.totalPages).toBe(Math.ceil(totalItems / pageSize));
        },
      ),
    );
  });

  it('total pages is 1 when totalItems is 0', () => {
    fc.assert(
      fc.property(pageSizeArb, (pageSize) => {
        const result = calculatePagination(0, 1, pageSize);
        expect(result.totalPages).toBe(1);
      }),
    );
  });

  it('invalid page (> totalPages) → 0 items from getExpectedItemCount', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 1000 }),
        pageSizeArb,
        (totalItems, pageSize) => {
          const totalPages = Math.ceil(totalItems / pageSize);
          const invalidPage = totalPages + 1;
          expect(getExpectedItemCount(totalItems, invalidPage, pageSize)).toBe(0);
        },
      ),
    );
  });

  it('offset + limit covers the correct range', () => {
    fc.assert(
      fc.property(totalItemsArb, pageArb, pageSizeArb, (totalItems, page, pageSize) => {
        const result = calculatePagination(totalItems, page, pageSize);

        // offset should be non-negative
        expect(result.offset).toBeGreaterThanOrEqual(0);
        // limit should equal pageSize
        expect(result.limit).toBe(pageSize);
        // offset should be (currentPage - 1) * pageSize
        expect(result.offset).toBe((result.currentPage - 1) * pageSize);
        // currentPage should be within [1, totalPages]
        expect(result.currentPage).toBeGreaterThanOrEqual(1);
        expect(result.currentPage).toBeLessThanOrEqual(result.totalPages);
      }),
    );
  });

  it('currentPage is clamped to totalPages when page exceeds it', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }),
        pageSizeArb,
        (totalItems, pageSize) => {
          const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
          const largePage = totalPages + 10;
          const result = calculatePagination(totalItems, largePage, pageSize);
          expect(result.currentPage).toBe(totalPages);
        },
      ),
    );
  });
});
