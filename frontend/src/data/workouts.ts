import 'server-only';
import { auth } from '@clerk/nextjs/server';
import { db } from '@liftingdiary/backend';
import { workouts } from '@liftingdiary/backend/schema';
import { and, asc, desc, eq, gte } from 'drizzle-orm';
import type { WorkoutDetail, WorkoutSummary } from '@/types/workout';

export async function getWorkoutSummaries(): Promise<WorkoutSummary[]> {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const yearAgo = new Date();
  yearAgo.setFullYear(yearAgo.getFullYear() - 1);

  const rows = await db.query.workouts.findMany({
    where: and(eq(workouts.userId, userId), gte(workouts.startedAt, yearAgo)),
    columns: { id: true, name: true, startedAt: true, finishedAt: true },
    with: { workoutExercises: { columns: { id: true } } },
    orderBy: desc(workouts.startedAt),
  });

  return rows.map((w) => ({
    id: w.id,
    name: w.name,
    startedAt: w.startedAt.toISOString(),
    finishedAt: w.finishedAt?.toISOString() ?? null,
    exerciseCount: w.workoutExercises.length,
  }));
}

export async function getWorkoutDetail(workoutId: string): Promise<WorkoutDetail | null> {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const row = await db.query.workouts.findFirst({
    where: and(eq(workouts.id, workoutId), eq(workouts.userId, userId)),
    with: {
      workoutExercises: {
        orderBy: (we) => [asc(we.orderIndex)],
        with: {
          exercise: {
            columns: { id: true, name: true, muscleGroup: true, category: true },
          },
          sets: {
            orderBy: (s) => [asc(s.setNumber)],
          },
        },
      },
    },
  });

  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    startedAt: row.startedAt.toISOString(),
    finishedAt: row.finishedAt?.toISOString() ?? null,
    workoutExercises: row.workoutExercises.map((we) => ({
      id: we.id,
      orderIndex: we.orderIndex,
      notes: we.notes,
      exercise: we.exercise,
      sets: we.sets.map((s) => ({
        id: s.id,
        setNumber: s.setNumber,
        reps: s.reps,
        weightKg: s.weightKg,
        rpe: s.rpe,
        isWarmup: s.isWarmup,
        notes: s.notes,
      })),
    })),
  };
}
