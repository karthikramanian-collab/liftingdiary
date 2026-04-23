import type { Unit } from '@/types/workout';

export function displayWeight(weightKg: string | null | undefined, unit: Unit): string {
  if (!weightKg) return '—';
  const kg = parseFloat(weightKg);
  if (unit === 'lbs') return (kg * 2.20462).toFixed(1);
  return kg.toFixed(1);
}

export function toKg(weight: number, unit: Unit): number {
  return unit === 'lbs' ? weight / 2.20462 : weight;
}

// Returns YYYY-MM-DD from ISO string, used for calendar keying (UTC)
export function toDateKey(iso: string): string {
  return iso.slice(0, 10);
}
