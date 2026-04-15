'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProductSchema } from '@/lib/validations';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import ImageUpload from '@/components/admin/ImageUpload';
import DynamicListInput from '@/components/admin/DynamicListInput';
import KeyValueInput from '@/components/admin/KeyValueInput';
import type { z } from 'zod';

type ProductFormInput = z.input<typeof createProductSchema>;
type ProductForm = z.output<typeof createProductSchema>;

interface Category {
  id: number;
  name: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<ProductForm>({
    resolver: zodResolver(createProductSchema) as any,
    defaultValues: {
      name: '',
      categoryId: 0,
      modelNumber: '',
      shortDescription: '',
      fullDescription: '',
      features: [],
      specifications: [],
      stockStatus: true,
      isNew: false,
      images: [],
      documents: [],
      accessories: [],
    },
  });

  useEffect(() => {
    fetch('/api/admin/categories')
      .then((r) => r.json())
      .then((json) => { if (json.success) setCategories(json.data); });
  }, []);

  async function onSubmit(data: ProductForm) {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        router.push('/admin/urunler');
      } else {
        setError(json.error?.message ?? 'Bir hata oluştu');
      }
    } catch {
      setError('Bir hata oluştu');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-on-surface font-headline">Yeni Ürün</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-error-container p-3 text-sm text-on-error-container">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input label="Ürün Adı" {...register('name')} error={errors.name?.message} />

        <Select
          label="Kategori"
          {...register('categoryId', { valueAsNumber: true })}
          error={errors.categoryId?.message}
        >
          <option value={0}>Kategori seçin</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </Select>

        <Input label="Model Numarası" {...register('modelNumber')} error={errors.modelNumber?.message} />
        <Input label="Kısa Açıklama" {...register('shortDescription')} />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-on-surface-variant">Detaylı Açıklama</label>
          <textarea
            {...register('fullDescription')}
            rows={4}
            className="w-full rounded-lg border border-outline-variant bg-transparent px-3 py-2.5 text-on-surface transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
          />
        </div>

        <Controller
          name="features"
          control={control}
          render={({ field }) => (
            <DynamicListInput
              label="Öne Çıkan Özellikler"
              values={field.value}
              onChange={field.onChange}
              placeholder="Özellik..."
            />
          )}
        />

        <Controller
          name="specifications"
          control={control}
          render={({ field }) => (
            <KeyValueInput
              label="Teknik Spesifikasyonlar"
              values={field.value}
              onChange={field.onChange}
              keyPlaceholder="Parametre"
              valuePlaceholder="Değer"
            />
          )}
        />

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-on-surface">
            <input type="checkbox" {...register('stockStatus')} className="accent-secondary" />
            Stokta
          </label>
          <label className="flex items-center gap-2 text-sm text-on-surface">
            <input type="checkbox" {...register('isNew')} className="accent-secondary" />
            Yeni Ürün
          </label>
        </div>

        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-on-surface-variant">Ürün Görselleri</span>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {field.value.map((url, i) => (
                  <ImageUpload
                    key={i}
                    value={url}
                    onChange={(newUrl) => {
                      const next = [...field.value];
                      if (newUrl) { next[i] = newUrl; } else { next.splice(i, 1); }
                      field.onChange(next);
                    }}
                  />
                ))}
                <ImageUpload
                  value=""
                  onChange={(url) => { if (url) field.onChange([...field.value, url]); }}
                  label={field.value.length === 0 ? 'Görsel Ekle' : undefined}
                />
              </div>
            </div>
          )}
        />

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/urunler')}>
            İptal
          </Button>
        </div>
      </form>
    </div>
  );
}
