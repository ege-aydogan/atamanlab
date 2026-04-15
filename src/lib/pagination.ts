export interface PaginationResult {
  offset: number;
  limit: number;
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export function calculatePagination(
  totalItems: number,
  page: number,
  pageSize: number
): PaginationResult {
  const safePage = Math.max(1, page);
  const safePageSize = Math.max(1, pageSize);
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const currentPage = Math.min(safePage, totalPages);
  const offset = (currentPage - 1) * safePageSize;
  const limit = safePageSize;

  return { offset, limit, totalPages, currentPage, totalItems };
}

export function getExpectedItemCount(
  totalItems: number,
  page: number,
  pageSize: number
): number {
  if (totalItems <= 0 || page < 1) return 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  if (page > totalPages) return 0;
  return Math.min(pageSize, totalItems - (page - 1) * pageSize);
}
