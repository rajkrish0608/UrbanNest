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
          GET IN TOUCH & VISIT STORE
        </span>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 min-h-[60vh] gap-12 md:gap-0'>
        {/* ── Left — Contact Details + Google Maps ──────────────────────── */}
        <div
          className='flex flex-col justify-between px-8 md:px-16 py-12 md:border-r border-dashed border-[var(--color-border)]'
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

          <div className='flex flex-col gap-6 mt-10 mb-8'>
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

          {/* Google Maps Store Location Embed */}
          <div className="w-full h-48 rounded-xl overflow-hidden border border-dashed border-[var(--color-border)] mt-4">
            <iframe
              title="UrbanNest Store Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.441094380693!2d72.83151817505118!3d19.044327982154447!2m3!1f0!f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c936054817a5%3A0xe5a36c84cf58e453!2sBandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(120%)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
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
