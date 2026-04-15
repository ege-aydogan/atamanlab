'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createNewsSchema } from '@/lib/validations';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import ImageUpload from '@/components/admin/ImageUpload';
import type { z } from 'zod';

type NewsForm = z.infer<typeof createNewsSchema>;

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<NewsForm>({
    resolver: zodResolver(createNewsSchema),
  });

  const coverImageUrl = watch('coverImageUrl') ?? '';

  useEffect(() => {
    fetch(`/api/admin/news/${id}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          const a = json.data;
          reset({
            title: a.title,
            categoryBadge: a.categoryBadge,
            excerpt: a.excerpt,
            content: a.content,
            coverImageUrl: a.coverImageUrl,
            publishedAt: a.publishedAt ? new Date(a.publishedAt).toISOString() : new Date().toISOString(),
          });
        }
      })
      .finally(() => setLoading(false));
  }, [id, reset]);

  async function onSubmit(data: NewsForm) {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/news/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        router.push('/admin/haberler');
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
      <h1 className="mb-6 text-2xl font-bold text-on-surface font-headline">Haberi Düzenle</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-error-container p-3 text-sm text-on-error-container">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input label="Başlık" {...register('title')} error={errors.title?.message} />
        <Input
          label="Kategori Etiketi"
          {...register('categoryBadge')}
          error={errors.categoryBadge?.message}
          placeholder="örn: TEKNOLOJİ, ETKİNLİK, KURUMSAL"
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-on-surface-variant">Özet</label>
          <textarea
            {...register('excerpt')}
            rows={2}
            className="w-full rounded-lg border border-outline-variant bg-transparent px-3 py-2.5 text-on-surface transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
          />
          {errors.excerpt && (
            <p className="text-sm text-error">{errors.excerpt.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-on-surface-variant">İçerik</label>
          <textarea
            {...register('content')}
            rows={8}
            className="w-full rounded-lg border border-outline-variant bg-transparent px-3 py-2.5 text-on-surface transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
          />
          {errors.content && (
            <p className="text-sm text-error">{errors.content.message}</p>
          )}
        </div>

        <ImageUpload
          label="Kapak Görseli"
          value={coverImageUrl}
          onChange={(url) => setValue('coverImageUrl', url)}
        />
        {errors.coverImageUrl && (
          <p className="text-sm text-error">{errors.coverImageUrl.message}</p>
        )}

        <Input
          label="Yayın Tarihi"
          type="datetime-local"
          {...register('publishedAt')}
          error={errors.publishedAt?.message}
        />

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Kaydediliyor...' : 'Güncelle'}
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/haberler')}>
            İptal
          </Button>
        </div>
      </form>
    </div>
  );
}
