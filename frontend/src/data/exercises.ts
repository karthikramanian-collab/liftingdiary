import 'server-only';
import { auth } from '@clerk/nextjs/server';
import { db } from '@liftingdiary/backend';
import { exercises } from '@liftingdiary/backend/schema';
import { asc } from 'drizzle-orm';
import type { ExerciseOption } from '@/types/workout';

export async function getExercises(): Promise<ExerciseOption[]> {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const rows = await db.query.exercises.findMany({
    columns: { id: true, name: true, muscleGroup: true, category: true },
    orderBy: [asc(exercises.name)],
  });

  return rows;
}
