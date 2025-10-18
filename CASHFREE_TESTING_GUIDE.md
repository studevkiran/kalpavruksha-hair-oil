# Cashfree Payment Gateway Testing Guide

## Current Setup

Your website is now integrated with **Cashfree Payment Gateway** (SANDBOX mode for testing).

### Test Credentials
- Test credentials are already configured in `.env` file
- **Environment**: SANDBOX (Test Mode)

## How to Test Payments

### 1. Start Development Server
```bash
npm run dev
```
Visit: http://localhost:3000

### 2. Add Product to Cart
1. Click "Shop Now" button on homepage
2. Select a quantity (100ml or 200ml)
3. Click "Add to Cart"
4. Click the shopping cart icon in the header

### 3. Proceed to Checkout
1. Review your cart items
2. Click "💳 Proceed to Payment"
3. Cashfree checkout page will open

### 4. Test Cards

#### ✅ Successful Payment
**Card Number**: `4111 1111 1111 1111`
- CVV: Any 3 digits (e.g., `123`)
- Expiry: Any future date (e.g., `12/25`)
- Name: Any name

#### ❌ Failed Payment
**Card Number**: `4000 0000 0000 0002`
- CVV: `123`
- Expiry: Any future date
- Name: Any name

#### ⏳ Pending/Processing
**Card Number**: `5555 5555 5555 4444`
- CVV: `123`
- Expiry: Any future date
- Name: Any name

### 5. Other Test Methods

Cashfree also supports testing with:
- **UPI**: Use test UPI ID format `success@upi` or `failure@upi`
- **Net Banking**: Select any test bank
- **Wallets**: Select test wallet options

## Expected Behavior

### After Successful Payment:
- Cart will be cleared automatically
- Success message: "Payment successful! Thank you for your order. 🎉"
- Order status in database: `paid`

### After Failed Payment:
- Cart remains intact
- Alert: "Payment failed. Please try again."
- Order status in database: `failed`

## Cashfree Dashboard

Monitor all test transactions:
1. Login to [Cashfree Merchant Dashboard](https://merchant.cashfree.com/)
2. Use your merchant credentials
3. Go to **Transactions** section
4. View all test orders and payments

## Going Live (When Ready)

To switch to PRODUCTION mode:

1. **Get Live Credentials**:
   - Login to Cashfree Dashboard
   - Complete KYC verification
   - Get Production App ID and Secret Key

2. **Update Environment Variables** (`.env`):
   ```bash
   CASHFREE_APP_ID=your_live_app_id
   CASHFREE_SECRET_KEY=your_live_secret_key
   ```

3. **Update Code** (`app/api/checkout/route.ts`):
   ```typescript
   const cashfree = new Cashfree(
     CFEnvironment.PRODUCTION, // Changed from SANDBOX
     process.env.CASHFREE_APP_ID!,
     process.env.CASHFREE_SECRET_KEY!
   )
   ```

4. **Update Frontend** (`components/CartDrawer.tsx`):
   ```javascript
   const cashfree = await window.Cashfree({
     mode: 'production' // Changed from 'sandbox'
   })
   ```

5. **Deploy to Vercel** with production environment variables

## Common Issues & Solutions

### Issue: "Failed to create order"
- **Check**: `.env` file has correct credentials
- **Check**: Internet connection active
- **Solution**: Restart dev server after changing `.env`

### Issue: Checkout page doesn't load
- **Check**: Cashfree SDK loaded in browser (check browser console)
- **Check**: No browser extensions blocking scripts
- **Solution**: Clear cache and reload

### Issue: Payment shows as "pending" forever
- **Cause**: Using test cards that simulate pending status
- **Solution**: Use success test card `4111 1111 1111 1111`

## Support & Documentation

- **Cashfree Docs**: https://docs.cashfree.com/
- **Test Cards**: https://docs.cashfree.com/docs/test-data
- **API Reference**: https://docs.cashfree.com/reference/pg-new-apis-endpoint
- **Support**: developers@cashfree.com

## Changes Made

✅ Replaced Razorpay with Cashfree Payment Gateway
✅ Changed "Select Size:" to "Select Quantity:" in product page
✅ Updated all payment-related API routes
✅ Integrated Cashfree Checkout SDK
✅ Configured webhook handlers for payment verification
✅ Removed old Razorpay dependencies

---

**Ready to Test!** 🚀

Start the dev server and try making a test purchase using the test cards above.
