import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
            950: '#052e16',
          },
          forest: '#1d6b4c',
          sage: '#8b9d83',
          moss: '#5a6c57',
          leaf: '#9cb896',
          earth: {
            50: '#faf8f5',
            100: '#f5f1ea',
            200: '#e8dfd0',
            300: '#d4c4a8',
            400: '#bda67d',
            500: '#a78b5f',
            600: '#8b7047',
            700: '#6b4f2a',
            800: '#5a4227',
            900: '#4a3620',
          },
          gold: {
            50: '#fefce8',
            100: '#fef9c3',
            200: '#fef08a',
            300: '#fde047',
            400: '#facc15',
            500: '#eab308',
            600: '#ca8a04',
            700: '#a16207',
            800: '#854d0e',
            900: '#713f12',
          },
          cream: '#faf8f5',
          ivory: '#fffef8',
        },
      },
      fontFamily: {
        heading: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        body: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in',
        'fade-up': 'fadeUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'slide-in': 'slideIn 0.7s ease-out',
        float: 'float 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'float-slow': 'floatSlow 4s ease-in-out infinite',
        'float-slower': 'floatSlower 6s ease-in-out infinite',
        'oil-drop': 'oilDrop 3s ease-in-out infinite',
        'leaf-fall': 'leafFall 4s ease-in-out infinite',
        'herb-grow': 'herbGrow 1s ease-out',
        'product-bounce': 'productBounce 2s ease-in-out infinite',
        'review-slide': 'reviewSlide 0.8s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'wave': 'wave 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        floatSlower: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-15px) translateX(10px)' },
        },
        oilDrop: {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0.8' },
          '50%': { transform: 'translateY(100px) scale(0.8)', opacity: '0.4' },
        },
        leafFall: {
          '0%': { transform: 'translateY(-100px) rotate(0deg)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(100px) rotate(180deg)', opacity: '0' },
        },
        herbGrow: {
          '0%': { transform: 'scale(0) rotate(-10deg)', opacity: '0' },
          '50%': { transform: 'scale(1.1) rotate(5deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        productBounce: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-15px) scale(1.05)' },
        },
        reviewSlide: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(29, 107, 76, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(29, 107, 76, 0.6)' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(5deg)' },
          '75%': { transform: 'rotate(-5deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      backgroundImage: {
        'nature-gradient': 'linear-gradient(135deg, #1d6b4c 0%, #5a6c57 50%, #8b9d83 100%)',
        'warm-gradient': 'linear-gradient(135deg, #6b4f2a 0%, #a78b5f 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.3), transparent)',
      },
      boxShadow: {
        'nature': '0 4px 20px rgba(29, 107, 76, 0.15)',
        'warm': '0 4px 20px rgba(107, 79, 42, 0.15)',
        'glow': '0 0 30px rgba(202, 138, 4, 0.2)',
      },
    },
  },
  plugins: [],
}

export default config
