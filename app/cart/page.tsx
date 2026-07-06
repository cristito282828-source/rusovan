'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/components/providers/CartProvider';

interface LocalCartItem {
  key: string;
  productId: string;
  productName: string;
  productSlug: string;
  variationId?: string;
  variationName?: string;
  variationSize?: string;
  price: number;
  priceDisplay: string;
  regularPrice?: number;
  regularPriceDisplay?: string;
  quantity: number;
  image?: {
    sourceUrl?: string;
    altText?: string;
  };
}

/**
 * /cart · Rvan
 * Layout 2 columnas desktop: items (izq) + resumen (der sticky).
 * Paleta y tipografía editorial unificadas con el resto del sitio.
 */

/** Vacío: bolsa marrón dibujada en SVG, sin ícono chiquito genérico. */
function EmptyBagSvg() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 22 H50 L46 56 H18 Z" />
      <path d="M24 30 a8 8 0 0 1 16 0" />
    </svg>
  );
}

function EmptyCartMessage() {
  return (
    <main id="main-content" className="min-h-[60vh] bg-rvan-bg">
      <div className="mx-auto flex max-w-md flex-col items-center px-6 py-24 text-center">
        <span className="rvan-tag">Carrito</span>
        <div className="mt-6 flex h-20 w-20 items-center justify-center rounded-full border border-rvan-ink bg-rvan-cream text-rvan-ink">
          <EmptyBagSvg />
        </div>
        <h1 className="mt-6 font-inter text-3xl font-bold leading-tight tracking-tight text-rvan-ink md:text-4xl">
          Tu carrito está vacío.
        </h1>
        <p className="mt-3 font-inter text-base leading-relaxed text-rvan-muted">
          Parece que aún no has agregado productos. Explora el catálogo y elige los tuyos.
        </p>
        <Link href="/search" className="btn-rvan mt-8">
          Explorar catálogo
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}

function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: LocalCartItem;
  onUpdateQuantity: (key: string, quantity: number) => void;
  onRemove: (key: string) => void;
}) {
  const imageUrl = item.image?.sourceUrl;
  const imageAlt = item.image?.altText || item.productName;

  return (
    <div className="flex gap-4 border border-rvan-line bg-rvan-bg p-4 sm:gap-6 sm:p-5">
      {/* Imagen cuadrada con borde ink sutil */}
      <Link
        href={`/product/${item.productSlug}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-rvan-line bg-rvan-cream sm:h-28 sm:w-28"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 640px) 112px, 96px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-inter text-xs text-rvan-muted">
            Sin imagen
          </div>
        )}
      </Link>

      {/* Info + controles */}
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <Link
              href={`/product/${item.productSlug}`}
              className="line-clamp-2 font-inter text-base font-bold leading-tight text-rvan-ink hover:text-rvan-secondary"
            >
              {item.productName}
            </Link>

            {item.variationSize && (
              <p className="mt-1 font-inter text-xs uppercase tracking-[0.16em] text-rvan-muted">
                Tamaño: {item.variationSize} ml
              </p>
            )}

            <p className="mt-2 font-belleza text-xl leading-none text-rvan-ink">
              {item.priceDisplay}
            </p>
          </div>

          <button
            onClick={() => onRemove(item.key)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-rvan-ink transition hover:bg-rvan-ink hover:text-rvan-bg"
            aria-label={`Eliminar ${item.productName}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Cantidad */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center rounded-full border border-rvan-ink">
            <button
              onClick={() => onUpdateQuantity(item.key, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="flex h-9 w-9 items-center justify-center rounded-l-full text-rvan-ink transition hover:bg-rvan-ink hover:text-rvan-bg disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Disminuir cantidad"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="min-w-[3rem] text-center font-inter text-sm font-bold text-rvan-ink">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.key, item.quantity + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-r-full text-rvan-ink transition hover:bg-rvan-ink hover:text-rvan-bg"
              aria-label="Aumentar cantidad"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <span className="font-inter text-xs text-rvan-muted">
            Subtotal · <span className="font-bold text-rvan-ink">{item.priceDisplay}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { cart, isLoading, updateQuantity, removeItem } = useCart();

  if (isLoading) {
    return (
      <main id="main-content" className="min-h-[60vh] bg-rvan-bg">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-24">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-rvan-line border-t-rvan-ink" />
            <p className="font-inter text-sm text-rvan-muted">Cargando tu carrito…</p>
          </div>
        </div>
      </main>
    );
  }

  if (!cart || cart.contents.nodes.length === 0) {
    return <EmptyCartMessage />;
  }

  // Parseo ligero del subtotal en COP para alimentar la ATC progress bar.
  // /[\d.]+/ extrae solo dígitos y puntos del string "$ 120.000".
  const subtotalString = cart.subtotal || '$0';
  const subtotalNumber = Number((subtotalString.match(/[\d.]+/) ?? ['0'])[0].replace(/\./g, '')) || 0;
  const FREE_SHIPPING_THRESHOLD = 120000;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalNumber);
  const progress = Math.min(100, (subtotalNumber / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <main id="main-content" className="min-h-screen bg-rvan-bg">
      {/* Header de carrito */}
      <section className="border-b border-rvan-line bg-rvan-bg">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
          <nav className="mb-4 font-inter text-xs text-rvan-muted">
            <Link href="/" className="hover:text-rvan-secondary">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-rvan-ink">Carrito</span>
          </nav>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="rvan-tag">Tu pedido</span>
              <h1 className="mt-3 font-inter text-3xl font-bold leading-tight tracking-tight text-rvan-ink md:text-5xl">
                Carrito.
              </h1>
            </div>
            <span className="font-inter text-xs font-bold uppercase tracking-[0.18em] text-rvan-muted">
              {cart.contents.nodes.length}{' '}
              {cart.contents.nodes.length === 1 ? 'pieza' : 'piezas'}
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-rvan-cream">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
            {/* Items */}
            <div className="space-y-4 lg:col-span-2">
              {cart.contents.nodes.map((item) => (
                <CartItemCard
                  key={item.key}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}

              {/* Sticky ATC progress bar editorial */}
              <div className="mt-8 rounded-2xl border border-rvan-ink bg-rvan-bg p-5">
                <div className="flex items-center justify-between">
                  <span className="font-inter text-xs uppercase tracking-[0.18em] text-rvan-ink">
                    {remaining > 0 ? (
                      <>Te faltan <strong className="font-belleza text-base tracking-tight">${remaining.toLocaleString('es-CO')}</strong> para envío gratis</>
                    ) : (
                      <><strong className="text-rvan-primary">¡Envío gratis desbloqueado!</strong></>
                    )}
                  </span>
                  <span className="font-inter text-xs font-bold text-rvan-muted">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-rvan-soft">
                  <div
                    className="h-full rounded-full bg-rvan-secondary"
                    style={{ width: `${progress}%` }}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-3 font-inter text-[11px] text-rvan-muted">
                  Devoluciones gratis 30 días&nbsp;·&nbsp;Pago contraentrega en Bogotá, Medellín y Cali
                </p>
              </div>
            </div>

            {/* Resumen */}
            <aside className="lg:col-span-1">
              <div className="sticky top-32 space-y-6 border border-rvan-ink bg-rvan-bg p-6">
                <h2 className="font-inter text-xs font-bold uppercase tracking-[0.18em] text-rvan-ink">
                  Resumen del pedido
                </h2>

                <dl className="space-y-3 font-inter text-sm">
                  <div className="flex justify-between">
                    <dt className="text-rvan-muted">Subtotal</dt>
                    <dd className="font-bold text-rvan-ink">{cart.subtotal}</dd>
                  </div>

                  {cart.shippingTotal && cart.shippingTotal !== '$0' && (
                    <div className="flex justify-between">
                      <dt className="text-rvan-muted">Envío</dt>
                      <dd className="font-bold text-rvan-ink">{cart.shippingTotal}</dd>
                    </div>
                  )}

                  {cart.discountTotal && cart.discountTotal !== '$0' && (
                    <div className="flex justify-between text-rvan-secondary">
                      <dt>Descuento</dt>
                      <dd className="font-bold">-{cart.discountTotal}</dd>
                    </div>
                  )}

                  {cart.feeTotal && cart.feeTotal !== '$0' && (
                    <div className="flex justify-between">
                      <dt className="text-rvan-muted">Tarifas</dt>
                      <dd className="font-bold text-rvan-ink">{cart.feeTotal}</dd>
                    </div>
                  )}

                  <div className="flex items-baseline justify-between border-t border-rvan-line pt-4">
                    <dt className="font-inter text-xs font-bold uppercase tracking-[0.18em] text-rvan-ink">
                      Total
                    </dt>
                    <dd className="font-belleza text-3xl leading-none text-rvan-ink">
                      {cart.total}
                    </dd>
                  </div>
                </dl>

                <Link href="/checkout" className="btn-rvan w-full text-center">
                  Finalizar compra
                </Link>

                <Link
                  href="/search"
                  className="block text-center font-inter text-sm text-rvan-muted underline-offset-4 hover:text-rvan-ink hover:underline"
                >
                  Continuar comprando
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
