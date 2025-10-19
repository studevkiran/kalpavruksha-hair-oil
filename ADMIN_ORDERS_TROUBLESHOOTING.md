# 🔧 Admin Orders Page - Troubleshooting Guide

## Issue: "Failed to fetch orders" or "No orders found"

If you're seeing this error even after creating test orders, here's how to debug:

---

## ✅ Step 1: Check Vercel Function Logs

### How to Check Logs:
1. Go to https://vercel.com/dashboard
2. Click on your project: `kalpavruksha-hair-oil`
3. Click "Functions" tab
4. Find `/api/admin/orders`
5. Click to view logs

### What to Look For:
```
Admin Orders API - Fetching orders: { startDate: null, endDate: null }
Fetching from: https://sandbox.cashfree.com/pg/orders?limit=100
Cashfree API response status: 200
Cashfree API response: { orderCount: X, hasOrders: true }
Processing orders: X
```

If you see errors, check:
- Cashfree API credentials
- Network connectivity
- API response format

---

## ✅ Step 2: Verify Cashfree Credentials

### Check Environment Variables:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Verify these are set:
   - `CASHFREE_APP_ID` - Your Cashfree App ID
   - `CASHFREE_SECRET_KEY` - Your Cashfree Secret Key
   - `CASHFREE_ENV` - Should be `SANDBOX` (or `PRODUCTION` for live)

### Test Credentials:
```bash
# In terminal, test if credentials work:
curl -X GET "https://sandbox.cashfree.com/pg/orders?limit=10" \
  -H "x-client-id: YOUR_APP_ID" \
  -H "x-client-secret: YOUR_SECRET_KEY" \
  -H "x-api-version: 2023-08-01"
```

---

## ✅ Step 3: Check Browser Console

### Open Dev Tools:
1. Open admin page: `/admin/orders`
2. Press `F12` or Right-click → Inspect
3. Go to "Console" tab
4. Click "Fetch Orders"

### What to Look For:
```
Fetching orders with params: start_date=&end_date=
Response status: 200
Response data: { orders: [...], count: X }
```

If you see errors:
- Check network tab for failed requests
- Look for CORS errors
- Check API response

---

## ✅ Step 4: Verify Test Orders Exist in Cashfree

### Check Cashfree Dashboard:
1. Login to https://merchant.cashfree.com
2. Go to "Orders" section
3. Make sure you have test orders
4. Note the environment (Sandbox vs Production)

### Important:
- If using **SANDBOX**, create test orders on sandbox
- If using **PRODUCTION**, use real orders
- Match the environment in your `.env` file

---

## ✅ Step 5: Test API Directly

### Use Browser:
Open this URL (replace with your domain):
```
https://kalpavruksha-hair-oil.vercel.app/api/admin/orders
```

### Expected Response:
```json
{
  "orders": [
    {
      "order_id": "order_123",
      "order_amount": 599,
      "customer_details": {...},
      "order_note": "Products... 📍 DELIVERY: ...",
      ...
    }
  ],
  "count": 1
}
```

### If Empty:
```json
{
  "orders": [],
  "count": 0,
  "message": "No orders found. Make sure you have created test orders in Cashfree."
}
```

---

## ✅ Step 6: Common Issues & Solutions

### Issue 1: Wrong Environment
**Problem:** Using Production credentials but testing with Sandbox orders (or vice versa)

**Solution:**
- Check `CASHFREE_ENV` in Vercel environment variables
- Should be `SANDBOX` for testing
- Orders must exist in the matching environment

### Issue 2: Expired/Invalid Credentials
**Problem:** Cashfree returns 401 Unauthorized

**Solution:**
- Regenerate credentials in Cashfree dashboard
- Update in Vercel environment variables
- Redeploy application

### Issue 3: API Version Mismatch
**Problem:** Cashfree API changed format

**Solution:**
- We use API version `2023-08-01`
- Check Cashfree docs for latest version
- Update in code if needed

### Issue 4: Rate Limiting
**Problem:** Too many requests to Cashfree API

**Solution:**
- Wait a few minutes
- Don't click "Fetch Orders" repeatedly
- Cashfree has rate limits

### Issue 5: CORS Error
**Problem:** Browser blocking API calls

**Solution:**
- This shouldn't happen (API is server-side)
- If it does, check Vercel function logs
- Make sure API route is deployed

---

## 🔍 Debug Mode

### Enable Detailed Logging:

