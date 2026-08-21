'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ReflectiveCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  imageSrc?: string;
  imageAlt?: string;
}

// CSS-only reflective card — no WebGL dependency needed, works everywhere
// Tracks mouse position to simulate a specular highlight sweep across the card surface
export default function ReflectiveCard({ children, className = '', style, imageSrc, imageAlt = '' }: ReflectiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -8;
      const rotY = ((x - cx) / cx) * 8;

      // Specular glare position
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,237,215,0.18) 0%, rgba(255,237,215,0.05) 40%, transparent 70%)`;
      glare.style.opacity = '1';
    };

    const handleLeave = () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      glare.style.opacity = '0';
      setHovered(false);
    };

    const handleEnter = () => setHovered(true);

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
    card.addEventListener('mouseenter', handleEnter);

    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
      card.removeEventListener('mouseenter', handleEnter);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`product-card ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        cursor: 'pointer',
        ...style,
      }}
    >
      {/* Glare overlay — simulates specular reflection */}
      <div
        ref={glareRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          borderRadius: 'inherit',
        }}
      />

      {/* Border shimmer on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 11,
          pointerEvents: 'none',
          borderRadius: '12px',
          border: hovered
            ? '1px solid rgba(255,237,215,0.2)'
            : '1px solid rgba(69,55,41,0.6)',
          transition: 'border-color 0.3s ease',
        }}
      />

      {/* Product image with parallax-tilt on hover */}
      {imageSrc && (
        <div style={{ position: 'relative', height: '320px', overflow: 'hidden' }}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            style={{
              objectFit: 'cover',
              transition: 'transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)',
              transform: hovered ? 'scale(1.06) translateZ(20px)' : 'scale(1)',
            }}
            sizes='340px'
          />
          {/* Bottom gradient fade into card surface */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '60px',
              background: 'linear-gradient(to top, var(--color-surface), transparent)',
            }}
          />
        </div>
      )}

      {children}
    </div>
  );
}
