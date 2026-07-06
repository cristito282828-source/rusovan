'use client';

import { useState } from 'react';
import Link from 'next/link';

const MACROS = [
  {
    label: 'Home',
    href: '/search/home',
    blurb: 'Posillos, jarrones, velas, deco. Para tu casa.',
    accent: '#FFD93D',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=85',
    fallbackSvg: 'home',
  },
  {
    label: 'Pets',
    href: '/search/pets',
    blurb: 'Platos, juguetes, mantas. Para tu peludo.',
    accent: '#7FB069',
    img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85',
    fallbackSvg: 'pets',
  },
  {
    label: 'Lifestyle',
    href: '/search/lifestyle',
    blurb: 'Cuadernos, stickers, camisetas. Para tu día a día.',
    accent: '#3A2418',
    img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=85',
    fallbackSvg: 'lifestyle',
  },
];

/**
 * Imagen con fallback en cascada. Si la URL Unsplash devuelve error,
 * dibuja una silueta SVG inline con la paleta Rvan — nunca un ícono roto.
 */
function MacroImage({
  src,
  alt,
  fallback,
  className,
}: {
  src: string;
  alt: string;
  fallback: 'home' | 'pets' | 'lifestyle';
  className?: string;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return <MacroFallbackSvg kind={fallback} className={className} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setErrored(true)}
    />
  );
}

/**
 * Silueta SVG por macro. Rvan-friendly: líneas marrón chocolate sobre fondo crema.
 */
function MacroFallbackSvg({
  kind,
  className,
}: {
  kind: 'home' | 'pets' | 'lifestyle';
  className?: string;
}) {
  return (
    <div className={`flex h-full w-full items-center justify-center bg-rvan-cream ${className ?? ''}`}>
      <svg viewBox="0 0 200 160" className="h-full w-full" fill="none" aria-hidden="true">
        {kind === 'home' && (
          <g stroke="#3A2418" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Jarrón estilizado */}
            <path d="M70 50 H130 L132 60 C132 90 142 110 142 122 a32 32 0 0 1 -64 0 c0 -12 10 -32 10 -62 Z" fill="#F2EBDA" />
            <path d="M70 50 H130" />
            {/* Vela al lado */}
            <rect x="32" y="100" width="14" height="34" rx="2" fill="#F2EBDA" />
            <path d="M39 90 q-2 -8 2 -14 q4 -6 0 -12" stroke="#3A2418" strokeWidth="2" />
          </g>
        )}
        {kind === 'pets' && (
          <g stroke="#3A2418" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Huella de perro */}
            <ellipse cx="100" cy="100" rx="28" ry="32" fill="#F2EBDA" />
            <ellipse cx="76" cy="60" rx="9" ry="11" fill="#F2EBDA" />
            <ellipse cx="100" cy="50" rx="9" ry="11" fill="#F2EBDA" />
            <ellipse cx="124" cy="60" rx="9" ry="11" fill="#F2EBDA" />
            <ellipse cx="62" cy="84" rx="7" ry="9" fill="#F2EBDA" />
            <ellipse cx="138" cy="84" rx="7" ry="9" fill="#F2EBDA" />
          </g>
        )}
        {kind === 'lifestyle' && (
          <g stroke="#3A2418" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Cuaderno abierto */}
            <rect x="40" y="50" width="120" height="80" rx="4" fill="#F2EBDA" />
            <path d="M100 50 V130" />
            <path d="M55 70 H85 M115 70 H145" strokeWidth="2" opacity="0.6" />
            <path d="M55 85 H85 M115 85 H145" strokeWidth="2" opacity="0.6" />
            <path d="M55 100 H85 M115 100 H145" strokeWidth="2" opacity="0.6" />
            {/* Lápiz */}
            <path d="M148 36 l16 16 l-8 8 l-16 -16 z" fill="#FFD93D" stroke="#3A2418" />
            <path d="M156 44 l8 -8" />
          </g>
        )}
      </svg>
    </div>
  );
}

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
                <MacroImage
                  src={m.img}
                  alt={m.label}
                  fallback={m.fallbackSvg as 'home' | 'pets' | 'lifestyle'}
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
