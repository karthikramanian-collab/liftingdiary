'use client';
import { useState, useTransition } from 'react';
import { logSet, deleteSet } from '@/actions/set-actions';
import { removeExerciseFromWorkout } from '@/actions/workout-exercise-actions';
import { displayWeight } from '@/lib/units';
import type { Unit, WorkoutExerciseDetail } from '@/types/workout';

type Props = {
  workoutExercise: WorkoutExerciseDetail;
  workoutId: string;
  unit: Unit;
};

const inputStyle: React.CSSProperties = {
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  borderRadius: '3px',
  padding: '6px 10px',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-dm-sans), sans-serif',
  fontSize: '13px',
  outline: 'none',
  width: '100%',
  colorScheme: 'dark',
};

export function ExerciseCard({ workoutExercise: we, workoutId, unit }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { exercise, sets } = we;

  function handleLogSet(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set('unit', unit);
    startTransition(async () => {
      await logSet(we.id, fd);
      setShowForm(false);
    });
  }

  function handleDeleteSet(setId: string) {
    startTransition(() => deleteSet(setId));
  }

  function handleRemoveExercise() {
    if (!confirm(`Remove ${exercise.name} from this session?`)) return;
    startTransition(() => removeExerciseFromWorkout(we.id));
  }

  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        overflow: 'hidden',
      }}
    >
      {/* Exercise header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: sets.length > 0 || showForm ? '1px solid var(--border-subtle)' : 'none',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-bebas), sans-serif',
              fontSize: '20px',
              letterSpacing: '0.06em',
              color: 'var(--text-primary)',
            }}
          >
            {exercise.name}
          </div>
          {(exercise.muscleGroup || exercise.category) && (
            <div
              style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginTop: '2px',
              }}
            >
              {[exercise.muscleGroup, exercise.category].filter(Boolean).join(' · ')}
            </div>
          )}
        </div>
        <button
          onClick={handleRemoveExercise}
          disabled={isPending}
          title="Remove exercise from session"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '16px',
            padding: '4px',
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      {/* Sets table */}
      {sets.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '400px' }}>
            <thead>
              <tr>
                {['Set', 'Reps', `Weight (${unit})`, 'RPE', '', ''].map((h, i) => (
                  <th
                    key={i}
                    style={{
                      padding: '8px 20px',
                      textAlign: i === 0 ? 'left' : 'right',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      borderBottom: '1px solid var(--border-subtle)',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sets.map((s) => (
                <tr key={s.id} style={{ opacity: isPending ? 0.5 : 1 }}>
                  <td style={tdStyle}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {s.setNumber}
                      {s.isWarmup && (
                        <span
                          style={{
                            fontSize: '9px',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            fontFamily: 'var(--font-dm-sans)',
                          }}
                        >
                          W
                        </span>
                      )}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>{s.reps ?? '—'}</td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>
                    {displayWeight(s.weightKg, unit)}
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>{s.rpe ?? '—'}</td>
                  <td style={{ ...tdStyle, textAlign: 'right', paddingRight: '8px' }} />
                  <td style={{ ...tdStyle, textAlign: 'right' }}>
                    <button
                      onClick={() => handleDeleteSet(s.id)}
                      disabled={isPending}
                      title="Delete set"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        fontSize: '14px',
                        padding: '2px 6px',
                      }}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Log set form */}
      {showForm && (
        <form
          onSubmit={handleLogSet}
          style={{
            padding: '16px 20px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-elevated)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '10px', marginBottom: '12px' }}>
            <div>
              <label style={microLabel}>Reps</label>
              <input name="reps" type="number" min="1" placeholder="—" style={inputStyle} />
            </div>
            <div>
              <label style={microLabel}>Weight ({unit})</label>
              <input name="weight" type="number" min="0" step="0.5" placeholder="—" style={inputStyle} />
            </div>
            <div>
              <label style={microLabel}>RPE</label>
              <input name="rpe" type="number" min="1" max="10" step="0.5" placeholder="—" style={inputStyle} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '2px', gap: '8px' }}>
              <input name="isWarmup" type="checkbox" id={`warmup-${we.id}`} style={{ cursor: 'pointer' }} />
              <label
                htmlFor={`warmup-${we.id}`}
                style={{ ...microLabel, marginBottom: 0, cursor: 'pointer' }}
              >
                Warmup
              </label>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              disabled={isPending}
              style={{
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                borderRadius: '3px',
                padding: '8px 20px',
                fontFamily: 'var(--font-bebas), sans-serif',
                fontSize: '15px',
                letterSpacing: '0.08em',
                cursor: isPending ? 'not-allowed' : 'pointer',
              }}
            >
              {isPending ? 'SAVING...' : 'LOG SET'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '13px',
                cursor: 'pointer',
                padding: '8px',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* + Log set button */}
      {!showForm && (
        <div style={{ padding: '10px 20px' }}>
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent)',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              padding: '4px 0',
            }}
          >
            + Log Set
          </button>
        </div>
      )}
    </div>
  );
}

const tdStyle: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: '13px',
  fontFamily: 'var(--font-dm-sans), sans-serif',
  color: 'var(--text-primary)',
  borderBottom: '1px solid var(--border-subtle)',
};

const microLabel: React.CSSProperties = {
  display: 'block',
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  fontFamily: 'var(--font-dm-sans), sans-serif',
  marginBottom: '5px',
};
