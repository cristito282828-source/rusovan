import Link from 'next/link';
import ProductCardRvan, { type ProductCardRvanData } from './ProductCardRvan';

async function getFeaturedProducts(): Promise<ProductCardRvanData[]> {
  try {
    const { woocommerceFetch } = await import('@/lib/woocommerce');
    const { getProductsQuery } = await import('@/lib/woocommerce/queries/product');

    const res = await woocommerceFetch<any>({
      query: getProductsQuery,
      variables: {}
    });

    const nodes = res.body?.data?.products?.nodes ?? [];

    return nodes.slice(0, 8).map((p: any) => ({
      id: p.id,
      name: p.name || 'Producto',
      slug: p.slug,
      price: p.price || 'Consultar precio',
      regularPrice: p.regularPrice || null,
      image: p.image?.sourceUrl || p.image?.url || null,
      shortDescription: p.shortDescription || '',
      stockStatus: p.stockStatus
    }));
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export default async function FeaturedProductsRvan() {
  const products = await getFeaturedProducts();

  return (
    <section className="bg-rvan-bg">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="rvan-tag">Lo que acaba de llegar</span>
            <h2 className="mt-3 font-inter text-3xl font-bold leading-tight tracking-tight text-rvan-ink md:text-5xl">
              Recién importados. <br />Mañana en tu casa.
            </h2>
            <p className="mt-3 max-w-md font-inter text-sm leading-relaxed text-rvan-muted">
              Posillos, pet items y piezas lifestyle que acaban de salir del catálogo. Si te late uno, agrégalo al carrito antes que se agote.
            </p>
          </div>
          <Link href="/search" className="btn-rvan-link">
            Ver todo el catálogo →
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-rvan-line bg-rvan-cream p-12 text-center">
            <p className="font-inter text-2xl font-bold text-rvan-ink">Pronto we'll be back.</p>
            <p className="mt-2 font-inter text-sm text-rvan-muted">
              Estamos preparando el siguiente lote. Déjanos tu correo para avisarte.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCardRvan key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
