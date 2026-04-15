// Theme
export interface ThemeToken {
  tokenName: string;
  tokenValue: string;
}

// Product Card
export interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  categoryName: string;
  modelNumber: string;
  imageUrl: string;
  stockStatus: boolean;
  isNew: boolean;
  specifications: { key: string; value: string }[];
}

// Quote Form
export interface QuoteFormData {
  fullName: string;
  email: string;
  company: string;
  message: string;
  productId?: number;
  productName?: string;
}

// Navigation
export interface NavLink {
  label: string;
  href: string;
  isActive: boolean;
}

// API Responses
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
    fields?: Record<string, string>;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// JSON field types (stored as String in Prisma, parsed in app layer)
export interface ProductSpecification {
  key: string;
  value: string;
}

export interface ProductDocument {
  name: string;
  url: string;
  size: string;
}

export interface ProductAccessory {
  name: string;
  description: string;
  imageUrl?: string;
}

// Supported locales
export type SupportedLocale = 'de' | 'tr' | 'en';
