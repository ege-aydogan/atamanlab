'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }
    router.push(`${pathname}?${params.toString()}` as any);
  }

  // Build page numbers to display
  const pages: number[] = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages, start + maxVisible - 1);
  start = Math.max(1, end - maxVisible + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-10" aria-label="Pagination">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          disabled={page === currentPage}
          className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors duration-200 ${
            page === currentPage
              ? 'bg-secondary text-on-secondary'
              : 'bg-surface-container-low text-on-surface hover:bg-secondary hover:text-white'
          }`}
          aria-current={page === currentPage ? 'page' : undefined}
          aria-label={`Page ${page}`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          onClick={() => goToPage(currentPage + 1)}
          className="w-10 h-10 rounded-lg bg-surface-container-low text-on-surface hover:bg-secondary hover:text-white transition-colors duration-200 flex items-center justify-center"
          aria-label="Next page"
        >
          <Icon name="chevron_right" className="text-lg" />
        </button>
      )}
    </nav>
  );
}
