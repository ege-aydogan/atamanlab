'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Icon } from '@/components/ui/Icon';

const navItems = [
  { label: 'Gösterge Paneli', href: '/admin', icon: 'dashboard' },
  { label: 'Ürünler', href: '/admin/urunler', icon: 'inventory_2' },
  { label: 'Kategoriler', href: '/admin/kategoriler', icon: 'category' },
  { label: 'Markalar', href: '/admin/markalar', icon: 'storefront' },
  { label: 'Haberler', href: '/admin/haberler', icon: 'newspaper' },
  { label: 'Ekip', href: '/admin/ekip', icon: 'groups' },
  { label: 'Ayarlar', href: '/admin/ayarlar', icon: 'settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  }

  async function handleLogout() {
    await signOut({ callbackUrl: '/admin/login' });
  }

  return (
    <aside className="flex h-screen w-64 flex-col bg-primary-container text-white">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-white/10">
        <Image
          src="/atamanlab-logo.png"
          alt="Atamanlab"
          width={130}
          height={32}
          className="h-8 w-auto brightness-0 invert mb-1"
        />
        <p className="text-xs text-white/40 mt-1">Yönetim Paneli</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive(item.href)
                ? 'bg-white/15 text-white'
                : 'text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icon name={item.icon} className="text-lg" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 px-3 py-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/50 transition-all hover:bg-white/10 hover:text-white"
        >
          <Icon name="logout" className="text-lg" />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
