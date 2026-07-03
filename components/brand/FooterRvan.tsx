import Link from 'next/link';
import LogoRvan from './LogoRvan';

const COLS = [
  {
    title: 'Colecciones',
    links: [
      { href: '/search/posillos', label: 'Posillos' },
      { href: '/search/jarrones', label: 'Jarrones' },
      { href: '/search/cocina', label: 'Cocina' },
      { href: '/search/deco', label: 'Deco' },
    ],
  },
  {
    title: 'Rvan',
    links: [
      { href: '/nosotros', label: 'Nosotros' },
      { href: '/taller', label: 'El taller' },
      { href: '/preguntas-frecuentes', label: 'FAQ' },
      { href: '/contacto', label: 'Contacto' },
    ],
  },
  {
    title: 'Ayuda',
    links: [
      { href: '/envios', label: 'Envíos' },
      { href: '/cambios', label: 'Cambios y devoluciones' },
      { href: '/cuenta', label: 'Mi cuenta' },
      { href: '/politica-proteccion-datos', label: 'Privacidad' },
    ],
  },
];

export default function FooterRvan() {
  return (
    <footer className="border-t border-rvan-ink bg-rvan-bg">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <LogoRvan size="lg" />
            <p className="mt-6 max-w-sm font-inter text-base leading-relaxed text-rvan-muted">
              Posillos personalizados, importados, para gente que toma su café con su peli.
              <br />
              Despachamos a todo el país.
            </p>
            <p className="mt-6 font-inter text-xs uppercase tracking-[0.18em] text-rvan-muted">
              Síguenos
            </p>
            <div className="mt-3 flex gap-3">
              {['IG', 'TT', 'PT'].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={`Rvan en ${s}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-rvan-ink font-inter text-xs font-bold text-rvan-ink transition hover:bg-rvan-ink hover:text-rvan-bg"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            {COLS.map((col) => (
              <div key={col.title}>
                <h4 className="font-inter text-xs font-bold uppercase tracking-[0.18em] text-rvan-ink">
                  {col.title}
                </h4>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="font-inter text-sm text-rvan-muted hover:text-rvan-ink"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-rvan-line pt-6 font-inter text-xs text-rvan-muted md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Rvan · Cositas importadas, enviadas con cariño.</span>
          <div className="flex gap-6">
            <Link href="/terminos-y-condiciones" className="hover:text-rvan-ink">Términos</Link>
            <Link href="/politica-proteccion-datos" className="hover:text-rvan-ink">Privacidad</Link>
            <Link href="/politica-envios" className="hover:text-rvan-ink">Envíos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
