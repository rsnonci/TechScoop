# Windows WebSocket Error Fix

## Error yang Anda Alami
```
Detailed error fetching news: ErrorEvent {
  _url: 'wss://localhost/v2',
  [Symbol(kError)]: AggregateError [ECONNREFUSED]
}
```

## 🎯 Root Cause
Error ini terjadi karena Neon database driver menggunakan WebSocket connection yang tidak kompatibel dengan Windows environment. WebSocket mencoba connect ke `wss://localhost/v2` yang tidak ada.

## ✅ Solution 1: Automatic Windows Detection (SUDAH DITERAPKAN)
Server sekarang otomatis detect Windows dan disable WebSocket:

```typescript
// Di server/db.ts - sudah diperbaiki
if (isNeonDatabase) {
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
```

## 🛠️ Solution 2: Alternative Database Driver (JIKA MASIH ERROR)

Jika masih mendapat WebSocket error, gunakan alternative database configuration:

### Step 1: Install postgres-js
```cmd
npm install postgres
```

### Step 2: Replace Database Import
Ganti import di `server/storage.ts`:

**Sebelum:**
```typescript
import { db } from "./db";
```

**Sesudah:**
```typescript
import { db } from "./db-windows";
```

### Step 3: Update Routes Import (jika perlu)
Ganti import di `server/routes.ts`:

**Sebelum:**
```typescript
import { storage } from "./storage";
```

**Sesudah:**
```typescript
import { storage } from "./storage";
```

## 🧪 Test Fix

### Manual Test
```cmd
# Start server
npm run dev

# Test API di browser/curl
curl http://localhost:5000/api/news
```

### Expected Result
```
Database URL found: postgresql://***
Windows detected: Using HTTP pooling instead of WebSocket for Neon
serving on port 5000
```

## 📋 Complete Windows Setup Guide

### 1. Prerequisites
```cmd
node --version  # Harus 20+
npm --version
```

### 2. Install Dependencies
```cmd
npm install
npm install cross-env postgres
```

### 3. Update package.json
```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development tsx watch server/index.ts"
  }
}
```

### 4. Setup .env File
```env
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require
API_KEY=your_api_key_here
PORT=5000
NODE_ENV=development
```

### 5. Test Connection
```cmd
# Test environment variables
node -e "require('dotenv').config(); console.log('DB:', process.env.DATABASE_URL ? 'Found' : 'Missing')"

# Start application
npm run dev
```

## 🚨 Troubleshooting Specific Windows Errors

### Error: ECONNREFUSED WebSocket
**Symptom:** `_url: 'wss://localhost/v2'`
**Solution:** Use Solution 2 (postgres-js driver)

### Error: SSL connection failed
**Symptom:** SSL handshake errors with Neon
**Solution:** Add `?sslmode=require` to DATABASE_URL

### Error: Environment variables not loaded
**Symptom:** `DATABASE_URL must be set`
**Solution:** 
1. Check `.env` file exists in root folder
2. Use `cross-env` in package.json scripts
3. Restart command prompt

### Error: Module not found
**Symptom:** Cannot find postgres/ws modules
**Solution:**
```cmd
rm -rf node_modules package-lock.json
npm install
npm install postgres cross-env
```

## ✅ Verification Checklist

Setelah apply fix:
- [ ] Server start tanpa WebSocket errors
- [ ] API endpoint `http://localhost:5000/api/news` return data
- [ ] No console errors di browser
- [ ] Database connection logs show success
- [ ] Frontend dapat load articles

## 🔄 Fallback Options

Jika semua solution di atas masih gagal:

### Option 1: Use Local PostgreSQL
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/techdaily
```

### Option 2: Use Different Cloud Database
- Supabase: `postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres`
- Railway: `postgresql://postgres:[password]@[host]:5432/railway`

### Option 3: Use SQLite (Development Only)
Contact untuk instructions mengubah ke SQLite untuk development di Windows.

Dengan fixes ini, aplikasi akan berjalan stabil di Windows tanpa WebSocket errors.