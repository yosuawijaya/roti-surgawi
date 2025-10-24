# 🚀 Panduan Deploy Roti Surgawi ke GitHub

## 📋 Prerequisites

### 1. Install Git
- **Windows**: Download dari [git-scm.com](https://git-scm.com/download/win)
- **Mac**: `brew install git` atau download dari website
- **Linux**: `sudo apt install git` (Ubuntu/Debian)

### 2. Buat Akun GitHub
- Daftar di [github.com](https://github.com)
- Verifikasi email

## 🔧 Setup Git Repository

### 1. Initialize Git (Jika Belum Ada)
```bash
git init
```

### 2. Setup Git Config
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3. Add Files ke Git
```bash
git add .
git commit -m "Initial commit: Roti Surgawi website"
```

## 🌐 Deploy ke GitHub

### 1. Buat Repository di GitHub
1. Login ke GitHub
2. Klik **"New repository"**
3. Nama: `roti-surgawi`
4. Description: `Website rohani untuk mewartakan mukjizat Ekaristi`
5. Set **Public** (untuk GitHub Pages)
6. **JANGAN** centang "Add README" (karena sudah ada)
7. Klik **"Create repository"**

### 2. Connect Local ke GitHub
```bash
git remote add origin https://github.com/USERNAME/roti-surgawi.git
git branch -M main
git push -u origin main
```

### 3. Push Code ke GitHub
```bash
git add .
git commit -m "Add complete Roti Surgawi website"
git push origin main
```

## 📱 Setup GitHub Pages

### 1. Enable GitHub Pages
1. Buka repository di GitHub
2. Klik **"Settings"** tab
3. Scroll ke **"Pages"** section
4. Source: **"GitHub Actions"**
5. Save

### 2. Buat GitHub Actions Workflow
Buat file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      env:
        REACT_APP_SUPABASE_URL: ${{ secrets.REACT_APP_SUPABASE_URL }}
        REACT_APP_SUPABASE_ANON_KEY: ${{ secrets.REACT_APP_SUPABASE_ANON_KEY }}
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

### 3. Setup Environment Secrets
1. Buka repository **Settings**
2. Klik **"Secrets and variables"** → **"Actions"**
3. Klik **"New repository secret"**
4. Tambahkan:
   - `REACT_APP_SUPABASE_URL`: URL Supabase project
   - `REACT_APP_SUPABASE_ANON_KEY`: Supabase anon key

## 🔐 Setup Supabase

### 1. Buat Project Supabase
1. Daftar di [supabase.com](https://supabase.com)
2. Buat project baru
3. Pilih region terdekat
4. Set password untuk database

### 2. Setup Database
1. Buka **SQL Editor** di Supabase
2. Jalankan script dari `supabase-setup.sql`
3. Verifikasi tabel dibuat

### 3. Setup Storage
1. Buka **Storage** di Supabase
2. Buat bucket: `images`
3. Set policy untuk public read access
4. Restrict MIME types: `image/jpeg`, `image/png`, `image/webp`

### 4. Setup Authentication
1. Buka **Authentication** → **Settings**
2. Enable email authentication
3. Buat user admin untuk testing

## 🎯 Final Steps

### 1. Test Local Build
```bash
npm run build
npm install -g serve
serve -s build
```

### 2. Push Changes
```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

### 3. Monitor Deployment
1. Buka **Actions** tab di GitHub
2. Monitor workflow progress
3. Tunggu deployment selesai

### 4. Access Website
Website akan tersedia di:
`https://USERNAME.github.io/roti-surgawi`

## 🛠️ Troubleshooting

### Build Fails
- Check environment variables
- Verify Supabase credentials
- Check GitHub Actions logs

### Website Not Loading
- Check GitHub Pages settings
- Verify repository is public
- Check Actions workflow status

### Admin Login Issues
- Verify Supabase Auth setup
- Check user credentials
- Test locally first

## 📊 Monitoring

### GitHub Actions
- Monitor deployment status
- Check build logs
- Fix any errors

### Supabase Dashboard
- Monitor database usage
- Check authentication logs
- Monitor storage usage

## 🔄 Updates

### Update Website
```bash
# Make changes
git add .
git commit -m "Update website content"
git push origin main
# GitHub Actions will auto-deploy
```

### Update Dependencies
```bash
npm update
git add package.json package-lock.json
git commit -m "Update dependencies"
git push origin main
```

## 🎉 Success!

Website **Roti Surgawi** sudah live di GitHub Pages! 🕊️✨

**URL**: `https://USERNAME.github.io/roti-surgawi`
**Admin**: `https://USERNAME.github.io/roti-surgawi/admin/login`