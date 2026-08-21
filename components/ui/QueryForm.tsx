'use client';

export default function QueryForm() {
  return (
    <div className='flex flex-col justify-center items-start h-full w-full' style={{ minHeight: '320px', padding: '2rem' }}>
      <span
        className='type-label text-cream'
        style={{ fontSize: '0.625rem', letterSpacing: '0.2em', opacity: 0.4 }}
      >
        DIRECT ENQUIRY
      </span>
      <h3
        className='type-heading text-cream mt-3'
        style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5625rem)', lineHeight: 0.95 }}
      >
        SUBMIT A QUERY
      </h3>
      <p
        className='text-cream mt-4 mb-8'
        style={{ fontSize: '0.875rem', opacity: 0.5, lineHeight: 1.6, fontWeight: 400, maxWidth: '400px' }}
      >
        We'd love to hear from you. Complete our secure enquiry form on the next page and our artisan team will respond within 24 hours.
      </p>

      <a
        href="https://sangita2004.app.n8n.cloud/form/f8253b62-1f5c-4984-98a3-be726fc4bf55"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem 2rem',
          background: 'var(--color-accent)',
          color: 'var(--color-cream)',
          borderRadius: '40px',
          textDecoration: 'none',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          fontWeight: 500,
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(255, 62, 0, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        OPEN ENQUIRY FORM
        <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>→</span>
      </a>
    </div>
  );
}
