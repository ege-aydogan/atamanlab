'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const DEFAULT_PREFS: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function getStoredConsent(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('cookie-consent');
  if (!stored) return null;
  try { return JSON.parse(stored); } catch { return null; }
}

function saveConsent(prefs: CookiePreferences) {
  localStorage.setItem('cookie-consent', JSON.stringify(prefs));
  // Set actual cookies based on preferences
  document.cookie = `atamanlab-necessary=true; path=/; max-age=31536000; SameSite=Lax`;
  if (prefs.analytics) {
    document.cookie = `atamanlab-analytics=true; path=/; max-age=31536000; SameSite=Lax`;
  } else {
    document.cookie = `atamanlab-analytics=; path=/; max-age=0`;
  }
  if (prefs.marketing) {
    document.cookie = `atamanlab-marketing=true; path=/; max-age=31536000; SameSite=Lax`;
  } else {
    document.cookie = `atamanlab-marketing=; path=/; max-age=0`;
  }
}

export function CookieConsent() {
  const t = useTranslations('CookieConsent');
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>(DEFAULT_PREFS);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      setVisible(true);
    } else {
      setPrefs(stored);
    }
  }, []);

  function acceptAll() {
    const all = { necessary: true, analytics: true, marketing: true };
    setPrefs(all);
    saveConsent(all);
    setVisible(false);
  }

  function declineAll() {
    const minimal = { necessary: true, analytics: false, marketing: false };
    setPrefs(minimal);
    saveConsent(minimal);
    setVisible(false);
  }

  function saveSettings() {
    saveConsent(prefs);
    setVisible(false);
    setShowSettings(false);
  }

  function dismiss() {
    // Kapatınca sadece zorunlu çerezler kabul edilmiş sayılır
    declineAll();
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 md:p-6">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-outline-variant/10 overflow-hidden">
        {/* Çarpı butonu */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Main banner */}
        {!showSettings ? (
          <div className="p-6 md:p-8 pr-14">
            <h3 className="text-lg font-bold text-on-surface mb-3">
              🍪 {t('title')}
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              {t('message')}{' '}
              <Link href="/impressum" className="text-secondary underline underline-offset-2 hover:text-secondary/80">
                {t('learnMore')}
              </Link>
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={declineAll}
                className="rounded-xl px-5 py-2.5 text-sm font-medium text-on-surface-variant border border-outline-variant/30 hover:bg-surface-container-low transition-all order-3 sm:order-1"
              >
                {t('declineAll')}
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="rounded-xl px-5 py-2.5 text-sm font-medium text-on-surface border border-outline-variant/30 hover:bg-surface-container-low transition-all order-2"
              >
                {t('settings')}
              </button>
              <button
                onClick={acceptAll}
                className="rounded-xl bg-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-secondary/20 hover:bg-secondary/90 transition-all order-1 sm:order-3 sm:ml-auto"
              >
                {t('acceptAll')}
              </button>
            </div>
          </div>
        ) : (
          /* Settings panel */
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-bold text-on-surface mb-5">
              ⚙️ {t('settingsTitle')}
            </h3>

            <div className="space-y-4 mb-6">
              {/* Necessary */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low">
                <div className="flex-1 mr-4">
                  <p className="text-sm font-semibold text-on-surface">{t('necessary')}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">{t('necessaryDesc')}</p>
                </div>
                <div className="relative">
                  <div className="w-11 h-6 bg-secondary rounded-full opacity-60 cursor-not-allowed" />
                  <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow" />
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low">
                <div className="flex-1 mr-4">
                  <p className="text-sm font-semibold text-on-surface">{t('analytics')}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">{t('analyticsDesc')}</p>
                </div>
                <button
                  onClick={() => setPrefs({ ...prefs, analytics: !prefs.analytics })}
                  className={`relative w-11 h-6 rounded-full transition-colors ${prefs.analytics ? 'bg-secondary' : 'bg-outline-variant/40'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${prefs.analytics ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>

              {/* Marketing */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low">
                <div className="flex-1 mr-4">
                  <p className="text-sm font-semibold text-on-surface">{t('marketing')}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">{t('marketingDesc')}</p>
                </div>
                <button
                  onClick={() => setPrefs({ ...prefs, marketing: !prefs.marketing })}
                  className={`relative w-11 h-6 rounded-full transition-colors ${prefs.marketing ? 'bg-secondary' : 'bg-outline-variant/40'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${prefs.marketing ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSettings(false)}
                className="rounded-xl px-5 py-2.5 text-sm font-medium text-on-surface-variant border border-outline-variant/30 hover:bg-surface-container-low transition-all"
              >
                {t('back')}
              </button>
              <button
                onClick={saveSettings}
                className="rounded-xl bg-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-secondary/20 hover:bg-secondary/90 transition-all ml-auto"
              >
                {t('saveSettings')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
