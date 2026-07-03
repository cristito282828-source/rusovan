const STEPS = [
  {
    n: '01',
    title: 'Elige tu mundo',
    desc: 'Home, Pets o Lifestyle. Después filtra por peli, serie, anime, fandom.',
  },
  {
    n: '02',
    title: 'Personalízalo',
    desc: 'Si quieres, sube tu diseño, foto o frase. Te lo montamos en el posillo.',
  },
  {
    n: '03',
    title: 'Llega en 48 h',
    desc: 'Despachamos mismo día si pides antes de las 2pm. Devoluciones gratis 30 días.',
  },
];

export default function HowItWorksRvan() {
  return (
    <section className="bg-rvan-bg">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-xl">
          <span className="rvan-tag">Cómo funciona</span>
          <h2 className="mt-3 font-inter text-3xl font-bold leading-tight tracking-tight text-rvan-ink md:text-4xl">
            De la pantalla a tu mesa, <br />en tres pasos.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="border-t border-rvan-ink pt-6">
              <span className="font-inter text-xs font-bold uppercase tracking-[0.18em] text-rvan-secondary">
                {s.n}
              </span>
              <h3 className="mt-4 font-inter text-2xl font-bold leading-tight text-rvan-ink">
                {s.title}
              </h3>
              <p className="mt-3 max-w-xs font-inter text-sm leading-relaxed text-rvan-muted">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
