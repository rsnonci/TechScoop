// Test database connection script untuk Windows debugging
import { config } from 'dotenv';
import { Pool } from '@neondatabase/serverless';
import ws from 'ws';

// Load environment variables
config();

console.log('Testing database connection...');
console.log('NODE_ENV:', process.env.NODE_ENV);

// Check all database related environment variables
const dbEnvVars = Object.keys(process.env).filter(key => 
  key.includes('DATABASE') || key.includes('DB') || key.includes('NEON')
);

console.log('Database environment variables found:');
dbEnvVars.forEach(key => {
  const value = process.env[key];
  if (value) {
    // Hide password in logs
    const safeValue = value.includes('@') ? value.replace(/:[^:]*@/, ':***@') : value;
    console.log(`${key}: ${safeValue}`);
  }
});

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL not found!');
  console.log('Available environment variables:', Object.keys(process.env).slice(0, 10), '...');
  process.exit(1);
}

console.log('✅ DATABASE_URL found');

// Test connection
const pool = new Pool({ 
  connectionString: databaseUrl,
  ssl: databaseUrl.includes('neon.tech') ? { rejectUnauthorized: false } : false
});

try {
  console.log('Testing database connection...');
  const client = await pool.connect();
  console.log('✅ Database connection successful!');
  
  // Test query
  const result = await client.query('SELECT NOW() as current_time');
  console.log('✅ Database query successful:', result.rows[0]);
  
  // Test schema
  const tablesResult = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
  `);
  console.log('✅ Database tables found:', tablesResult.rows.map(r => r.table_name));
  
  client.release();
  console.log('✅ All database tests passed!');
} catch (error) {
  console.error('❌ Database connection failed:', error.message);
  console.error('Error details:', error);
} finally {
  await pool.end();
}