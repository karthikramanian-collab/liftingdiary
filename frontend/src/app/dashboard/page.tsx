import { cookies } from 'next/headers';
import Link from 'next/link';
import { getWorkoutSummaries } from '@/data/workouts';
import { DashboardClient } from './_components/DashboardClient';
import type { Unit } from '@/types/workout';

export const metadata = { title: 'Dashboard — LiftingDiary' };

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const unit = (cookieStore.get('unit-preference')?.value ?? 'lbs') as Unit;

  const workouts = await getWorkoutSummaries();

  return (
    <main style={{ paddingTop: '64px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>

        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          <div>
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
                Your Training
              </span>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-bebas), sans-serif',
                fontSize: 'clamp(40px, 6vw, 72px)',
                letterSpacing: '0.02em',
                lineHeight: 1,
                margin: 0,
                color: 'var(--text-primary)',
              }}
            >
              TRAINING HISTORY
            </h1>
          </div>

          <Link
            href="/dashboard/workout/new"
            style={{
              display: 'inline-block',
              background: 'var(--accent)',
              color: '#fff',
              padding: '14px 28px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontFamily: 'var(--font-bebas), sans-serif',
              fontSize: '18px',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
              alignSelf: 'flex-end',
            }}
          >
            + NEW SESSION
          </Link>
        </div>

        <DashboardClient workouts={workouts} unit={unit} />
      </div>
    </main>
  );
}
