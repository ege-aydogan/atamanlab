'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';

interface DocumentsListProps {
  documents: { name: string; url: string; size: string }[];
}

function DocumentsList({ documents }: DocumentsListProps) {
  const t = useTranslations('ProductDetail');

  if (!documents.length) return null;

  return (
    <section>
      <h2 className="text-xs uppercase tracking-widest text-secondary font-medium mb-4">
        {t('documents')}
      </h2>

      <div className="space-y-2">
        {documents.map((doc, idx) => (
          <a
            key={idx}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg border border-outline-variant/15 hover:border-secondary transition-colors group focus:outline-2 focus:outline-offset-2 focus:outline-secondary"
          >
            <Icon name="picture_as_pdf" className="text-2xl text-error/70" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-on-surface truncate">{doc.name}</p>
              <p className="text-xs text-on-surface-variant">{doc.size}</p>
            </div>
            <Icon
              name="download"
              className="text-xl text-on-surface-variant group-hover:text-secondary transition-colors"
            />
          </a>
        ))}
      </div>
    </section>
  );
}

export { DocumentsList };
export type { DocumentsListProps };
