'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchModalRvan() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Foco automático al abrir
  useEffect(() => {
    if (open) {
      // pequeña espera para que el browser haga layout
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Bloquear scroll del body mientras está abierto
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  // Cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) {
      // si vacio → a /search sin query
      router.push('/search');
      setOpen(false);
      return;
    }
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setOpen(false);
  }

  return (
    <>
      {/* Botón-trigger en el header */}
      <button
        type="button"
        aria-label="Buscar productos"
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-rvan-ink text-rvan-ink transition hover:bg-rvan-ink hover:text-rvan-bg"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="6" />
          <path d="M20 20l-4-4" />
        </svg>
      </button>

      {/* Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Buscar"
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-20 sm:pt-28"
        >
          {/* Backdrop clickeable para cerrar */}
          <button
            type="button"
            aria-label="Cerrar buscador"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-rvan-ink/40 backdrop-blur-sm"
          />

          {/* Card */}
          <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-rvan-ink bg-rvan-bg shadow-[0_30px_60px_-15px_rgba(42,24,14,0.35)]">
            <form onSubmit={submit} className="flex items-center gap-3 p-4 sm:p-6">
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-rvan-ink" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="6" />
                <path d="M20 20l-4-4" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                placeholder="Buscar posillos, jarrones, fandoms..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="flex-1 bg-transparent font-inter text-base text-rvan-ink placeholder:text-rvan-muted focus:outline-none"
                autoComplete="off"
              />
              <button type="submit" className="btn-rvan">
                Buscar
              </button>
            </form>

            {/* Tips de búsqueda */}
            <div className="border-t border-rvan-line bg-rvan-cream px-4 py-4 sm:px-6">
              <p className="font-inter text-[11px] uppercase tracking-[0.18em] text-rvan-muted">
                Sugerencias
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Marvel', 'Friends', 'Harry Potter', 'Star Wars', 'Cats', 'Café'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setQ(t);
                      inputRef.current?.focus();
                    }}
                    className="rounded-full border border-rvan-ink bg-rvan-bg px-3 py-1 font-inter text-xs text-rvan-ink transition hover:bg-rvan-ink hover:text-rvan-bg"
                  >
                    {t}
                  </button>
                ))}
              </div>
              <p className="mt-4 font-inter text-[11px] text-rvan-muted">
                Enter para ver resultados · Esc para cerrar
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
