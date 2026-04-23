'use client';
import { useMemo } from 'react';
import { toDateKey } from '@/lib/units';
import type { WorkoutSummary } from '@/types/workout';

type Props = {
  workouts: WorkoutSummary[];
  selectedDate: string | null;
  onDayClick: (dateKey: string) => void;
};

type CalendarDay = { dateKey: string; count: number; isFuture: boolean };

function buildCalendarWeeks(today: Date, countByDate: Map<string, number>) {
  // Start on the Sunday 52 weeks before today
  const start = new Date(today);
  start.setDate(start.getDate() - 364);
  start.setDate(start.getDate() - start.getDay()); // rewind to Sunday

  const todayKey = toDateKey(today.toISOString());
  const weeks: CalendarDay[][] = [];
  const cur = new Date(start);

  while (cur <= today || weeks[weeks.length - 1]?.length < 7) {
    if (weeks.length === 0 || weeks[weeks.length - 1].length === 7) {
      weeks.push([]);
    }
    const key = toDateKey(cur.toISOString());
    weeks[weeks.length - 1].push({
      dateKey: key,
      count: countByDate.get(key) ?? 0,
      isFuture: key > todayKey,
    });
    cur.setDate(cur.getDate() + 1);
  }

  return weeks;
}

function cellColor(count: number, selected: boolean): string {
  if (count === 0) return 'var(--bg-elevated)';
  if (count === 1) return 'rgba(232, 80, 10, 0.3)';
  if (count === 2) return 'rgba(232, 80, 10, 0.6)';
  return 'var(--accent)';
}

const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function WorkoutCalendar({ workouts, selectedDate, onDayClick }: Props) {
  const { weeks, countByDate } = useMemo(() => {
    const countByDate = new Map<string, number>();
    for (const w of workouts) {
      const key = toDateKey(w.startedAt);
      countByDate.set(key, (countByDate.get(key) ?? 0) + 1);
    }
    const weeks = buildCalendarWeeks(new Date(), countByDate);
    return { weeks, countByDate };
  }, [workouts]);

  const CELL = 12;
  const GAP = 3;
  const STEP = CELL + GAP;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
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
          Activity — trailing 52 weeks
        </span>
      </div>

      <div style={{ overflowX: 'auto', paddingBottom: '8px' }}>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start' }}>
          {/* Day-of-week labels */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: `${GAP}px`,
              marginTop: '20px',
              flexShrink: 0,
            }}
          >
            {DAY_LABELS.map((d, i) => (
              <div
                key={i}
                style={{
                  width: '10px',
                  height: `${CELL}px`,
                  fontSize: '9px',
                  color: 'var(--text-muted)',
                  lineHeight: `${CELL}px`,
                  textAlign: 'right',
                }}
              >
                {/* Show only M, W, F */}
                {i === 1 || i === 3 || i === 5 ? d : ''}
              </div>
            ))}
          </div>

          {/* Week columns */}
          <div style={{ display: 'flex', gap: `${GAP}px`, flexShrink: 0 }}>
            {weeks.map((week, wi) => {
              // Find first-of-month in this week for month label
              const monthLabel = week.find((d) => d.dateKey.slice(8) === '01');
              const label = monthLabel
                ? MONTH_ABBR[parseInt(monthLabel.dateKey.slice(5, 7), 10) - 1]
                : '';

              return (
                <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: `${GAP}px` }}>
                  {/* Month label */}
                  <div
                    style={{
                      height: '16px',
                      fontSize: '9px',
                      color: 'var(--text-secondary)',
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      whiteSpace: 'nowrap',
                      lineHeight: '16px',
                    }}
                  >
                    {label}
                  </div>

                  {/* Day cells */}
                  {week.map((day, di) => {
                    const isSelected = day.dateKey === selectedDate;
                    const hasWorkout = day.count > 0;
                    const tooltip = hasWorkout
                      ? `${day.dateKey}: ${day.count} workout${day.count > 1 ? 's' : ''}`
                      : day.dateKey;

                    return (
                      <div
                        key={di}
                        title={tooltip}
                        onClick={() => !day.isFuture && hasWorkout && onDayClick(day.dateKey)}
                        style={{
                          width: `${CELL}px`,
                          height: `${CELL}px`,
                          borderRadius: '2px',
                          background: day.isFuture ? 'transparent' : cellColor(day.count, isSelected),
                          cursor: hasWorkout && !day.isFuture ? 'pointer' : 'default',
                          outline: isSelected ? `1.5px solid var(--accent)` : 'none',
                          outlineOffset: '1px',
                          transition: 'opacity 0.1s',
                          opacity: day.isFuture ? 0 : 1,
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '12px',
            paddingLeft: '14px',
          }}
        >
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-dm-sans)' }}>
            Less
          </span>
          {[0, 1, 2, 3].map((n) => (
            <div
              key={n}
              style={{
                width: `${CELL}px`,
                height: `${CELL}px`,
                borderRadius: '2px',
                background: cellColor(n, false),
              }}
            />
          ))}
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-dm-sans)' }}>
            More
          </span>
        </div>
      </div>
    </div>
  );
}
