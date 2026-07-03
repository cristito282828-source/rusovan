import type { Metadata } from 'next';
import Link from 'next/link';
import HeaderRvan from '@/components/brand/HeaderRvan';
import FooterRvan from '@/components/brand/FooterRvan';
import ProductCardRvan from '@/components/brand/ProductCardRvan';

export const metadata: Metadata = {
  title: 'Catálogo · Rvan',
  description: 'Posillos, jarrones y piezas para el hogar. Catálogo completo de Rvan.',
};

export const revalidate = 60;

async function getAllProducts() {
  try {
    const { woocommerceFetch } = await import('@/lib/woocommerce');
    const { getProductsQuery } = await import('@/lib/woocommerce/queries/product');
    const res = await woocommerceFetch<any>({
      query: getProductsQuery,
      variables: {}
    });
    const products = res.body.data.products?.nodes || [];
    return products.map((product: any) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price || 'Consultar precio',
      regularPrice: product.regularPrice || null,
      image: product.image?.sourceUrl || product.image?.url || null,
      shortDescription: product.shortDescription || '',
      stockStatus: product.stockStatus
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function SearchPage() {
  const products = await getAllProducts();

  return (
    <>
      <HeaderRvan />
      <main id="main-content" className="min-h-screen bg-rvan-bg">
        {/* Header de catálogo · estilo Kikkerland ALL CAPS eyebrow + headline */}
        <section className="border-b border-rvan-ink bg-rvan-bg">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <nav className="font-inter text-xs text-rvan-muted">
              <Link href="/" className="hover:text-rvan-secondary">Inicio</Link>
              <span className="mx-2">/</span>
              <span className="text-rvan-ink">Catálogo</span>
            </nav>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="rvan-tag">Catálogo</span>
                <h1 className="mt-3 max-w-2xl font-inter text-3xl font-bold leading-tight tracking-tight text-rvan-ink md:text-5xl">
                  Todo lo que tenemos hoy.
                </h1>
              </div>
              <span className="font-inter text-xs font-bold uppercase tracking-[0.18em] text-rvan-muted">
                {products.length} piezas
              </span>
            </div>
          </div>
        </section>

        {/* Grid · estilo Kikkerland packshot blanco + precio grande */}
        <section className="bg-rvan-bg">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            {products.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-rvan-line bg-rvan-cream p-16 text-center">
                <p className="font-inter text-2xl font-bold text-rvan-ink">Pronto we'll be back.</p>
                <Link href="/" className="btn-rvan-link mt-6 inline-flex">
                  Volver al inicio
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product: any) => (
                  <ProductCardRvan key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <FooterRvan />
    </>
  );
}
