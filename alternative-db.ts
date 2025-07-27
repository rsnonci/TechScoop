// Alternative database configuration for Windows compatibility
// This file is for reference only - actual implementation is in server/db-windows.ts

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
  
  console.log("Alternative DB - Database URL found:", dbUrl.replace(/:[^:]*@/, ':***@'));
  return dbUrl;
};

const databaseUrl = getDatabaseUrl();

// Use postgres-js which is more Windows compatible
const sql = postgres(databaseUrl, {
  ssl: databaseUrl.includes('neon.tech') ? 'require' : false,
  max: 1, // Single connection for stability
  connect_timeout: 30,
  idle_timeout: 30,
});

export const db = drizzle(sql, { schema });
export { sql as pool };