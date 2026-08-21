'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

interface AccordionItem {
  image: string;
  label: string;
  alt?: string;
  link?: string;
}

interface AccordionGalleryProps {
  items: AccordionItem[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: 'horizontal' | 'vertical';
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  trigger?: 'hover' | 'click';
  showLabels?: boolean;
  grayscale?: boolean;
  className?: string;
}

const AccordionGallery = ({
  items,
  defaultIndex = 2,
  accentColor = '#d9591f',
  overlayColor = '#14100b',
  textColor = '#ffedd7',
  height = 520,
  gap = 8,
  radius = 12,
  expandRatio = 0.52,
  orientation = 'horizontal',
  duration = 0.65,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 7,
  stagger = 0.06,
  trigger = 'hover',
  showLabels = true,
  grayscale = true,
  className = '',
}: AccordionGalleryProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);

  const vertical = orientation === 'vertical';
  const count = items.length;
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), count - 1));

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const bar = barRefs.current[i];
        const text = textRefs.current[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0);

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 1) : 0;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              '--ag-gray': gray,
              '--ag-dim': isActive ? 0 : 0.4,
              duration: dur,
              ease,
            },
            0,
          );
        }

        if (showLabels && bar && text) {
          if (isActive) {
            tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease, stagger: prefersReduced ? 0 : stagger }, 0);
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
          }
        }
      });

      tlRef.current = tl;
    },
    [active, count, expandRatio, duration, ease, vertical, tilt, parallax, grayscale, showLabels, stagger, prefersReduced],
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      mediaSizeRef.current = size;
      el.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(() => () => { tlRef.current?.kill(); }, []);

  const handleEnter = (i: number) => { if (trigger === 'hover') setActive(i); };
  const handleClick = (i: number, e: React.MouseEvent) => { if (i !== active) { e.preventDefault(); setActive(i); } };
  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); setActive((i + 1) % count); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); setActive((i - 1 + count) % count); }
  };

  return (
    <>
      {/* Inline styles scoped to this component */}
      <style>{`
        .accordion-gallery {
          display: flex;
          flex-direction: row;
          gap: var(--ag-gap, 8px);
          width: 100%;
          max-width: 100%;
          perspective: 1400px;
          perspective-origin: 50% 50%;
        }
        .accordion-gallery--vertical { flex-direction: column; }
        .ag-panel {
          position: relative;
          flex: 1 1 0;
          min-width: 0; min-height: 0;
          overflow: hidden;
          border-radius: var(--ag-radius, 12px);
          cursor: pointer;
          display: block;
          text-decoration: none;
          outline: none;
          transform-style: preserve-3d;
          transform-origin: center center;
          background: #3a2a1c;
          will-change: flex-grow, transform;
          -webkit-tap-highlight-color: transparent;
        }
        .ag-panel:focus-visible {
          box-shadow: 0 0 0 2px var(--ag-accent, #d9591f);
        }
        .ag-panel__frame {
          position: absolute; inset: 0;
          overflow: hidden; border-radius: inherit;
        }
        .ag-panel__media {
          --ag-gray: 1; --ag-dim: 0.4;
          position: absolute;
          top: 50%; left: 50%;
          width: var(--ag-media-size, 320px);
          height: 100%;
          filter: grayscale(var(--ag-gray));
          will-change: transform, filter;
        }
        .accordion-gallery--vertical .ag-panel__media {
          width: 100%; height: var(--ag-media-size, 320px);
        }
        .ag-panel__media img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          user-select: none; -webkit-user-drag: none;
        }
        .ag-panel__overlay {
          position: absolute; inset: 0;
          pointer-events: none;
          background:
            linear-gradient(180deg, transparent 45%, color-mix(in srgb, var(--ag-overlay, #14100b) 80%, transparent) 100%),
            color-mix(in srgb, var(--ag-overlay, #14100b) calc(var(--ag-dim, 0.4) * 100%), transparent);
        }
        .ag-panel__label {
          position: absolute; left: 18px; bottom: 18px; right: 18px;
          display: flex; align-items: center; gap: 10px;
          pointer-events: none; z-index: 2;
        }
        .ag-panel__bar {
          flex: 0 0 auto; width: 3px; height: 22px;
          border-radius: 3px; background: var(--ag-accent, #d9591f);
          opacity: 0;
        }
        .ag-panel__text {
          color: var(--ag-text, #ffedd7);
          font-family: 'Inter', sans-serif;
          font-weight: 500; font-size: clamp(0.75rem, 1.2vw, 1rem);
          letter-spacing: 0.12em; text-transform: uppercase;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          opacity: 0;
          text-shadow: 0 2px 14px rgba(0,0,0,0.55);
        }
        .ag-panel__tag {
          font-size: 0.5rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--ag-accent, #d9591f);
          font-family: 'Inter', sans-serif; font-weight: 500;
        }
        @media (max-width: 520px) {
          .accordion-gallery { flex-direction: column; perspective: none; height: auto !important; }
          .ag-panel { min-height: 84px; transform: none !important; }
          .accordion-gallery .ag-panel__media { width: 100%; height: var(--ag-media-size, 320px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ag-panel, .ag-panel__media { will-change: auto; }
        }
      `}</style>

      <div
        ref={rootRef}
        className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}${className ? ` ${className}` : ''}`}
        style={{
          '--ag-accent': accentColor,
          '--ag-overlay': overlayColor,
          '--ag-text': textColor,
          '--ag-gap': `${gap}px`,
          '--ag-radius': `${radius}px`,
          height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`,
        } as React.CSSProperties}
        role='list'
        aria-label='Product accordion gallery'
      >
        {items.map((item, i) => {
          const isActive = i === active;
          const Tag = (item.link ? 'a' : 'div') as React.ElementType;
          return (
            <Tag
              key={i}
              ref={(el: HTMLElement | null) => { panelRefs.current[i] = el; }}
              className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
              style={{ borderRadius: `${radius}px` }}
              href={item.link || undefined}
              onClick={(e: React.MouseEvent) => handleClick(i, e)}
              onMouseEnter={() => handleEnter(i)}
              onFocus={() => setActive(i)}
              onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(i, e)}
              role='listitem'
              tabIndex={0}
              aria-current={isActive ? 'true' : undefined}
              aria-label={item.label}
            >
              <span className='ag-panel__frame'>
                <span
                  className='ag-panel__media'
                  ref={(el) => { mediaRefs.current[i] = el; }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.alt || item.label || ''} draggable={false} />
                </span>
                <span className='ag-panel__overlay' aria-hidden='true' />
              </span>

              {showLabels && (
                <span className='ag-panel__label' aria-hidden='true'>
                  <span className='ag-panel__bar' ref={(el) => { barRefs.current[i] = el; }} />
                  <span className='ag-panel__text' ref={(el) => { textRefs.current[i] = el; }}>
                    {item.label}
                  </span>
                </span>
              )}
            </Tag>
          );
        })}
      </div>
    </>
  );
};

export default AccordionGallery;
