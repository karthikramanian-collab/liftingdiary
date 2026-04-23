import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { getWorkoutDetail } from '@/data/workouts';
import { getExercises } from '@/data/exercises';
import { WorkoutView } from './_components/WorkoutView';
import type { Unit } from '@/types/workout';

export const metadata = { title: 'Session — LiftingDiary' };

type Props = { params: Promise<{ id: string }> };

export default async function WorkoutDetailPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const unit = (cookieStore.get('unit-preference')?.value ?? 'lbs') as Unit;

  const [workout, allExercises] = await Promise.all([getWorkoutDetail(id), getExercises()]);

  if (!workout) notFound();

  return (
    <main style={{ paddingTop: '64px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>
        <WorkoutView workout={workout} allExercises={allExercises} unit={unit} />
      </div>
    </main>
  );
}
