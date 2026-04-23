'use client';
import Link from 'next/link';
import { toDateKey } from '@/lib/units';
import type { Unit, WorkoutSummary } from '@/types/workout';

type Props = {
  workouts: WorkoutSummary[];
  selectedDate: string | null;
  unit: Unit;
};

function formatDuration(startedAt: string, finishedAt: string | null): string {
  if (!finishedAt) return 'Active';
  const mins = Math.round((new Date(finishedAt).getTime() - new Date(startedAt).getTime()) / 60000);
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function WorkoutList({ workouts, selectedDate, unit }: Props) {
  const filtered = selectedDate
    ? workouts.filter((w) => toDateKey(w.startedAt) === selectedDate)
    : workouts.slice(0, 10);

  if (filtered.length === 0) {
    return (
      <div
        style={{
          padding: '48px 0',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: '14px',
          letterSpacing: '0.05em',
        }}
      >
        {selectedDate ? 'No sessions on this day.' : 'No sessions logged yet. Start your first one!'}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
      {filtered.map((w) => {
        const isActive = !w.finishedAt;
        return (
          <Link
            key={w.id}
            href={`/dashboard/workout/${w.id}`}
            style={{ textDecoration: 'none' }}
          >
            <div
              style={{
                background: 'var(--bg-surface)',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.background = 'var(--bg-elevated)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.background = 'var(--bg-surface)')
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-bebas), sans-serif',
                      fontSize: '20px',
                      letterSpacing: '0.06em',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {w.name ?? 'Unnamed Session'}
                  </span>
                  {isActive && (
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        color: 'var(--accent)',
                        fontFamily: 'var(--font-dm-sans), sans-serif',
                        textTransform: 'uppercase',
                        border: '1px solid var(--accent)',
                        borderRadius: '2px',
                        padding: '1px 6px',
                      }}
                    >
                      Active
                    </span>
                  )}
                </div>
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    letterSpacing: '0.03em',
                  }}
                >
                  {formatDate(w.startedAt)}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '32px', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-bebas), sans-serif',
                      fontSize: '22px',
                      color: 'var(--text-primary)',
                      lineHeight: 1,
                    }}
                  >
                    {w.exerciseCount}
                  </div>
                  <div
                    style={{
                      fontSize: '10px',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Exercises
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-bebas), sans-serif',
                      fontSize: '22px',
                      color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                      lineHeight: 1,
                    }}
                  >
                    {formatDuration(w.startedAt, w.finishedAt)}
                  </div>
                  <div
                    style={{
                      fontSize: '10px',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Duration
                  </div>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '18px' }}>›</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
