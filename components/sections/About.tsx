'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { fadeUpReveal } from '@/lib/animations';
import AnimatedHeading from '@/components/ui/AnimatedHeading';

export default function About() {
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const body2Ref = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els: HTMLElement[] = [];
    if (bodyRef.current) els.push(bodyRef.current);
    if (body2Ref.current) els.push(body2Ref.current);
    if (imageRef.current) els.push(imageRef.current);
    const trigger = fadeUpReveal(els, sectionRef.current, { stagger: 0.15, delay: 0.1 });
    return () => { trigger?.kill(); };
  }, []);

  return (
    <section
      id='about'
      ref={sectionRef}
      className='w-full py-28 px-8 md:px-16'
    >
      <hr className='divider-dashed mb-16' />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start'>
        {/* Left — heading + artisan image */}
        <div>
          <AnimatedHeading
            text='A STORE BUILT ON CRAFT'
            className='type-heading text-cream'
            style={{ fontSize: 'clamp(2rem, 4vw, 2.5625rem)', lineHeight: '0.95' }}
            tag='h2'
          />
          <div className='mt-8 flex items-center gap-3 mb-8'>
            <div style={{ width: '32px', height: '1px', background: 'var(--color-accent)' }} />
            <span className='type-label text-accent' style={{ fontSize: '0.625rem', letterSpacing: '0.2em' }}>
              SINCE 2019
            </span>
          </div>

          {/* Artisan photo — halftone-style clip with corner accent */}
          <div
            ref={imageRef}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4/5',
              borderRadius: '12px',
              overflow: 'hidden',
              opacity: 0,
              transform: 'translateY(30px)',
            }}
          >
            <Image
              src='/images/about-artisan.jpg'
              alt='Artisan shaping clay'
              fill
              style={{ objectFit: 'cover' }}
              sizes='(max-width: 768px) 100vw, 45vw'
            />
            {/* Grain texture overlay for editorial feel */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 60%, rgba(20,16,11,0.6))',
                mixBlendMode: 'multiply',
              }}
            />
            {/* Bottom label over photo */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.25rem',
                right: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <div style={{ width: '20px', height: '1px', background: 'var(--color-accent)' }} />
              <span className='type-label text-cream' style={{ fontSize: '0.5rem', letterSpacing: '0.25em', opacity: 0.7 }}>
                RAJASTHAN · KUTCH · CHETTINAD
              </span>
            </div>
          </div>
        </div>

        {/* Right — body copy */}
        <div style={{ paddingTop: '3rem' }}>
          <p
            ref={bodyRef}
            className='text-cream'
            style={{ fontSize: '1.8125rem', fontWeight: 400, lineHeight: 1.26, opacity: 0.85 }}
          >
            UrbanNest began with a simple refusal — to sell things that
            weren&apos;t worth keeping. Every piece is chosen because it earns
            its place in a home: made by hand, made to last.
          </p>
          <p
            ref={body2Ref}
            className='text-cream mt-8'
            style={{ fontSize: '1.125rem', opacity: 0.5, lineHeight: 1.6, fontWeight: 400 }}
          >
            We work directly with artisans from Rajasthan, Kutch, and Chettinad
            — bypassing intermediaries so the maker gets paid fairly, and you
            get something that couldn&apos;t exist otherwise.
          </p>

          {/* Stats row */}
          <div className='mt-12 grid grid-cols-3 gap-6'>
            {[
              { n: '200+', label: 'ARTISANS' },
              { n: '6', label: 'STATES' },
              { n: '5YR', label: 'CURATION' },
            ].map(({ n, label }) => (
              <div key={label} style={{ borderTop: '1px dashed var(--color-border)', paddingTop: '1rem' }}>
                <div className='text-cream' style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)', fontWeight: 500 }}>
                  {n}
                </div>
                <div className='type-label text-accent' style={{ fontSize: '0.5625rem', letterSpacing: '0.15em', marginTop: '0.25rem' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className='divider-dashed mt-16' />
    </section>
  );
}
