# Kalpavruksha Hair Oil – E-Commerce Website

🌿 **An extraordinary, nature-themed e-commerce experience** for Kalpavruksha Hair Oil, built with Next.js 14, Tailwind CSS, Prisma (SQLite), and Razorpay payments.

## ✨ Features

### 🎨 Extraordinary UI/UX Design
- **Immersive Hero Section** with animated backgrounds, floating elements, and compelling CTAs
- **Nature-Inspired Theme** with rich color palette (forest greens, earthy browns, golden accents)
- **Product Showcase** with multiple size variants (100ml, 200ml, 500ml), pricing, ratings & reviews
- **Trust Badges** (100% Natural, 0% Chemicals, Handmade, Lab Tested, GMP/ISO Certified)
- **Testimonials Carousel** with auto-scroll, star ratings, and verified buyer badges
- **Brand Story Section** highlighting tradition, quality, and craftsmanship
- **Enhanced Ingredients Grid** with icons and hover effects (51 magical ingredients)
- **Transformative Benefits** section with detailed descriptions and icons

### 🛒 E-Commerce Functionality
- Fully responsive design (mobile-first approach)
- Product variants with pricing, discounts, and stock status
- Razorpay payment gateway integration (test mode ready)
- Lead/Contact form saving to SQLite database
- SEO-optimized metadata and Open Graph tags
- Smooth scroll animations and transitions

### 🔒 Payments & Database
- **Razorpay** checkout with signature verification
- **Prisma + SQLite** for local dev (production-ready for Postgres/MySQL)
- Order tracking and lead management
- Secure payment flow with webhook support (ready to add)

### 📱 Fully Responsive
- Mobile-optimized navigation and layouts
- Touch-friendly UI elements
- Fast loading with optimized images
- Accessible color contrast and typography

## 🚀 Quick Start

```bash
# Clone and install
cd /Applications/projects/kalpavruksha-hair-oil
cp .env.example .env

# Fill .env with your Razorpay keys:
# RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, NEXT_PUBLIC_RAZORPAY_KEY_ID
# DATABASE_URL (default: file:./dev.db)
# NEXT_PUBLIC_SITE_URL (for production)

npm install
npx prisma generate
npx prisma migrate dev --name init

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the extraordinary design!

## 🎨 Design System

### Color Palette
- **Forest Green** (#1d6b4c) – Primary brand color
- **Earth Browns** (50-900) – Warm, natural tones
- **Gold Accents** (50-900) – Premium highlights
- **Sage & Moss** – Supporting greens

### Typography
- **Headings**: Georgia, serif (elegant, traditional)
- **Body**: System fonts (modern, readable)

### Animations
- Fade-in, fade-up, scale-in effects
- Floating elements in hero
- Smooth hover transitions
- Auto-scrolling testimonials

## 📦 Project Structure

```
├── app/
│   ├── page.tsx              # Home page (Hero, Products, Testimonials, etc.)
│   ├── buy/page.tsx          # Product purchase page with Razorpay
│   ├── contact/page.tsx      # Contact/Lead form
│   ├── layout.tsx            # Root layout with metadata
│   ├── globals.css           # Tailwind + custom styles
│   └── api/                  # API routes (checkout, lead, verify)
├── components/
│   ├── HeroSection.tsx       # Immersive hero with animated backgrounds
│   ├── ProductShowcase.tsx   # Product grid with variants
│   ├── TrustBadges.tsx       # Certification badges
│   ├── Testimonials.tsx      # Customer reviews carousel
│   ├── StorySection.tsx      # Brand story & values
│   ├── IngredientsGrid.tsx   # 51 ingredients display
│   ├── Benefits.tsx          # Product benefits
│   ├── Navbar.tsx            # Sticky navigation
│   ├── Footer.tsx            # Rich footer with links
│   └── CTA.tsx               # Call-to-action section
├── lib/
│   ├── prisma.ts             # Prisma client
│   └── razorpay.ts           # Razorpay helper
├── prisma/
│   └── schema.prisma         # Database models (Lead, Order)
├── public/images/            # Logo, label SVGs
└── tailwind.config.ts        # Extended theme with custom colors & animations
```

## 🎯 Pages & Sections

### Home Page (`/`)
1. **Hero** – Animated backgrounds, product intro, quick stats
2. **Trust Badges** – 6 certification badges
3. **Product Showcase** – 3 size variants with pricing
4. **Ingredients** – 51 magical ingredients with icons
5. **Benefits** – 6 transformative benefits
6. **Story** – Brand heritage and values
7. **Testimonials** – Customer reviews carousel
8. **CTA** – Final conversion section
9. **Footer** – Links, contact, social media

### Buy Page (`/buy`)
- Product details and pricing
- Razorpay checkout integration
- "Pay with Razorpay" button

### Contact Page (`/contact`)
- Lead capture form
- Saves to database via API

## 💳 Payment Integration (Razorpay)

1. Sign up at [Razorpay](https://razorpay.com/)
2. Get your test/live API keys
3. Add to `.env`:
   ```env
   RAZORPAY_KEY_ID=rzp_test_xxxxx
   RAZORPAY_KEY_SECRET=xxxxx
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
   ```
4. Test with Razorpay's test cards
5. Signature verification is built-in

### Amount Format
Use **minor units** (paise for INR):
- ₹499 = `49900`
- ₹299 = `29900`

## 🗄️ Database

### Local Development (SQLite)
Already configured! Just run migrations:
```bash
npx prisma migrate dev
```

### Production (Recommended: PostgreSQL)
1. Get a hosted Postgres instance (Neon, Supabase, Railway)
2. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Set `DATABASE_URL` in production env
4. Run `npx prisma migrate deploy`

## 🚢 Deployment

### Vercel (Recommended)
1. Push to GitHub:
   ```bash
   git add .
   git commit -m "feat: extraordinary Kalpavruksha design"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/kalpavruksha-hair-oil.git
   git push -u origin main
   ```

2. Import to Vercel:
   - Visit [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repo
   - Add environment variables:
     - `DATABASE_URL`
     - `RAZORPAY_KEY_ID`
     - `RAZORPAY_KEY_SECRET`
     - `NEXT_PUBLIC_RAZORPAY_KEY_ID`
     - `NEXT_PUBLIC_SITE_URL` (your domain)
   - Deploy!

3. Custom domain:
   - Add domain in Vercel dashboard
   - Update DNS records

## 🔧 Customization

### Update Product Details
- Edit `components/ProductShowcase.tsx` for pricing, sizes, reviews
- Update `components/IngredientsGrid.tsx` for ingredient list
- Modify `components/Benefits.tsx` for benefit descriptions

### Change Images
- Replace `public/images/logo.svg` with your logo
- Replace `public/images/label.svg` with product image
- Supports PNG, JPG, SVG

### Footer Contact Info
- Edit `components/Footer.tsx`
- Add GST number, address, business hours

### Colors & Theme
- Modify `tailwind.config.ts` to customize color palette
- Update `app/globals.css` for global styles

## 📊 Analytics (Optional)

Add Google Analytics or Vercel Analytics:
```bash
npm install @vercel/analytics
```

In `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom theme
- **Database**: Prisma + SQLite (dev) / Postgres (prod)
- **Payments**: Razorpay
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## 📝 License

Content © 2025 Kalpavruksha Hair Oil. All rights reserved.

## 🤝 Support

For questions or bulk orders, contact us at:
- **Phone**: 89514 37815
- **Email**: [Add your email]

---

**Built with 🌿 for nature-loving customers**
