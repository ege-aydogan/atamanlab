'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
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

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<ProductForm>({
    resolver: zodResolver(createProductSchema) as any,
  });

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/categories').then((r) => r.json()),
      fetch(`/api/admin/products/${id}`).then((r) => r.json()),
    ]).then(([catJson, prodJson]) => {
      if (catJson.success) setCategories(catJson.data);
      if (prodJson.success) {
        const p = prodJson.data;
        reset({
          name: p.name,
          categoryId: p.categoryId,
          modelNumber: p.modelNumber,
          shortDescription: p.shortDescription ?? '',
          fullDescription: p.fullDescription ?? '',
          features: p.features,
          specifications: p.specifications,
          stockStatus: p.stockStatus,
          isNew: p.isNew,
          images: p.images,
          documents: p.documents,
          accessories: p.accessories,
        });
      }
      setLoading(false);
    });
  }, [id, reset]);

  async function onSubmit(data: ProductForm) {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
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

  if (loading) {
    return <p className="py-8 text-center text-on-surface-variant">Yükleniyor...</p>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-on-surface font-headline">Ürünü Düzenle</h1>

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
              values={field.value ?? []}
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
              values={field.value ?? []}
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
                {(field.value ?? []).map((url, i) => (
                  <ImageUpload
                    key={i}
                    value={url}
                    onChange={(newUrl) => {
                      const next = [...(field.value ?? [])];
                      if (newUrl) { next[i] = newUrl; } else { next.splice(i, 1); }
                      field.onChange(next);
                    }}
                  />
                ))}
                <ImageUpload
                  value=""
                  onChange={(url) => { if (url) field.onChange([...(field.value ?? []), url]); }}
                />
              </div>
            </div>
          )}
        />

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Kaydediliyor...' : 'Güncelle'}
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/urunler')}>
            İptal
          </Button>
        </div>
      </form>
    </div>
  );
}
