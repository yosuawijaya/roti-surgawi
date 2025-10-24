# 🚀 Setup GitHub Actions untuk Roti Surgawi

## 📋 Langkah-langkah Setup

### 1. **Buat Repository di GitHub**
```bash
# Login ke GitHub dan buat repository baru
# Nama: roti-surgawi
# Description: Website rohani untuk mewartakan mukjizat Ekaristi
# Public repository (untuk GitHub Pages)
```

### 2. **Push Code ke GitHub**
```bash
# Initialize Git
git init

# Add files
git add .
git commit -m "Initial commit: Roti Surgawi website"

# Connect to GitHub
git remote add origin https://github.com/USERNAME/roti-surgawi.git
git branch -M main
git push -u origin main
```

### 3. **Setup GitHub Pages**
1. Buka repository di GitHub
2. Klik **Settings** tab
3. Scroll ke **Pages** section
4. **Source**: Pilih **"GitHub Actions"**
5. **Save**

### 4. **Setup Environment Secrets**
1. Buka **Settings** → **Secrets and variables** → **Actions**
2. Klik **"New repository secret"**
3. Tambahkan secrets berikut:

#### **REACT_APP_SUPABASE_URL**
```
Name: REACT_APP_SUPABASE_URL
Value: https://your-project.supabase.co
```

#### **REACT_APP_SUPABASE_ANON_KEY**
```
Name: REACT_APP_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 5. **Workflow Files yang Sudah Dibuat**

#### **`.github/workflows/deploy.yml`** - Deploy ke GitHub Pages
- ✅ Trigger: Push ke main branch
- ✅ Build React app dengan environment variables
- ✅ Deploy ke GitHub Pages
- ✅ Permissions untuk GitHub Pages

#### **`.github/workflows/gh-pages.yml`** - Alternative Deploy
- ✅ Menggunakan peaceiris/actions-gh-pages
- ✅ Lebih sederhana dan reliable
- ✅ Support custom domain

#### **`.github/workflows/test.yml`** - Testing & Linting
- ✅ ESLint checking
- ✅ Build testing
- ✅ Build size monitoring

## 🎯 Cara Kerja GitHub Actions

### **Workflow 1: Deploy (deploy.yml)**
```yaml
Trigger: Push ke main branch
↓
Checkout code
↓
Setup Node.js 18
↓
Install dependencies (npm ci)
↓
Build React app (dengan Supabase env vars)
↓
Deploy ke GitHub Pages
↓
Website live! 🎉
```

### **Workflow 2: Alternative Deploy (gh-pages.yml)**
```yaml
Trigger: Push ke main branch
↓
Checkout code
↓
Setup Node.js 18
↓
Install dependencies
↓
Build React app
↓
Deploy menggunakan peaceiris/actions-gh-pages
↓
Website live! 🎉
```

### **Workflow 3: Test (test.yml)**
```yaml
Trigger: Push ke main/develop atau PR
↓
Checkout code
↓
Setup Node.js 18
↓
Install dependencies
↓
Run ESLint
↓
Test build
↓
Check build size
↓
Report results ✅
```

## 🔧 Troubleshooting

### **Build Fails**
1. **Check Environment Variables**
   - Pastikan secrets sudah ditambahkan
   - Format URL dan key benar

2. **Check Supabase Setup**
   - Project sudah dibuat
   - Database sudah di-setup
   - Storage bucket sudah dibuat

3. **Check GitHub Actions Logs**
   - Buka **Actions** tab di GitHub
   - Klik workflow yang gagal
   - Lihat error message

### **Deploy Fails**
1. **Check GitHub Pages Settings**
   - Source harus "GitHub Actions"
   - Repository harus public

2. **Check Permissions**
   - Repository settings → Actions → General
   - Allow GitHub Actions

3. **Check Workflow File**
   - Syntax YAML benar
   - Indentation konsisten

### **Website Not Loading**
1. **Check Deployment Status**
   - Actions tab → Deploy workflow
   - Pastikan berhasil

2. **Check GitHub Pages**
   - Settings → Pages
   - Lihat deployment status

3. **Check URL**
   - Format: `https://USERNAME.github.io/roti-surgawi`
   - Case sensitive

## 📊 Monitoring

### **GitHub Actions Dashboard**
- **Actions** tab → Monitor semua workflows
- **Green checkmark** = Success
- **Red X** = Failed
- **Yellow circle** = Running

### **GitHub Pages Status**
- **Settings** → **Pages** → Lihat deployment status
- **Environment** → **github-pages** → Lihat logs

### **Build Artifacts**
- Download build files dari Actions
- Debug build issues
- Check file sizes

## 🚀 Advanced Features

### **Custom Domain**
```yaml
# Di gh-pages.yml, tambahkan:
cname: your-domain.com
```

### **Multiple Environments**
```yaml
# Staging environment
if: github.ref == 'refs/heads/develop'
# Production environment  
if: github.ref == 'refs/heads/main'
```

### **Scheduled Deployments**
```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
```

## 🎉 Success!

Setelah setup selesai:

✅ **Website Live**: `https://USERNAME.github.io/roti-surgawi`
✅ **Auto Deploy**: Setiap push ke main branch
✅ **Admin Panel**: `https://USERNAME.github.io/roti-surgawi/admin/login`
✅ **Monitoring**: GitHub Actions dashboard
✅ **Secure**: Environment variables tersembunyi

## 📞 Support

Jika ada masalah:
1. Check GitHub Actions logs
2. Verify environment variables
3. Test build locally
4. Check Supabase setup

**Roti Surgawi** siap deploy! 🕊️✨
