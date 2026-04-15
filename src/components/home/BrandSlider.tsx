'use client';

const brands = [
  { name: 'Eppendorf', logo: '/uploads/brands/eppendorf.jpg' },
  { name: 'Hettich', logo: '/uploads/brands/hettich.jpg' },
  { name: 'Memmert', logo: '/uploads/brands/memmert.jpg' },
  { name: 'IKA', logo: '/uploads/brands/ika.jpg' },
  { name: 'BINDER', logo: '/uploads/brands/binder.jpg' },
  { name: 'Sartorius', logo: '/uploads/brands/sartorius.jpg' },
  { name: 'Julabo', logo: '/uploads/brands/julabo.jpg' },
  { name: 'KERN', logo: '/uploads/brands/kern.jpg' },
  { name: 'Thermo', logo: '/uploads/brands/thermo.jpg' },
  { name: 'Mettler Toledo', logo: '/uploads/brands/mettler-toledo.jpg' },
  { name: 'Nabertherm', logo: '/uploads/brands/nabertherm.jpg' },
  { name: 'Retsch', logo: '/uploads/brands/retsch.jpg' },
  { name: 'OHAUS', logo: '/uploads/brands/ohaus.jpg' },
  { name: 'Büchi', logo: '/uploads/brands/buechi.jpg' },
  { name: 'LAUDA', logo: '/uploads/brands/lauda.jpg' },
  { name: 'Hach Lange', logo: '/uploads/brands/hach-lange.jpg' },
  { name: 'Brand', logo: '/uploads/brands/brand.jpg' },
  { name: 'Duran', logo: '/uploads/brands/duran.jpg' },
  { name: 'Fritsch', logo: '/uploads/brands/fritsch.jpg' },
  { name: 'Hirschmann', logo: '/uploads/brands/hirschmann.jpg' },
  { name: 'KNF', logo: '/uploads/brands/knf.jpg' },
  { name: 'Radwag', logo: '/uploads/brands/radwag.jpg' },
  { name: 'ISOLAB', logo: '/uploads/brands/isolab.jpg' },
  { name: 'Miele', logo: '/uploads/brands/miele.jpg' },
];

export function BrandSlider() {
  const doubled = [...brands, ...brands];

  return (
    <section className="relative bg-black py-8 overflow-hidden">
      {/* Sol ve sağ fade */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

      {/* Kayan logo listesi */}
      <div className="relative z-10 flex animate-scroll items-center">
        {doubled.map((brand, i) => (
          <div
            key={`${brand.name}-${i}`}
            className="relative z-10 flex-shrink-0 mx-8 brightness-150 transition-all duration-500"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brand.logo}
              
              alt={brand.name}
              className="relative z-10 h-8 w-auto object-contain invert mix-blend-lighten"
              style={{ filter: 'invert(1) contrast(-100) brightness(0)' }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
