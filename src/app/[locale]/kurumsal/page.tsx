import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { KurumsalHero } from '@/components/kurumsal/KurumsalHero';
import { AboutSection } from '@/components/kurumsal/AboutSection';
import { VisionMission } from '@/components/kurumsal/VisionMission';
import { ValueProps } from '@/components/kurumsal/ValueProps';
import { TeamGrid } from '@/components/kurumsal/TeamGrid';
import { MapSection } from '@/components/kurumsal/MapSection';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Kurumsal — Atamanlab',
  description:
    'Atamanlab hakkında bilgi edinin. 2009 yılından bu yana Almanya merkezli laboratuvar ekipmanı distribütörü.',
  openGraph: {
    title: 'Kurumsal — Atamanlab',
    description:
      'Atamanlab hakkında bilgi edinin. 2009 yılından bu yana Almanya merkezli laboratuvar ekipmanı distribütörü.',
    type: 'website',
  },
};

export default async function KurumsalPage() {
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { displayOrder: 'asc' },
  });

  const teamData = teamMembers.map((member) => ({
    id: member.id,
    fullName: member.fullName,
    title: member.title,
    expertiseLabel: member.expertiseLabel,
    photoUrl: member.photoUrl,
  }));

  return (
    <>
      <KurumsalHero />
      <AboutSection />
      <VisionMission />
      <ValueProps />
      <TeamGrid members={teamData} />
      <MapSection />
    </>
  );
}
