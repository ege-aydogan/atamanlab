'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import DataTable, { Column } from '@/components/admin/DataTable';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface Category {
  id: number;
  name: string;
  iconName: string;
  imageUrl: string | null;
  _count: { products: number };
}

export default function CategoryListPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    fetch('/api/admin/categories')
      .then((r) => r.json())
      .then((json) => { if (json.success) setCategories(json.data); })
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError('');
    const res = await fetch(`/api/admin/categories/${deleteTarget.id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) {
      setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    } else {
      setDeleteError(json.error?.message ?? 'Silme başarısız');
    }
    setDeleting(false);
  }

  const columns: Column<Category>[] = [
    {
      key: 'imageUrl',
      label: 'Görsel',
      render: (c) =>
        c.imageUrl ? (
          <img src={c.imageUrl} alt={c.name} className="h-10 w-10 rounded object-cover" />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded bg-surface-container text-on-surface-variant">
            <span className="material-symbols-outlined text-lg">{c.iconName}</span>
          </div>
        ),
    },
    { key: 'name', label: 'Kategori Adı' },
    {
      key: 'productCount',
      label: 'Ürün Sayısı',
      render: (c) => c._count.products,
    },
    {
      key: 'iconName',
      label: 'İkon',
      render: (c) => (
        <span className="material-symbols-outlined text-xl text-on-surface-variant">
          {c.iconName}
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
        <h1 className="text-2xl font-bold text-on-surface font-headline">Kategoriler</h1>
        <Button onClick={() => router.push('/admin/kategoriler/yeni')}>Yeni Kategori Ekle</Button>
      </div>

      <DataTable
        columns={columns}
        data={categories}
        getKey={(c) => c.id}
        onEdit={(c) => router.push(`/admin/kategoriler/${c.id}/duzenle`)}
        onDelete={(c) => { setDeleteError(''); setDeleteTarget(c); }}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Kategoriyi Sil"
        message={
          deleteError
            ? deleteError
            : deleteTarget && deleteTarget._count.products > 0
              ? `"${deleteTarget.name}" kategorisinde ${deleteTarget._count.products} ürün bulunuyor. Önce ürünleri silin veya taşıyın.`
              : `"${deleteTarget?.name}" kategorisini silmek istediğinize emin misiniz?`
        }
        confirmLabel={deleteTarget && deleteTarget._count.products > 0 ? 'Yine de Sil' : 'Sil'}
        onConfirm={handleDelete}
        onCancel={() => { setDeleteTarget(null); setDeleteError(''); }}
        loading={deleting}
      />
    </div>
  );
}
