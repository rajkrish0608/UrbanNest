'use client';

import QueryForm from '@/components/ui/QueryForm';

export default function CustomerInteraction() {
  return (
    <section
      id='contact'
      className='w-full py-24'
      style={{ borderTop: '1px dashed var(--color-border)' }}
    >
      <div className='px-8 md:px-16 mb-16'>
        <span
          className='type-label text-cream'
          style={{ fontSize: '0.625rem', letterSpacing: '0.2em', opacity: 0.4 }}
        >
          GET IN TOUCH
        </span>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 min-h-[60vh]'>
        {/* ── Left — About the conversation ──────────────────────── */}
        <div
          className='flex flex-col justify-between px-8 md:px-16 py-12'
          style={{ borderRight: '1px dashed var(--color-border)' }}
        >
          <div>
            <h2
              className='type-heading text-cream'
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5625rem)', lineHeight: 0.95 }}
            >
              WE'D LOVE TO HEAR FROM YOU
            </h2>
            <p
              className='text-cream mt-8'
              style={{ fontSize: '1.125rem', opacity: 0.6, lineHeight: 1.6, fontWeight: 400 }}
            >
              Whether it's a gifting brief, a product question, or just a hello
              — we're a small team and we read every message.
            </p>
          </div>

          <div className='flex flex-col gap-6 mt-12'>
            {[
              { label: 'EMAIL', value: 'hello@urbannest.in' },
              { label: 'PHONE', value: '+91 98200 00001' },
              { label: 'LOCATION', value: '14, Artisan Lane, Bandra West, Mumbai' },
            ].map(({ label, value }) => (
              <div key={label} style={{ borderBottom: '1px dashed var(--color-border)', paddingBottom: '1rem' }}>
                <span
                  className='type-label text-cream'
                  style={{ fontSize: '0.5rem', letterSpacing: '0.2em', opacity: 0.35 }}
                >
                  {label}
                </span>
                <p
                  className='text-cream mt-2'
                  style={{ fontSize: '0.9375rem', fontWeight: 400, opacity: 0.8 }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right — Query Form ─────────────────────────────────── */}
        <div className='px-8 md:px-16 py-12'>
          <QueryForm />
        </div>
      </div>
    </section>
  );
}
