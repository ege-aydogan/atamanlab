'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';

interface ProductInfoProps {
  name: string;
  modelNumber: string;
  categoryName: string;
  shortDescription?: string | null;
  features: string[];
  isNew: boolean;
  stockStatus: boolean;
  documents: { name: string; url: string; size: string }[];
}

function ProductInfo({
  name,
  modelNumber,
  categoryName,
  shortDescription,
  features,
  isNew,
  stockStatus,
  documents,
}: ProductInfoProps) {
  const t = useTranslations('ProductDetail');

  const catalogDoc = documents.find(
    (d) => d.name.toLowerCase().includes('katalog') || d.name.toLowerCase().includes('catalog')
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Badges */}
      <div className="flex items-center gap-2">
        <Badge variant="secondary">{categoryName}</Badge>
        {isNew && <Badge variant="default">Yeni</Badge>}
        {stockStatus && <Badge variant="outline">Stokta</Badge>}
      </div>

      {/* Name & model */}
      <div>
        <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">{name}</h1>
        <p className="text-sm text-on-surface-variant mt-1">{modelNumber}</p>
      </div>

      {/* Description */}
      {shortDescription && (
        <p className="text-on-surface-variant leading-relaxed">{shortDescription}</p>
      )}

      {/* Features */}
      {features.length > 0 && (
        <div>
          <h3 className="text-xs uppercase tracking-widest text-on-surface-variant mb-3">
            {t('features')}
          </h3>
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-on-surface">
                <Icon name="check_circle" className="text-secondary text-lg shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <a
          href="#quote-form"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-container text-on-primary-container px-6 py-3 font-medium text-sm transition-opacity hover:opacity-90 min-h-[44px] focus:outline-2 focus:outline-offset-2 focus:outline-secondary"
        >
          <Icon name="mail" className="text-lg" />
          {t('getQuote')}
        </a>
        {catalogDoc ? (
          <a
            href={catalogDoc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-surface-container-highest text-on-surface px-6 py-3 font-medium text-sm transition-opacity hover:opacity-90 min-h-[44px] focus:outline-2 focus:outline-offset-2 focus:outline-secondary"
          >
            <Icon name="download" className="text-lg" />
            {t('downloadCatalog')}
          </a>
        ) : (
          <span className="inline-flex items-center justify-center gap-2 rounded-lg bg-surface-container-highest text-on-surface/50 px-6 py-3 font-medium text-sm min-h-[44px] cursor-not-allowed">
            <Icon name="download" className="text-lg" />
            {t('downloadCatalog')}
          </span>
        )}
      </div>
    </div>
  );
}

export { ProductInfo };
export type { ProductInfoProps };
