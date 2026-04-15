'use client';

import { useState, useCallback } from 'react';
import { Icon } from '@/components/ui/Icon';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  const upload = useCallback(
    async (file: File) => {
      setError('');
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
        const json = await res.json();
        if (json.success) {
          onChange(json.data.url);
        } else {
          setError(json.error?.message ?? 'Yükleme başarısız');
        }
      } catch {
        setError('Yükleme sırasında hata oluştu');
      } finally {
        setUploading(false);
      }
    },
    [onChange],
  );

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) upload(file);
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="text-sm font-medium text-on-surface-variant">{label}</span>
      )}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
          dragOver
            ? 'border-secondary bg-secondary-container/10'
            : 'border-outline-variant bg-surface-container-low'
        }`}
      >
        {value ? (
          <div className="relative w-full">
            <img
              src={value}
              alt="Yüklenen görsel"
              className="mx-auto max-h-40 rounded object-contain"
            />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(''); }}
              className="absolute right-2 top-2 rounded-full bg-error p-1 text-on-error"
              aria-label="Görseli kaldır"
            >
              <Icon name="close" className="text-base" />
            </button>
          </div>
        ) : (
          <>
            <Icon name="cloud_upload" className="mb-1 text-3xl text-on-surface-variant" />
            <p className="text-sm text-on-surface-variant">
              {uploading ? 'Yükleniyor...' : 'Sürükle & bırak veya tıkla'}
            </p>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 cursor-pointer opacity-0"
          disabled={uploading}
        />
      </div>
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
}
