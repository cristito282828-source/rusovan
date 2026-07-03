import Link from 'next/link';

export default function NewsletterRvan() {
  return (
    <section id="newsletter" className="bg-rvan-primary">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-20 text-rvan-ink md:grid-cols-12 md:gap-12 lg:px-8">
        <div className="md:col-span-7">
          <span className="rvan-tag">Boletín</span>
          <h2 className="mt-4 font-inter text-3xl font-bold leading-tight md:text-5xl">
            Cositas nuevas cada 15 días. <br />Te avisamos primero.
          </h2>
          <p className="mt-4 max-w-xl font-inter text-base leading-relaxed">
            Drops de colecciones nuevas, restocks y descuentos solo para suscriptores. <br />
            Sin spam — solo cuando hay algo que vale la pena.
          </p>
        </div>

        <form className="md:col-span-5">
          <label htmlFor="newsletter-rvan" className="sr-only">
            Tu correo
          </label>
          <div className="flex flex-col gap-2 rounded-full border border-rvan-ink bg-rvan-bg p-2 sm:flex-row">
            <input
              id="newsletter-rvan"
              type="email"
              placeholder="tu@correo.com"
              className="flex-1 rounded-full bg-transparent px-4 py-3 font-inter text-rvan-ink placeholder:text-rvan-muted focus:outline-none"
              required
            />
            <button type="submit" className="btn-rvan">
              Quiero el boletín
            </button>
          </div>
          <p className="mt-3 font-inter text-xs text-rvan-ink/70">
            Al suscribirme acepto la{' '}
            <Link href="/politica-proteccion-datos" className="underline underline-offset-2">
              política de datos
            </Link>
            .
          </p>
        </form>
      </div>
    </section>
  );
}
