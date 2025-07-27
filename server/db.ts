import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

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

// Configure Neon ONLY if it's a Neon database and not in problematic Windows environment
if (isNeonDatabase) {
  // Windows WebSocket fix - disable WebSocket for Windows if causing issues
  const isWindows = process.platform === 'win32';
  
  if (!isWindows) {
    neonConfig.webSocketConstructor = ws;
    neonConfig.useSecureWebSocket = true;
  } else {
    // For Windows, disable WebSocket and use HTTP pooling
    console.log("Windows detected: Using HTTP pooling instead of WebSocket for Neon");
    neonConfig.webSocketConstructor = undefined;
    neonConfig.useSecureWebSocket = false;
  }
}

// Create pool with Windows-compatible settings
const poolConfig: any = { 
  connectionString: databaseUrl
};

// SSL configuration
if (isNeonDatabase) {
  poolConfig.ssl = { rejectUnauthorized: false };
} else if (!isLocalDatabase) {
  poolConfig.ssl = true;
}

// Windows-specific database configuration
if (process.platform === 'win32' && isNeonDatabase) {
  // Force HTTP mode for Windows + Neon
  poolConfig.connectionTimeoutMillis = 30000;
  poolConfig.idleTimeoutMillis = 30000;
  poolConfig.max = 1; // Single connection for Windows
}

export const pool = new Pool(poolConfig);
export const db = drizzle({ client: pool, schema });