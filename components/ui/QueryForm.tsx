'use client';

import { useState } from 'react';

export default function QueryForm() {
  const [loading, setLoading] = useState(true);

  return (
    <div className='flex flex-col gap-6 h-full w-full' style={{ minHeight: '520px' }}>
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
          className='text-cream mt-4 mb-6'
          style={{ fontSize: '0.875rem', opacity: 0.5, lineHeight: 1.6, fontWeight: 400 }}
        >
          Complete our n8n secure form below. We respond within 24 hours.
        </p>
      </div>

      <div 
        style={{ 
          position: 'relative', 
          width: '100%', 
          flex: 1, 
          minHeight: '440px',
          borderRadius: '12px',
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          overflow: 'hidden'
        }}
      >
        {loading && (
          <div 
            style={{ 
              position: 'absolute', 
              inset: 0, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'var(--color-canvas)',
              zIndex: 5
            }}
          >
            {/* Spinning clean editorial loader */}
            <div 
              style={{
                width: '24px',
                height: '24px',
                border: '2px solid rgba(255, 237, 215, 0.1)',
                borderTopColor: 'var(--color-accent)',
                borderRadius: '50%',
                animation: 'formSpin 0.8s linear infinite'
              }}
            />
          </div>
        )}

        <iframe
          src="https://sangita2004.app.n8n.cloud/form/f8253b62-1f5c-4984-98a3-be726fc4bf55"
          style={{ 
            width: '100%', 
            height: '100%', 
            minHeight: '440px',
            border: 'none',
            background: 'transparent'
          }}
          onLoad={() => setLoading(false)}
          title="n8n Query Form"
          allow="geolocation; microphone; camera"
        />
      </div>

      <style>{`
        @keyframes formSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
