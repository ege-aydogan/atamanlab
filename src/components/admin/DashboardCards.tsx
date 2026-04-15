'use client';

interface DashboardCounts {
  products: number;
  categories: number;
  news: number;
  team: number;
}

const cards = [
  { key: 'products' as const, label: 'Ürünler', icon: 'inventory_2' },
  { key: 'categories' as const, label: 'Kategoriler', icon: 'category' },
  { key: 'news' as const, label: 'Haberler', icon: 'newspaper' },
  { key: 'team' as const, label: 'Ekip Üyeleri', icon: 'groups' },
];

export default function DashboardCards({ counts }: { counts: DashboardCounts }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.key}
          className="rounded-xl border border-outline-variant/15 bg-surface-container-lowest p-6 shadow-sm"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-container/20">
            <span className="material-symbols-outlined text-2xl text-secondary">
              {card.icon}
            </span>
          </div>
          <p className="text-sm font-medium text-on-surface-variant">{card.label}</p>
          <p className="mt-1 text-3xl font-bold text-on-surface">{counts[card.key]}</p>
        </div>
      ))}
    </div>
  );
}
