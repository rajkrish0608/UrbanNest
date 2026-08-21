'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Shop',    href: '#products' },
  { label: 'About',   href: '#about' },
  { label: 'Why Us',  href: '#why' },
  { label: 'Contact', href: '#contact' },
  { label: 'Ask Us',  href: '#chat' },
];

const SECTIONS = ['hero', 'about', 'products', 'why', 'contact'];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <>
      <nav
        ref={navRef}
        className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-500'
        style={{
          backgroundColor: scrolled || mobileMenuOpen
            ? 'color-mix(in srgb, var(--color-canvas) 92%, transparent)'
            : 'transparent',
          backdropFilter: scrolled || mobileMenuOpen ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px dashed var(--color-border)' : 'none',
        }}
      >
        {/* Logo */}
        <Link
          href='/'
          className='type-label text-cream text-12 tracking-widest hover:text-accent transition-colors duration-300'
          style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}
          onClick={() => setMobileMenuOpen(false)}
        >
          URBANNEST
        </Link>

        {/* Desktop Links */}
        <div className='hidden md:flex items-center gap-8'>
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

        {/* Mobile Hamburger Button */}
        <button
          type='button'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className='md:hidden p-2 text-cream hover:text-accent transition-colors focus:outline-none'
          aria-label='Toggle Menu'
        >
          {mobileMenuOpen ? (
            <span className='text-2xl leading-none'>✕</span>
          ) : (
            <span className='text-2xl leading-none'>☰</span>
          )}
        </button>
      </nav>

      {/* Mobile Full-Screen Drawer */}
      {mobileMenuOpen && (
        <div
          className='md:hidden fixed inset-0 z-40 bg-[var(--color-canvas)] flex flex-col justify-center px-10 py-20'
          style={{ backdropFilter: 'blur(16px)' }}
        >
          <div className='flex flex-col gap-8'>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className='type-heading text-cream hover:text-accent transition-colors text-3xl tracking-wider'
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className='mt-16 pt-8 border-t border-dashed border-[var(--color-border)]'>
            <p className='type-label text-cream/40 text-xs tracking-widest mb-2'>STORE LOCATION</p>
            <p className='text-cream/70 text-sm'>14, Artisan Lane, Bandra West, Mumbai</p>
            <p className='text-accent text-sm mt-1'>hello@urbannest.in</p>
          </div>
        </div>
      )}
    </>
  );
}
