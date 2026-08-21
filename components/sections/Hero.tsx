'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import MagneticButton from '@/components/ui/MagneticButton';
import ScrollExpand from '@/components/ui/ScrollExpand';

// Lazy load ParticleText — heavy canvas component
const ParticleText = dynamic(() => import('@/components/ui/ParticleText'), {
  ssr: false,
  loading: () => (
    <h1
      className='type-heading text-cream'
      style={{ fontSize: 'clamp(3rem, 9vw, 6rem)', lineHeight: 0.92 }}
    >
      URBANNEST
    </h1>
  ),
});

export default function Hero() {
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stagger in tagline + CTA after particle animation starts
    const timer = setTimeout(() => {
      if (taglineRef.current) {
        taglineRef.current.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        taglineRef.current.style.opacity = '1';
        taglineRef.current.style.transform = 'translateY(0)';
      }
    }, 400);
    const timer2 = setTimeout(() => {
      if (ctaRef.current) {
        ctaRef.current.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        ctaRef.current.style.opacity = '1';
        ctaRef.current.style.transform = 'translateY(0)';
      }
    }, 900);
    return () => { clearTimeout(timer); clearTimeout(timer2); };
  }, []);

  return (
    <section id='hero' style={{ position: 'relative', width: '100%' }}>
      {/* ── ScrollExpand hero image ──────────────────────────────────── */}
      <div style={{ height: '320vh', position: 'relative' }}>
        <ScrollExpand
          src='/images/hero-lifestyle.jpg'
          alt='UrbanNest warm interior'
          scrollHint='Scroll to explore'
          startWidth={44}
          startHeight={55}
          startRadius={20}
          endRadius={0}
          mediaZoom={1.3}
          scrollDistance={0.7}
          holdDistance={0.2}
          smoothing={0.08}
          overlayScrim={0.55}
          useWindowScroll
          style={{ height: '320vh' }}
        >
          {/* Overlay content shown at full-bleed */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <span
              className='type-label text-cream'
              style={{ fontSize: '0.75rem', letterSpacing: '0.25em', opacity: 0.7 }}
            >
              LITTLE THINGS. BEAUTIFUL LIVING.
            </span>
            <MagneticButton className='btn-cta' href='#products' strength={6}>
              Explore Products
            </MagneticButton>
          </div>
        </ScrollExpand>
      </div>

      {/* ── Particle wordmark pinned over the scroll area ─────────────── */}
      <div
        style={{
          position: 'sticky',
          top: '50vh',
          transform: 'translateY(-50%)',
          zIndex: 20,
          pointerEvents: 'none',
          width: '100%',
          padding: '0 4rem',
          marginTop: '-320vh',
          marginBottom: '0',
          height: 0,
          overflow: 'visible',
        }}
      >
        {/* Tagline */}
        <p
          ref={taglineRef}
          className='type-label text-cream'
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.25em',
            opacity: 0,
            transform: 'translateY(16px)',
            marginBottom: '1.5rem',
          }}
        >
          LITTLE THINGS. BEAUTIFUL LIVING.
        </p>

        {/* Particle wordmark */}
        <div style={{ height: 'clamp(100px, 15vw, 180px)', width: '100%', maxWidth: '900px' }}>
          <ParticleText
            text='URBANNEST'
            particleSize={2.4}
            density={3.5}
            color='#ffedd7'
            highlightColor='#d9591f'
            scatter={220}
            gatherDuration={1800}
            stagger={480}
            pointerRepel={50}
            repelRadius={130}
            idleDrift={0.6}
            trigger='mount'
            fontSize='clamp(3.5rem, 10vw, 7rem)'
            fontWeight={500}
            fontFamily='Inter, sans-serif'
            glow
          />
        </div>

        {/* CTA — below wordmark */}
        <div
          ref={ctaRef}
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            marginTop: '2.5rem',
            pointerEvents: 'auto',
          }}
        >
          <MagneticButton className='btn-cta' href='#products' strength={6}>
            Explore Products
          </MagneticButton>
        </div>
      </div>

      {/* Right-edge vertical label */}
      <div
        style={{
          position: 'fixed',
          right: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 30,
          pointerEvents: 'none',
        }}
        aria-hidden='true'
      >
        <span className='sidebar-label'>EST. · HANDCRAFTED · CURATED LIVING</span>
      </div>
    </section>
  );
}
