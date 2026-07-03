import type { Metadata } from 'next';
import HeaderRvan from '@/components/brand/HeaderRvan';
import HeroRvan from '@/components/brand/HeroRvan';
import FeaturedProductsRvan from '@/components/brand/FeaturedProductsRvan';
import CategoriesRvan from '@/components/brand/CategoriesRvan';
import HowItWorksRvan from '@/components/brand/HowItWorksRvan';
import NewsletterRvan from '@/components/brand/NewsletterRvan';
import FooterRvan from '@/components/brand/FooterRvan';

export const metadata: Metadata = {
  title: 'Rvan · Posillos personalizados, importados',
  description:
    'Posillos coleccionables de tus pelis y series favoritas. También pet-friendly y lifestyle. Despachamos a todo el país.',
  keywords: ['rvan', 'posillos', 'personalizados', 'peliculas', 'series', 'pets', 'lifestyle'],
};

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <HeaderRvan />
      <main id="main-content" className="min-h-screen bg-rvan-bg">
        <HeroRvan />
        <FeaturedProductsRvan />
        <CategoriesRvan />
        <HowItWorksRvan />
        <NewsletterRvan />
      </main>
      <FooterRvan />
    </>
  );
}
