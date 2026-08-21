'use client';

// ──────────────────────────────────────────────────────────────────────────────
// QueryForm — fully styled static UI form
// N8N integration: swap the onSubmit handler when ready
// ──────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';

export default function QueryForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire to N8N webhook when ready
    setSent(true);
  };

  return (
    <div className='flex flex-col gap-8 h-full'>
      <div>
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
          className='text-cream mt-4'
          style={{ fontSize: '0.875rem', opacity: 0.5, lineHeight: 1.6, fontWeight: 400 }}
        >
          Leave us a message. We respond within 24 hours.
        </p>
      </div>

      {sent ? (
        <div
          className='flex flex-col gap-3 py-12'
          style={{ borderTop: '1px dashed var(--color-border)' }}
        >
          <span
            className='type-label text-accent'
            style={{ fontSize: '0.625rem', letterSpacing: '0.2em' }}
          >
            MESSAGE RECEIVED
          </span>
          <p
            className='text-cream'
            style={{ fontSize: '1.125rem', fontWeight: 400, opacity: 0.7, lineHeight: 1.5 }}
          >
            Thank you. We'll be in touch soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='name'
                className='type-label text-cream'
                style={{ fontSize: '0.5rem', letterSpacing: '0.2em', opacity: 0.4 }}
              >
                NAME
              </label>
              <input
                id='name'
                name='name'
                type='text'
                required
                placeholder='Your name'
                value={form.name}
                onChange={handleChange}
                className='input-underline'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='email'
                className='type-label text-cream'
                style={{ fontSize: '0.5rem', letterSpacing: '0.2em', opacity: 0.4 }}
              >
                EMAIL
              </label>
              <input
                id='email'
                name='email'
                type='email'
                required
                placeholder='your@email.com'
                value={form.email}
                onChange={handleChange}
                className='input-underline'
              />
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label
              htmlFor='subject'
              className='type-label text-cream'
              style={{ fontSize: '0.5rem', letterSpacing: '0.2em', opacity: 0.4 }}
            >
              SUBJECT
            </label>
            <input
              id='subject'
              name='subject'
              type='text'
              placeholder='What is this about?'
              value={form.subject}
              onChange={handleChange}
              className='input-underline'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label
              htmlFor='message'
              className='type-label text-cream'
              style={{ fontSize: '0.5rem', letterSpacing: '0.2em', opacity: 0.4 }}
            >
              MESSAGE
            </label>
            <textarea
              id='message'
              name='message'
              required
              rows={5}
              placeholder='Tell us what you need…'
              value={form.message}
              onChange={handleChange}
              className='input-underline'
              style={{ resize: 'none' }}
            />
          </div>

          <div>
            <button type='submit' className='btn-cta'>
              Send Message
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
