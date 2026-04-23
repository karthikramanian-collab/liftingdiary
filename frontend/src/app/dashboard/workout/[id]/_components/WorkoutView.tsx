'use client';
import { useState, useTransition } from 'react';
import { finishWorkout, updateWorkoutName, deleteWorkout } from '@/actions/workout-actions';
import type { ExerciseOption, Unit, WorkoutDetail } from '@/types/workout';
import { ExerciseCard } from './ExerciseCard';
import { AddExerciseModal } from './AddExerciseModal';

type Props = {
  workout: WorkoutDetail;
  allExercises: ExerciseOption[];
  unit: Unit;
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function WorkoutView({ workout, allExercises, unit }: Props) {
  const isActive = !workout.finishedAt;

  const [nameValue, setNameValue] = useState(workout.name ?? '');
  const [isEditingName, setIsEditingName] = useState(false);
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleNameBlur() {
    setIsEditingName(false);
    if (nameValue !== (workout.name ?? '')) {
      startTransition(() => updateWorkoutName(workout.id, nameValue));
    }
  }

  function handleFinish() {
    startTransition(() => finishWorkout(workout.id));
  }

  function handleDelete() {
    if (!confirm('Delete this session and all its sets? This cannot be undone.')) return;
    startTransition(() => deleteWorkout(workout.id));
  }

  return (
    <div>
      {/* Back link */}
      <a
        href="/dashboard"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          fontSize: '13px',
          fontFamily: 'var(--font-dm-sans), sans-serif',
          letterSpacing: '0.03em',
          marginBottom: '32px',
        }}
      >
        ‹ Dashboard
      </a>

      {/* Workout header */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          paddingBottom: '24px',
          marginBottom: '32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            {/* Editable name */}
            {isEditingName ? (
              <input
                autoFocus
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                onBlur={handleNameBlur}
                onKeyDown={(e) => e.key === 'Enter' && handleNameBlur()}
                style={{
                  fontFamily: 'var(--font-bebas), sans-serif',
                  fontSize: 'clamp(32px, 5vw, 52px)',
                  letterSpacing: '0.02em',
                  color: 'var(--text-primary)',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '2px solid var(--accent)',
                  outline: 'none',
                  width: '100%',
                  padding: '0 0 4px',
                }}
              />
            ) : (
              <h1
                onClick={() => setIsEditingName(true)}
                title="Click to edit"
                style={{
                  fontFamily: 'var(--font-bebas), sans-serif',
                  fontSize: 'clamp(32px, 5vw, 52px)',
                  letterSpacing: '0.02em',
                  lineHeight: 1,
                  margin: 0,
                  color: workout.name ? 'var(--text-primary)' : 'var(--text-muted)',
                  cursor: 'pointer',
                }}
              >
                {workout.name ?? 'Unnamed Session'}
              </h1>
            )}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginTop: '8px',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                }}
              >
                {formatDate(workout.startedAt)}
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
                    padding: '2px 7px',
                  }}
                >
                  Active
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0 }}>
            {isActive && (
              <button
                onClick={handleFinish}
                disabled={isPending}
                style={{
                  background: 'var(--accent)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '10px 20px',
                  fontFamily: 'var(--font-bebas), sans-serif',
                  fontSize: '16px',
                  letterSpacing: '0.08em',
                  cursor: isPending ? 'not-allowed' : 'pointer',
                }}
              >
                FINISH SESSION
              </button>
            )}
            <button
              onClick={handleDelete}
              disabled={isPending}
              style={{
                background: 'transparent',
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                padding: '10px 14px',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '12px',
                letterSpacing: '0.08em',
                cursor: isPending ? 'not-allowed' : 'pointer',
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Exercise list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {workout.workoutExercises.length === 0 ? (
          <div
            style={{
              padding: '48px 0',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '14px',
            }}
          >
            No exercises yet. Add one below.
          </div>
        ) : (
          workout.workoutExercises.map((we) => (
            <ExerciseCard key={we.id} workoutExercise={we} workoutId={workout.id} unit={unit} />
          ))
        )}
      </div>

      {/* Add exercise */}
      <div style={{ marginTop: '24px' }}>
        <button
          onClick={() => setShowAddExercise(true)}
          style={{
            width: '100%',
            padding: '16px',
            background: 'transparent',
            border: '1px dashed var(--border)',
            borderRadius: '4px',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'border-color 0.15s, color 0.15s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
          }}
        >
          + Add Exercise
        </button>
      </div>

      {showAddExercise && (
        <AddExerciseModal
          workoutId={workout.id}
          allExercises={allExercises}
          onClose={() => setShowAddExercise(false)}
        />
      )}
    </div>
  );
}
