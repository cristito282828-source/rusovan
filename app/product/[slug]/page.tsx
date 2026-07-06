import Link from 'next/link';
import { ProductDescriptionWoo } from '@/components/product/ProductDescriptionWoo';
import { ProductViewTracker } from '@/components/product/ProductViewTracker';
import { generateProductSchema, generateBreadcrumbSchema } from '@/lib/structured-data';
import { JsonLdScript } from '@/lib/json-ld-script';
import { getCollections } from '@/lib/woocommerce';

/**
 * PÁGINA INDIVIDUAL DE PRODUCTO - Rvan.
 * HeaderRvan y FooterRvan vienen del layout raíz (app/layout.tsx).
 */
export const revalidate = 60;

type ProductEnvelope = {
  body: {
    data: {
      product: any;
    };
  };
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const { woocommerceFetch } = await import('@/lib/woocommerce');
    const { getProductQuery } = await import('@/lib/woocommerce/queries/product');

    const res = (await woocommerceFetch({
      query: getProductQuery,
      variables: { slug }
    })) as ProductEnvelope;

    const product = res.body.data.product;
    if (!product) return { title: 'Producto no encontrado · Rvan' };

    return {
      title: product.name,
      description: product.shortDescription || product.description?.slice(0, 160) || ''
    };
  } catch {
    return { title: 'Producto · Rvan' };
  }
}

async function getProduct(slug: string) {
  try {
    const { woocommerceFetch } = await import('@/lib/woocommerce');
    const { getProductQuery } = await import('@/lib/woocommerce/queries/product');
    const res = (await woocommerceFetch({
      query: getProductQuery,
      variables: { slug }
    })) as ProductEnvelope;
    return res.body.data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

const ROOT_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  // Hero/bran providers
  const collections = (await getCollections().catch(() => [])) as any[];
  const collection = collections.find((c: any) => {
    const slug_l = (c?.handle || c?.slug || '').toLowerCase();
    return slug_l && slug_l !== 'uncategorized';
  });
  const collectionTitle: string = collection?.title ?? collection?.name ?? 'Colección';

  if (!product) {
    return (
      <>
        <main id="main-content" className="min-h-screen bg-rvan-bg">
          <div className="mx-auto flex max-w-md flex-col items-center px-6 py-32 text-center">
            <p className="rvan-tag">404</p>
            <h1 className="mt-6 font-inter text-4xl font-bold tracking-tight text-rvan-ink md:text-5xl">
              No encontramos este producto.
            </h1>
            <p className="mt-4 font-inter text-base text-rvan-muted">
              Puede que se haya agotado, o que el link haya cambiado. Te dejamos el catálogo completo.
            </p>
            <Link href="/search" className="btn-rvan mt-8">
              Volver al catálogo
            </Link>
          </div>
        </main>
      </>
    );
  }

  const price = product.price || 'Precio no disponible';
  const image = product.image?.sourceUrl || product.image?.url || null;
  const galleryImages = product.galleryImages?.nodes || [];

  const productForTracker = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    image: image
  };

  const stripHtml = (html: string) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').trim();
  };

  const shortDescription = product.shortDescription ? stripHtml(product.shortDescription) : '';
  const description = product.description ? stripHtml(product.description) : '';

  const productSchema = generateProductSchema({
    name: product.name,
    description: shortDescription || description,
    image: image || '',
    price: price.replace(/[^0-9]/g, ''),
    priceCurrency: 'COP',
    availability: product.stockStatus === 'IN_STOCK'
      ? 'https://schema.org/InStock'
      : product.stockStatus === 'OUT_OF_STOCK'
      ? 'https://schema.org/OutOfStock'
      : 'https://schema.org/PreOrder',
    url: `${ROOT_URL}/product/${product.slug}`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: `${ROOT_URL}/` },
    { name: collectionTitle, url: `${ROOT_URL}/search/${collection?.handle || collection?.slug || ''}` },
    { name: product.name, url: `${ROOT_URL}/product/${product.slug}` },
  ]);

  const collectionHref = `/search/${collection?.handle || collection?.slug || ''}`;

  return (
    <>
      <JsonLdScript data={productSchema} />
      <JsonLdScript data={breadcrumbSchema} />

      <main id="main-content" className="min-h-screen bg-rvan-bg" tabIndex={-1}>
        {/* Breadcrumb + título */}
        <section className="border-b border-rvan-line bg-rvan-bg">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <nav className="font-inter text-xs text-rvan-muted">
              <Link href="/" className="hover:text-rvan-secondary">Inicio</Link>
              <span className="mx-2">/</span>
              <Link href={collectionHref} className="hover:text-rvan-secondary">
                {collectionTitle}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-rvan-ink">{product.name}</span>
            </nav>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">
            {/* Galería de imágenes - 60% (3 columnas) */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {image ? (
                  <div className="relative aspect-square overflow-hidden rounded-3xl border border-rvan-ink bg-rvan-cream">
                    <img
                      src={image}
                      alt={product.name || 'Producto'}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-square items-center justify-center rounded-3xl border border-dashed border-rvan-line bg-rvan-cream">
                    <span className="font-inter text-sm text-rvan-muted">Sin imagen</span>
                  </div>
                )}

                {galleryImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-3">
                    {galleryImages.map((img: any, index: number) => (
                      <div
                        key={img.sourceUrl || index}
                        className="relative aspect-square overflow-hidden rounded-xl border border-rvan-line bg-rvan-cream"
                      >
                        <img
                          src={img.sourceUrl}
                          alt={`${product.name || 'Producto'} - ${index + 1}`}
                          className="h-full w-full cursor-pointer object-cover object-center transition-opacity hover:opacity-80"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Info del producto - 40% (2 columnas) - Sticky */}
            <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
              <ProductDescriptionWoo product={product} />
            </div>
          </div>
        </div>
      </main>

      <ProductViewTracker product={productForTracker} />
    </>
  );
}
