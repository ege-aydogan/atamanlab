'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCategorySchema } from '@/lib/validations';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import ImageUpload from '@/components/admin/ImageUpload';
import type { z } from 'zod';

type CategoryForm = z.infer<typeof createCategorySchema>;

export default function NewCategoryPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CategoryForm>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: { name: '', description: '', iconName: '', imageUrl: '' },
  });

  const imageUrl = watch('imageUrl') ?? '';

  async function onSubmit(data: CategoryForm) {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        router.push('/admin/kategoriler');
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
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-on-surface font-headline">Yeni Kategori</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-error-container p-3 text-sm text-on-error-container">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input label="Kategori Adı" {...register('name')} error={errors.name?.message} />
        <Input label="İkon Adı (Material Symbols)" {...register('iconName')} error={errors.iconName?.message} placeholder="örn: biotech" />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-on-surface-variant">Açıklama</label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full rounded-lg border border-outline-variant bg-transparent px-3 py-2.5 text-on-surface transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
          />
        </div>

        <ImageUpload
          label="Kategori Görseli"
          value={imageUrl}
          onChange={(url) => setValue('imageUrl', url)}
        />

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/kategoriler')}>
            İptal
          </Button>
        </div>
      </form>
    </div>
  );
}
