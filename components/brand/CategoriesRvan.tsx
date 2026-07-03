import Link from 'next/link';

const MACROS = [
  {
    label: 'Home',
    href: '/search/home',
    blurb: 'Posillos, jarrones, velas, deco. Para tu casa.',
    accent: '#FFD93D',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=85',
  },
  {
    label: 'Pets',
    href: '/search/pets',
    blurb: 'Platos, juguetes, mantas. Para tu peludo.',
    accent: '#7FB069',
    img: 'https://images.unsplash.com/photo-1601758174039-c1b2bc83fc0e?auto=format&fit=crop&w=1200&q=85',
  },
  {
    label: 'Lifestyle',
    href: '/search/lifestyle',
    blurb: 'Cuadernos, stickers, camisetas. Para tu día a día.',
    accent: '#3A2418',
    img: 'https://images.unsplash.com/photo-1492707892479-7bc8d22a16dd?auto=format&fit=crop&w=1200&q=85',
  },
];

export default function CategoriesRvan() {
  return (
    <section className="bg-rvan-bg">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="rvan-tag">Las tres macro</span>
            <h2 className="mt-3 font-inter text-3xl font-bold leading-tight tracking-tight text-rvan-ink md:text-5xl">
              Elige tu mundo.
            </h2>
          </div>
          <p className="max-w-sm font-inter text-sm leading-relaxed text-rvan-muted">
            Tres macro-categorías. Cada una con sus productos, sus fandoms y su rollo.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {MACROS.map((m) => (
            <Link
              key={m.label}
              href={m.href}
              className="group block overflow-hidden rounded-2xl border border-rvan-ink bg-rvan-bg transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-[5/4] w-full overflow-hidden">
                <img
                  src={m.img}
                  alt={m.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Banda de color arriba */}
                <span
                  className="absolute left-5 top-5 h-2 w-14 rounded-full"
                  style={{ background: m.accent }}
                  aria-hidden="true"
                />
                <span className="absolute right-5 top-5 rounded-full bg-rvan-bg/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-rvan-ink backdrop-blur">
                  {m.label}
                </span>
              </div>
              <div className="flex items-end justify-between gap-3 p-6">
                <p className="font-inter text-sm leading-relaxed text-rvan-muted">
                  {m.blurb}
                </p>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-rvan-ink text-rvan-ink transition group-hover:bg-rvan-ink group-hover:text-rvan-bg">
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
