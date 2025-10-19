# 📊 Cashfree CSV Export - Complete Guide

## ✅ Good News: Delivery Address NOW in CSV Exports!

The delivery address is now included in the **Order Note** column when you export orders from Cashfree. No more manually checking each order!

---

## 📥 How to Export Orders with Delivery Addresses

### Step 1: Login to Cashfree Dashboard
- Go to: https://merchant.cashfree.com
- Login with your credentials

### Step 2: Navigate to Orders
- Click "Orders" in the left sidebar
- You'll see all your orders

### Step 3: Filter Orders (Optional)
- Select date range (Today, This Week, This Month, Custom)
- Filter by status (Success, Failed, Pending)
- Filter by amount range

### Step 4: Export to CSV
- Click the **"Export"** button (usually top right)
- Select format: CSV or Excel
- Click "Download"

---

## 📋 What You'll Get in the CSV Export

### Standard Columns:
```
✓ Date & Time
✓ Order ID
✓ Order Amount
✓ CF Order ID
✓ Order Type
✓ Integration Type
✓ Customer Name
✓ Customer Phone
✓ Customer Email
✓ Status
✓ Order Note ⭐ (Contains delivery address!)
```

### Example Order Note Column:
```
Kalpavruksha Hair Oil - 100ml (2x), Kalpavruksha Hair Oil - 200ml (1x)
📍 DELIVERY: 123, MG Road, Near City Hospital, Mysuru, Karnataka - 570001
```

---

## 🎯 How to Use the Exported Data

### Method 1: Copy-Paste for Shipping
1. Open CSV in Excel/Google Sheets
2. Find the "Order Note" column
3. Look for lines starting with 📍 DELIVERY:
4. Copy the address
5. Paste into courier website or shipping label

### Method 2: Mail Merge for Bulk Shipping
1. Open CSV in Excel
2. Use "Text to Columns" to split Order Note
3. Extract address after "📍 DELIVERY:"
4. Use mail merge with shipping label template
5. Print all labels at once

### Method 3: Filter and Sort
```
1. Open CSV in Excel/Sheets
2. Filter by Status = "Success"
3. Filter by Date = Today
4. Sort by Order Amount
5. Copy Order Note column
6. Prepare shipments in order
```

---

## 📦 Sample CSV Data

```csv
Date & Time,Order ID,Amount,Customer Name,Customer Phone,Order Note,Status
2025-10-19 14:30,order_1760872412,599,Ramesh Kumar,9876543210,"Kalpavruksha Hair Oil - 200ml (1x) 📍 DELIVERY: 45 Jayanagar, Mysuru, Karnataka - 570014",Success
2025-10-19 15:15,order_1760875832,849,Priya Sharma,9988776655,"Kalpavruksha Hair Oil - 100ml (1x), Kalpavruksha Hair Oil - 200ml (1x) 📍 DELIVERY: 78 Gokulam, Mysuru, Karnataka - 570002",Success
```

### What You See:
- ✅ Customer name and phone
- ✅ Products ordered with quantities
- ✅ **Full delivery address** (after 📍 DELIVERY:)
- ✅ All in ONE convenient CSV file!

---

## 🛠️ Excel/Sheets Tips

### Extract Just the Address:
**In Excel/Google Sheets:**
```
=MID(A2, FIND("📍 DELIVERY:", A2) + 13, 200)
```
This formula extracts everything after "📍 DELIVERY:"

### Split Address into Components:
**If you want separate columns for street, city, state, pin:**
1. Use "Text to Columns" (Excel)
2. Delimiter: Comma
3. Creates: Address | City | State-Pin

---

## 📱 Mobile App Export

**Cashfree Merchant Mobile App:**
1. Open app
2. Go to "Orders"
3. Tap "Export"
4. Select date range
5. Choose "Email CSV"
6. CSV sent to your registered email
7. Open on computer for processing

---

## 🚚 Creating Shipping Labels

### Quick Method:
1. Export orders to CSV
2. Open in Excel
3. Copy Order Note for each order
4. Paste delivery address into courier form
5. Generate shipping labels

### Advanced Method (Bulk):
1. Export CSV
2. Import into Google Sheets
3. Use formula to extract address
4. Mail merge with label template
5. Print 50+ labels at once

### Label Template Should Include:
```
┌────────────────────────────────────┐
│  FROM:                             │
│  Kalpavruksha Hair Oil             │
│  Vidyaranyapuram, Mysuru           │
│  Phone: +91 96635 65056            │
│                                    │
│  TO:                               │
│  [Customer Name]                   │
│  [Delivery Address]                │
│  [City], [State] - [Pincode]       │
│  Phone: [Customer Phone]           │
│                                    │
│  Order ID: [Order ID]              │
│  Products: [From Order Note]       │
└────────────────────────────────────┘
```

---

## ⚡ Quick Daily Workflow

### Morning Routine (10 minutes):
```
1. Login to Cashfree ✓
2. Go to Orders → Today ✓
3. Filter: Status = Success ✓
4. Click Export → Download CSV ✓
5. Open in Excel ✓
6. Check Order Note column for deliveries ✓
7. Prepare packages ✓
8. Print shipping labels ✓
9. Ship orders ✓
10. WhatsApp tracking to customers ✓
```

---

## 🔍 Troubleshooting

### Q: Order Note column is empty?
**A:** This might be an old order (before the update). Check Order Tags in the dashboard instead.

### Q: Can't see 📍 emoji in Excel?
**A:** That's okay! The text "DELIVERY:" is still there. Look for that.

### Q: Address is cut off?
**A:** Widen the Order Note column in Excel by double-clicking the column border.

### Q: Need more details?
**A:** Click the Order ID in Cashfree dashboard → View full order with Order Tags for detailed breakdown.

---

## 📊 Example: Processing 10 Orders

1. **Export CSV** (1 minute)
2. **Open in Excel** (30 seconds)
3. **Filter Success orders** (30 seconds)
4. **For each row**:
   - Read customer name, phone
   - Read products from Order Note
   - Read delivery address from Order Note (after 📍 DELIVERY:)
   - Pack items
   - Print label
   - Ship (5 minutes per order)

**Total Time: ~52 minutes for 10 orders**

---

## ✅ Benefits of New System

### Before (Order Tags Only):
❌ Had to click each order individually  
❌ Check Order Tags section  
❌ Copy address manually  
❌ Time-consuming for bulk orders  
❌ Easy to miss orders  

### After (Order Note + CSV):
✅ **Export all orders at once**  
✅ **See all addresses in Excel**  
✅ **Copy-paste for shipping**  
✅ **Bulk processing ready**  
✅ **Fast and efficient**  

---

## 🎉 Summary

**The delivery address is now in your CSV exports!**

When you export orders from Cashfree:
1. Look at the **"Order Note"** column
2. Find the line starting with **📍 DELIVERY:**
3. That's your full delivery address!
4. Use it for shipping labels

**No more clicking individual orders! Everything in one CSV file! 🚀**

---

## 📞 Need Help?

- Check ORDER_MANAGEMENT_GUIDE.md for Cashfree dashboard tips
- Check FULL_PAGE_FORM_UPDATE.md for customer form details
- Cashfree Support: care@cashfree.com | +91-80-6198-8198
