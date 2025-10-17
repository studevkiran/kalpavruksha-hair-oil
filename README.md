# Kalpavruksha Hair Oil Website

Modern, responsive store page for Kalpavruksha Hair Oil built with Next.js 14, Tailwind CSS, Prisma (SQLite), and Razorpay.

Note: We do not copy content from the sample link; all text is original and based on your provided requirements.

## Features
- Responsive UI for mobile and desktop
- Product page with Razorpay checkout
- Contact form saving leads to SQLite via Prisma
- SEO-friendly metadata and accessible UI

## Setup
1. Clone or open this folder
2. Create `.env` from `.env.example` and fill values
3. Install deps and run dev

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Open http://localhost:3000

## Razorpay (Test Mode)
1. Create a Razorpay account and get test Key ID/Secret
2. Put them in `.env` under RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET
3. Put Key ID in NEXT_PUBLIC_RAZORPAY_KEY_ID
4. Use INR minor units (e.g., 49900 = ₹499)

## Deploy
- Push to GitHub
- One-click deploy to Vercel (recommended)
- Set ENV vars on Vercel
- Run `npx prisma migrate deploy` on build or via postinstall

## License
Content © Kalpavruksha. Code under MIT.
