import localFont from 'next/font/local';

// Serif usada como display opcional (Belleza) — mantenida por retrocompat.
export const belleza = localFont({
  src: './Belleza-Regular.ttf',
  display: 'swap',
  variable: '--font-belleza',
  weight: '400',
});

// Sans serif geométrica · tipografía editorial única para Rvan.
// Moderat-Black se usa como alias de "Inter Black" para mantener
// la sensación Kikkerland/Fatboy (bold, geométrica) sin nuevas descargas.
export const moderat = localFont({
  src: './Moderat-Black.ttf',
  display: 'swap',
  variable: '--font-moderat',
  weight: '400',
});

// Inter Bold — la sans editorial principal para títulos y cuerpo.
// Vive en /fonts/Inter-Bold.ttf (cargada una sola vez, sirve a todo el sitio).
export const inter = localFont({
  src: './Inter-Bold.ttf',
  display: 'swap',
  variable: '--font-inter',
  weight: '700',
});
