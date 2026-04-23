'use server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@liftingdiary/backend';
import { workouts } from '@liftingdiary/backend/schema';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createWorkout(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const name = (formData.get('name') as string)?.trim() || null;
  const dateStr = formData.get('startedAt') as string;
  const startedAt = dateStr ? new Date(dateStr) : new Date();

  const [workout] = await db
    .insert(workouts)
    .values({ userId, name, startedAt })
    .returning({ id: workouts.id });

  redirect(`/dashboard/workout/${workout.id}`);
}

export async function finishWorkout(workoutId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  await db
    .update(workouts)
    .set({ finishedAt: new Date() })
    .where(and(eq(workouts.id, workoutId), eq(workouts.userId, userId)));

  revalidatePath(`/dashboard/workout/${workoutId}`);
  revalidatePath('/dashboard');
}

export async function updateWorkoutName(workoutId: string, name: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  await db
    .update(workouts)
    .set({ name: name.trim() || null })
    .where(and(eq(workouts.id, workoutId), eq(workouts.userId, userId)));

  revalidatePath(`/dashboard/workout/${workoutId}`);
}

export async function deleteWorkout(workoutId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  await db
    .delete(workouts)
    .where(and(eq(workouts.id, workoutId), eq(workouts.userId, userId)));

  revalidatePath('/dashboard');
  redirect('/dashboard');
}
