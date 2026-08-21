'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import CustomerInteraction from '@/components/sections/CustomerInteraction';

// Loader is client-only (GSAP), lazy-loaded
const Loader = dynamic(() => import('@/components/ui/Loader'), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  // Skip loader on repeat visits within the same session
  useEffect(() => {
    const already = sessionStorage.getItem('un_loaded');
    if (already) {
      setLoading(false);
      setContentVisible(true);
    }
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem('un_loaded', '1');
    setLoading(false);
    // Small delay so curtain finishes before content paint
    setTimeout(() => setContentVisible(true), 80);
  };

  return (
    <>
      {/* Loader — only shown on first visit */}
      {loading && <Loader onComplete={handleLoaderComplete} />}

      {/* Main site content */}
      <main
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 0.5s ease',
          // Prevent interaction while loader is active
          pointerEvents: contentVisible ? 'auto' : 'none',
        }}
      >
        <Hero />
        <About />
        <FeaturedProducts />
        <WhyChooseUs />
        <CustomerInteraction />
      </main>
    </>
  );
}
