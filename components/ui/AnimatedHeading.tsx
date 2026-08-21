'use client';

import { useEffect, useRef, CSSProperties } from 'react';
import { sectionHeadingReveal } from '@/lib/animations';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  tag?: 'h1' | 'h2' | 'h3' | 'h4';
}

export default function AnimatedHeading({
  text,
  className = '',
  style,
  tag: Tag = 'h2',
}: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLElement[]>([]);

  const words = text.split(' ');

  useEffect(() => {
    if (!containerRef.current) return;
    const els = wordsRef.current.filter(Boolean);
    const trigger = sectionHeadingReveal(els, containerRef.current);
    return () => {
      trigger?.kill();
    };
  }, []);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={containerRef} className={className} style={style} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className='word-wrap'
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          <span
            ref={(el) => {
              if (el) wordsRef.current[i] = el;
            }}
            className='word-inner'
            aria-hidden='true'
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
