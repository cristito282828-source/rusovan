type Phrase = {
  h1a: string;
  h1b: string;
  /** Color del acento que va en la línea inferior h1b ('rvan-secondary' por defecto). */
  accentClass?: string;
  sub: string;
};

/**
 * Hero · Headline rotada server-side.
 * Elegimos índice determinista por bloque de 30s, así el servidor envía siempre
 * la misma frase para los requests que caen dentro del mismo bloque — estable
 * para el usuario, sin mutar el texto después de renderizar.
 *
 * Cero JS en el cliente, sin useState, sin animaciones que distraigan.
 */
const PHRASES: Phrase[] = [
  {
    h1a: 'Decoremos tu',
    h1b: 'comedor juntos.',
    accentClass: 'text-rvan-secondary',
    sub: 'Posillos, jarrones, velas y deco para tu casa — piezas únicas hechas para quedarse.',
  },
  {
    h1a: 'Consigue con nosotros',
    h1b: 'productos únicos.',
    accentClass: 'text-rvan-secondary',
    sub: 'Curaduría importada de posillos, piezas pet y lifestyle para gente que quiere cosas distintas.',
  },
];

export default function RotatingHeadline({
  rotationMs = 30000,
}: {
  rotationMs?: number;
}) {
  const idx = Math.floor(Date.now() / rotationMs) % PHRASES.length;
  const phrase: Phrase = PHRASES[idx]!;

  return (
    <>
      <h1 className="mt-5 font-inter text-5xl font-bold leading-[1.02] tracking-tight text-rvan-ink md:text-6xl lg:text-7xl">
        {phrase.h1a}
        <br />
        <span className={phrase.accentClass ?? 'text-rvan-secondary'}>
          {phrase.h1b}
        </span>
      </h1>

      <p className="mt-6 max-w-md font-inter text-base leading-relaxed text-rvan-muted">
        {phrase.sub}
      </p>
    </>
  );
}
