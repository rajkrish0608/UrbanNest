'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Slide-up chatbot panel containing the direct n8n chatbot iframe */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
            className='chat-panel'
            role='dialog'
            aria-label='UrbanNest Chatbot'
            style={{
              position: 'fixed',
              bottom: 0,
              right: '2rem',
              width: '380px',
              height: '560px',
              background: 'var(--color-surface)',
              borderRadius: '16px 16px 0 0',
              border: '1px solid var(--color-border)',
              borderBottom: 'none',
              zIndex: 1000,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 -10px 40px -10px rgba(20,16,11,0.5)'
            }}
          >
            {/* Header */}
            <div
              className='flex items-center justify-between px-5 py-4'
              style={{ 
                borderBottom: '1px dashed var(--color-border)',
                background: 'var(--color-surface)'
              }}
            >
              <div className='flex flex-col'>
                <span
                  className='type-label text-cream'
                  style={{ fontSize: '0.75rem', letterSpacing: '0.15em' }}
                >
                  CHAT WITH US
                </span>
                <span
                  style={{ fontSize: '0.625rem', opacity: 0.4, fontWeight: 400, marginTop: '2px' }}
                >
                  Direct n8n Chat Interface
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label='Close chat'
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-cream)',
                  opacity: 0.5,
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            {/* Chatbot iframe */}
            <div style={{ flex: 1, position: 'relative', width: '100%' }}>
              <iframe
                src='https://shibagni.app.n8n.cloud/webhook/89f6f7b9-d89f-45d0-b564-1c514d4fceb1/chat'
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  background: 'var(--color-canvas)'
                }}
                title='n8n Web Chatbot'
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating launcher bubble */}
      <button
        id='chat-launcher'
        onClick={() => setOpen((prev) => !prev)}
        className='breathing'
        aria-label='Open chat'
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'var(--color-accent)',
          color: 'var(--color-cream)',
          border: 'none',
          borderRadius: '36px',
          padding: '0.75rem 1.5rem',
          fontSize: '0.75rem',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          cursor: 'pointer',
          fontFamily: 'var(--font-inter)',
          animationPlayState: open ? 'paused' : 'running',
        }}
      >
        <span style={{ fontSize: '1rem', lineHeight: 1 }}>{open ? '×' : '✦'}</span>
        {open ? 'CLOSE' : 'CHAT WITH US'}
      </button>
    </>
  );
}
