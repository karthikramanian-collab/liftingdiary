'use server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@liftingdiary/backend';
import { workouts, workoutExercises } from '@liftingdiary/backend/schema';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function addExerciseToWorkout(workoutId: string, exerciseId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const workout = await db.query.workouts.findFirst({
    where: and(eq(workouts.id, workoutId), eq(workouts.userId, userId)),
    columns: { id: true },
    with: { workoutExercises: { columns: { id: true } } },
  });
  if (!workout) throw new Error('Forbidden');

  const nextOrderIndex = workout.workoutExercises.length;

  await db.insert(workoutExercises).values({ workoutId, exerciseId, orderIndex: nextOrderIndex });

  revalidatePath(`/dashboard/workout/${workoutId}`);
}

export async function removeExerciseFromWorkout(workoutExerciseId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const we = await db.query.workoutExercises.findFirst({
    where: eq(workoutExercises.id, workoutExerciseId),
    with: { workout: { columns: { userId: true, id: true } } },
  });
  if (we?.workout.userId !== userId) throw new Error('Forbidden');

  await db.delete(workoutExercises).where(eq(workoutExercises.id, workoutExerciseId));

  revalidatePath(`/dashboard/workout/${we.workout.id}`);
}
