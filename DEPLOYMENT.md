# 🚀 Deployment Guide - Kalpavruksha Hair Oil

## ⚠️ Important: GitHub Pages Not Supported

**GitHub Pages CANNOT host Next.js applications** because:
- Next.js requires a Node.js server
- GitHub Pages only serves static HTML/CSS/JS files
- Your site will appear blank/white on GitHub Pages

## ✅ Recommended: Deploy to Vercel (FREE)

Vercel is the official platform for Next.js (made by the same team) and offers:
- ✅ **FREE hosting** for personal projects
- ✅ Automatic deployments from GitHub
- ✅ Built-in CI/CD
- ✅ Free SSL certificate
- ✅ Custom domain support
- ✅ Global CDN
- ✅ Serverless functions support
- ✅ Environment variables management

### Step-by-Step Vercel Deployment:

#### 1. Sign Up for Vercel
- Go to [vercel.com](https://vercel.com)
- Click "Sign Up"
- Choose "Continue with GitHub"
- Authorize Vercel to access your GitHub account

#### 2. Import Your Repository
- Click "Add New..." → "Project"
- Select your GitHub repository: `studevkiran/kalpavruksha-hair-oil`
- Click "Import"

#### 3. Configure Project
Vercel will auto-detect Next.js settings:
- **Framework Preset**: Next.js
- **Root Directory**: `./` (leave as is)
- **Build Command**: `prisma generate && next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

#### 4. Add Environment Variables
Click "Environment Variables" and add these:

```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
DATABASE_URL=file:./dev.db
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

**For Production:**
- Use **live** Razorpay keys (not test keys)
- Use **PostgreSQL** database (see Database Setup below)

#### 5. Deploy!
- Click "Deploy"
- Wait 2-3 minutes for build to complete
- Your site will be live at: `https://your-project.vercel.app`

#### 6. Add Custom Domain (Optional)
- Go to Project Settings → Domains
- Add your custom domain (e.g., `kalpavruks ha.com`)
- Update DNS records as instructed
- Free SSL certificate is automatically provisioned

---

## 🗄️ Production Database Setup

SQLite won't work in production on Vercel. Use PostgreSQL instead:

### Option 1: Neon (Recommended - FREE)
1. Go to [neon.tech](https://neon.tech)
2. Sign up and create a new project
3. Copy the connection string
4. Add to Vercel environment variables:
   ```
   DATABASE_URL=postgresql://user:password@host/database
   ```

### Option 2: Supabase (FREE)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Project Settings → Database
4. Copy connection string (use "Connection Pooling" URL)
5. Add to Vercel

### Option 3: Railway (FREE tier available)
1. Go to [railway.app](https://railway.app)
2. Create Postgres database
3. Copy connection URL
4. Add to Vercel

### Update Database Schema
After setting up Postgres, update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Changed from "sqlite"
  url      = env("DATABASE_URL")
}
```

Then in Vercel deployment settings, add build command:
```bash
prisma generate && prisma migrate deploy && next build
```

---

## 🔄 Automatic Deployments

Once connected to Vercel:
- Every push to `main` branch = automatic deployment
- Pull requests get preview deployments
- Instant rollbacks if needed

---

## 🌐 Your Live URLs

After deployment, you'll get:
- **Vercel URL**: `https://kalpavruksha-hair-oil.vercel.app`
- **Custom Domain**: `https://yourdomain.com` (if added)

---

## ❌ Don't Use GitHub Pages

GitHub Pages URL (`https://studevkiran.github.io/kalpavruksha-hair-oil/`) will NOT work because:
- It can't run Node.js/React
- No server-side rendering
- No API routes support
- Will show blank/white page

**Disable GitHub Pages:**
1. Go to repository Settings
2. Scroll to "Pages"
3. Set Source to "None"

---

## 🆘 Troubleshooting

### Build Fails on Vercel
- Check environment variables are set correctly
- Ensure all dependencies are in `package.json`
- Check build logs for specific errors

### Database Connection Fails
- Verify DATABASE_URL is correct
- Ensure database allows external connections
- Check if migrations ran successfully

### Razorpay Not Working
- Verify NEXT_PUBLIC_RAZORPAY_KEY_ID matches your account
- Check if using correct test/live keys
- Ensure keys are in environment variables (not .env.local)

---

## 📞 Support

If you need help with deployment:
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Deployment: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)

---

**Ready to deploy? Go to [vercel.com/new](https://vercel.com/new) and import your repository!** 🚀
