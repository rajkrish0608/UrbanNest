'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Shop',    href: '#products' },
  { label: 'About',   href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Ask Us',  href: '#chat' },
];

const SECTIONS = ['hero', 'about', 'products', 'why', 'contact'];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver to track active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const isActive = (href: string) =>
    activeSection === href.replace('#', '');

  return (
    <nav
      ref={navRef}
      className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-500'
      style={{
        backgroundColor: scrolled
          ? 'color-mix(in srgb, var(--color-canvas) 88%, transparent)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px dashed var(--color-border)' : 'none',
      }}
    >
      {/* Logo */}
      <Link
        href='/'
        className='type-label text-cream text-12 tracking-widest hover:text-accent transition-colors duration-300'
        style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}
      >
        URBANNEST
      </Link>

      {/* Links */}
      <div className='flex items-center gap-8'>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`nav-link text-cream ${isActive(link.href) ? 'active' : ''}`}
            style={{
              borderBottom: isActive(link.href)
                ? '1px dashed var(--color-accent)'
                : undefined,
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
