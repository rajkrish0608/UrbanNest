'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressNumRef = useRef<HTMLSpanElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);
  const [counter, setCounter] = useState(0);

  const wordmark = 'URBANNEST';

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit: split-curtain wipe
        const exit = gsap.timeline({ onComplete });
        exit
          .to(overlayRef.current, { opacity: 0, duration: 0 })
          .to(topCurtainRef.current, {
            yPercent: -100,
            duration: 0.85,
            ease: 'power4.inOut',
          }, 0)
          .to(bottomCurtainRef.current, {
            yPercent: 100,
            duration: 0.85,
            ease: 'power4.inOut',
          }, 0);
      },
    });

    // Set initial states
    gsap.set(lettersRef.current, { y: 80, opacity: 0 });
    gsap.set(taglineRef.current, { opacity: 0, y: 12 });
    gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: 'left' });
    gsap.set(yearRef.current, { opacity: 0 });

    // Stagger letters in
    tl.to(lettersRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.055,
      ease: 'power3.out',
    }, 0.2)
    // Tagline
    .to(taglineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    }, 0.9)
    // Year label
    .to(yearRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    }, 1.0)
    // Progress bar fill
    .to(progressBarRef.current, {
      scaleX: 1,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: function () {
        const p = Math.round(this.progress() * 100);
        setCounter(p);
      },
    }, 1.1)
    // Hold for a beat
    .to({}, { duration: 0.3 })
    // Letters exit — slide up
    .to(lettersRef.current, {
      y: -70,
      opacity: 0,
      duration: 0.55,
      stagger: 0.03,
      ease: 'power3.in',
    })
    .to([taglineRef.current, progressBarRef.current, progressNumRef.current, yearRef.current], {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    }, '-=0.4');

    return () => { tl.kill(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* ── Split curtain panels (exit animation) ── */}
      <div
        ref={topCurtainRef}
        style={{
          position: 'fixed',
          inset: 0,
          bottom: '50%',
          background: 'var(--color-canvas)',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      />
      <div
        ref={bottomCurtainRef}
        style={{
          position: 'fixed',
          inset: 0,
          top: '50%',
          background: 'var(--color-canvas)',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      />

      {/* ── Main loader overlay ─────────────────── */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          background: 'var(--color-canvas)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Noise grain texture overlay */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px',
            pointerEvents: 'none',
            opacity: 0.6,
          }}
        />

        {/* Top-left corner label */}
        <div
          style={{
            position: 'absolute',
            top: '2rem',
            left: '2.5rem',
          }}
        >
          <span
            className='type-label text-cream'
            style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', opacity: 0.3 }}
          >
            URBANNEST LIFESTYLE STORE
          </span>
        </div>

        {/* Top-right — year */}
        <span
          ref={yearRef}
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2.5rem',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.5625rem',
            fontWeight: 500,
            letterSpacing: '0.2em',
            color: 'var(--color-cream)',
            opacity: 0,
            textTransform: 'uppercase',
          }}
        >
          EST. 2019
        </span>

        {/* Centre — wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(2px, 0.5vw, 6px)',
            overflow: 'hidden',
            paddingBottom: '0.5rem',
          }}
          aria-label='URBANNEST'
        >
          {wordmark.split('').map((char, i) => (
            <span
              key={i}
              ref={(el) => { if (el) lettersRef.current[i] = el; }}
              aria-hidden='true'
              style={{
                display: 'inline-block',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: 'clamp(2.8rem, 8vw, 7rem)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                color: 'var(--color-cream)',
                textTransform: 'uppercase',
                willChange: 'transform, opacity',
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.625rem',
            fontWeight: 500,
            letterSpacing: '0.28em',
            color: 'var(--color-cream)',
            opacity: 0,
            textTransform: 'uppercase',
            marginTop: '0.5rem',
          }}
        >
          Little Things · Beautiful Living
        </p>

        {/* Progress bar + counter */}
        <div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '2.5rem',
            right: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
          }}
        >
          {/* Bar track */}
          <div
            style={{
              flex: 1,
              height: '1px',
              background: 'var(--color-border)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              ref={progressBarRef}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--color-accent)',
                transformOrigin: 'left',
              }}
            />
          </div>

          {/* Numeric counter */}
          <span
            ref={progressNumRef}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6875rem',
              fontWeight: 500,
              color: 'var(--color-cream)',
              opacity: 0.55,
              letterSpacing: '0.05em',
              minWidth: '2.5rem',
              textAlign: 'right',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {String(counter).padStart(2, '0')}%
          </span>
        </div>

        {/* Bottom left — vertical label */}
        <div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '2.5rem',
          }}
        >
          <span
            className='type-label text-cream'
            style={{ fontSize: '0.5rem', letterSpacing: '0.2em', opacity: 0.2 }}
          >
            HANDCRAFTED · CURATED · DELIVERED
          </span>
        </div>
      </div>
    </>
  );
}
