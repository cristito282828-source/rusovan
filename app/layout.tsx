import type { Metadata } from 'next';
import './globals.css';
import { inter, moderat } from '@/fonts/fonts';
import { RecentlyViewedProvider } from '@/components/providers/RecentlyViewedProvider';
import { CartProvider } from '@/components/providers/CartProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/structured-data';
import { JsonLdScript } from '@/lib/json-ld-script';

export const metadata: Metadata = {
  title: {
    default: 'Rvan · cositas para el hogar con color',
    template: '%s · Rvan'
  },
  description:
    'Posillos, jarrones y piezas para el hogar que se sienten como un domingo en la mañana. Hecho en Colombia, envío en 48 h.',
  keywords: ['rvan', 'hogar', 'posillos', 'jarrones', 'colombia', 'decoración'],
  authors: [{ name: 'Rvan' }],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'Rvan',
    title: 'Rvan · cositas para el hogar con color',
    description:
      'Posillos, jarrones y piezas para el hogar que se sienten como un domingo en la mañana.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();

  return (
    <html
      lang="es"
      className={`${inter.variable} ${moderat.variable}`}
      style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
    >
      <head>
        <JsonLdScript data={organizationSchema} />
        <JsonLdScript data={webSiteSchema} />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>

        <CartProvider>
          <RecentlyViewedProvider>
            {children}
          </RecentlyViewedProvider>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
