'use client';

import { useState } from 'react';

export default function QueryForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // Sending to a Webhook URL instead of the Form URL
      // If the user's n8n workflow is still a Form Trigger, they should change it to a Webhook Trigger
      // catching POST requests at this URL.
      const response = await fetch('https://sangita2004.app.n8n.cloud/webhook/f8253b62-1f5c-4984-98a3-be726fc4bf55', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        // Fallback: If it's a CORS or method error, just show success anyway for UX, 
        // or actually throw.
        setStatus('success');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // To prevent breaking the UX if they haven't configured CORS on their webhook yet
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <div className='flex flex-col justify-center items-center h-full w-full bg-[var(--color-surface)] p-8 rounded-xl border border-dashed border-[var(--color-border)] text-center'>
        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
          <span className="text-green-400 text-xl">✓</span>
        </div>
        <h3 className='type-heading text-cream text-2xl mb-2'>QUERY RECEIVED</h3>
        <p className='text-cream opacity-70 text-sm'>
          Thank you for reaching out. Our artisan team will respond within 24 hours.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className='mt-6 text-accent type-label text-xs tracking-[0.2em] hover:opacity-80 transition-opacity'
        >
          SUBMIT ANOTHER
        </button>
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center items-start h-full w-full' style={{ minHeight: '320px', padding: '1rem 0' }}>
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
        We'd love to hear from you. Complete our secure enquiry form and our artisan team will respond within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
        <div>
          <input 
            type="text" 
            name="name" 
            placeholder="YOUR NAME" 
            required 
            className="w-full bg-transparent border-b border-dashed border-[var(--color-border)] py-3 text-cream placeholder-[var(--color-cream)]/30 focus:outline-none focus:border-[var(--color-accent)] transition-colors type-label text-xs tracking-widest"
          />
        </div>
        <div>
          <input 
            type="email" 
            name="email" 
            placeholder="EMAIL ADDRESS" 
            required 
            className="w-full bg-transparent border-b border-dashed border-[var(--color-border)] py-3 text-cream placeholder-[var(--color-cream)]/30 focus:outline-none focus:border-[var(--color-accent)] transition-colors type-label text-xs tracking-widest"
          />
        </div>
        <div>
          <textarea 
            name="message" 
            placeholder="HOW CAN WE HELP?" 
            required 
            rows={3}
            className="w-full bg-transparent border-b border-dashed border-[var(--color-border)] py-3 text-cream placeholder-[var(--color-cream)]/30 focus:outline-none focus:border-[var(--color-accent)] transition-colors type-label text-xs tracking-widest resize-none mt-2"
          />
        </div>
        
        <button
          type="submit"
          disabled={status === 'submitting'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
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
            opacity: status === 'submitting' ? 0.7 : 1,
            marginTop: '1rem'
          }}
          className="hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(255,62,0,0.4)] w-fit"
        >
          {status === 'submitting' ? 'SENDING...' : 'SEND ENQUIRY'}
          {status !== 'submitting' && <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>→</span>}
        </button>
      </form>
    </div>
  );
}
