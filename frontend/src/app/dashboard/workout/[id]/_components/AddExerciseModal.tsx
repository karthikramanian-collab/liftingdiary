'use client';
import { useState, useTransition } from 'react';
import { addExerciseToWorkout } from '@/actions/workout-exercise-actions';
import type { ExerciseOption } from '@/types/workout';

type Props = {
  workoutId: string;
  allExercises: ExerciseOption[];
  onClose: () => void;
};

export function AddExerciseModal({ workoutId, allExercises, onClose }: Props) {
  const [search, setSearch] = useState('');
  const [isPending, startTransition] = useTransition();

  const filtered =
    search.trim().length > 0
      ? allExercises.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
      : allExercises;

  function handleSelect(exerciseId: string) {
    startTransition(async () => {
      await addExerciseToWorkout(workoutId, exerciseId);
      onClose();
    });
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          zIndex: 40,
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '480px',
          maxHeight: '70vh',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Modal header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 20px 16px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-bebas), sans-serif',
              fontSize: '22px',
              letterSpacing: '0.06em',
              margin: 0,
              color: 'var(--text-primary)',
            }}
          >
            ADD EXERCISE
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '20px',
              cursor: 'pointer',
              lineHeight: 1,
              padding: '2px',
            }}
          >
            ×
          </button>
        </div>

        {/* Search */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
          <input
            autoFocus
            type="text"
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '10px 14px',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>

        {/* Exercise list */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {filtered.length === 0 ? (
            <div
              style={{
                padding: '32px',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '14px',
              }}
            >
              No exercises found.
            </div>
          ) : (
            filtered.map((ex) => (
              <button
                key={ex.id}
                onClick={() => handleSelect(ex.id)}
                disabled={isPending}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid var(--border-subtle)',
                  padding: '14px 20px',
                  textAlign: 'left',
                  cursor: isPending ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-elevated)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background = 'none')
                }
              >
                <span
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: '14px',
                    color: 'var(--text-primary)',
                    fontWeight: 500,
                  }}
                >
                  {ex.name}
                </span>
                {(ex.muscleGroup || ex.category) && (
                  <span
                    style={{
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {[ex.muscleGroup, ex.category].filter(Boolean).join(' · ')}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
}
