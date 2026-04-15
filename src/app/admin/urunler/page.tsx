'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import DataTable, { Column } from '@/components/admin/DataTable';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface Product {
  id: number;
  name: string;
  modelNumber: string;
  stockStatus: boolean;
  images: string[];
  category: { id: number; name: string };
}

export default function ProductListPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch('/api/admin/products')
      .then((r) => r.json())
      .then((json) => { if (json.success) setProducts(json.data); })
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await fetch(`/api/admin/products/${deleteTarget.id}`, { method: 'DELETE' });
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
    setDeleting(false);
  }

  const columns: Column<Product>[] = [
    {
      key: 'image',
      label: 'Görsel',
      render: (p) =>
        p.images[0] ? (
          <img src={p.images[0]} alt={p.name} className="h-10 w-10 rounded object-cover" />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded bg-surface-container text-on-surface-variant">
            <span className="material-symbols-outlined text-lg">image</span>
          </div>
        ),
    },
    { key: 'name', label: 'Ürün Adı' },
    {
      key: 'category',
      label: 'Kategori',
      render: (p) => p.category?.name ?? '—',
    },
    { key: 'modelNumber', label: 'Model No' },
    {
      key: 'stockStatus',
      label: 'Stok',
      render: (p) => (
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
            p.stockStatus
              ? 'bg-tertiary-container text-on-tertiary-container'
              : 'bg-error-container text-on-error-container'
          }`}
        >
          {p.stockStatus ? 'Stokta' : 'Tükendi'}
        </span>
      ),
    },
  ];

  if (loading) {
    return <p className="py-8 text-center text-on-surface-variant">Yükleniyor...</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-on-surface font-headline">Ürünler</h1>
        <Button onClick={() => router.push('/admin/urunler/yeni')}>Yeni Ürün Ekle</Button>
      </div>

      <DataTable
        columns={columns}
        data={products}
        getKey={(p) => p.id}
        onEdit={(p) => router.push(`/admin/urunler/${p.id}/duzenle`)}
        onDelete={(p) => setDeleteTarget(p)}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Ürünü Sil"
        message={`"${deleteTarget?.name}" ürününü silmek istediğinize emin misiniz?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
