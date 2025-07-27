# Windows Compatibility Fixes

## Required Changes untuk Menjalankan di Windows

### 1. Update package.json
Ubah script `dev` di file `package.json`:

**Sebelum:**
```json
"dev": "NODE_ENV=development tsx server/index.ts",
```

**Sesudah:**
```json
"dev": "cross-env NODE_ENV=development tsx watch server/index.ts",
```

### 2. Install cross-env dependency
```cmd
npm install cross-env
```

### 3. Update .env file
Pastikan file `.env` Anda memiliki:
```
DATABASE_URL=postgresql://username:password@localhost:5432/techdaily
API_KEY=your_secret_api_key_here
PORT=5000
```

### 4. Struktur File .env untuk Windows
```
# Database Configuration - REQUIRED
DATABASE_URL=postgresql://username:password@localhost:5432/techdaily

# API Authentication - REQUIRED  
API_KEY=Th1sIsP4ssw0rd

# Port Configuration - REQUIRED untuk Windows
PORT=5000

# Optional: Environment
NODE_ENV=development
```

## Fixes yang Sudah Diterapkan

### ✅ Server Listen Fix
Server sekarang menggunakan format yang kompatibel dengan Windows:
```typescript
server.listen(port, "0.0.0.0", () => {
  log(`serving on port ${port}`);
});
```

### ✅ Environment Variables
Port sekarang dibaca dari environment variable dengan fallback:
```typescript
const port = parseInt(process.env.PORT || '5000', 10);
```

### ✅ Cross-Platform Scripts
- `cross-env` dependency sudah diinstall
- Script development menggunakan `tsx watch` untuk hot reload

## Step-by-Step Setup di Windows

### 1. Prerequisites
```cmd
# Install Node.js 20+ dari nodejs.org
node --version
npm --version
```

### 2. Clone dan Setup
```cmd
# Clone project
git clone <repository-url>
cd techdaily

# Install dependencies
npm install

# Install cross-env untuk Windows compatibility
npm install cross-env
```

### 3. Update package.json Script
Buka `package.json` dan ubah:
```json
"scripts": {
  "dev": "cross-env NODE_ENV=development tsx watch server/index.ts",
  "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
  "start": "cross-env NODE_ENV=production node dist/index.js"
}
```

### 4. Setup Environment
```cmd
# Copy template
copy .env.example .env

# Edit .env dengan text editor
notepad .env
```

Isi file `.env`:
```
DATABASE_URL=postgresql://username:password@localhost:5432/techdaily
API_KEY=Th1sIsP4ssw0rd
PORT=5000
NODE_ENV=development
```

### 5. Setup Database
```cmd
# Jika menggunakan PostgreSQL lokal
createdb techdaily

# Push schema
npm run db:push
```

### 6. Start Application
```cmd
npm run dev
```

## Troubleshooting Windows Errors

### Error: WebSocket URL Invalid
**Penyebab:** Port undefined dalam WebSocket connection
**Solusi:** Pastikan `PORT=5000` ada di file `.env`

### Error: NODE_ENV not recognized
**Penyebab:** Windows tidak mengenal format Unix environment variable
**Solusi:** Gunakan `cross-env` dalam package.json script

### Error: tsx watch not working
**Penyebab:** Windows file watching issues
**Solusi:** 
1. Pastikan menggunakan `tsx watch` bukan `tsx`
2. Install ulang dependencies jika perlu

### Error: Database connection failed
**Solusi:**
1. Install PostgreSQL di Windows
2. Buat database: `createdb techdaily`
3. Update connection string di `.env`
4. Atau gunakan cloud database (Neon, Supabase)

### Error: Port already in use
**Solusi:**
```cmd
# Check port usage
netstat -ano | findstr :5000

# Kill process using port (replace PID)
taskkill /PID <process_id> /F

# Atau ubah port di .env
PORT=3000
```

## Verifikasi Setup

Setelah `npm run dev`, pastikan:
1. ✅ Server berjalan di port 5000
2. ✅ Frontend dapat diakses di http://localhost:5000
3. ✅ API endpoint bekerja: http://localhost:5000/api/news
4. ✅ WebSocket connection berhasil (no error di browser console)
5. ✅ Hot reload bekerja ketika edit file

## Production Build untuk Windows

```cmd
# Build aplikasi
npm run build

# Test production
npm start
```

Dengan fixes ini, aplikasi akan berjalan di Windows, Linux, dan Mac hanya dengan setting file `.env` yang sesuai.