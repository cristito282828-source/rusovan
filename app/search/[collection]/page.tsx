import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import HeaderRvan from '@/components/brand/HeaderRvan';
import FooterRvan from '@/components/brand/FooterRvan';
import ProductCardRvan from '@/components/brand/ProductCardRvan';

const VALID_MACROS = new Set(['home', 'pets', 'lifestyle']);

type CollectionMap = {
  slug: string;
  title: string;
  blurb: string;
  heroImg: string;
  accent: string;
};

const MACROS: Record<string, CollectionMap> = {
  home: {
    slug: 'home',
    title: 'Home',
    blurb: 'Posillos, jarrones, velas, deco. Para que tu casa se sienta más tuya.',
    heroImg: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=85',
    accent: '#FFD93D',
  },
  pets: {
    slug: 'pets',
    title: 'Pets',
    blurb: 'Platos, mantas, jugetes, posillos. Para que tu peludo beba rico.',
    heroImg: 'https://images.unsplash.com/photo-1601758174039-c1b2bc83fc0e?auto=format&fit=crop&w=1600&q=85',
    accent: '#7FB069',
  },
  lifestyle: {
    slug: 'lifestyle',
    title: 'Lifestyle',
    blurb: 'Cuadernos, stickers, camisetas. Para que lleves tu fandom contigo.',
    heroImg: 'https://images.unsplash.com/photo-1492707892479-7bc8d22a16dd?auto=format&fit=crop&w=1600&q=85',
    accent: '#3A2418',
  },
};

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection } = await params;
  const macro = MACROS[collection];
  if (macro) {
    return {
      title: `${macro.title} · Rvan`,
      description: macro.blurb,
    };
  }
  return {
    title: `${collection} · Rvan`,
    description: `Colección ${collection} en Rvan.`,
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { collection } = await props.params;
  await props.searchParams;

  // Si es una macro (home/pets/lifestyle) → manejamos aquí
  if (VALID_MACROS.has(collection)) {
    const macro = MACROS[collection];

    // Productos del WPGraphQL con filtro básico por nombre (heurística: contiene palabra clave).
    // Mientras no haya una taxonomía WP por macro, usamos esta aproximación.
    let products: any[] = [];
    try {
      const wooModule: any = await import('@/lib/woocommerce');
      const productsQueryModule: any = await import('@/lib/woocommerce/queries/product');
      const { woocommerceFetch } = wooModule;
      const { getProductsQuery } = productsQueryModule;
      const res = await woocommerceFetch<any>({
        query: getProductsQuery,
        variables: { search: macro.title }
      });
      products = res.body?.data?.products?.nodes ?? [];
    } catch (e) {
      console.error('Error fetching products for macro:', e);
    }

    // Si no llegan productos por nombre, no rompemos: enseñamos la macro en modo "coming soon".
    const adaptedProducts = products.slice(0, 12).map((p: any) => ({
      id: p.id,
      name: p.name || 'Sin nombre',
      slug: p.slug,
      price: p.price || 'Consultar precio',
      regularPrice: p.regularPrice || null,
      image: p.image?.sourceUrl || p.image?.url || null,
      shortDescription: p.shortDescription || '',
      stockStatus: p.stockStatus
    }));

    return (
      <>
        <HeaderRvan />
        <main id="main-content" className="min-h-screen bg-rvan-bg">
          {/* Hero de macro con imagen y copy específico */}
          <section className="border-b border-rvan-ink bg-rvan-bg">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-12 lg:px-8">
              <div className="md:col-span-5 flex flex-col justify-center">
                <span
                  className="rvan-tag"
                  style={{ color: macro.accent }}
                >
                  Macro · {macro.title}
                </span>
                <h1 className="mt-3 font-inter text-4xl font-bold leading-tight tracking-tight text-rvan-ink md:text-6xl">
                  {macro.title}
                </h1>
                <p className="mt-4 max-w-md font-inter text-base leading-relaxed text-rvan-muted">
                  {macro.blurb}
                </p>
              </div>
              <div className="md:col-span-7">
                <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-rvan-ink">
                  <img
                    src={macro.heroImg}
                    alt={macro.title}
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                  <span
                    className="absolute left-5 top-5 h-2 w-14 rounded-full"
                    style={{ background: macro.accent }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Grid */}
          <section className="bg-rvan-bg">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
              {adaptedProducts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-rvan-line bg-rvan-cream p-16 text-center">
                  <p className="font-inter text-2xl font-bold text-rvan-ink">
                    Pronto we'll be back en {macro.title}.
                  </p>
                  <p className="mt-2 font-inter text-sm text-rvan-muted">
                    Estamos preparando los productos para esta macro. ¿Quieres que te avisemos?
                  </p>
                  <Link href="/#newsletter" className="btn-rvan-link mt-6 inline-flex">
                    Suscríbete al boletín →
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <h2 className="font-inter text-2xl font-bold text-rvan-ink md:text-3xl">
                      Lo que tenemos hoy en {macro.title}
                    </h2>
                    <span className="font-inter text-xs font-bold uppercase tracking-[0.18em] text-rvan-muted">
                      {adaptedProducts.length} {adaptedProducts.length === 1 ? 'pieza' : 'piezas'}
                    </span>
                  </div>
                  <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {adaptedProducts.map((product) => (
                      <ProductCardRvan key={product.id} product={product} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        </main>
        <FooterRvan />
      </>
    );
  }

  // Otros slugs de WPGraphQL (categorías internas) → listado simple
  let products: any[] = [];
  try {
    const wooModule = await import('@/lib/woocommerce');
    const { woocommerceFetch, getProducts: getWooProducts } = wooModule as any;
    const productsQueryModule = await import('@/lib/woocommerce/queries/product');
    const { getProductsByCategoryQuery } = productsQueryModule;
    try {
      const res = await woocommerceFetch<any>({
        query: getProductsByCategoryQuery,
        variables: { category: collection }
      });
      products = res.body.data.products?.nodes || [];
    } catch (error) {
      console.error('Error fetching products by category:', error);
      products = await getWooProducts({});
    }
  } catch (e) {
    console.error('Error importing woo:', e);
  }

  const adaptedProducts = products.map((product: any) => ({
    id: product.id,
    name: product.name || 'Sin nombre',
    slug: product.slug,
    price: product.price || 'Consultar precio',
    regularPrice: product.regularPrice || null,
    image: product.image?.sourceUrl || product.image?.url || null,
    shortDescription: product.shortDescription || '',
    stockStatus: product.stockStatus
  }));

  const categoryTitle = collection;

  return (
    <>
      <HeaderRvan />
      <main id="main-content" className="min-h-screen bg-rvan-bg">
        <section className="border-b border-rvan-ink bg-rvan-bg">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <nav className="font-inter text-xs text-rvan-muted">
              <Link href="/" className="hover:text-rvan-secondary">Inicio</Link>
              <span className="mx-2">/</span>
              <Link href="/search" className="hover:text-rvan-secondary">Catálogo</Link>
              <span className="mx-2">/</span>
              <span className="text-rvan-ink">{categoryTitle}</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="rvan-tag">{categoryTitle}</span>
                <h1 className="mt-3 max-w-2xl font-inter text-3xl font-bold leading-tight tracking-tight text-rvan-ink md:text-5xl">
                  {categoryTitle}
                </h1>
              </div>
              <span className="font-inter text-xs font-bold uppercase tracking-[0.18em] text-rvan-muted">
                {adaptedProducts.length} {adaptedProducts.length === 1 ? 'pieza' : 'piezas'}
              </span>
            </div>
          </div>
        </section>

        <section className="bg-rvan-bg">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            {adaptedProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-rvan-line bg-rvan-cream p-16 text-center">
                <p className="font-inter text-2xl font-bold text-rvan-ink">
                  Aún no tenemos piezas en {categoryTitle}.
                </p>
                <Link href="/search" className="btn-rvan-link mt-6 inline-flex">
                  Ver todo →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {adaptedProducts.map((product) => (
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
