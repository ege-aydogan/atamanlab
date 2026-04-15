/**
 * Utility functions for the Atamanlab corporate website.
 * Includes slug generation with Turkish character support and date formatting helpers.
 */

/** Turkish character mapping for URL-safe slug generation */
const TURKISH_CHAR_MAP: Record<string, string> = {
  ç: 'c',
  ğ: 'g',
  ı: 'i',
  ö: 'o',
  ş: 's',
  ü: 'u',
  İ: 'i',
  Ş: 's',
  Ç: 'c',
  Ğ: 'g',
  Ö: 'o',
  Ü: 'u',
};

/**
 * Generate a URL-safe slug from the given text with Turkish character support.
 *
 * - Converts Turkish characters to ASCII equivalents
 * - Lowercases the entire string
 * - Replaces spaces and non-alphanumeric characters with hyphens
 * - Removes consecutive hyphens
 * - Trims leading/trailing hyphens
 * - Returns 'untitled' for empty or whitespace-only input
 */
export function generateSlug(text: string): string {
  let slug = text;

  // Replace Turkish characters
  slug = slug.replace(
    /[çğışöüİŞÇĞÖÜ]/g,
    (char) => TURKISH_CHAR_MAP[char] ?? char,
  );

  slug = slug
    .toLowerCase()
    // Replace any non-alphanumeric character (except hyphen) with a hyphen
    .replace(/[^a-z0-9-]/g, '-')
    // Collapse consecutive hyphens into a single one
    .replace(/-{2,}/g, '-')
    // Trim leading and trailing hyphens
    .replace(/^-+|-+$/g, '');

  return slug || 'untitled';
}

/**
 * Format a date in long Turkish-style format: "15 Ocak 2025".
 * Accepts both Date objects and ISO date strings.
 *
 * @param date - Date object or ISO string
 * @param locale - BCP 47 locale string (defaults to 'tr-TR')
 */
export function formatDate(date: Date | string, locale: string = 'tr-TR'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Format a date in short dot-separated format: "15.01.2025".
 * Accepts both Date objects and ISO date strings.
 */
export function formatDateShort(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}
