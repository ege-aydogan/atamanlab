'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import ImageUpload from '@/components/admin/ImageUpload';

export default function NewBrandPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/admin/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, logoUrl, websiteUrl: websiteUrl || undefined, displayOrder }),
      });
      const json = await res.json();
      if (json.success) router.push('/admin/markalar');
      else setError(json.error?.message ?? 'Bir hata oluştu');
    } catch { setError('Bir hata oluştu'); }
    finally { setSubmitting(false); }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-on-surface font-headline">Yeni Marka</h1>
      {error && <div className="mb-4 rounded-lg bg-error-container p-3 text-sm text-on-error-container">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input label="Marka Adı" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="Website URL" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="https://..." />
        <Input label="Sıra" type="number" value={displayOrder} onChange={(e) => setDisplayOrder(Number(e.target.value))} />
        <ImageUpload label="Logo" value={logoUrl} onChange={(url) => setLogoUrl(url)} />
        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={submitting}>{submitting ? 'Kaydediliyor...' : 'Kaydet'}</Button>
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/markalar')}>İptal</Button>
        </div>
      </form>
    </div>
  );
}
