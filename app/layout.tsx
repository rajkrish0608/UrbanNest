import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/lib/lenis';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/ChatWidget';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'UrbanNest — Little Things. Beautiful Living.',
  description:
    'UrbanNest is a curated home décor, gifts and lifestyle accessories store. Handpicked from Indian artisans — ceramics, textiles, brass, rattan and more.',
  keywords: ['home décor', 'lifestyle store', 'gifts', 'artisan', 'handcrafted', 'India'],
  openGraph: {
    title: 'UrbanNest Lifestyle Store',
    description: 'Little Things. Beautiful Living.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={inter.variable}>
      <body>
        <LenisProvider>
          <Nav />
          {children}
          <Footer />
          <ChatWidget />
        </LenisProvider>
      </body>
    </html>
  );
}
