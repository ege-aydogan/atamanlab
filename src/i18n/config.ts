export const locales = ['de', 'tr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'de';
