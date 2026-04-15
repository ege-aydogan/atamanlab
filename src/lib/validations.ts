import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Ürün adı zorunludur"),
  categoryId: z.number().int().positive("Kategori seçimi zorunludur"),
  modelNumber: z.string().min(1, "Model numarası zorunludur"),
  shortDescription: z.string().optional(),
  fullDescription: z.string().optional(),
  features: z.array(z.string()).default([]),
  specifications: z.array(z.object({
    key: z.string().min(1),
    value: z.string().min(1),
  })).default([]),
  stockStatus: z.boolean().default(true),
  isNew: z.boolean().default(false),
  images: z.array(z.string()).default([]),
  documents: z.array(z.object({
    name: z.string(),
    url: z.string(),
    size: z.string(),
  })).default([]),
  accessories: z.array(z.object({
    name: z.string(),
    description: z.string(),
    imageUrl: z.string().optional(),
  })).default([]),
});

export const createCategorySchema = z.object({
  name: z.string().min(1, "Kategori adı zorunludur"),
  description: z.string().optional(),
  iconName: z.string().min(1, "İkon adı zorunludur"),
  imageUrl: z.string().optional(),
});

export const createNewsSchema = z.object({
  title: z.string().min(1, "Başlık zorunludur"),
  categoryBadge: z.string().min(1, "Kategori etiketi zorunludur"),
  excerpt: z.string().min(1, "Özet zorunludur"),
  content: z.string().min(1, "İçerik zorunludur"),
  coverImageUrl: z.string().min(1, "Kapak görseli zorunludur"),
  publishedAt: z.string().datetime(),
});

export const createTeamMemberSchema = z.object({
  fullName: z.string().min(1, "Ad soyad zorunludur"),
  title: z.string().min(1, "Ünvan zorunludur"),
  expertiseLabel: z.string().optional(),
  photoUrl: z.string().min(1, "Fotoğraf zorunludur"),
  displayOrder: z.number().int().min(0),
});

export const updateThemeSchema = z.object({
  tokens: z.array(z.object({
    tokenName: z.string(),
    tokenValue: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Geçerli hex renk kodu giriniz"),
  })),
});

export const quoteFormSchema = z.object({
  fullName: z.string().min(1, "Ad soyad zorunludur"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  company: z.string().min(1, "Kurum/firma adı zorunludur"),
  message: z.string().min(1, "Mesaj zorunludur"),
  productId: z.number().optional(),
  productName: z.string().optional(),
});
