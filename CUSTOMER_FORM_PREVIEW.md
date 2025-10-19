# Customer Form Preview - What Your Customers Will See

When customers click "Continue to Checkout", they will see this form:

```
┌─────────────────────────────────────────────┐
│          YOUR DETAILS                       │
├─────────────────────────────────────────────┤
│                                             │
│  Name *                                     │
│  [Enter your name                    ]      │
│                                             │
│  Mobile Number *                            │
│  [10-digit mobile number             ]      │
│                                             │
│  Email (Optional)                           │
│  [your@email.com                     ]      │
│                                             │
│  Delivery Address *                         │
│  [House/Flat No., Building Name,     ]      │
│  [Street                             ]      │
│                                             │
│  City *              State *                │
│  [City        ]      [State          ]      │
│                                             │
│  Pincode *                                  │
│  [6-digit pincode                    ]      │
│                                             │
│  ← Back to cart                             │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │    💳 PROCEED TO PAYMENT              │ │
│  └───────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

## Form Validation:
- ✓ Name: Required
- ✓ Mobile: Required, exactly 10 digits, numbers only
- ✓ Email: Optional
- ✓ Address: Required
- ✓ City: Required
- ✓ State: Required
- ✓ Pincode: Required, exactly 6 digits

## What Happens After Submit:
1. Form validates all required fields
2. Creates Cashfree payment order with customer & delivery details
3. Redirects to Cashfree payment page
4. Customer completes payment
5. Order appears in your Cashfree dashboard with full address

## Example Order in Cashfree:

### Customer Details:
```
Name: Ramesh Kumar
Phone: 9876543210
Email: ramesh@gmail.com (if provided)
```

### Delivery Address (in Order Tags):
```
Address: 123, MG Road, Near City Hospital
City: Mysuru
State: Karnataka
Pincode: 570001
Full Address: 123, MG Road, Near City Hospital, Mysuru, Karnataka - 570001
```

### Order Items (in Order Note):
```
Kalpavruksha Hair Oil - 100ml (2x), Kalpavruksha Hair Oil - 200ml (1x)
```

You can see ALL this information in:
**Cashfree Dashboard → Orders → [Click Order] → View all details**
