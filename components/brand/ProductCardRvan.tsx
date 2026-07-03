import Link from 'next/link';

export type ProductCardRvanData = {
  id: string;
  name: string;
  slug: string;
  price?: string | null;
  regularPrice?: string | null;
  image?: string | null;
  shortDescription?: string | null;
  stockStatus?: 'IN_STOCK' | 'OUT_OF_STOCK' | 'ON_BACKORDER' | string | null;
};

/**
 * Helper: limpia &nbsp; y entidades HTML del precio de WPGraphQL.
 */
export function formatPriceRvan(price: string | null | undefined): string {
  if (!price) return 'Consultar precio';
  return price
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .trim();
}

/**
 * Card Rvan · estilo Kikkerland/Fatboy: packshot blanco limpio, precio grande abajo,
 * badge sólo si OUT OF STOCK. Sin floritura de color en el chrome.
 */
export default function ProductCardRvan({ product }: { product: ProductCardRvanData }) {
  const priceText = formatPriceRvan(product.price);
  const isOut = product.stockStatus === 'OUT_OF_STOCK';

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-rvan-bg transition-opacity hover:opacity-90"
    >
      {/* Imagen · packshot style: blanco + hairline */}
      <div className="relative aspect-square overflow-hidden rounded-xl border border-rvan-line bg-rvan-bg">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-rvan-cream font-inter text-3xl font-bold text-rvan-muted">
            {product.name.slice(0, 2).toUpperCase()}
          </div>
        )}

        {/* ÚNICO badge permitido en card: "Agotado" si no hay stock (Kikkerland-style) */}
        {isOut && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-rvan-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-rvan-bg">
            Agotado
          </span>
        )}
      </div>

      {/* Cuerpo · tipografía editorial Kikkerland: nombre + precio grandes */}
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="line-clamp-2 font-inter text-base font-medium leading-snug text-rvan-ink">
          {product.name}
        </h3>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-inter text-lg font-bold text-rvan-ink">
            {priceText}
          </span>
        </div>
      </div>
    </Link>
  );
}
