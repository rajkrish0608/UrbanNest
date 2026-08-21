'use client';

import Link from 'next/link';

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Pinterest',  href: 'https://pinterest.com' },
  { label: 'Facebook',   href: 'https://facebook.com' },
];

export default function Footer() {
  return (
    <footer
      id='contact'
      className='w-full py-16 px-8'
      style={{ borderTop: '1px dashed var(--color-border)' }}
    >
      <div className='grid grid-cols-1 md:grid-cols-3 gap-12 max-w-none'>
        {/* Brand */}
        <div className='flex flex-col gap-4'>
          <span
            className='type-label text-cream'
            style={{ fontSize: '1.125rem' }}
          >
            URBANNEST
          </span>
          <p
            className='text-cream'
            style={{
              fontSize: '0.875rem',
              opacity: 0.5,
              fontWeight: 400,
              lineHeight: 1.5,
            }}
          >
            Little Things.
            <br />
            Beautiful Living.
          </p>
        </div>

        {/* Hours & Location */}
        <div className='flex flex-col gap-3'>
          <span
            className='type-label text-cream'
            style={{ fontSize: '0.625rem', letterSpacing: '0.2em', opacity: 0.5 }}
          >
            STORE HOURS
          </span>
          <div style={{ fontSize: '0.875rem', opacity: 0.7, lineHeight: 1.8 }}>
            <p>Mon – Sat: 10:00 – 20:00</p>
            <p>Sunday: 11:00 – 18:00</p>
          </div>
          <span
            className='type-label text-cream'
            style={{ fontSize: '0.625rem', letterSpacing: '0.2em', opacity: 0.5, marginTop: '0.5rem' }}
          >
            LOCATION
          </span>
          <p style={{ fontSize: '0.875rem', opacity: 0.7, lineHeight: 1.6 }}>
            14, Artisan Lane<br />
            Bandra West, Mumbai 400050
          </p>
        </div>

        {/* Socials */}
        <div className='flex flex-col gap-4'>
          <span
            className='type-label text-cream'
            style={{ fontSize: '0.625rem', letterSpacing: '0.2em', opacity: 0.5 }}
          >
            FOLLOW
          </span>
          <div className='flex flex-col gap-2'>
            {SOCIALS.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target='_blank'
                rel='noreferrer'
                className='nav-link text-cream'
                style={{ fontSize: '0.875rem', opacity: 0.7 }}
              >
                {social.label} ↗
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div
        className='flex items-center justify-between mt-16 pt-6'
        style={{ borderTop: '1px dashed var(--color-border)' }}
      >
        <span style={{ fontSize: '0.625rem', opacity: 0.3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          © {new Date().getFullYear()} UrbanNest. All rights reserved.
        </span>
        <span style={{ fontSize: '0.625rem', opacity: 0.3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          Handcrafted · Curated Living
        </span>
      </div>
    </footer>
  );
}
