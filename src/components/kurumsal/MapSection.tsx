'use client';

import { Icon } from '@/components/ui/Icon';

export function MapSection() {
  return (
    <section className="relative">
      {/* Full-width map */}
      <div className="w-full h-[450px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.8!2d6.3886!3d51.1547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8b4e8c0000001%3A0x1!2sGeistenbecker+Feld+68%2C+41199+M%C3%B6nchengladbach!5e0!3m2!1sde!2sde!4v1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Atamanlab Standort"
        />
      </div>

      {/* Address overlay */}
      <div className="absolute bottom-6 left-6 md:left-12 z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg px-6 py-4 flex items-center gap-4 border border-outline-variant/10">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
            <Icon name="location_on" className="text-xl text-secondary" />
          </div>
          <div className="text-sm">
            <p className="font-semibold text-on-surface">Ataman Lab</p>
            <p className="text-on-surface-variant">Geistenbecker Feld 68, 41199 Mönchengladbach</p>
          </div>
        </div>
      </div>
    </section>
  );
}
