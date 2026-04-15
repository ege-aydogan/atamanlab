'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import DataTable, { Column } from '@/components/admin/DataTable';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { formatDateShort } from '@/lib/utils';

interface NewsArticle {
  id: number;
  title: string;
  categoryBadge: string;
  coverImageUrl: string;
  publishedAt: string;
}

export default function NewsListPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<NewsArticle | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch('/api/admin/news')
      .then((r) => r.json())
      .then((json) => { if (json.success) setArticles(json.data); })
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await fetch(`/api/admin/news/${deleteTarget.id}`, { method: 'DELETE' });
    setArticles((prev) => prev.filter((a) => a.id !== deleteTarget.id));
    setDeleteTarget(null);
    setDeleting(false);
  }

  const columns: Column<NewsArticle>[] = [
    {
      key: 'coverImageUrl',
      label: 'Görsel',
      render: (a) => (
        <img src={a.coverImageUrl} alt={a.title} className="h-10 w-14 rounded object-cover" />
      ),
    },
    { key: 'title', label: 'Başlık' },
    {
      key: 'categoryBadge',
      label: 'Kategori',
      render: (a) => (
        <span className="inline-block rounded-full bg-secondary-container/20 px-2 py-0.5 text-xs font-medium text-secondary">
          {a.categoryBadge}
        </span>
      ),
    },
    {
      key: 'publishedAt',
      label: 'Yayın Tarihi',
      render: (a) => formatDateShort(a.publishedAt),
    },
  ];

  if (loading) {
    return <p className="py-8 text-center text-on-surface-variant">Yükleniyor...</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-on-surface font-headline">Haberler</h1>
        <Button onClick={() => router.push('/admin/haberler/yeni')}>Yeni Haber Ekle</Button>
      </div>

      <DataTable
        columns={columns}
        data={articles}
        getKey={(a) => a.id}
        onEdit={(a) => router.push(`/admin/haberler/${a.id}/duzenle`)}
        onDelete={(a) => setDeleteTarget(a)}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Haberi Sil"
        message={`"${deleteTarget?.title}" haberini silmek istediğinize emin misiniz?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
