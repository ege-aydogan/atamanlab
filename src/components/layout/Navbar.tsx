'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import Image from 'next/image';

export function Navbar() {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { id: 'home', label: t('home'), href: '/' },
    { id: 'brands', label: t('brands'), href: '/markalar' },
    { id: 'solutions', label: t('solutions'), href: '/cozumler' },
    { id: 'news', label: t('news'), href: '/haberler' },
    { id: 'corporate', label: t('corporate'), href: '/kurumsal' },
    { id: 'contact', label: t('contact'), href: '/iletisim' },
  ];

  const isTransparent = isHome && !scrolled;

  return (
    <>
      {/* Saydam modda üstte hafif koyu gradient — yazıların okunabilirliği için */}
      {isTransparent && (
        <div
          className="fixed top-0 left-0 right-0 h-28 z-40 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)',
          }}
          aria-hidden="true"
        />
      )}

      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: isTransparent ? 'transparent' : 'rgba(255,255,255,0.92)',
          backdropFilter: isTransparent ? 'none' : 'blur(24px)',
          WebkitBackdropFilter: isTransparent ? 'none' : 'blur(24px)',
          boxShadow: isTransparent ? 'none' : '0 1px 3px rgba(0,0,0,0.06)',
          borderBottom: isTransparent
            ? '1px solid rgba(255,255,255,0.12)'
            : '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div className="mx-auto max-w-screen-2xl flex items-center justify-between px-8 py-5">
          {/* Brand */}
          <Link href="/" className="flex items-center">
            <Image
              src="/atamanlab-logo.png"
              alt="Atamanlab"
              width={180}
              height={44}
              className={`h-10 w-auto transition-all duration-300 ${
                isTransparent ? 'brightness-0 invert' : ''
              }`}
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => {
              const isActive = link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.id}
                  href={link.href as any}
                  className={`relative text-[15px] font-semibold uppercase tracking-wide transition-all duration-300 outline-none pb-1 whitespace-nowrap ${
                    isActive
                      ? isTransparent
                        ? 'text-white'
                        : 'text-secondary'
                      : isTransparent
                        ? 'text-white/90 hover:text-white'
                        : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {link.label}
                  {/* Aktif tab alt çizgisi */}
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${
                        isTransparent ? 'bg-tertiary-fixed' : 'bg-secondary'
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-5 shrink-0">
            <LanguageSwitcher isTransparent={isTransparent} />
            <MobileMenu links={links} isTransparent={isTransparent} />
          </div>
        </div>
      </nav>
    </>
  );
}
