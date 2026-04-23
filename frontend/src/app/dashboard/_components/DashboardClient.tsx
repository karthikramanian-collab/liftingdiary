'use client';
import { useState } from 'react';
import { setUnitPreference } from '@/actions/preference-actions';
import type { Unit, WorkoutSummary } from '@/types/workout';
import { WorkoutCalendar } from './WorkoutCalendar';
import { WorkoutList } from './WorkoutList';

type Props = {
  workouts: WorkoutSummary[];
  unit: Unit;
};

export function DashboardClient({ workouts, unit: initialUnit }: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [unit, setUnit] = useState<Unit>(initialUnit);

  async function handleUnitToggle(next: Unit) {
    setUnit(next);
    await setUnitPreference(next);
  }

  function handleDayClick(dateKey: string) {
    setSelectedDate((prev) => (prev === dateKey ? null : dateKey));
  }

  return (
    <div>
      {/* Unit toggle */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
        <div
          style={{
            display: 'flex',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          {(['lbs', 'kg'] as Unit[]).map((u) => (
            <button
              key={u}
              onClick={() => handleUnitToggle(u)}
              style={{
                padding: '6px 16px',
                fontSize: '12px',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                border: 'none',
                background: unit === u ? 'var(--accent)' : 'transparent',
                color: unit === u ? '#fff' : 'var(--text-secondary)',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar heatmap */}
      <WorkoutCalendar
        workouts={workouts}
        selectedDate={selectedDate}
        onDayClick={handleDayClick}
      />

      {/* Session list */}
      <div style={{ marginTop: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <div style={{ width: '20px', height: '2px', background: 'var(--border)' }} />
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-dm-sans), sans-serif',
            }}
          >
            {selectedDate ? `Sessions on ${selectedDate}` : 'Recent Sessions'}
          </span>
          {selectedDate && (
            <button
              onClick={() => setSelectedDate(null)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                cursor: 'pointer',
                fontSize: '11px',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                padding: 0,
                letterSpacing: '0.08em',
              }}
            >
              CLEAR
            </button>
          )}
        </div>
        <WorkoutList workouts={workouts} selectedDate={selectedDate} unit={unit} />
      </div>
    </div>
  );
}
