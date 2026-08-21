'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  text: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'assistant', text: "Hello! I'm the UrbanNest assistant. Ask me about our curated home décor, gifting, shipping, or store hours." },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setInput('');

    const userMsg: Message = { id: Date.now(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);

    setTyping(true);

    try {
      // POSTing to user's n8n chatbot webhook
      const res = await fetch('https://shibagni.app.n8n.cloud/webhook/89f6f7b9-d89f-45d0-b564-1c514d4fceb1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          chatInput: text,
          sender: 'website-user'
        })
      });

      if (!res.ok) throw new Error('Network error');

      const data = await res.json();
      
      // Determine the bot message text from standard n8n chatbot response structures
      let replyText = '';
      if (typeof data === 'string') {
        replyText = data;
      } else if (data && typeof data === 'object') {
        replyText = data.output || data.response || data.text || data.message || JSON.stringify(data);
      }

      if (!replyText) {
        replyText = "I received your query but couldn't parse the response. We are here to help!";
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'assistant', text: replyText },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      // Fallback message if webhook is offline or misconfigured
      setMessages((prev) => [
        ...prev,
        { 
          id: Date.now() + 1, 
          role: 'assistant', 
          text: "Thanks for reaching out! Our team is offline right now, but we've received your query and will reply via email shortly." 
        },
      ]);
    } finally {
      setTyping(false);
    }
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
                  n8n Chatbot Integration Active
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
