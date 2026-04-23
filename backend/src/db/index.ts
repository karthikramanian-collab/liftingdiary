import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

function createDb() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
  const client = postgres(process.env.DATABASE_URL);
  return drizzle(client, { schema });
}

type Db = ReturnType<typeof createDb>;

// Singleton prevents multiple connections during Next.js hot-reload.
// Cast through the full Db type so query generics are preserved.
const globalForDb = globalThis as unknown as { db: Db | undefined };

export const db: Db = globalForDb.db ?? createDb();

if (process.env.NODE_ENV !== 'production') globalForDb.db = db;
