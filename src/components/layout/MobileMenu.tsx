'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

interface MobileMenuProps {
  links: { id?: string; label: string; href: string }[];
  isTransparent?: boolean;
}

export function MobileMenu({ links, isTransparent = false }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`flex items-center justify-center min-w-[44px] min-h-[44px] transition-colors duration-300 ${
          isTransparent ? 'text-white' : 'text-on-surface'
        }`}
        aria-label="Menüyü aç"
      >
        <span className="material-symbols-outlined text-2xl">menu</span>
      </button>

      {isOpen && (
        <div className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-[24px] shadow-lg">
          <div className="flex items-center justify-between px-6 py-4">
            <Image
              src="/atamanlab-logo.png"
              alt="Atamanlab"
              width={120}
              height={30}
              className="h-7 w-auto"
            />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center min-w-[44px] min-h-[44px] text-on-surface"
              aria-label="Menüyü kapat"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          <nav className="px-6 pb-6">
            <ul className="flex flex-col gap-2">
              {links.map((link, index) => (
                <li key={link.id || index}>
                  <Link
                    href={link.href as any}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center min-h-[44px] px-2 text-base text-on-surface hover:text-secondary transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-secondary rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
