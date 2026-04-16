'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';

export default function ContactPage() {
  const t = useTranslations('ContactPage');
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/public/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          company: form.company,
          message: form.message,
        }),
      });
      if (res.ok) setSubmitted(true);
    } catch { /* ignore */ }
    finally { setSending(false); }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-primary-container overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" aria-hidden="true" />
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8">
          <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-tertiary-fixed">
            {t('heroLabel')}
          </span>
          <h1 className="text-5xl font-extrabold tracking-tighter text-white md:text-6xl mb-4">
            {t('heroTitle')}
          </h1>
          <p className="text-xl font-light text-on-primary-container max-w-2xl">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="relative -mt-10 z-10 max-w-screen-2xl mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Address */}
          <a
            href="https://maps.google.com/?q=Geistenbecker+Feld+68,+41199+Mönchengladbach"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-lg p-6 border border-outline-variant/10 hover:shadow-xl hover:border-secondary/20 transition-all group"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 mb-4">
              <Icon name="location_on" className="text-2xl text-secondary" />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">{t('cardAddress')}</p>
            <p className="text-sm font-semibold text-on-surface group-hover:text-secondary transition-colors whitespace-pre-line">
              {'Geistenbecker Feld 68\n41199 Mönchengladbach'}
            </p>
          </a>

          {/* Phone */}
          <a
            href="tel:+492166278692"
            className="bg-white rounded-xl shadow-lg p-6 border border-outline-variant/10 hover:shadow-xl hover:border-secondary/20 transition-all group"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 mb-4">
              <Icon name="call" className="text-2xl text-secondary" />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">{t('cardPhone')}</p>
            <p className="text-sm font-semibold text-on-surface group-hover:text-secondary transition-colors">+49 2166 2786926</p>
          </a>

          {/* Mobile */}
          <a
            href="tel:+491735870579"
            className="bg-white rounded-xl shadow-lg p-6 border border-outline-variant/10 hover:shadow-xl hover:border-secondary/20 transition-all group"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 mb-4">
              <Icon name="smartphone" className="text-2xl text-secondary" />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">{t('cardMobile')}</p>
            <p className="text-sm font-semibold text-on-surface group-hover:text-secondary transition-colors">+49 173 5870579</p>
          </a>

          {/* Email */}
          <a
            href="mailto:info@atamanlab.com"
            className="bg-white rounded-xl shadow-lg p-6 border border-outline-variant/10 hover:shadow-xl hover:border-secondary/20 transition-all group"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 mb-4">
              <Icon name="mail" className="text-2xl text-secondary" />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">{t('cardEmail')}</p>
            <p className="text-sm font-semibold text-on-surface group-hover:text-secondary transition-colors">info@atamanlab.com</p>
          </a>
        </div>
      </section>

      {/* Form section */}
      <section className="py-24 max-w-screen-2xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-secondary">
              {t('formLabel')}
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl mb-6">
              {t('formTitle')}
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-8">
              {t('formDescription')}
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Icon name="schedule" className="text-secondary" />
                <span className="text-sm text-on-surface-variant">{t('responseTime')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="language" className="text-secondary" />
                <span className="text-sm text-on-surface-variant">{t('languageSupport')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="verified" className="text-secondary" />
                <span className="text-sm text-on-surface-variant">{t('freeConsulting')}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="rounded-2xl bg-surface-container-low p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-tertiary-fixed/20 mx-auto mb-4">
                  <Icon name="check" className="text-3xl text-tertiary-fixed-dim" />
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-2">{t('successTitle')}</h3>
                <p className="text-on-surface-variant">{t('successMessage')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl bg-surface-container-low p-8 md:p-10 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-on-surface mb-2">{t('fieldName')} *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-outline-variant/30 bg-white px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-on-surface mb-2">{t('fieldEmail')} *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-outline-variant/30 bg-white px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-2">{t('fieldCompany')} *</label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-2">{t('fieldMessage')} *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 rounded-xl bg-on-primary-fixed px-8 py-3.5 font-semibold text-white shadow-lg shadow-primary-container/30 transition-all hover:bg-secondary hover:shadow-secondary/30 disabled:opacity-50 min-h-[48px]"
                >
                  <Icon name="send" className="text-lg" />
                  {sending ? t('submitting') : t('submitButton')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Full-width map */}
      <section className="w-full h-[400px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.8!2d6.3886!3d51.1547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8b4e8c0000001%3A0x1!2sGeistenbecker+Feld+68%2C+41199+M%C3%B6nchengladbach!5e0!3m2!1sde!2sde!4v1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Atamanlab Standort"
        />
      </section>
    </>
  );
}
