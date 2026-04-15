import { Metadata } from 'next';
import { Icon } from '@/components/ui/Icon';

export const metadata: Metadata = {
  title: 'Impressum — Atamanlab',
};

export default function ImpressumPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-primary-container overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" aria-hidden="true" />
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8">
          <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-tertiary-fixed">
            Rechtliches
          </span>
          <h1 className="text-5xl font-extrabold tracking-tighter text-white md:text-6xl">
            Impressum
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-8">
          {/* Contact card */}
          <div className="rounded-2xl bg-surface-container-low p-8 md:p-10 mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">
                Angaben gemäß § 5 TMG
              </h2>
              <p className="text-on-surface font-semibold text-lg mb-1">Mehmet Ataman</p>
              <p className="text-on-surface-variant mb-4">Tin Labortechnik</p>
              <p className="text-on-surface-variant leading-relaxed">
                Geistenbecker Feld 68<br />
                41199 Mönchengladbach<br />
                Deutschland
              </p>
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">
                Kontakt
              </h2>
              <div className="space-y-3">
                <a href="tel:+492166278692" className="flex items-center gap-3 text-on-surface-variant hover:text-secondary transition-colors">
                  <Icon name="call" className="text-secondary text-lg" />
                  <span>+49 2166 2786926</span>
                </a>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <Icon name="fax" className="text-secondary text-lg" />
                  <span>+49 2166 2786927</span>
                </div>
                <a href="mailto:ataman@atamanlab.com" className="flex items-center gap-3 text-on-surface-variant hover:text-secondary transition-colors">
                  <Icon name="mail" className="text-secondary text-lg" />
                  <span>ataman@atamanlab.com</span>
                </a>
                <a href="https://www.tinlabortechnik.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-on-surface-variant hover:text-secondary transition-colors">
                  <Icon name="language" className="text-secondary text-lg" />
                  <span>www.tinlabortechnik.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Info sections */}
          <div className="space-y-10">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 mt-1">
                <Icon name="person" className="text-xl text-secondary" />
              </div>
              <div>
                <h2 className="text-base font-bold text-on-surface mb-2">Geschäftsführer</h2>
                <p className="text-on-surface-variant">Mehmet Ataman</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 mt-1">
                <Icon name="receipt_long" className="text-xl text-secondary" />
              </div>
              <div>
                <h2 className="text-base font-bold text-on-surface mb-2">Umsatzsteuer-Identifikationsnummer</h2>
                <p className="text-on-surface-variant">
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                  <span className="font-semibold text-on-surface">DE 815118272</span>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 mt-1">
                <Icon name="gavel" className="text-xl text-secondary" />
              </div>
              <div>
                <h2 className="text-base font-bold text-on-surface mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                <p className="text-on-surface-variant">
                  Mehmet Ataman<br />
                  Geistenbecker Feld 68<br />
                  41199 Mönchengladbach
                </p>
              </div>
            </div>

            <hr className="border-outline-variant/15" />

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 mt-1">
                <Icon name="handshake" className="text-xl text-secondary" />
              </div>
              <div>
                <h2 className="text-base font-bold text-on-surface mb-2">EU-Streitschlichtung</h2>
                <p className="text-on-surface-variant leading-relaxed">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                  <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
                <p className="text-on-surface-variant mt-2">
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 mt-1">
                <Icon name="block" className="text-xl text-secondary" />
              </div>
              <div>
                <h2 className="text-base font-bold text-on-surface mb-2">Verbraucherstreitbeilegung</h2>
                <p className="text-on-surface-variant leading-relaxed">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </div>

            <hr className="border-outline-variant/15" />

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 mt-1">
                <Icon name="shield" className="text-xl text-secondary" />
              </div>
              <div>
                <h2 className="text-base font-bold text-on-surface mb-2">Haftung für Inhalte</h2>
                <p className="text-on-surface-variant leading-relaxed">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 mt-1">
                <Icon name="link" className="text-xl text-secondary" />
              </div>
              <div>
                <h2 className="text-base font-bold text-on-surface mb-2">Haftung für Links</h2>
                <p className="text-on-surface-variant leading-relaxed">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 mt-1">
                <Icon name="copyright" className="text-xl text-secondary" />
              </div>
              <div>
                <h2 className="text-base font-bold text-on-surface mb-2">Urheberrecht</h2>
                <p className="text-on-surface-variant leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
