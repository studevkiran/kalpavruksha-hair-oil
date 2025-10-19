# Order Management Guide - Where to Find Customer & Order Data

## 📦 Where All Order Data is Stored

### 1. **Cashfree Dashboard (PRIMARY SOURCE)**
All order data including customer details and delivery addresses are stored in Cashfree.

#### How to Access:
1. **Login**: Go to https://merchant.cashfree.com
2. **Navigate to Orders**: Click "Orders" in the left sidebar
3. **View Order List**: All orders displayed with:
   - Order ID
   - Amount
   - Payment Status (Success/Failed/Pending)
   - Customer Phone
   - Date & Time

#### View Complete Order Details:
Click on any order to see:
- **Customer Information**:
  - Name
  - Phone Number
  - Email
  - Customer ID

- **Delivery Address**:
  - **In Order Note** (📍 DELIVERY: ...) - ⭐ Visible in CSV exports
  - Also in Order Tags (detailed breakdown)

- **Order Items** (in Order Note):
  - Product names
  - Sizes (100ml/200ml)
  - Quantities
  - Full delivery address (📍 DELIVERY: ...)

- **Payment Details**:
  - Amount Paid
  - Payment Method
  - Transaction ID
  - Payment Gateway Reference

#### Export Orders:
- Click "Export" button in Orders page
- Download as CSV/Excel
- **Order Note column will contain**:
  - Products ordered
  - ✅ **Full delivery address** (after 📍 DELIVERY:)
- Use for bulk processing/shipping labels
- No need to check individual orders for addresses!

---

## 📊 What Data is Captured

When a customer completes checkout, you collect:

### Customer Details:
```
✓ Name (Required)
✓ Mobile Number (Required, 10 digits)
✓ Email (Optional)
```

### Delivery Address:
```
✓ Full Address (Required - House/Flat, Street)
✓ City (Required)
✓ State (Required)
✓ Pincode (Required, 6 digits)
```

### Order Details:
```
✓ Products & Quantities
✓ Total Amount
✓ Order ID
✓ Payment Status
✓ Transaction Time
```

---

## 🔍 How to View Order Data

### Option 1: Cashfree Dashboard (Recommended)

**Daily Order Processing:**
1. Login to https://merchant.cashfree.com
2. Go to "Orders" → Today's orders
3. Filter by "Success" status
4. Click each order to see full details including delivery address
5. Prepare shipments based on order info

**Weekly/Monthly Reports:**
1. Go to "Orders" section
2. Select date range
3. Click "Export" to download all orders
4. Open in Excel/Sheets for shipping labels

### Option 2: Cashfree Mobile App

1. Download "Cashfree Merchant" app from Play Store/App Store
2. Login with same credentials
3. View orders on the go
4. Get instant payment notifications

---

## 📧 Order Notifications

### Automatic Notifications:
You receive notifications via:
- **SMS**: On your registered mobile number
- **Email**: On your registered email
- **Dashboard Notifications**: Bell icon in Cashfree dashboard

### What You Get Notified About:
- ✓ Successful payments
- ✓ Failed payments
- ✓ Refund requests
- ✓ Daily settlement reports

---

## 🚚 Processing Orders for Delivery

### Step-by-Step Fulfillment Process:

1. **Check New Orders** (Daily/Hourly):
   ```
   Login to Cashfree → Orders → Filter: Success → Today
   ```

2. **For Each Order, Note Down**:
   - Customer Name & Phone (from Customer Details)
   - **Full Delivery Address (from Order Note - after 📍 DELIVERY:)**
   - Products ordered (100ml/200ml, quantities - also in Order Note)

3. **Prepare Package**:
   - Pack ordered items
   - Print shipping label with delivery address
   - Include invoice/bill

4. **Ship & Update**:
   - Ship via your courier partner
   - Note courier tracking number
   - Call/WhatsApp customer with tracking details

---

## 💡 Order Data Location Summary

### **Where to Find Delivery Address:**

The delivery address is available in **TWO places** for convenience:

1. **Order Note Field** (✅ Visible in CSV Exports):
   - Shows products + delivery address together
   - Example: `Kalpavruksha Hair Oil - 100ml (2x) 📍 DELIVERY: 123 MG Road, Mysuru, Karnataka - 570001`
   - Visible when you export orders to Excel/CSV
   - Easy to copy-paste for shipping labels

2. **Order Tags Section** (In order details page):
   - Separate fields for address, city, state, pincode
   - Access: Click order → View Tags
   - Structured format

### **Complete Data Table:**

| Data Type | Location in Cashfree | How to Access |
|-----------|---------------------|---------------|
| Customer Name | Order Details → Customer Details | Click order → Customer Details section |
| Phone Number | Order Details → Customer Details | Click order → Phone field |
| Email | Order Details → Customer Details | Click order → Email field |
| **Delivery Address** | **Order Details → Order Note** | **Click order → Note field** ⭐ |
| Delivery Address (detailed) | Order Details → Order Tags | Click order → Tags → `delivery_address` |
| City | Order Details → Order Tags | Click order → Tags → `delivery_city` |
| State | Order Details → Order Tags | Click order → Tags → `delivery_state` |
| Pincode | Order Details → Order Tags | Click order → Tags → `delivery_pincode` |
| Full Address | Order Details → Order Tags | Click order → Tags → `full_address` |
| Products Ordered | Order Details → Order Note | Click order → Note field |
| Amount Paid | Order Details → Top | Click order → Amount |

---

## 📱 Quick Access Tips

### For Daily Operations:
1. **Bookmark**: https://merchant.cashfree.com/orders
2. **Set Homepage**: Make Orders page your default view
3. **Enable Notifications**: Settings → Notifications → Enable all
4. **Use Filters**: Quick filter by status/date

### For Shipping Labels:
1. Export orders as CSV
2. Use mail merge with shipping label template
3. Print all labels at once

### For Customer Support:
1. Search by customer phone number
2. Find all their previous orders
3. Check payment status instantly

---

## 🔒 Data Security

Your customer data is:
- ✓ Encrypted in Cashfree's secure servers
- ✓ PCI-DSS compliant storage
- ✓ Backed up regularly
- ✓ Accessible only to you (your account)
- ✓ Compliant with data protection laws

---

## 📞 Need Help?

### Cashfree Support:
- **Email**: care@cashfree.com
- **Phone**: +91-80-6198-8198
- **Help Docs**: https://docs.cashfree.com

### Technical Support:
For website/integration issues, check:
- README.md
- CASHFREE_CUSTOMIZATION_GUIDE.md
- DEPLOYMENT.md

---

## 🎯 Quick Checklist: Processing Your First Order

- [ ] Received payment notification (SMS/Email)
- [ ] Logged into Cashfree dashboard
- [ ] Found order in "Orders" section
- [ ] Noted customer name & phone
- [ ] Copied delivery address (from Order Tags)
- [ ] Noted products & quantities (from Order Note)
- [ ] Prepared package with ordered items
- [ ] Printed shipping label with address
- [ ] Shipped via courier
- [ ] Sent tracking details to customer
- [ ] Marked order as fulfilled (optional: use your own system)

---

## ✅ Summary

**All your order and customer data is safely stored in Cashfree Dashboard.**

**To view orders**: Login to https://merchant.cashfree.com → Orders

**Delivery addresses**: Stored in Order Tags → `full_address` field

**Customer details**: Available in each order's Customer Details section

**Export capability**: Download all orders as CSV for bulk processing

You don't need a separate database - Cashfree is your complete order management system! 🎉
