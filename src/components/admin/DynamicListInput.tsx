'use client';

import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

interface DynamicListInputProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export default function DynamicListInput({
  label,
  values,
  onChange,
  placeholder = 'Yeni öğe...',
}: DynamicListInputProps) {
  function add() {
    onChange([...values, '']);
  }

  function update(index: number, value: string) {
    const next = [...values];
    next[index] = value;
    onChange(next);
  }

  function remove(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-on-surface-variant">{label}</span>
      <div className="space-y-2">
        {values.map((val, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={val}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 rounded-lg border border-outline-variant bg-transparent px-3 py-2 text-sm text-on-surface transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="rounded-lg p-1.5 text-on-surface-variant transition-colors hover:bg-error-container hover:text-error"
              aria-label="Öğeyi kaldır"
            >
              <Icon name="close" className="text-lg" />
            </button>
          </div>
        ))}
      </div>
      <Button type="button" variant="ghost" size="sm" onClick={add} className="self-start">
        <Icon name="add" className="mr-1 text-lg" /> Ekle
      </Button>
    </div>
  );
}
