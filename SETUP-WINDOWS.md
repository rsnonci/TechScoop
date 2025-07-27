# Setup TechDaily di Windows

## Prerequisites

### 1. Install Node.js
- Download Node.js versi 20+ dari [nodejs.org](https://nodejs.org/)
- Pilih versi LTS (Long Term Support)
- Install dengan default settings
- Restart Command Prompt/PowerShell setelah instalasi
- Verifikasi instalasi:
```cmd
node --version
npm --version
```

### 2. Install PostgreSQL (Optional - jika ingin database lokal)
- Download PostgreSQL dari [postgresql.org](https://www.postgresql.org/download/windows/)
- Install dengan default settings
- Catat username dan password yang Anda buat
- Default port: 5432

**Alternatif Database Cloud (Recommended):**
- [Neon](https://neon.tech/) - PostgreSQL serverless
- [Supabase](https://supabase.com/) - PostgreSQL dengan fitur tambahan
- [Railway](https://railway.app/) - Database cloud dengan deployment

## Setup Project

### 1. Download Project
```cmd
# Jika menggunakan Git
git clone <repository-url>
cd techdaily

# Atau download ZIP dan extract
```

### 2. Install Dependencies
```cmd
npm install
```

### 3. Update package.json untuk Windows
Buka `package.json` dan ubah script `dev`:
```json
"dev": "cross-env NODE_ENV=development tsx watch server/index.ts"
```

### 4. Setup Environment Variables
```cmd
# Copy file environment
copy .env.example .env
```

Edit file `.env` dengan text editor (Notepad, VS Code, dll):
```
# Database Connection
DATABASE_URL=postgresql://username:password@localhost:5432/techdaily

# API Authentication
API_KEY=your_secret_api_key_here

# Port Configuration (REQUIRED untuk Windows)
PORT=5000

# Environment
NODE_ENV=development

# Jika menggunakan database cloud, ganti dengan connection string dari provider
# Contoh Neon: DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/techdaily?sslmode=require
```

### 5. Setup Database
```cmd
# Buat schema database
npm run db:push
```

Jika ada error, pastikan:
- PostgreSQL service berjalan
- Database connection string benar
- Database `techdaily` sudah dibuat (atau buat manual)

### 6. Start Application
```cmd
npm run dev
```

## Troubleshooting Windows

### Error: 'npm' is not recognized
**Solusi:**
1. Restart Command Prompt/PowerShell
2. Install ulang Node.js
3. Tambahkan Node.js ke PATH environment variable

### Error: PowerShell execution policy
**Solusi:**
```powershell
# Jalankan PowerShell sebagai Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Error: Database connection failed
**Solusi:**
1. Pastikan PostgreSQL service berjalan:
   - Windows Key + R → `services.msc`
   - Cari "postgresql" dan pastikan status "Running"
2. Cek connection string di `.env`
3. Coba create database manual:
```sql
CREATE DATABASE techdaily;
```

### Error: Port 5000 already in use
**Solusi:**
1. Tutup aplikasi yang menggunakan port 5000
2. Atau ubah port di `server/index.ts`:
```typescript
const PORT = process.env.PORT || 3000;
```

### Error: Module not found
**Solusi:**
```cmd
# Hapus node_modules dan reinstall
rmdir /s node_modules
del package-lock.json
npm install
```

## Tools yang Direkomendasikan

### Text Editor
- [Visual Studio Code](https://code.visualstudio.com/) - Free, powerful
- [Sublime Text](https://www.sublimetext.com/) - Fast, lightweight
- Notepad++ - Simple, free

### Database Management
- [pgAdmin](https://www.pgadmin.org/) - PostgreSQL admin tool
- [DBeaver](https://dbeaver.io/) - Universal database tool
- [TablePlus](https://tableplus.com/) - Modern database client

### API Testing
- [Postman](https://www.postman.com/) - Popular API testing tool
- [Insomnia](https://insomnia.rest/) - Lightweight alternative
- cURL (built-in di Windows 10+)

## Running Commands

```cmd
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database commands
npm run db:push     # Push schema changes
npm run db:generate # Generate types
```

## File Structure Penting

```
techdaily/
├── .env                    # Environment variables (jangan commit!)
├── .env.example           # Template environment
├── package.json           # Dependencies
├── server/               # Backend Express.js
│   ├── index.ts         # Server entry point
│   └── routes.ts        # API endpoints
├── client/              # Frontend React
│   └── src/
├── shared/              # Shared types
│   └── schema.ts        # Database schema
└── README.md            # Documentation
```

## Akses Aplikasi

Setelah `npm run dev` berhasil:
- **Frontend**: http://localhost:5000
- **API**: http://localhost:5000/api/news
- **Admin**: http://localhost:5000/admin

## Next Steps

1. Buka browser ke http://localhost:5000
2. Lihat artikel yang sudah ada
3. Test API dengan Postman atau cURL
4. Baca `api-example.md` untuk cara posting artikel baru
5. Customize sesuai kebutuhan Anda

Jika masih ada masalah, cek logs di Command Prompt dan pastikan semua prerequisites terinstall dengan benar.