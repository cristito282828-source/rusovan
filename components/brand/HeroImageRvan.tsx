'use client';

import { useState } from 'react';
import clsx from 'clsx';

/**
 * Imagen del hero Rvan.
 * - Intenta cargar fotos de Unsplash de mugs / cerámica.
 * - Si todas fallan, dibuja un posillo SVG inline (estilo Kikkerland / Fatboy packshot).
 *
 * El cliente puede cambiarlas cuando suba fotos propias al CMS.
 */

const UNSPLASH_FALLBACKS = [
  'https://images.unsplash.com/photo-1570784332176-fdd73da66f03?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1616241673111-508b4662c707?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1590422749897-47036da0b0ff?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1520485521983-bfaa0bc6c80e?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1546379753-abb7fd8cfb93?auto=format&fit=crop&w=1400&q=85',
];

export default function HeroImageRvan({
  alt = 'Posillo Rvan',
  className,
  priority = true,
}: {
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const current = UNSPLASH_FALLBACKS[idx];
  const exhausted = idx >= UNSPLASH_FALLBACKS.length;

  return (
    <div className={clsx('relative h-full w-full overflow-hidden bg-rvan-cream', className)}>
      {!exhausted ? (
        <img
          src={current}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          className="h-full w-full object-cover transition-opacity duration-300"
          onError={() => setIdx((i) => i + 1)}
        />
      ) : (
        <RvanMugFallback />
      )}
    </div>
  );
}

/**
 * Posillo SVG dibujado a mano · fallback final si todas las URLs externas fallan.
 * Estilo Fatboy packshot: silueta negra sobre fondo crema + línea de tinta.
 */
function RvanMugFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-rvan-cream">
      <svg
        viewBox="0 0 400 500"
        className="h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        {/* Sombra suave */}
        <ellipse cx="200" cy="430" rx="120" ry="10" fill="#0F1115" opacity="0.08" />

        {/* Asa */}
        <path
          d="M265 230 a65 70 0 1 1 0 120"
          stroke="#0F1115"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cuerpo del posillo */}
        <path
          d="M120 170 H280 V360 a20 20 0 0 1 -20 20 H140 a20 20 0 0 1 -20 -20 Z"
          fill="#FBF4E8"
          stroke="#0F1115"
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Borde superior */}
        <ellipse
          cx="200"
          cy="170"
          rx="80"
          ry="14"
          fill="#FFFFFF"
          stroke="#0F1115"
          strokeWidth="6"
        />

        {/* Líquido (café/tinto) */}
        <ellipse cx="200" cy="170" rx="68" ry="9" fill="#5C3A21" />

        {/* Decoración: línea curva minimal */}
        <path
          d="M150 270 q50 -20 100 0"
          stroke="#FF5A36"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Vapor */}
        <path
          d="M165 130 q-8 -20 4 -36 q12 -16 0 -32"
          stroke="#0F1115"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.4"
          fill="none"
        />
        <path
          d="M205 120 q-8 -22 4 -38 q12 -18 0 -34"
          stroke="#0F1115"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.4"
          fill="none"
        />
        <path
          d="M245 130 q-8 -20 4 -36 q12 -16 0 -32"
          stroke="#0F1115"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.4"
          fill="none"
        />
      </svg>
    </div>
  );
}
