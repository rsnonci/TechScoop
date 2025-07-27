# Windows Database Debug Guide

## Problem yang Anda Alami
```
Error: DATABASE_URL must be set. Did you forget to provision a database?
```

Dan setelah diperbaiki:
```
{
  "message": "Failed to fetch news articles", 
  "error": "Unknown error"
}
```

## ✅ Fixes yang Sudah Diterapkan

### 1. Enhanced Database Connection Detection
- Server sekarang mencoba multiple environment variable names
- Logging yang lebih baik untuk debugging
- Support untuk Neon, local PostgreSQL, dan cloud databases

### 2. Improved Error Handling
- Detail error messages untuk debugging
- Connection string validation
- SSL configuration berdasarkan database type

## 🔧 Debugging Steps untuk Windows

### Step 1: Test Database Connection
Jalankan script test ini di folder project Anda:

```cmd
# Buat file test-env.js
echo const config = require('dotenv').config(); > test-env.js
echo console.log('DATABASE_URL:', process.env.DATABASE_URL); >> test-env.js
echo console.log('API_KEY:', process.env.API_KEY); >> test-env.js
echo console.log('PORT:', process.env.PORT); >> test-env.js

# Jalankan test
node test-env.js
```

### Step 2: Verifikasi File .env
Pastikan file `.env` ada dan berisi:

```
# Pilih salah satu database configuration:

# Option 1: Neon Database (Recommended)
DATABASE_URL=postgresql://username:password@ep-xxx.neon.tech/techdaily?sslmode=require

# Option 2: Local PostgreSQL
# DATABASE_URL=postgresql://username:password@localhost:5432/techdaily

# Required settings
API_KEY=Th1sIsP4ssw0rd
PORT=5000
NODE_ENV=development
```

### Step 3: Test Database dengan Node Script
```cmd
node test-db-connection.js
```

Ini akan test koneksi database dan memberikan detail error jika ada masalah.

### Step 4: Check Environment Loading
Di Windows, environment variables tidak selalu terload dengan benar. Pastikan:

1. **File .env berada di root folder** (sama level dengan package.json)
2. **Tidak ada spasi extra** di environment variables
3. **Tidak ada comment** di dalam nilai environment variable

**Contoh BENAR:**
```
DATABASE_URL=postgresql://user:pass@host/db
```

**Contoh SALAH:**
```
DATABASE_URL=postgresql://user:pass@host/db # comment
DATABASE_URL = postgresql://user:pass@host/db
```

## 🚨 Common Windows Issues & Solutions

### Issue 1: Environment Variables Not Loading
**Symptom:** `DATABASE_URL must be set` error

**Solutions:**
```cmd
# 1. Check if .env file exists
dir .env

# 2. Check file content
type .env

# 3. Restart command prompt dan coba lagi
# 4. Pastikan tidak ada hidden characters
```

### Issue 2: Database Connection String Format
**Symptom:** Connection errors dengan URL yang benar

**Solutions:**
```bash
# Neon Database Format (BENAR):
DATABASE_URL=postgresql://username:password@ep-xxx.neon.tech/database?sslmode=require

# Local Database Format (BENAR):
DATABASE_URL=postgresql://username:password@localhost:5432/techdaily

# Railway/Heroku Format (BENAR):
DATABASE_URL=postgresql://username:password@host:5432/database
```

### Issue 3: SSL Connection Issues
**Symptom:** SSL/TLS connection errors

**Solutions:**
- Untuk Neon: pastikan ada `?sslmode=require`
- Untuk local PostgreSQL: hilangkan SSL parameters
- Server sekarang otomatis detect dan configure SSL

### Issue 4: Port Issues di Windows
**Symptom:** WebSocket connection errors

**Solutions:**
```
# Tambahkan di .env:
PORT=5000

# Atau coba port lain:
PORT=3000
```

## 💡 Manual Debugging Commands

### Check Environment Variables
```cmd
# Windows Command Prompt
echo %DATABASE_URL%
echo %API_KEY%

# Windows PowerShell
$env:DATABASE_URL
$env:API_KEY
```

### Test Database Connection Manually
```cmd
# Install dotenv untuk testing
npm install dotenv

# Test connection dengan psql (jika installed)
psql %DATABASE_URL%
```

### Check if Table Exists
```sql
-- Connect ke database dan jalankan:
\dt
-- atau
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

## 📋 Complete .env Template untuk Windows

```env
# Database Configuration (PILIH SALAH SATU)
DATABASE_URL=postgresql://username:password@ep-xxx.neon.tech/database?sslmode=require

# API Configuration (REQUIRED)
API_KEY=Th1sIsP4ssw0rd

# Server Configuration (REQUIRED untuk Windows)
PORT=5000
NODE_ENV=development

# Optional: Alternative database names (backup)
NEON_DATABASE_URL=postgresql://username:password@ep-xxx.neon.tech/database?sslmode=require
DB_URL=postgresql://username:password@ep-xxx.neon.tech/database?sslmode=require
```

## ✅ Verification Checklist

Setelah setup, pastikan:

- [ ] File `.env` ada di root folder
- [ ] `node test-db-connection.js` berhasil
- [ ] `npm run dev` start tanpa error
- [ ] Browser bisa akses http://localhost:5000
- [ ] API endpoint http://localhost:5000/api/news return data
- [ ] No console errors di browser developer tools

Jika masih ada masalah, check server logs saat `npm run dev` untuk detail error message.