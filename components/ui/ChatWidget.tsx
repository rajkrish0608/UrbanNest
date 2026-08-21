'use client';

// ──────────────────────────────────────────────────────────────────────────────
// ChatWidget — floating pill launcher + slide-up chat panel (pure UI)
// N8N integration: replace the mock messages with a real fetch to your
// N8N webhook when ready. The UI shell is complete and isolated.
// ──────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  text: string;
}

const MOCK_RESPONSES: Record<string, string> = {
  default: 'Thanks for reaching out! Our team will get back to you shortly. In the meantime, feel free to browse our curated collection.',
  shipping: 'We ship across India within 3–5 business days. International shipping is available on request.',
  gift: 'Our gifting service creates personalised boxes starting at ₹1,500. Tell us about the recipient and occasion!',
  hours: 'We\'re open Mon–Sat 10:00–20:00 and Sundays 11:00–18:00. You can also shop online anytime.',
};

function getBotResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('ship') || lower.includes('deliver')) return MOCK_RESPONSES.shipping;
  if (lower.includes('gift') || lower.includes('present')) return MOCK_RESPONSES.gift;
  if (lower.includes('hour') || lower.includes('open') || lower.includes('time')) return MOCK_RESPONSES.hours;
  return MOCK_RESPONSES.default;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'assistant', text: 'Hello! I\'m the UrbanNest assistant. Ask me about our products, gifting, shipping, or store hours.' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');

    const userMsg: Message = { id: Date.now(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);

    // TODO: Replace with real N8N webhook call
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'assistant', text: getBotResponse(text) },
      ]);
    }, 1200);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Slide-up panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
            className='chat-panel'
            role='dialog'
            aria-label='UrbanNest AI Chat'
          >
            {/* Panel header */}
            <div
              className='flex items-center justify-between px-5 py-4'
              style={{ borderBottom: '1px dashed var(--color-border)' }}
            >
              <div className='flex flex-col'>
                <span
                  className='type-label text-cream'
                  style={{ fontSize: '0.75rem' }}
                >
                  ASK URBANNEST
                </span>
                <span
                  style={{ fontSize: '0.625rem', opacity: 0.4, fontWeight: 400, marginTop: '2px' }}
                >
                  Usually replies instantly
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

            {/* Messages */}
            <div
              className='flex flex-col gap-4 px-5 py-4 overflow-y-auto'
              style={{ flex: 1 }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '80%',
                      padding: '0.625rem 0.875rem',
                      borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                      background:
                        msg.role === 'user'
                          ? 'var(--color-accent)'
                          : 'color-mix(in srgb, var(--color-border) 60%, var(--color-surface))',
                      color: 'var(--color-cream)',
                      fontSize: '0.8125rem',
                      lineHeight: 1.5,
                      fontWeight: 400,
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', paddingLeft: '4px' }}>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: 'var(--color-cream)',
                        opacity: 0.4,
                        animation: `typingDot 1s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div
              className='px-5 py-4'
              style={{ borderTop: '1px dashed var(--color-border)' }}
            >
              <div className='flex items-center gap-3'>
                <input
                  type='text'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder='Ask anything…'
                  className='input-underline'
                  style={{ flex: 1, fontSize: '0.8125rem' }}
                  aria-label='Chat message input'
                />
                <button
                  onClick={send}
                  disabled={!input.trim()}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: input.trim() ? 'var(--color-accent)' : 'var(--color-border)',
                    fontSize: '1rem',
                    cursor: input.trim() ? 'pointer' : 'default',
                    transition: 'color 0.2s',
                    flexShrink: 0,
                    paddingBottom: '4px',
                  }}
                  aria-label='Send message'
                >
                  ↑
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating pill launcher */}
      <button
        id='chat-launcher'
        onClick={() => setOpen((prev) => !prev)}
        className={`breathing`}
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

      <style>{`
        @keyframes typingDot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%            { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
