'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import DataTable, { Column } from '@/components/admin/DataTable';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface Brand {
  id: number;
  name: string;
  slug: string;
  logoUrl: string;
  websiteUrl: string | null;
  displayOrder: number;
}

export default function BrandsListPage() {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Brand | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch('/api/admin/brands')
      .then((r) => r.json())
      .then((json) => { if (json.success) setBrands(json.data); })
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await fetch(`/api/admin/brands/${deleteTarget.id}`, { method: 'DELETE' });
    setBrands((prev) => prev.filter((b) => b.id !== deleteTarget.id));
    setDeleteTarget(null);
    setDeleting(false);
  }

  const columns: Column<Brand>[] = [
    {
      key: 'logoUrl',
      label: 'Logo',
      render: (b) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={b.logoUrl} alt={b.name} className="h-8 w-auto object-contain" />
      ),
    },
    { key: 'name', label: 'Marka Adı' },
    { key: 'slug', label: 'Slug' },
    { key: 'displayOrder', label: 'Sıra', render: (b) => b.displayOrder },
  ];

  if (loading) return <p className="py-8 text-center text-on-surface-variant">Yükleniyor...</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-on-surface font-headline">Markalar</h1>
        <Button onClick={() => router.push('/admin/markalar/yeni')}>Yeni Marka Ekle</Button>
      </div>

      <DataTable
        columns={columns}
        data={brands}
        getKey={(b) => b.id}
        onEdit={(b) => router.push(`/admin/markalar/${b.id}/duzenle`)}
        onDelete={(b) => setDeleteTarget(b)}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Markayı Sil"
        message={`"${deleteTarget?.name}" markasını silmek istediğinize emin misiniz?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
