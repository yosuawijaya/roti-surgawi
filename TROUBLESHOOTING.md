# 🔧 Troubleshooting Deployment Issues

## 🚨 Common Issues & Solutions

### **1. Build Fails After 40s**

#### **Possible Causes:**
- ❌ Environment variables not set
- ❌ Supabase credentials invalid
- ❌ Dependencies installation fails
- ❌ Build timeout

#### **Solutions:**

##### **A. Check Environment Variables**
```bash
# Di GitHub repository:
# Settings → Secrets and variables → Actions
# Pastikan ada:
# - REACT_APP_SUPABASE_URL
# - REACT_APP_SUPABASE_ANON_KEY
```

##### **B. Test Build Locally**
```bash
# Test build dengan environment variables
export REACT_APP_SUPABASE_URL="your-supabase-url"
export REACT_APP_SUPABASE_ANON_KEY="your-supabase-key"
npm run build
```

##### **C. Check Supabase Setup**
1. **Project URL**: `https://your-project.supabase.co`
2. **Anon Key**: Dari Supabase dashboard
3. **Database**: Jalankan `supabase-setup.sql`
4. **Storage**: Buat bucket `images`

### **2. GitHub Actions Workflow Issues**

#### **A. Permissions Error**
```yaml
# Tambahkan di workflow:
permissions:
  contents: read
  pages: write
  id-token: write
```

#### **B. Token Issues**
```yaml
# Gunakan GITHUB_TOKEN (otomatis):
github_token: ${{ secrets.GITHUB_TOKEN }}
```

#### **C. Build Directory Issues**
```yaml
# Pastikan build directory benar:
publish_dir: ./build
```

### **3. Environment Variables Not Working**

#### **A. Check Secret Names**
- ✅ `REACT_APP_SUPABASE_URL`
- ✅ `REACT_APP_SUPABASE_ANON_KEY`
- ❌ `SUPABASE_URL` (salah)
- ❌ `REACT_APP_SUPABASE_KEY` (salah)

#### **B. Check Secret Values**
```bash
# Format URL:
https://your-project.supabase.co

# Format Key:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **4. Build Timeout Issues**

#### **A. Increase Timeout**
```yaml
# Di workflow, tambahkan:
timeout-minutes: 10
```

#### **B. Optimize Build**
```bash
# Test build speed:
npm run build
# Monitor waktu build
```

### **5. GitHub Pages Not Updating**

#### **A. Check Pages Settings**
1. **Settings** → **Pages**
2. **Source**: "GitHub Actions"
3. **Custom domain**: Optional

#### **B. Check Deployment Status**
1. **Actions** tab
2. Lihat workflow status
3. Check logs untuk error

## 🔍 Debug Steps

### **Step 1: Run Debug Workflow**
1. Buka **Actions** tab
2. Klik **"Debug Build Issues"**
3. Klik **"Run workflow"**
4. Pilih debug level
5. Monitor logs

### **Step 2: Check Local Build**
```bash
# Test build lokal:
npm run build

# Test dengan environment variables:
export REACT_APP_SUPABASE_URL="test"
export REACT_APP_SUPABASE_ANON_KEY="test"
npm run build
```

### **Step 3: Verify Secrets**
1. **Repository Settings** → **Secrets and variables** → **Actions**
2. Pastikan secrets ada dan benar
3. Test dengan dummy values

### **Step 4: Check Supabase**
1. **Supabase Dashboard** → **Settings** → **API**
2. Copy URL dan anon key
3. Test connection

## 🚀 Quick Fixes

### **Fix 1: Use Simple Deploy**
```yaml
# Gunakan workflow yang lebih sederhana:
# .github/workflows/simple-deploy.yml
```

### **Fix 2: Manual Deploy**
```bash
# Build lokal:
npm run build

# Upload build folder ke GitHub Pages manual
```

### **Fix 3: Check Dependencies**
```bash
# Update dependencies:
npm update

# Check for vulnerabilities:
npm audit
```

## 📊 Monitoring

### **GitHub Actions Logs**
1. **Actions** tab → **Workflow runs**
2. Klik workflow yang gagal
3. Lihat step-by-step logs
4. Check error messages

### **Build Analysis**
```bash
# Check build size:
du -sh build/

# Check build contents:
ls -la build/
```

### **Performance Monitoring**
- Build time: < 2 minutes
- Build size: < 200KB
- Dependencies: < 50 packages

## 🎯 Success Checklist

- ✅ **Environment Variables**: Set di GitHub Secrets
- ✅ **Supabase Setup**: Project, database, storage
- ✅ **Build Success**: Local build works
- ✅ **Workflow Success**: GitHub Actions green
- ✅ **Pages Live**: Website accessible
- ✅ **Admin Works**: Login dan dashboard

## 📞 Support

### **If Still Failing:**
1. **Check GitHub Actions logs** untuk error details
2. **Test build locally** dengan environment variables
3. **Verify Supabase setup** dan credentials
4. **Try simple deploy workflow** sebagai backup

### **Emergency Deploy:**
```bash
# Manual deploy:
npm run build
# Upload build/ folder ke GitHub Pages
```

**Roti Surgawi** akan berhasil deploy! 🕊️✨
