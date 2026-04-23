'use client';

import { useUser, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

export function NavAuth() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return <div style={{ width: '120px' }} />;

  if (isSignedIn) {
    return <UserButton />;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <SignInButton mode="modal" forceRedirectUrl="/dashboard">
        <button
          style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            padding: '8px 18px',
            borderRadius: '4px',
            fontSize: '13px',
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontWeight: 500,
            letterSpacing: '0.03em',
            cursor: 'pointer',
          }}
        >
          Sign In
        </button>
      </SignInButton>
      <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
        <button
          style={{
            background: 'var(--accent)',
            border: '1px solid var(--accent)',
            color: '#fff',
            padding: '8px 18px',
            borderRadius: '4px',
            fontSize: '13px',
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontWeight: 600,
            letterSpacing: '0.03em',
            cursor: 'pointer',
          }}
        >
          Get Started
        </button>
      </SignUpButton>
    </div>
  );
}
