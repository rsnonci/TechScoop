import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@shared/schema';

const getDatabaseUrl = () => {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL is not set.");
  }
  return dbUrl;
};

const databaseUrl = getDatabaseUrl();

export const pool = new Pool({
  connectionString: databaseUrl,
});

export const db = drizzle(pool, { schema });