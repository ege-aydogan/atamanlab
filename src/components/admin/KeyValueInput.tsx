'use client';

import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

interface KeyValuePair {
  key: string;
  value: string;
}

interface KeyValueInputProps {
  label: string;
  values: KeyValuePair[];
  onChange: (values: KeyValuePair[]) => void;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
}

export default function KeyValueInput({
  label,
  values,
  onChange,
  keyPlaceholder = 'Parametre adı',
  valuePlaceholder = 'Değer',
}: KeyValueInputProps) {
  function add() {
    onChange([...values, { key: '', value: '' }]);
  }

  function update(index: number, field: 'key' | 'value', val: string) {
    const next = [...values];
    next[index] = { ...next[index], [field]: val };
    onChange(next);
  }

  function remove(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-on-surface-variant">{label}</span>
      <div className="space-y-2">
        {values.map((pair, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={pair.key}
              onChange={(e) => update(i, 'key', e.target.value)}
              placeholder={keyPlaceholder}
              className="flex-1 rounded-lg border border-outline-variant bg-transparent px-3 py-2 text-sm text-on-surface transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
            />
            <input
              value={pair.value}
              onChange={(e) => update(i, 'value', e.target.value)}
              placeholder={valuePlaceholder}
              className="flex-1 rounded-lg border border-outline-variant bg-transparent px-3 py-2 text-sm text-on-surface transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="rounded-lg p-1.5 text-on-surface-variant transition-colors hover:bg-error-container hover:text-error"
              aria-label="Satırı kaldır"
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
