'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import DataTable, { Column } from '@/components/admin/DataTable';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface TeamMember {
  id: number;
  fullName: string;
  title: string;
  expertiseLabel: string | null;
  photoUrl: string;
  displayOrder: number;
}

export default function TeamListPage() {
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch('/api/admin/team')
      .then((r) => r.json())
      .then((json) => { if (json.success) setMembers(json.data); })
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await fetch(`/api/admin/team/${deleteTarget.id}`, { method: 'DELETE' });
    setMembers((prev) => prev.filter((m) => m.id !== deleteTarget.id));
    setDeleteTarget(null);
    setDeleting(false);
  }

  const columns: Column<TeamMember>[] = [
    {
      key: 'photoUrl',
      label: 'Fotoğraf',
      render: (m) => (
        <img src={m.photoUrl} alt={m.fullName} className="h-10 w-10 rounded-full object-cover" />
      ),
    },
    { key: 'fullName', label: 'Ad Soyad' },
    { key: 'title', label: 'Ünvan' },
    {
      key: 'expertiseLabel',
      label: 'Uzmanlık',
      render: (m) => m.expertiseLabel ?? '—',
    },
    {
      key: 'displayOrder',
      label: 'Sıra',
      render: (m) => m.displayOrder,
    },
  ];

  if (loading) {
    return <p className="py-8 text-center text-on-surface-variant">Yükleniyor...</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-on-surface font-headline">Ekip Üyeleri</h1>
        <Button onClick={() => router.push('/admin/ekip/yeni')}>Yeni Üye Ekle</Button>
      </div>

      <DataTable
        columns={columns}
        data={members}
        getKey={(m) => m.id}
        onEdit={(m) => router.push(`/admin/ekip/${m.id}/duzenle`)}
        onDelete={(m) => setDeleteTarget(m)}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Ekip Üyesini Sil"
        message={`"${deleteTarget?.fullName}" üyesini silmek istediğinize emin misiniz?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
