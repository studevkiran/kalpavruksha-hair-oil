# Cashfree Customization Guide

## ✅ What's Been Configured

### 1. **Customer Details Collection**
When users click "Proceed to Payment", they now see a form to enter:
- ✅ Name (required)
- ✅ Mobile Number (required, 10 digits)
- ✅ Email (optional)

### 2. **Business Information**
The following is sent to Cashfree:
```javascript
{
  customer_name: "User's actual name",
  customer_phone: "User's 10-digit number",
  customer_email: "user@email.com or auto-generated",
  order_tags: {
    business_name: "Kalpavruksha Hair Oil",
    store_name: "Kalpavruksha"
  }
}
```

### 3. **Default Values**
If customer skips details (shouldn't happen, but fallback):
- Phone: `9663565056` (your business number)
- Name: `Kalpavruksha Customer`
- Email: Auto-generated from phone

---

## 🎨 Cashfree Dashboard Customization

### **What You Can Customize in Cashfree Dashboard:**

#### 1. **Business Logo** (You mentioned you already changed this ✅)
   - Login to: https://merchant.cashfree.com
   - Go to: **Settings** → **Branding**
   - Upload your logo
   - **Note:** Logo shows on payment page

#### 2. **Business Name Display**
   - **Settings** → **Business Profile**
   - Update: **Business Name** field
   - This appears on payment page header

#### 3. **Theme Colors**
   - **Settings** → **Branding**
   - Customize:
     - Primary color (buttons, headers)
     - Background color
     - Text colors
   - **Suggested for you:**
     ```
     Primary: #D97706 (Amber - matches your site)
     Secondary: #78350F (Dark Brown)
     ```

#### 4. **Payment Methods**
   - **Settings** → **Payment Methods**
   - Enable/Disable:
     - UPI
     - Cards
     - Net Banking
     - Wallets
   - **Recommended:** Enable all for better conversion

#### 5. **Checkout Language**
   - **Settings** → **Checkout**
   - Default: English
   - Can add: Hindi, other regional languages

#### 6. **Email Notifications**
   - **Settings** → **Notifications**
   - Customize:
     - Payment success email template
     - Failed payment email
     - Refund emails
   - Add your logo and branding colors

#### 7. **SMS Notifications**
   - **Settings** → **Notifications** → **SMS**
   - Customize message templates
   - Add your business name in SMS

---

## 📱 Mobile Number Verification

### **Current Setup:**
- ✅ User enters their mobile number in cart
- ✅ 10-digit validation before checkout
- ✅ Number passed to Cashfree
- ✅ Cashfree sends OTP automatically (if enabled)

### **To Enable OTP Verification:**

1. **In Cashfree Dashboard:**
   - Go to: **Settings** → **Checkout Settings**
   - Find: **"OTP Verification"** or **"Customer Verification"**
   - Enable: **"Send OTP for phone verification"**
   - Save changes

2. **How It Works After Enabling:**
   ```
   User enters phone → Cashfree sends OTP → User enters OTP → Payment proceeds
   ```

3. **Alternative: Pre-verification (Optional)**
   If you want to verify BEFORE sending to Cashfree, you can:
   - Integrate an SMS service (like Twilio, MSG91)
   - Send OTP in your cart form
   - Only proceed to Cashfree after verification
   - **Cost:** SMS charges apply

### **Recommended Approach:**
✅ **Let Cashfree handle OTP** (no extra cost, built-in)
- Cashfree sends OTP automatically for first-time customers
- Verified numbers are remembered for repeat purchases
- No SMS service integration needed
- More secure (PCI-DSS compliant)

---

## 🔧 Advanced Customizations

### **1. Custom Success/Failure Pages**
Already implemented! ✅
- Success: `/?payment=success`
- Failed: `/?payment=failed`
- Error: `/?payment=error`

### **2. Order Notes**
Already configured! ✅
```
"Kalpavruksha Hair Oil - 100ml (2x), 200ml (1x)"
```
Shows in your Cashfree dashboard for each order.

### **3. Webhook Notifications**
Already set up! ✅
- Cashfree will notify your server on payment status changes
- Endpoint: `https://your-domain.vercel.app/api/verify`

---

## 🎯 Testing OTP Flow

### **In Sandbox Mode (Current):**
1. Use test phone: `9999999999`
2. OTP: `000000` (six zeros) - always works
3. Test successful payments without real OTP

### **In Production Mode:**
1. Real phone numbers required
2. Real OTP sent via SMS
3. Enable in Cashfree when going live

---

## 📋 Checklist for Going Live

### **Before Switching to Production:**

1. **Cashfree Dashboard:**
   - [ ] Add business logo
   - [ ] Set business name to "Kalpavruksha Hair Oil"
   - [ ] Choose brand colors (Amber + Brown)
   - [ ] Enable OTP verification
   - [ ] Configure email templates
   - [ ] Test all payment methods

2. **Your Code:**
   - [ ] Change `CFEnvironment.SANDBOX` to `CFEnvironment.PRODUCTION`
   - [ ] Update Cashfree credentials in Vercel:
     ```
     CASHFREE_APP_ID=<your_production_app_id>
     CASHFREE_SECRET_KEY=<your_production_secret>
     NEXT_PUBLIC_CASHFREE_APP_ID=<your_production_app_id>
     ```
   - [ ] Test with ₹1 real transaction

3. **Customer Experience:**
   - [ ] Test full flow: Add to cart → Enter details → Pay → Verify OTP
   - [ ] Check success notification appears
   - [ ] Verify order shows in Cashfree dashboard
   - [ ] Test on mobile device

---

## 💡 Pro Tips

### **Improve Conversion:**
1. **Enable Quick Pay:** Saves card details for repeat customers
2. **Add UPI AutoPay:** For subscription-style orders
3. **Show trust badges:** "100% Secure Payment" on checkout
4. **Fast checkout:** Minimize form fields (you did this! ✅)

### **Better Tracking:**
- `customer_id` = User's phone number (easier to search in dashboard)
- `order_note` = Product details (helps customer support)
- `order_tags` = Business name (good for reports)

### **Security:**
- ✅ All data transmitted securely (HTTPS)
- ✅ Cashfree PCI-DSS compliant
- ✅ No card details stored on your server
- ✅ Webhook signature verification (optional, advanced)

---

## 🆘 Common Issues & Solutions

### **Issue: Business name shows as "Business name"**
- **Solution:** Update in Cashfree dashboard → Settings → Business Profile

### **Issue: Want to verify phone before Cashfree**
- **Solution:** Enable OTP in Cashfree settings (easiest)
- **Alternative:** Integrate SMS service (more complex, extra cost)

### **Issue: Logo not showing on payment page**
- **Solution:** Upload in Cashfree → Settings → Branding → Logo should be square (500x500px)

### **Issue: Customer entered wrong phone**
- **Current:** They can't edit after clicking "Proceed to Payment"
- **Solution:** Add "← Back to cart" button (already implemented! ✅)

---

## 📞 Quick Reference

**Your Business Details:**
- Name: Kalpavruksha Hair Oil
- Phone: +91 96635 65056
- Location: Vidyaranyapuram, Mysuru
- GST: 29AODPH7474N1Z9

**Cashfree Dashboard:**
- Test: https://merchant.cashfree.com/merchants/login
- Docs: https://docs.cashfree.com/docs/

**Current Status:**
- ✅ Customer details collection
- ✅ Phone number validation
- ✅ Business name in orders
- ✅ Working payment flow
- ⏳ OTP verification (enable in Cashfree settings)
- ⏳ Production mode (when ready to go live)

---

Last Updated: 19 October 2025
Commit: 96a824a - "feat: add social media links and customer details form for checkout"
