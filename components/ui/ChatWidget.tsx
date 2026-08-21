'use client';

// ──────────────────────────────────────────────────────────────────────────────
// ChatWidget — floating button acting as an anchor link to n8n chatbot
// ──────────────────────────────────────────────────────────────────────────────

export default function ChatWidget() {
  return (
    <>
      {/* Floating anchor launcher linking to n8n chatbot */}
      <a
        id='chat-launcher'
        href='https://shibagni.app.n8n.cloud/webhook/89f6f7b9-d89f-45d0-b564-1c514d4fceb1/chat'
        target='_blank'
        rel='noopener noreferrer'
        className='breathing'
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
          textDecoration: 'none',
        }}
      >
        <span style={{ fontSize: '1rem', lineHeight: 1 }}>✦</span>
        CHAT WITH US
      </a>
    </>
  );
}
