'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTeamMemberSchema } from '@/lib/validations';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import ImageUpload from '@/components/admin/ImageUpload';
import type { z } from 'zod';

type TeamMemberForm = z.infer<typeof createTeamMemberSchema>;

export default function EditTeamMemberPage() {
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
  } = useForm<TeamMemberForm>({
    resolver: zodResolver(createTeamMemberSchema),
  });

  const photoUrl = watch('photoUrl') ?? '';

  useEffect(() => {
    fetch(`/api/admin/team/${id}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          const m = json.data;
          reset({
            fullName: m.fullName,
            title: m.title,
            expertiseLabel: m.expertiseLabel ?? '',
            photoUrl: m.photoUrl,
            displayOrder: m.displayOrder,
          });
        }
      })
      .finally(() => setLoading(false));
  }, [id, reset]);

  async function onSubmit(data: TeamMemberForm) {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/team/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        router.push('/admin/ekip');
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
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-on-surface font-headline">Ekip Üyesini Düzenle</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-error-container p-3 text-sm text-on-error-container">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input label="Ad Soyad" {...register('fullName')} error={errors.fullName?.message} />
        <Input label="Ünvan" {...register('title')} error={errors.title?.message} />
        <Input label="Uzmanlık Alanı" {...register('expertiseLabel')} />
        <Input
          label="Görüntüleme Sırası"
          type="number"
          {...register('displayOrder', { valueAsNumber: true })}
          error={errors.displayOrder?.message}
        />

        <ImageUpload
          label="Fotoğraf"
          value={photoUrl}
          onChange={(url) => setValue('photoUrl', url)}
        />
        {errors.photoUrl && (
          <p className="text-sm text-error">{errors.photoUrl.message}</p>
        )}

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Kaydediliyor...' : 'Güncelle'}
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/ekip')}>
            İptal
          </Button>
        </div>
      </form>
    </div>
  );
}
