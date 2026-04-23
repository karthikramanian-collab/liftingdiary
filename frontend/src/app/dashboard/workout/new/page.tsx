import { NewWorkoutForm } from './_components/NewWorkoutForm';

export const metadata = { title: 'New Session — LiftingDiary' };

export default function NewWorkoutPage() {
  return (
    <main style={{ paddingTop: '64px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <div style={{ width: '28px', height: '2px', background: 'var(--accent)' }} />
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-dm-sans), sans-serif',
            }}
          >
            New Session
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-bebas), sans-serif',
            fontSize: 'clamp(36px, 6vw, 60px)',
            letterSpacing: '0.02em',
            lineHeight: 1,
            margin: '0 0 40px',
            color: 'var(--text-primary)',
          }}
        >
          START A SESSION
        </h1>

        <NewWorkoutForm />
      </div>
    </main>
  );
}
