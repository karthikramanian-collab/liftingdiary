'use client';
import { useTransition } from 'react';
import { createWorkout } from '@/actions/workout-actions';

// Returns current datetime as a value for datetime-local input
function nowLocal(): string {
  const d = new Date();
  d.setSeconds(0, 0);
  return d.toISOString().slice(0, 16);
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--bg-surface)',
  border: '1px solid var(--border)',
  borderRadius: '4px',
  padding: '12px 16px',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-dm-sans), sans-serif',
  fontSize: '14px',
  outline: 'none',
  colorScheme: 'dark',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--text-secondary)',
  fontFamily: 'var(--font-dm-sans), sans-serif',
  marginBottom: '8px',
};

export function NewWorkoutForm() {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => createWorkout(formData));
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <label htmlFor="name" style={labelStyle}>
          Session Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="e.g. Push Day, Leg Day, Upper A — optional"
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="startedAt" style={labelStyle}>
          Date & Time
        </label>
        <input
          id="startedAt"
          name="startedAt"
          type="datetime-local"
          defaultValue={nowLocal()}
          style={inputStyle}
        />
        <p
          style={{
            marginTop: '6px',
            fontSize: '12px',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-dm-sans), sans-serif',
          }}
        >
          Set a past date to log a retroactive session.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', paddingTop: '8px' }}>
        <button
          type="submit"
          disabled={isPending}
          style={{
            background: isPending ? 'var(--text-muted)' : 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '14px 32px',
            fontFamily: 'var(--font-bebas), sans-serif',
            fontSize: '18px',
            letterSpacing: '0.1em',
            cursor: isPending ? 'not-allowed' : 'pointer',
            transition: 'background 0.15s',
          }}
        >
          {isPending ? 'CREATING...' : 'START SESSION'}
        </button>

        <a
          href="/dashboard"
          style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-dm-sans), sans-serif',
            textDecoration: 'none',
            letterSpacing: '0.03em',
          }}
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
