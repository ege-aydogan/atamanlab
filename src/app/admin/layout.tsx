import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import SessionProvider from '@/components/admin/SessionProvider';
import ThemeProvider from '@/components/layout/ThemeProvider';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <>
        <ThemeProvider />
        {children}
      </>
    );
  }

  return (
    <SessionProvider session={session}>
      <ThemeProvider />
      <div className="flex h-screen bg-surface-container-low">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-8 bg-surface">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
