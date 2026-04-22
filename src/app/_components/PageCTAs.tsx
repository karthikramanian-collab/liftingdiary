'use client';

import { SignInButton, SignUpButton } from '@clerk/nextjs';

const btnBase: React.CSSProperties = {
  borderRadius: '4px',
  fontSize: '13px',
  fontFamily: 'var(--font-dm-sans), sans-serif',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  cursor: 'pointer',
  padding: '14px 28px',
  fontWeight: 700,
  border: 'none',
};

export function HeroCTAs() {
  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <SignUpButton mode="modal">
        <button style={{ ...btnBase, background: 'var(--accent)', color: '#fff' }}>
          Start Logging Free
        </button>
      </SignUpButton>
      <SignInButton mode="modal">
        <button
          style={{
            ...btnBase,
            background: 'transparent',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border)',
            fontWeight: 500,
          }}
        >
          Sign In
        </button>
      </SignInButton>
    </div>
  );
}

export function BannerCTA() {
  return (
    <SignUpButton mode="modal">
      <button
        style={{
          ...btnBase,
          background: 'var(--accent)',
          color: '#fff',
          padding: '16px 36px',
          whiteSpace: 'nowrap',
        }}
      >
        Create Free Account
      </button>
    </SignUpButton>
  );
}
