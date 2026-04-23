export type Unit = 'kg' | 'lbs';

export type WorkoutSummary = {
  id: string;
  name: string | null;
  startedAt: string; // ISO string (UTC)
  finishedAt: string | null;
  exerciseCount: number;
};

export type ExerciseOption = {
  id: string;
  name: string;
  muscleGroup: string | null;
  category: string | null;
};

export type SetDetail = {
  id: string;
  setNumber: number;
  reps: number | null;
  weightKg: string | null;
  rpe: string | null;
  isWarmup: boolean;
  notes: string | null;
};

export type WorkoutExerciseDetail = {
  id: string;
  orderIndex: number;
  notes: string | null;
  exercise: ExerciseOption;
  sets: SetDetail[];
};

export type WorkoutDetail = {
  id: string;
  name: string | null;
  startedAt: string;
  finishedAt: string | null;
  workoutExercises: WorkoutExerciseDetail[];
};
