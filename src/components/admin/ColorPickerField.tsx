'use client';

interface ColorPickerFieldProps {
  tokenName: string;
  value: string;
  onChange: (tokenName: string, value: string) => void;
}

export default function ColorPickerField({ tokenName, value, onChange }: ColorPickerFieldProps) {
  function handleHexChange(e: React.ChangeEvent<HTMLInputElement>) {
    let v = e.target.value;
    if (!v.startsWith('#')) v = '#' + v;
    // Allow partial typing — only propagate valid 7-char hex
    if (/^#[0-9a-fA-F]{0,6}$/.test(v)) {
      onChange(tokenName, v);
    }
  }

  function handleColorPickerChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(tokenName, e.target.value);
  }

  return (
    <div className="flex items-center gap-3 rounded-lg border border-outline-variant/15 bg-surface-container-lowest p-3">
      {/* Color swatch + native picker */}
      <label className="relative flex-shrink-0 cursor-pointer" aria-label={`Renk seçici: ${tokenName}`}>
        <span
          className="block h-10 w-10 rounded-lg border border-outline-variant/30"
          style={{ backgroundColor: value }}
        />
        <input
          type="color"
          value={value.length === 7 ? value : '#000000'}
          onChange={handleColorPickerChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label={`${tokenName} renk seçici`}
        />
      </label>

      {/* Token name + hex input */}
      <div className="flex flex-1 flex-col gap-1">
        <span className="text-xs font-medium tracking-wide text-on-surface-variant">
          {tokenName}
        </span>
        <input
          type="text"
          value={value}
          onChange={handleHexChange}
          maxLength={7}
          className="w-full rounded border border-outline-variant/30 bg-transparent px-2 py-1 text-sm text-on-surface focus:border-secondary focus:outline-none"
          aria-label={`${tokenName} hex değeri`}
        />
      </div>
    </div>
  );
}
