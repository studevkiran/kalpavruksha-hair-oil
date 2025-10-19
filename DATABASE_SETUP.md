# Database Setup for Production

## ✅ Current Status

**Your checkout is now working!** 🎉

The database operations are now **optional**, so:
- ✅ Checkout works without errors
- ✅ Payments processed through Cashfree
- ✅ All orders tracked in Cashfree dashboard
- ✅ No "Unable to open database" error

## 📊 Why SQLite Doesn't Work on Vercel

SQLite requires a **file system** (dev.db file), but Vercel uses:
- Serverless functions (no persistent storage)
- Read-only filesystem per request
- Fresh environment on each invocation

**Result:** SQLite works locally but fails on Vercel.

---

## 🔧 Adding PostgreSQL (Optional)

If you want to store order history in your own database:

### Option 1: Vercel Postgres (Recommended)

**Free Tier:**
- 256 MB storage
- 60 hours compute time/month
- Perfect for getting started

**Setup Steps:**

1. **Go to Vercel Dashboard:**
   - Open your project: kalpavruksha-hair-oil
   - Click "Storage" tab
   - Click "Create Database"
   - Select "Postgres"

2. **Connect to Project:**
   - Vercel will auto-add these environment variables:
     ```
     POSTGRES_URL
     POSTGRES_PRISMA_URL
     POSTGRES_URL_NON_POOLING
     ```

3. **Update Schema:**
   ```bash
   # In your local project
   cd /Applications/projects/kalpavruksha-hair-oil
   
   # Update prisma/schema.prisma
   # Change from:
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   
   # To:
   datasource db {
     provider = "postgresql"
     url      = env("POSTGRES_PRISMA_URL")
   }
   ```

4. **Push Schema to Production:**
   ```bash
   # This will create tables in Vercel Postgres
   npx prisma db push
   ```

5. **Update Environment Variable:**
   - In Vercel Dashboard → Settings → Environment Variables
   - Remove: `DATABASE_URL=file:./dev.db`
   - It will use `POSTGRES_PRISMA_URL` automatically

6. **Redeploy:**
   - Vercel will auto-redeploy
   - Database operations will now work!

---

### Option 2: Supabase (Alternative)

**Free Tier:**
- 500 MB database
- Unlimited API requests
- Built-in auth (if needed later)

**Setup Steps:**

1. **Create Account:** https://supabase.com
2. **Create Project:** New Project → kalpavruksha-db
3. **Get Connection String:**
   - Settings → Database
   - Copy "Connection Pooling" URL
4. **Add to Vercel:**
   ```
   POSTGRES_PRISMA_URL=postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:6543/postgres?pgbouncer=true
   ```
5. **Update schema.prisma** (same as Option 1)
6. **Run:** `npx prisma db push`

---

### Option 3: Railway (Alternative)

**Free Tier:**
- $5 credit/month
- PostgreSQL included

**Setup:**
1. https://railway.app
2. New Project → PostgreSQL
3. Copy `DATABASE_URL`
4. Add to Vercel as `POSTGRES_PRISMA_URL`

---

## 🎯 Do You Need a Database?

**You might NOT need it if:**
- ✅ You only need Cashfree order tracking
- ✅ You check orders in Cashfree dashboard
- ✅ You don't need custom reports
- ✅ You're just starting out

**You SHOULD add it if:**
- ❌ You want order history in your dashboard
- ❌ You need custom analytics
- ❌ You want to track customer info
- ❌ You plan to scale

---

## 📝 Current Setup (Without Database)

**What happens now:**
1. User clicks "Proceed to Payment"
2. Order created in Cashfree ✅
3. Payment page opens ✅
4. User completes payment ✅
5. Cashfree records transaction ✅
6. Database save skipped (but checkout works!) ✅

**Where to find orders:**
- Cashfree Dashboard: https://merchant.cashfree.com/merchants/transactions
- All payment details, customer info, amounts tracked there

---

## 🚀 Recommendation

**For now:** 
- ✅ Keep it simple - no database needed
- ✅ Use Cashfree dashboard for orders
- ✅ Focus on getting customers

**Later (when scaling):**
- Add Vercel Postgres (takes 5 minutes)
- Migrate order history if needed
- Build custom admin dashboard

---

## 🔍 Testing

Your checkout should now work on:
- ✅ kalpavruksha-hair-oil.vercel.app
- ✅ No database errors
- ✅ Cashfree payment page opens
- ✅ Test with: 4111 1111 1111 1111

**If you still see errors:**
1. Check Vercel deployment logs
2. Verify environment variables are set
3. Make sure latest commit (b005832) is deployed

---

## 📞 Need Help?

If you want to add PostgreSQL later or encounter issues:
1. Check Vercel logs (Dashboard → Deployments → Your deploy → Runtime Logs)
2. Verify all environment variables are set
3. Test locally first: `npm run build && npm start`

---

Last Updated: 19 October 2025
Commit: b005832 - "fix: make database operations optional for Vercel deployment"
