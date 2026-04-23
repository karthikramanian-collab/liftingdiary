'use server';
import { cookies } from 'next/headers';
import type { Unit } from '@/types/workout';

export async function setUnitPreference(unit: Unit) {
  const store = await cookies();
  store.set('unit-preference', unit, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    httpOnly: false, // readable client-side for display purposes
  });
}
