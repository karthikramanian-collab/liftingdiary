'use server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@liftingdiary/backend';
import { sets, workoutExercises } from '@liftingdiary/backend/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { toKg } from '@/lib/units';
import type { Unit } from '@/types/workout';

export async function logSet(workoutExerciseId: string, formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  // Verify ownership through the relation chain before writing
  const we = await db.query.workoutExercises.findFirst({
    where: eq(workoutExercises.id, workoutExerciseId),
    with: { workout: { columns: { userId: true, id: true } } },
  });
  if (we?.workout.userId !== userId) throw new Error('Forbidden');

  const unit = (formData.get('unit') as Unit) ?? 'lbs';
  const repsRaw = formData.get('reps') as string;
  const weightRaw = formData.get('weight') as string;
  const rpeRaw = formData.get('rpe') as string;
  const isWarmup = formData.get('isWarmup') === 'on';
  const notes = (formData.get('notes') as string)?.trim() || null;

  const reps = repsRaw ? parseInt(repsRaw, 10) : null;
  const weightKg = weightRaw ? toKg(parseFloat(weightRaw), unit).toFixed(3) : null;
  const rpe = rpeRaw ? parseFloat(rpeRaw).toFixed(1) : null;

  // Derive next set number from current count
  const existing = await db.query.sets.findMany({
    where: eq(sets.workoutExerciseId, workoutExerciseId),
    columns: { id: true },
  });
  const setNumber = existing.length + 1;

  await db.insert(sets).values({ workoutExerciseId, setNumber, reps, weightKg, rpe, isWarmup, notes });

  revalidatePath(`/dashboard/workout/${we.workout.id}`);
}

export async function deleteSet(setId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const set = await db.query.sets.findFirst({
    where: eq(sets.id, setId),
    with: {
      workoutExercise: {
        with: { workout: { columns: { userId: true, id: true } } },
      },
    },
  });
  if (set?.workoutExercise.workout.userId !== userId) throw new Error('Forbidden');

  await db.delete(sets).where(eq(sets.id, setId));

  revalidatePath(`/dashboard/workout/${set.workoutExercise.workout.id}`);
}
