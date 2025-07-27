import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure Neon for different environments
neonConfig.webSocketConstructor = ws;

// Enhanced environment variable detection for Windows
const getDatabaseUrl = () => {
  // Try different environment variable sources
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
  
  console.log("Database URL found:", dbUrl.replace(/:[^:]*@/, ':***@')); // Hide password in logs
  return dbUrl;
};

const databaseUrl = getDatabaseUrl();

// Handle different database types
const isNeonDatabase = databaseUrl.includes('neon.tech') || databaseUrl.includes('neon.database');
const isLocalDatabase = databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1');

if (isNeonDatabase) {
  // Configure for Neon serverless
  neonConfig.webSocketConstructor = ws;
  neonConfig.useSecureWebSocket = true;
}

export const pool = new Pool({ 
  connectionString: databaseUrl,
  ssl: isNeonDatabase ? { rejectUnauthorized: false } : false
});

export const db = drizzle({ client: pool, schema });