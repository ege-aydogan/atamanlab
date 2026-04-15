'use client';

import { Button } from '@/components/ui/Button';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Sil',
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="mx-4 w-full max-w-md rounded-xl bg-surface-container-lowest p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-on-surface">{title}</h3>
        <p className="mt-2 text-sm text-on-surface-variant">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={onCancel} disabled={loading}>
            İptal
          </Button>
          <Button
            size="sm"
            onClick={onConfirm}
            disabled={loading}
            className="bg-error text-on-error hover:opacity-90"
          >
            {loading ? 'Siliniyor...' : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
