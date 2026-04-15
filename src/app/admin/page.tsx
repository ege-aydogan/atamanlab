import { prisma } from '@/lib/prisma';
import DashboardCards from '@/components/admin/DashboardCards';

export default async function AdminDashboardPage() {
  const [products, categories, news, team] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.newsArticle.count(),
    prisma.teamMember.count(),
  ]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-on-surface font-headline">
        Gösterge Paneli
      </h1>
      <DashboardCards counts={{ products, categories, news, team }} />
    </div>
  );
}