The API now includes detailed logs. After deployment, check Vercel function logs to see:

1. **Request received:**
   ```
   Admin Orders API - Fetching orders: { startDate: '2025-10-19', endDate: '2025-10-19' }
   ```

2. **API call:**
   ```
   Fetching from: https://sandbox.cashfree.com/pg/orders?limit=100
   ```

3. **Response:**
   ```
   Cashfree API response status: 200
   Cashfree API response: { orderCount: 5, hasOrders: true }
   ```

4. **Processing:**
   ```
   Processing orders: 5
   Fetching details for order: order_1760872412
   Order order_1760872412 details: { has_order_note: true, has_order_tags: true, status: 'PAID' }
   ```

5. **Result:**
   ```
   Returning 5 orders
   ```

---

## 🧪 Test Scenario

### Create a Test Order:
1. Go to your website homepage
2. Add items to cart (e.g., 1x 100ml)
3. Click "Continue to Checkout"
4. Fill in delivery details:
   - Name: Test Customer
   - Phone: 9876543210
   - Email: test@test.com
   - Address: 123 Test Street
   - City: Mysuru
   - State: Karnataka
   - Pincode: 570001
5. Click "Proceed to Payment"
6. Use Cashfree test card:
   - Card: 4111 1111 1111 1111
   - CVV: 123
   - Expiry: Any future date
   - OTP: 123456
7. Complete payment

### Then Check Admin Page:
1. Go to `/admin/orders`
2. Leave dates empty (to get all orders)
3. Click "Fetch Orders"
4. Your test order should appear!

---

## 📱 Alternative: Check Cashfree Dashboard

### If Admin Page Still Not Working:
1. Login to https://merchant.cashfree.com
2. Go to "Orders"
3. Click on any order
4. View order details manually
5. Look for:
   - Customer name, phone in "Customer Details"
   - Products in "Order Note"
   - Delivery address in "Order Note" (after 📍 DELIVERY:)

This is a workaround until the admin page is working.

---

## 🆘 Still Not Working?

### Contact Support:

**Cashfree Support:**
- Email: care@cashfree.com  
- Phone: +91-80-6198-8198
- Ask: "Why is my orders API not returning orders?"

**Check These:**
1. Are you using the correct API credentials?
2. Are orders in the same environment (Sandbox vs Production)?
3. Do orders exist in Cashfree dashboard?
4. Is your account verified and active?

---

## ✅ Expected Working Flow:

1. **Create order** on website → Cashfree processes payment
2. **Cashfree stores** order with `order_note` containing delivery address
3. **Admin page calls** Cashfree API → Gets orders
4. **API fetches** detailed info for each order
5. **Frontend displays** orders with addresses
6. **Export CSV** → All data including addresses

---

## 🎯 Quick Checklist:

- [ ] Test order created on website
- [ ] Payment completed successfully  
- [ ] Order visible in Cashfree dashboard
- [ ] Environment variables set correctly in Vercel
- [ ] Using correct environment (Sandbox/Production)
- [ ] Browser console shows no errors
- [ ] Vercel function logs show successful API calls
- [ ] Admin page loads without errors
- [ ] Click "Fetch Orders" shows results

---

## 💡 Pro Tip:

**Don't filter by date initially!**

Leave both date fields empty and just click "Fetch Orders". This will get ALL recent orders (up to 100). Once you see orders appearing, then you can use date filters.

---

## 📊 Expected API Response Format:

```json
{
  "orders": [
    {
      "order_id": "order_1760872412392",
      "order_amount": 599,
      "order_currency": "INR",
      "order_status": "PAID",
      "created_at": "2025-10-19T14:30:00Z",
      "customer_details": {
        "customer_name": "Ramesh Kumar",
        "customer_phone": "9876543210",
        "customer_email": "ramesh@gmail.com"
      },
      "order_note": "Kalpavruksha Hair Oil - 200ml (1x)\n📍 DELIVERY: 123, MG Road, Mysuru, Karnataka - 570001",
      "order_tags": {
        "business_name": "Kalpavruksha Hair Oil",
        "delivery_address": "123, MG Road",
        "delivery_city": "Mysuru",
        "delivery_state": "Karnataka",
        "delivery_pincode": "570001",
        "full_address": "123, MG Road, Mysuru, Karnataka - 570001"
      }
    }
  ],
  "count": 1
}
```

If you get this format, everything is working correctly!
