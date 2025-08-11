// Windows-compatible database configuration
// Use this file if you're experiencing WebSocket errors on Windows
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "@shared/schema.js";

// Enhanced environment variable detection for Windows
const getDatabaseUrl = () => {
  const dbUrl = process.env.DATABASE_URL || 
                process.env.NEON_DATABASE_URL || 
                process.env.DB_URL;
                
  if (!dbUrl) {
    console.error("Environment variables available:", Object.keys(process.env).filter(key => key.includes('DATABASE') || key.includes('DB')));
    throw new Error(
      "DATABASE_URL must be set. Available env vars: " + 
      Object.keys(process.env).filter(key => key.includes('DATABASE') || key.includes('DB')).join(', ')
    );
  }
  
  console.log("Windows DB - Database URL found:", dbUrl.replace(/:[^:]*@/, ':***@'));
  return dbUrl;
};

const databaseUrl = getDatabaseUrl();
const isNeonDatabase = databaseUrl.includes('neon.tech');

// Windows-optimized postgres connection
const sql = postgres(databaseUrl, {
  ssl: isNeonDatabase ? 'require' : false,
  max: 1, // Single connection for Windows stability
  connect_timeout: 30,
  idle_timeout: 30,
  transform: {
    undefined: null
  }
});

console.log("Using Windows-compatible postgres-js driver");

export const db = drizzle(sql, { schema });
export const pool = sql; // For compatibility