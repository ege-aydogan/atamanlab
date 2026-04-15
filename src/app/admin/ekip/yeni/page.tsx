'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTeamMemberSchema } from '@/lib/validations';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import ImageUpload from '@/components/admin/ImageUpload';
import type { z } from 'zod';

type TeamMemberForm = z.infer<typeof createTeamMemberSchema>;

export default function NewTeamMemberPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TeamMemberForm>({
    resolver: zodResolver(createTeamMemberSchema),
    defaultValues: {
      fullName: '',
      title: '',
      expertiseLabel: '',
      photoUrl: '',
      displayOrder: 0,
    },
  });

  const photoUrl = watch('photoUrl');

  async function onSubmit(data: TeamMemberForm) {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/admin/team', {
        method: 'POST',
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

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-on-surface font-headline">Yeni Ekip Üyesi</h1>

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
            {submitting ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/ekip')}>
            İptal
          </Button>
        </div>
      </form>
    </div>
  );
}
