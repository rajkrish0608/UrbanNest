'use client';

import { useEffect, useRef } from 'react';
import { products } from '@/lib/products';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import AccordionGallery from '@/components/ui/AccordionGallery';
import { fadeUpReveal } from '@/lib/animations';

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;
    const trigger = fadeUpReveal(headerRef.current, sectionRef.current);
    return () => { trigger?.kill(); };
  }, []);

  // Map our products to the AccordionGallery format
  const galleryItems = products.map((product) => ({
    image: product.image,
    label: product.name.toUpperCase(),
    link: '#', // Can link to a product detail page later
    alt: product.name,
  }));

  return (
    <section
      id='products'
      ref={sectionRef}
      className='w-full py-24 overflow-hidden bg-[var(--color-surface)]'
    >
      {/* Section header */}
      <div ref={headerRef} className='px-8 md:px-16 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6'>
        <div>
          <span className="type-label text-accent mb-3 block" style={{ fontSize: '0.625rem', letterSpacing: '0.2em' }}>
            LATEST CURATION
          </span>
          <AnimatedHeading
            text='FEATURED PIECES'
            className='type-heading text-cream'
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: '0.95' }}
            tag='h2'
          />
        </div>
        <a
          href='#products'
          className='type-label text-cream'
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: '2px',
            opacity: 0.7,
            transition: 'opacity 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
        >
          EXPLORE ALL PRODUCTS →
        </a>
      </div>

      {/* Accordion Gallery replacing the horizontal scroll track */}
      <div className='px-8 md:px-16 w-full' style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <AccordionGallery
          items={galleryItems}
          defaultIndex={1}
          expandRatio={0.52}
          trigger="hover"
          accentColor="var(--color-accent)"
          overlayColor="var(--color-surface)"
          textColor="var(--color-cream)"
          grayscale={true}
          showLabels={true}
          duration={0.6}
          ease="power3.out"
          parallax={0.5}
          tilt={8}
          stagger={0.06}
          height={500}
          gap={16}
          radius={12}
          orientation="horizontal"
        />
      </div>
      
      {/* Scroll hint below gallery */}
      <div
        className='px-8 md:px-16 mt-12 flex items-center gap-3'
        style={{ opacity: 0.3 }}
      >
        <div style={{ width: '20px', height: '1px', background: 'var(--color-cream)' }} />
        <span
          className='type-label text-cream'
          style={{ fontSize: '0.5rem', letterSpacing: '0.2em' }}
        >
          HOVER TO EXPAND
        </span>
      </div>
    </section>
  );
}
