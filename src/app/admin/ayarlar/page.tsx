'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import ColorPickerField from '@/components/admin/ColorPickerField';
import ThemePreview from '@/components/admin/ThemePreview';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface ThemeToken {
  tokenName: string;
  tokenValue: string;
}

interface TokenGroup {
  label: string;
  tokens: ThemeToken[];
}

function groupTokens(tokens: ThemeToken[]): TokenGroup[] {
  const groups: TokenGroup[] = [
    { label: 'Birincil', tokens: [] },
    { label: 'İkincil', tokens: [] },
    { label: 'Üçüncül', tokens: [] },
    { label: 'Yüzey', tokens: [] },
    { label: 'Diğer', tokens: [] },
  ];

  for (const token of tokens) {
    const name = token.tokenName;
    if (name.startsWith('primary') || name.startsWith('on-primary')) {
      groups[0].tokens.push(token);
    } else if (name.startsWith('secondary') || name.startsWith('on-secondary')) {
      groups[1].tokens.push(token);
    } else if (name.startsWith('tertiary') || name.startsWith('on-tertiary')) {
      groups[2].tokens.push(token);
    } else if (
      name.startsWith('surface') ||
      name.startsWith('on-surface') ||
      name.startsWith('background') ||
      name.startsWith('on-background')
    ) {
      groups[3].tokens.push(token);
    } else {
      groups[4].tokens.push(token);
    }
  }

  return groups.filter((g) => g.tokens.length > 0);
}

export default function SettingsPage() {
  const [tokens, setTokens] = useState<ThemeToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setTokens(json.data.map((t: { tokenName: string; tokenValue: string }) => ({
            tokenName: t.tokenName,
            tokenValue: t.tokenValue,
          })));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  function handleTokenChange(tokenName: string, value: string) {
    setTokens((prev) =>
      prev.map((t) => (t.tokenName === tokenName ? { ...t, tokenValue: value } : t))
    );
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokens }),
      });
      const json = await res.json();
      if (json.success) {
        setMessage({ type: 'success', text: 'Tema ayarları başarıyla kaydedildi.' });
      } else {
        setMessage({ type: 'error', text: json.error?.message ?? 'Kaydetme başarısız.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Bir hata oluştu.' });
    } finally {
      setSaving(false);
    }
  }

  async function handleReset() {
    setResetting(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/settings/reset', { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        setTokens(json.data.map((t: { tokenName: string; tokenValue: string }) => ({
          tokenName: t.tokenName,
          tokenValue: t.tokenValue,
        })));
        setMessage({ type: 'success', text: 'Tema varsayılan değerlere sıfırlandı.' });
      } else {
        setMessage({ type: 'error', text: 'Sıfırlama başarısız.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Bir hata oluştu.' });
    } finally {
      setResetting(false);
      setShowResetDialog(false);
    }
  }

  const tokenMap = Object.fromEntries(tokens.map((t) => [t.tokenName, t.tokenValue]));
  const groups = groupTokens(tokens);

  if (loading) {
    return <p className="py-8 text-center text-on-surface-variant">Yükleniyor...</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-on-surface font-headline">Tema Ayarları</h1>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => setShowResetDialog(true)} disabled={saving || resetting}>
            Varsayılana Sıfırla
          </Button>
          <Button onClick={handleSave} disabled={saving || resetting}>
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
        </div>
      </div>

      {message && (
        <div
          className={`mb-4 rounded-lg px-4 py-3 text-sm ${
            message.type === 'success'
              ? 'bg-tertiary-fixed/20 text-on-tertiary-fixed'
              : 'bg-error-container text-on-error-container'
          }`}
          role="alert"
        >
          {message.text}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        {/* Token groups */}
        <div className="space-y-6">
          {groups.map((group) => (
            <section key={group.label}>
              <h2 className="mb-3 text-lg font-semibold text-on-surface">{group.label}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.tokens.map((token) => (
                  <ColorPickerField
                    key={token.tokenName}
                    tokenName={token.tokenName}
                    value={token.tokenValue}
                    onChange={handleTokenChange}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Sticky preview */}
        <div className="xl:sticky xl:top-6 xl:self-start">
          <ThemePreview tokens={tokenMap} />
        </div>
      </div>

      <ConfirmDialog
        open={showResetDialog}
        title="Varsayılana Sıfırla"
        message="Tüm tema renkleri varsayılan değerlere sıfırlanacak. Devam etmek istiyor musunuz?"
        onConfirm={handleReset}
        onCancel={() => setShowResetDialog(false)}
        loading={resetting}
      />
    </div>
  );
}
