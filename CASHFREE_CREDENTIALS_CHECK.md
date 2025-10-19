# 🔧 Cashfree Credentials Verification Guide

## ⚠️ CRITICAL: Are Your Credentials for SANDBOX or PRODUCTION?

The error "endpoint or method is not valid" usually means:
**Your App ID and Secret Key don't match the environment you're trying to use.**

---

## ✅ How to Verify:

### Step 1: Check Your Cashfree Dashboard

1. **Login to Cashfree:**
   - SANDBOX: https://sandbox.cashfree.com/merchant/login
   - PRODUCTION: https://merchant.cashfree.com/auth/login

2. **Go to Developers → API Keys**

3. **Check which credentials you're using:**

   **SANDBOX Credentials:**
   - App ID starts with: `TEST...` or specific to sandbox
   - Secret Key: Specific to sandbox
   - Used for: Testing with test cards

   **PRODUCTION Credentials:**
   - App ID: Different format
   - Secret Key: Different from sandbox
   - Used for: Real payments

---

## 🎯 What You Need to Do:

### If Using SANDBOX (Current Setup):

1. **Get SANDBOX Credentials:**
   - Go to: https://sandbox.cashfree.com/merchant/login
   - Navigate to: Developers → API Keys
   - Copy: **Sandbox App ID** and **Sandbox Secret Key**

2. **Update Vercel Environment Variables:**
   - Go to: https://vercel.com/kirans-projects-cb89f9d8/kalpavruksha-hair-oil/settings/environment-variables
   
   **Make sure these are SANDBOX credentials:**
   - `CASHFREE_APP_ID` = Your **Sandbox App ID**
   - `CASHFREE_SECRET_KEY` = Your **Sandbox Secret Key**
   - `CASHFREE_ENV` = `SANDBOX` ✅ (Already set)

3. **Redeploy after updating**

---

## 🔍 How to Tell if Credentials Don't Match:

### Symptom:
- `CASHFREE_ENV=SANDBOX` 
- But using **Production** App ID/Secret Key
- Result: ❌ "endpoint or method is not valid"

### Solution:
- Use **Sandbox** credentials with `CASHFREE_ENV=SANDBOX`
- OR
- Use **Production** credentials with `CASHFREE_ENV=PRODUCTION`

**They must match!**

---

## 📋 Step-by-Step Fix:

### 1. Login to Sandbox Dashboard
```
https://sandbox.cashfree.com/merchant/login
```

### 2. Get API Keys
- Click: Developers (left sidebar)
- Click: API Keys
- You'll see:
  - **App ID**: `TEST_XXXXXXXXXXXXXXXX` (or similar)
  - **Secret Key**: Click "Show" to reveal

### 3. Copy These Credentials

### 4. Update Vercel
Go to: https://vercel.com/kirans-projects-cb89f9d8/kalpavruksha-hair-oil/settings/environment-variables

**Update (NOT add new, edit existing):**
- Click edit (pencil icon) on `CASHFREE_APP_ID`
- Paste your **Sandbox App ID**
- Save

- Click edit on `CASHFREE_SECRET_KEY`
- Paste your **Sandbox Secret Key**  
- Save

### 5. Trigger Redeploy
Either:
- Go to Deployments → Redeploy latest
- OR push a small change (I can help)

---

## 🧪 Test After Fixing:

### 1. Create a Test Order in Sandbox:
- Go to your website
- Add item to cart
- Complete checkout
- Use test card: `4111 1111 1111 1111`
- CVV: `123`, OTP: `123456`

### 2. Check Cashfree Sandbox Dashboard:
- Go to: Orders
- Verify order appears there
- If it appears, credentials are working

### 3. Test Admin Page:
- Go to: `/admin/orders`
- Click "Fetch Orders"
- Should now show the test order! ✅

---

## 🎯 Quick Checklist:

- [ ] Logged into **Cashfree Sandbox** (not production)
- [ ] Copied **Sandbox App ID**
- [ ] Copied **Sandbox Secret Key**
- [ ] Updated `CASHFREE_APP_ID` in Vercel
- [ ] Updated `CASHFREE_SECRET_KEY` in Vercel
- [ ] Verified `CASHFREE_ENV` = `SANDBOX`
- [ ] Triggered redeploy
- [ ] Created test order
- [ ] Test order appears in Cashfree dashboard
- [ ] Admin page fetches orders successfully

---

## 💡 Common Mistakes:

1. **Wrong Dashboard:**
   - ❌ Getting credentials from Production dashboard
   - ✅ Get from Sandbox dashboard for testing

2. **Mixed Credentials:**
   - ❌ Sandbox App ID + Production Secret Key
   - ✅ Both from same environment

3. **Old Credentials:**
   - ❌ Using expired or regenerated keys
   - ✅ Get fresh credentials from dashboard

---

## 🆘 Still Not Working?

### Check Vercel Function Logs:
https://vercel.com/kirans-projects-cb89f9d8/kalpavruksha-hair-oil/observability/vercel-functions

Look for the actual error message from Cashfree API.

### Test Credentials Manually:
```bash
curl -X GET "https://sandbox.cashfree.com/pg/orders?limit=10" \
  -H "x-client-id: YOUR_SANDBOX_APP_ID" \
  -H "x-client-secret: YOUR_SANDBOX_SECRET_KEY" \
  -H "x-api-version: 2023-08-01"
```

If this returns an error, your credentials are wrong.
If it returns orders (or empty array), credentials are correct.

---

## 📞 Need Help?

Share with me:
1. Are you using Sandbox or Production?
2. Where did you get your App ID and Secret Key from?
3. Do you have any test orders in Cashfree dashboard?

I'll help you fix it! 🚀
