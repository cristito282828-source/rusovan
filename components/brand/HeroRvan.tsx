import Link from 'next/link';
import HeroImageRvan from './HeroImageRvan';
import RotatingHeadline from './RotatingHeadline';

const MACROS = [
  {
    label: 'Home',
    href: '/search/home',
    blurb: 'Posillos, jarrones, deco, velas. Para que tu casa se sienta más tuya.',
    color: '#FFD93D',
  },
  {
    label: 'Pets',
    href: '/search/pets',
    blurb: 'Platos, mantas, jugetes, posillos. Para que tu peludo beba rico.',
    color: '#7FB069',
  },
  {
    label: 'Lifestyle',
    href: '/search/lifestyle',
    blurb: 'Cuadernos, stickers, camisetas. Para que lleves tu fandom contigo.',
    color: '#3A2418',
  },
];

/**
 * Hero Rvan · Posillos personalizados + 3 macro-categorías.
 * Mobile-first: la imagen va primero (order-1), en desktop pasa al lado
 * derecho del copy (md:order-2). El copy va en orden-2 mobile, orden-1 desktop.
 */
export default function HeroRvan() {
  return (
    <section className="bg-rvan-bg">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:gap-12 md:py-24 lg:px-8">
        {/* Bloque 1 en DOM: imagen del posillo. Mobile: arriba. Desktop: derecha. */}
        <div className="order-1 md:order-2 md:col-span-7">
          <Link
            href="/product/posillo-mango"
            className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-rvan-cream"
          >
            <HeroImageRvan
              alt="Posillo Rvan edición Mango"
              className="transition-transform duration-700 group-hover:scale-[1.03]"
            />

            {/* Floating tag · esquina sup-izq Kikkerland-style */}
            <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-rvan-bg/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-rvan-ink backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-rvan-secondary" />
              Nuevo · Colección
            </span>

            {/* Floating ATC · esquina inf-der, sello editorial */}
            <div className="absolute bottom-5 right-5 flex items-center gap-3 rounded-full bg-rvan-bg/95 px-3 py-2 backdrop-blur">
              <span className="font-inter text-base font-bold text-rvan-ink">$38.000</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rvan-secondary text-rvan-bg transition group-hover:bg-rvan-secondary-dark">
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Bloque 2 en DOM: copy + CTAs. Mobile: abajo de la imagen. Desktop: izquierda. */}
        <div className="order-2 flex flex-col justify-center md:order-1 md:col-span-5">
          <span className="rvan-tag">Posillos personalizados · Importados</span>

          <RotatingHeadline />

          {/* 3 macro-categorías como CTA primarias */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {MACROS.map((m) => (
              <Link
                key={m.label}
                href={m.href}
                className="group flex items-center justify-between gap-2 rounded-full border border-rvan-ink bg-rvan-bg px-5 py-3 transition hover:bg-rvan-ink hover:text-rvan-bg"
              >
                <span className="font-inter text-sm font-bold">{m.label}</span>
                <span aria-hidden="true" className="text-base">→</span>
              </Link>
            ))}
          </div>

          {/* Trust strip · 3 pilares */}
          <ul className="mt-12 grid grid-cols-3 gap-4 border-t border-rvan-line pt-6 font-inter text-xs text-rvan-muted">
            <li>
              <span className="block text-rvan-ink">Importados</span>
              <span>De catálogos oficiales</span>
            </li>
            <li>
              <span className="block text-rvan-ink">Envío 48h</span>
              <span>Bogotá, Medellín, Cali</span>
            </li>
            <li>
              <span className="block text-rvan-ink">Devolución 30d</span>
              <span>Te devolvemos lo que no ames</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Fila inferior · las 3 macro-categorías con blurb editorial */}
      <div className="border-y border-rvan-line bg-rvan-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px bg-rvan-line md:grid-cols-3">
          {MACROS.map((m) => (
            <Link
              key={`${m.label}-strip`}
              href={m.href}
              className="flex flex-col gap-1 bg-rvan-cream p-6 transition hover:bg-rvan-bg"
            >
              <span
                className="h-2 w-12 rounded-full"
                style={{ background: m.color }}
                aria-hidden="true"
              />
              <span className="font-inter text-base font-bold text-rvan-ink">
                {m.label}
              </span>
              <span className="font-inter text-sm text-rvan-muted">
                {m.blurb}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
