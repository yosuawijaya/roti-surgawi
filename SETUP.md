# Setup Cepat - Roti Surgawi

## 🚀 Langkah 1: Copy File Environment

**Windows (PowerShell):**
```powershell
Copy-Item env.example .env
```

**Mac/Linux:**
```bash
cp env.example .env
```

## 🔑 Langkah 2: Dapatkan Supabase Credentials

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Login dengan akun Anda
3. Buat project baru (jika belum ada)
4. Pilih project Anda
5. Pergi ke **Settings** → **API**
6. Copy **Project URL** dan **anon public** key

## 📝 Langkah 3: Edit File .env

Buka file `.env` yang baru saja dibuat, lalu ganti nilai-nilai berikut:

```env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Contoh format (ganti dengan data Anda sendiri):**
```env
REACT_APP_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY5OTk5OTk5OSwiZXhwIjoyMDE1NTc1OTk5fQ.abcdefghijklmnopqrstuvwxyz1234567890
```

## 🗄️ Langkah 4: Setup Database

1. Buka Supabase Dashboard
2. Pergi ke **SQL Editor**
3. Copy semua isi dari file `supabase-setup.sql`
4. Paste dan klik **Run** (Ctrl+Enter)

## 📦 Langkah 5: Setup Storage Bucket

1. Pergi ke **Storage** di Supabase Dashboard
2. Klik **Create bucket**
3. Isi nama: `images`
4. Centang **Public bucket**
5. **Restrict MIME types**: Aktifkan
6. MIME types allowed: `image/jpeg,image/jpg,image/png,image/gif,image/webp`
7. Klik **Create bucket**

## 👤 Langkah 6: Buat Admin User

1. Pergi ke **Authentication** → **Users**
2. Klik **Add user** → **Create new user**
3. Masukkan email admin (contoh: admin@rotisurgawi.com)
4. Masukkan password yang kuat
5. Klik **Create user**

## 🏃 Langkah 7: Install & Run

```bash
# Install dependencies
npm install

# Run development server
npm start
```

Website akan terbuka di `http://localhost:3000`

## 🎉 Testing

1. Buka `http://localhost:3000/beranda` - Cek halaman beranda
2. Buka `http://localhost:3000/admin/login` - Login dengan akun admin
3. Setelah login, Anda akan diarahkan ke dashboard untuk mengelola konten

## ❓ Troubleshooting

### Error: "Invalid API key"
- Pastikan Anda sudah copy anon key yang benar (bukan service_role key)
- Pastikan format URL sudah benar (tanpa spasi di akhir)

### Error: "Bucket not found"
- Pastikan bucket `images` sudah dibuat di Storage
- Pastikan bucket bersifat public

### Error saat upload gambar
- Pastikan policy di bucket sudah dibuat (cek Storage → Policies)
- Pastikan user sudah login sebagai admin

### Database tidak tampil
- Pastikan RLS policies sudah dibuat (cek Database → Roles & Policies)
- Pastikan query di SQL Editor berhasil dijalankan

---

**Selamat mencoba! 🎉**

