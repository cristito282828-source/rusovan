import Link from 'next/link';
import LogoRvan from './LogoRvan';

const MACROS = [
  { href: '/search/home', label: 'Home' },
  { href: '/search/pets', label: 'Pets' },
  { href: '/search/lifestyle', label: 'Lifestyle' },
];

const SECONDARY = [
  { href: '/search', label: 'Catálogo' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/preguntas-frecuentes', label: 'FAQ' },
];

/**
 * Header Rvan · sticky bar amarillo + nav minimal.
 * 3 macros primero (Home / Pets / Lifestyle), luego secundarios.
 */
export default function HeaderRvan() {
  return (
    <>
      {/* Sticky promo bar Kikkerland-style · amarillo signature */}
      <div className="rvan-promo-bar">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center">
          <span aria-hidden="true">★</span>
          <span>
            <strong>Envío gratis</strong> en pedidos +$120.000&nbsp;·&nbsp;Cupón BIENVENIDA10 en tu primera compra
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-rvan-line bg-rvan-bg/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <Link href="/" aria-label="Inicio Rvan">
            <LogoRvan size="md" className="md:!h-14 md:!w-14" />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {MACROS.map((m) => (
                <li key={m.label}>
                  <Link
                    href={m.href}
                    className="font-inter text-sm font-bold uppercase tracking-[0.06em] text-rvan-ink transition-colors hover:text-rvan-secondary"
                  >
                    {m.label}
                  </Link>
                </li>
              ))}
              <li aria-hidden="true" className="h-4 w-px bg-rvan-line" />
              {SECONDARY.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-inter text-sm font-medium text-rvan-ink transition-colors hover:text-rvan-secondary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/cuenta"
              className="hidden font-inter text-sm font-medium text-rvan-ink hover:text-rvan-secondary md:block"
            >
              Ingresar
            </Link>
            <Link href="/carrito" className="btn-rvan">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 7h13l-1.5 9h-11z" />
                <circle cx="9" cy="20" r="1.4" fill="currentColor" />
                <circle cx="17" cy="20" r="1.4" fill="currentColor" />
                <path d="M6 7 L4 3 H2" />
              </svg>
              <span className="font-inter text-sm">Carrito · 0</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
