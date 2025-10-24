# 🕊️ Roti Surgawi

Website rohani untuk mewartakan mukjizat Ekaristi dan kisah para santo/santa.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green.svg)](https://supabase.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-purple.svg)](https://www.framer.com/motion/)

## ✨ Fitur

- 🏠 **Halaman Beranda** - Kutipan rohani dengan efek glassmorphism
- ⚡ **Mukjizat Ekaristi** - Daftar mukjizat dari berbagai negara
- 👼 **Profil Santo/Santa** - Timeline hidup dan kutipan inspiratif
- 📖 **Tentang** - Misi dan inspirasi dari Carlo Acutis
- 🔐 **Admin Dashboard** - Panel admin untuk mengelola konten
- 📱 **Responsive Design** - Optimal di semua perangkat

## 🚀 Teknologi

- **Frontend**: React.js + TypeScript
- **Styling**: Tailwind CSS + Glassmorphism
- **Animasi**: Framer Motion
- **Routing**: React Router DOM
- **Backend**: Supabase (Auth, Database, Storage)
- **Deployment**: GitHub Pages / Vercel / Netlify

## 📦 Setup Development

### 1. Clone Repository
```bash
git clone https://github.com/username/roti-surgawi.git
cd roti-surgawi
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp env.example .env
```

Edit `.env` dengan credentials Supabase:
```env
REACT_APP_SUPABASE_URL=your-supabase-project-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run Development Server
```bash
npm start
```

Buka [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

### 1. Buat Project di Supabase
- Daftar di [supabase.com](https://supabase.com)
- Buat project baru
- Dapatkan URL dan anon key

### 2. Jalankan SQL Script
```sql
-- Jalankan script di supabase-setup.sql
-- Script akan membuat tabel: miracles, saints, quotes
-- Setup RLS policies dan triggers
```

### 3. Setup Storage
- Buat bucket bernama `images`
- Set policy untuk public read access
- Restrict MIME types: image/jpeg, image/png, image/webp

## 🎨 Struktur Halaman

| Halaman | URL | Deskripsi |
|----------|-----|-----------|
| 🏠 Beranda | `/` | Kutipan rohani dengan glassmorphism |
| ⚡ Mukjizat | `/mukjizat` | Grid mukjizat Ekaristi |
| 👼 Santo/Santa | `/santo` | Profil santo/santa dengan timeline |
| 📖 Tentang | `/tentang` | Misi dan inspirasi |
| 🔐 Admin Login | `/admin/login` | Login admin |
| 📊 Admin Dashboard | `/admin/dashboard` | Panel admin |

## 🔐 Admin Features

### CRUD Operations
- ✅ **Mukjizat**: Judul, lokasi, tahun, kisah, makna spiritual, kutipan, gambar
- ✅ **Santo/Santa**: Nama, hari raya, deskripsi, kutipan, timeline, gambar  
- ✅ **Kutipan**: Teks, penulis, kategori

### Keamanan
- 🔒 **Konfirmasi Hapus**: Modal konfirmasi untuk mencegah hapus tidak sengaja
- 🔔 **Toast Notifications**: Feedback real-time untuk semua operasi
- 🛡️ **RLS Policies**: Row Level Security di Supabase
- 🔐 **Authentication**: Supabase Auth untuk admin

## 📊 Database Schema

### Miracles Table
```sql
CREATE TABLE miracles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  year INTEGER NOT NULL,
  description TEXT NOT NULL,
  spiritual_meaning TEXT,
  quote TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Saints Table
```sql
CREATE TABLE saints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  feast_day TEXT NOT NULL,
  description TEXT NOT NULL,
  quotes TEXT[] DEFAULT '{}',
  timeline JSONB DEFAULT '[]',
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Quotes Table
```sql
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT DEFAULT 'ekaristi',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🎨 Design System

### Colors
- **Primary**: White (#FFFFFF)
- **Secondary**: Soft Gold (#F4E4BC)
- **Accent**: Sky Blue (#87CEEB)
- **Text**: Dark Gray (#374151)

### Typography
- **Quotes**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Headings**: Poppins (sans-serif)

### Components
- **Glassmorphism**: Kutipan rohani dengan backdrop blur
- **Cards**: Rounded corners dengan shadow
- **Animations**: Framer Motion untuk smooth transitions

## 🚀 Deployment

### GitHub Pages
```bash
npm run build
# Upload folder 'build' ke GitHub Pages
```

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Drag & drop folder 'build' ke Netlify
```

## 📱 Responsive Design

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

## 🔧 Scripts

```bash
npm start          # Development server
npm run build      # Production build
npm test           # Run tests
npm run eject      # Eject from Create React App
```

## 📄 License

MIT License - Lihat [LICENSE](LICENSE) untuk detail.

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buat issue di GitHub repository.

---

**Roti Surgawi** - Mewartakan keajaiban Ekaristi, menyentuh hati umat. 🕊️✨