'use client';

interface ThemePreviewProps {
  tokens: Record<string, string>;
}

export default function ThemePreview({ tokens }: ThemePreviewProps) {
  const get = (name: string) => tokens[name] ?? '#888888';

  return (
    <div
      className="rounded-xl border border-outline-variant/15 p-6"
      style={{ backgroundColor: get('surface') }}
    >
      <h3
        className="mb-4 text-sm font-semibold uppercase tracking-widest"
        style={{ color: get('on-surface-variant') }}
      >
        Önizleme
      </h3>

      {/* Buttons */}
      <div className="mb-4 flex flex-wrap gap-3">
        <button
          className="rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ backgroundColor: get('primary-container'), color: get('on-primary-container') }}
        >
          Birincil Buton
        </button>
        <button
          className="rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ backgroundColor: get('secondary'), color: get('on-secondary') }}
        >
          İkincil Buton
        </button>
        <button
          className="rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ backgroundColor: get('tertiary-fixed'), color: get('on-tertiary-fixed') }}
        >
          Üçüncül Buton
        </button>
      </div>

      {/* Card preview */}
      <div
        className="mb-4 rounded-xl p-4"
        style={{ backgroundColor: get('surface-container-low') }}
      >
        <p className="text-sm font-semibold" style={{ color: get('on-surface') }}>
          Örnek Kart Başlığı
        </p>
        <p className="mt-1 text-xs" style={{ color: get('on-surface-variant') }}>
          Bu bir önizleme kartıdır. Tema değişiklikleriniz burada görünür.
        </p>
        <span
          className="mt-2 inline-block rounded px-2 py-0.5 text-xs font-medium"
          style={{ backgroundColor: get('secondary-container'), color: get('on-secondary-container') }}
        >
          Etiket
        </span>
      </div>

      {/* Text samples */}
      <div className="space-y-1">
        <p className="text-sm font-semibold" style={{ color: get('on-surface') }}>
          Başlık Metni
        </p>
        <p className="text-xs" style={{ color: get('on-surface-variant') }}>
          Açıklama metni — on-surface-variant
        </p>
        <p className="text-xs" style={{ color: get('error') }}>
          Hata mesajı — error
        </p>
      </div>
    </div>
  );
}
