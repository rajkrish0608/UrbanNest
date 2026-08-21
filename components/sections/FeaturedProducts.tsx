'use client';

import { useEffect, useRef } from 'react';
import { products } from '@/lib/products';
import ReflectiveCard from '@/components/ui/ReflectiveCard';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import { fadeUpReveal } from '@/lib/animations';

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;
    const trigger = fadeUpReveal(headerRef.current, sectionRef.current);
    return () => { trigger?.kill(); };
  }, []);

  return (
    <section
      id='products'
      ref={sectionRef}
      className='w-full py-24 overflow-hidden'
    >
      {/* Section header */}
      <div ref={headerRef} className='px-8 md:px-16 mb-12 flex items-end justify-between'>
        <AnimatedHeading
          text='FEATURED PIECES'
          className='type-heading text-cream'
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5625rem)', lineHeight: '0.95' }}
          tag='h2'
        />
        <a
          href='#products'
          className='type-label text-accent'
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            borderBottom: '1px solid var(--color-accent)',
            paddingBottom: '2px',
          }}
        >
          VIEW ALL →
        </a>
      </div>

      {/* Horizontal scroll-snap gallery with ReflectiveCards */}
      <div className='gallery-track'>
        {products.map((product) => (
          <ReflectiveCard
            key={product.id}
            imageSrc={product.image}
            imageAlt={product.name}
            style={{ width: 'clamp(260px, 28vw, 320px)', flexShrink: 0 }}
          >
            {/* Card content */}
            <div style={{ padding: '1.25rem 1.25rem 1.5rem' }}>
              {/* Tag */}
              <span
                className='type-label text-accent'
                style={{ fontSize: '0.5625rem', letterSpacing: '0.2em' }}
              >
                {product.tag}
              </span>

              {/* Name */}
              <h3
                className='type-label text-cream'
                style={{ fontSize: '0.875rem', lineHeight: 1.2, marginTop: '0.5rem' }}
              >
                {product.name.toUpperCase()}
              </h3>

              {/* Description */}
              <p
                className='text-cream'
                style={{
                  fontSize: '0.8125rem',
                  opacity: 0.5,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  marginTop: '0.4rem',
                }}
              >
                {product.description}
              </p>

              {/* Price + CTA */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '1rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px dashed var(--color-border)',
                }}
              >
                <span
                  className='text-cream'
                  style={{ fontSize: '1rem', fontWeight: 500 }}
                >
                  {product.price}
                </span>
                <button
                  className='btn-ghost'
                  style={{
                    padding: '0.35rem 0.875rem',
                    fontSize: '0.5625rem',
                    letterSpacing: '0.15em',
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </ReflectiveCard>
        ))}
      </div>

      {/* Scroll hint */}
      <div
        className='px-8 md:px-16 mt-6 flex items-center gap-3'
        style={{ opacity: 0.3 }}
      >
        <div style={{ width: '20px', height: '1px', background: 'var(--color-cream)' }} />
        <span
          className='type-label text-cream'
          style={{ fontSize: '0.5rem', letterSpacing: '0.2em' }}
        >
          SCROLL TO EXPLORE
        </span>
      </div>
    </section>
  );
}
