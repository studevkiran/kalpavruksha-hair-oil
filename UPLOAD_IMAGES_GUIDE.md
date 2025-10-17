# 📸 Image Upload Guide

## Required Images to Upload

### 1. **Logo (Required)**
Upload your actual Kalpavruksha logo to replace the placeholder:

**Location:** `public/images/logo.png` or `logo.jpg`
- **Recommended size:** 500x500px (square)
- **Format:** PNG with transparent background (preferred) or JPG
- **Usage:** Navbar, Footer, Favicon

### 2. **Product Images (Highly Recommended)**
- `public/images/product-100ml.jpg` - 100ml bottle image
- `public/images/product-200ml.jpg` - 200ml bottle image  
- `public/images/product-500ml.jpg` - 500ml bottle image
- **Recommended size:** 800x800px or higher
- **Format:** JPG or PNG

### 3. **Product Label (Optional)**
- `public/images/label.jpg` - Product label/sticker image
- Can be used in product showcase section

### 4. **Hero Background (Optional)**
- `public/images/hero-bg.jpg` - Background image for hero section
- **Recommended size:** 1920x1080px
- **Format:** JPG (optimized for web)

---

## How to Upload Images

### Method 1: Via GitHub Website (Easiest)

1. Go to your repository: https://github.com/studevkiran/kalpavruksha-hair-oil

2. Navigate to `public/images/` folder

3. Click **"Add file"** → **"Upload files"**

4. Drag and drop your images:
   - `logo.png`
   - `product-100ml.jpg`
   - `product-200ml.jpg`
   - `product-500ml.jpg`

5. Add commit message: "Add product images and logo"

6. Click **"Commit changes"**

### Method 2: Via Terminal (If images are on your computer)

```bash
# 1. Copy your images to the public/images folder
# Example:
# cp ~/Desktop/logo.png public/images/
# cp ~/Desktop/product-*.jpg public/images/

# 2. Add and commit
cd /Applications/projects/kalpavruksha-hair-oil
git add public/images/*
git commit -m "feat: add product images and logo"
git push origin main
```

---

## After Uploading - Update Components

Once images are uploaded, the code will automatically use them. The components are already configured to look for:

### Logo Usage:
- **Navbar:** Uses `/images/logo.svg` (will auto-switch to logo.png if available)
- **Footer:** Uses `/images/logo.svg`

### Product Images:
Currently using placeholder images. After upload, update:

**File:** `components/ProductShowcase.tsx`
```tsx
// Change from placeholder to:
<Image 
  src="/images/product-100ml.jpg"  // Your actual image
  alt="Kalpavruksha Hair Oil 100ml"
  width={400}
  height={400}
  className="object-contain"
/>
```

---

## Image Optimization Tips

1. **Compress images** before uploading (use tinypng.com or similar)
2. **Use WebP format** for better performance (optional)
3. **Keep file sizes under 500KB** for faster loading
4. **Use descriptive names** like `product-200ml.jpg` instead of `IMG_1234.jpg`

---

## Need Help?

If you need help updating the image paths after uploading, just let me know!
