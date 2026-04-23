import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

// Belt-and-suspenders auth guard in addition to middleware
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect('/');

  return <>{children}</>;
}
