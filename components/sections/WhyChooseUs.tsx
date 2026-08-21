'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { whyChooseUsPin } from '@/lib/animations';

const POINTS = [
  {
    number: '01',
    heading: 'CURATED QUALITY',
    body: "Every product passes through our hands before it reaches yours. If we wouldn't put it in our own home, it doesn't make the cut.",
  },
  {
    number: '02',
    heading: 'ARTISAN SOURCES',
    body: 'We travel to the source — Kutch, Channapatna, Chettinad — and work with makers who have spent decades perfecting a single craft.',
  },
  {
    number: '03',
    heading: 'GIFTING EXPERTISE',
    body: "Our gift curation service takes a brief and returns a box that feels personal. Not a generic hamper — a considered object.",
  },
  {
    number: '04',
    heading: 'LIFETIME SUPPORT',
    body: "Broken, worn, or faded — we'll help you repair, replace, or refresh. We believe in the long relationship, not just the first sale.",
  },
];

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    if (!containerRef.current) return;
    const panels = panelRefs.current.filter(Boolean);
    
    // Use gsap matchMedia so the animation properly initializes/cleans up on resize
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      whyChooseUsPin(containerRef.current!, panels);
    });
    
    return () => mm.revert();
  }, []);

  return (
    <section id='why' className='w-full'>
      {/* Section label */}
      <div className='px-8 md:px-16 py-16'>
        <hr className='divider-dashed mb-16' />
        <h2 className='type-heading text-accent' style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '0.1em', opacity: 1 }}>
          WHY URBANNEST
        </h2>
      </div>

      {/* Desktop — pinned crossfade */}
      <div
        ref={containerRef}
        className='hidden md:block relative'
        style={{ height: `${POINTS.length * 100}vh` }}
      >
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {POINTS.map((point, i) => (
          <div
            key={point.number}
            ref={(el) => { if (el) panelRefs.current[i] = el; }}
            className='flex flex-col justify-center px-16'
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100vh',
              opacity: i === 0 ? 1 : 0,
            }}
          >
            <div className='grid grid-cols-2 gap-24 items-center'>
              {/* Left — number + heading + image */}
              <div>
                <span className='type-label text-accent' style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}>
                  {point.number}
                </span>
                <h2
                  className='type-heading text-cream mt-4'
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.9, marginBottom: '2rem' }}
                >
                  {point.heading}
                </h2>

                {/* Interior image — shown in panels 0 and 1 */}
                {i < 2 && (
                  <div style={{ position: 'relative', width: '100%', height: '300px', borderRadius: '12px', overflow: 'hidden' }}>
                    <Image
                      src='/images/why-interior.jpg'
                      alt='Curated UrbanNest shelf'
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes='45vw'
                    />
                  </div>
                )}
              </div>

              {/* Right — body copy */}
              <p className='type-body text-cream' style={{ opacity: 0.7, fontSize: 'clamp(1.125rem,1.8vw,1.5rem)', lineHeight: 1.5 }}>
                {point.body}
              </p>
            </div>

            {/* Progress dots */}
            <div className='absolute bottom-16 left-16 flex gap-3 items-center'>
              {POINTS.map((_, j) => (
                <div
                  key={j}
                  style={{
                    width: j === i ? '24px' : '6px',
                    height: '1px',
                    background: j === i ? 'var(--color-cream)' : 'var(--color-border)',
                    transition: 'width 0.3s',
                  }}
                />
              ))}
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Mobile — stacked */}
      <div className='md:hidden flex flex-col gap-0'>
        {POINTS.map((point) => (
          <div
            key={point.number}
            className='px-8 py-12'
            style={{ borderBottom: '1px dashed var(--color-border)' }}
          >
            <span className='type-label text-accent' style={{ fontSize: '0.625rem', letterSpacing: '0.2em' }}>
              {point.number}
            </span>
            <h2 className='type-heading text-cream mt-3 mb-4' style={{ fontSize: '2rem', lineHeight: 0.95 }}>
              {point.heading}
            </h2>
            <p className='text-cream' style={{ fontSize: '1.0625rem', opacity: 0.7, lineHeight: 1.5, fontWeight: 400 }}>
              {point.body}
            </p>
          </div>
        ))}
        {/* Mobile interior image */}
        <div style={{ position: 'relative', width: '100%', height: '300px', margin: '2rem 0' }}>
          <Image
            src='/images/why-interior.jpg'
            alt='Curated UrbanNest shelf'
            fill
            style={{ objectFit: 'cover' }}
            sizes='100vw'
          />
        </div>
      </div>
    </section>
  );
}
