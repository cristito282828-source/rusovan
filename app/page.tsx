import type { Metadata } from 'next';
import HeroRvan from '@/components/brand/HeroRvan';
import FeaturedProductsRvan from '@/components/brand/FeaturedProductsRvan';
import CategoriesRvan from '@/components/brand/CategoriesRvan';
import HowItWorksRvan from '@/components/brand/HowItWorksRvan';
import NewsletterRvan from '@/components/brand/NewsletterRvan';

export const metadata: Metadata = {
  title: 'Rvan · Posillos personalizados, importados',
  description:
    'Posillos coleccionables de tus pelis y series favoritas. También pet-friendly y lifestyle. Despachamos a todo el país.',
  keywords: ['rvan', 'posillos', 'personalizados', 'peliculas', 'series', 'pets', 'lifestyle'],
};

export const revalidate = 60;

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-rvan-bg">
      <HeroRvan />
      <FeaturedProductsRvan />
      <CategoriesRvan />
      <HowItWorksRvan />
      <NewsletterRvan />
    </main>
  );
}
