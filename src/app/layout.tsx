import type { Metadata } from 'next';
import { Bebas_Neue, DM_Sans } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { NavAuth } from './_components/NavAuth';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LiftingDiary — Track Every Rep',
  description: 'Your personal lifting tracker. Log every set, track your progress, forge your legacy.',
};

function BarbellIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="10" width="3" height="12" rx="1" fill="currentColor" opacity="0.9"/>
      <rect x="5" y="12" width="2" height="8" rx="0.5" fill="currentColor" opacity="0.7"/>
      <rect x="7" y="15" width="18" height="2" rx="1" fill="currentColor"/>
      <rect x="25" y="12" width="2" height="8" rx="0.5" fill="currentColor" opacity="0.7"/>
      <rect x="28" y="10" width="3" height="12" rx="1" fill="currentColor" opacity="0.9"/>
      <rect x="14" y="13.5" width="4" height="5" rx="0.5" fill="var(--accent)"/>
    </svg>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}>
        <ClerkProvider>
          <div className="noise-overlay">
            <nav
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                borderBottom: '1px solid var(--border)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                backgroundColor: 'rgba(12,12,12,0.85)',
              }}
            >
              <div
                style={{
                  maxWidth: '1200px',
                  margin: '0 auto',
                  padding: '0 24px',
                  height: '64px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <a
                  href="/"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                  }}
                >
                  <BarbellIcon />
                  <span
                    style={{
                      fontFamily: 'var(--font-bebas), sans-serif',
                      fontSize: '22px',
                      letterSpacing: '0.08em',
                      lineHeight: 1,
                      color: 'var(--text-primary)',
                    }}
                  >
                    Lifting<span style={{ color: 'var(--accent)' }}>Diary</span>
                  </span>
                </a>

                <NavAuth />
              </div>
            </nav>

            {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
