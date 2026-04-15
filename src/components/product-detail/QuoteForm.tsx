'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { quoteFormSchema } from '@/lib/validations';
import { Input } from '@/components/ui/Input';
import { Icon } from '@/components/ui/Icon';
import type { QuoteFormData } from '@/types';

interface QuoteFormProps {
  productId?: number;
  productName?: string;
}

function QuoteForm({ productId, productName }: QuoteFormProps) {
  const t = useTranslations('QuoteForm');
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      company: '',
      message: '',
      productId,
      productName,
    },
  });

  const onSubmit = async (data: QuoteFormData) => {
    setServerError('');
    try {
      const res = await fetch('/api/public/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        setServerError(body?.error?.message || 'Bir hata oluştu');
        return;
      }

      setSubmitted(true);
    } catch {
      setServerError('Bağlantı hatası. Lütfen tekrar deneyin.');
    }
  };

  if (submitted) {
    return (
      <section id="quote-form" className="rounded-2xl bg-surface-container-low p-8 text-center">
        <Icon name="check_circle" className="text-5xl text-secondary mb-4" />
        <p className="text-lg font-semibold text-on-surface">{t('successMessage')}</p>
      </section>
    );
  }

  return (
    <section id="quote-form" className="rounded-2xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Form side */}
        <div className="p-8 bg-surface-container-low">
          <h2 className="text-2xl font-bold text-on-surface mb-2">{t('title')}</h2>
          <p className="text-sm text-on-surface-variant mb-6">{t('subtitle')}</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <Input
              {...register('fullName')}
              label={t('fullName')}
              placeholder={t('fullName')}
              bottomBorderOnly
              error={errors.fullName?.message}
            />
            <Input
              {...register('email')}
              type="email"
              label={t('email')}
              placeholder={t('email')}
              bottomBorderOnly
              error={errors.email?.message}
            />
            <Input
              {...register('company')}
              label={t('company')}
              placeholder={t('company')}
              bottomBorderOnly
              error={errors.company?.message}
            />

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-medium text-on-surface-variant">
                {t('message')}
              </label>
              <textarea
                {...register('message')}
                id="message"
                rows={4}
                placeholder={t('message')}
                className="w-full bg-transparent border-b border-outline-variant focus:border-secondary px-3 py-2.5 text-on-surface placeholder:text-on-surface-variant/50 transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-secondary resize-none"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-sm text-error" role="alert">
                  {errors.message.message}
                </p>
              )}
            </div>

            {serverError && (
              <p className="text-sm text-error" role="alert">{serverError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-container text-on-primary-container px-6 py-3 font-medium text-sm transition-opacity hover:opacity-90 disabled:opacity-50 min-h-[44px] focus:outline-2 focus:outline-offset-2 focus:outline-secondary"
            >
              {isSubmitting ? (
                <Icon name="hourglass_empty" className="text-lg animate-spin" />
              ) : (
                <Icon name="send" className="text-lg" />
              )}
              {t('submit')}
            </button>
          </form>
        </div>

        {/* Contact info side */}
        <div className="p-8 bg-primary-container flex flex-col justify-center">
          <h3 className="text-lg font-bold text-on-primary-container mb-6">{t('contactTitle')}</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Icon name="phone" className="text-xl text-on-primary-container/70" />
              <span className="text-sm text-on-primary-container">{t('contactPhone')}</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="mail" className="text-xl text-on-primary-container/70" />
              <span className="text-sm text-on-primary-container">{t('contactEmail')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { QuoteForm };
export type { QuoteFormProps };
