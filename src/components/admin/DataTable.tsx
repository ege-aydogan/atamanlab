'use client';

import { Icon } from '@/components/ui/Icon';

export interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  getKey: (item: T) => string | number;
}

export default function DataTable<T>({
  columns,
  data,
  onEdit,
  onDelete,
  getKey,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-outline-variant/15 bg-surface-container-lowest">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-outline-variant/15">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant"
              >
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                İşlemler
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                className="px-4 py-8 text-center text-on-surface-variant"
              >
                Kayıt bulunamadı.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={getKey(item)}
                className="border-b border-outline-variant/10 transition-colors hover:bg-surface-container-low"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-on-surface">
                    {col.render
                      ? col.render(item)
                      : String((item as Record<string, unknown>)[col.key] ?? '')}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="rounded-lg p-1.5 text-on-surface-variant transition-colors hover:bg-secondary-container/20 hover:text-secondary"
                          aria-label="Düzenle"
                        >
                          <Icon name="edit" className="text-xl" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="rounded-lg p-1.5 text-on-surface-variant transition-colors hover:bg-error-container hover:text-error"
                          aria-label="Sil"
                        >
                          <Icon name="delete" className="text-xl" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
