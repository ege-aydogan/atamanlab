'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError('Geçersiz e-posta veya şifre');
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="flex min-h-screen">
      {/* Left: branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-container items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-tertiary-fixed/10 rounded-full blur-[100px]" />
        <div className="relative z-10 text-center px-12">
          <Image
            src="/atamanlab-logo.png"
            alt="Atamanlab"
            width={220}
            height={55}
            className="h-14 w-auto brightness-0 invert mx-auto mb-8"
          />
          <p className="text-white/60 text-lg font-light leading-relaxed max-w-sm mx-auto">
            Laboratuvar ekipmanlarında güvenilir çözüm ortağınız
          </p>
        </div>
      </div>

      {/* Right: login form */}
      <div className="flex-1 flex items-center justify-center bg-surface px-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Image
              src="/atamanlab-logo.png"
              alt="Atamanlab"
              width={160}
              height={40}
              className="h-10 w-auto mx-auto"
            />
          </div>

          <h1 className="text-2xl font-bold text-on-surface mb-2">Yönetim Paneli</h1>
          <p className="text-on-surface-variant mb-8">Devam etmek için giriş yapın</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-3 rounded-xl bg-error-container px-4 py-3 text-sm text-on-error-container">
                <Icon name="error" className="text-lg shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-on-surface">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-outline-variant/30 bg-white px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
                placeholder="admin@atamanlab.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-on-surface">
                Şifre
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-outline-variant/30 bg-white px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-secondary px-4 py-3.5 text-sm font-semibold text-white transition-all hover:bg-secondary/90 disabled:opacity-50 shadow-lg shadow-secondary/20"
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
