/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Pastel Color Palette
        primary: {
          50: '#f3f0ff',
          100: '#e9e2ff',
          200: '#d6c9ff',
          300: '#b8a3ff',
          400: '#9575ff',
          500: '#A78BFA', // Soft Purple - Primary
          600: '#8B5CF6',
          700: '#7C3AED',
          800: '#6B21A8',
          900: '#581C87',
        },
        secondary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6EE7B7', // Mint Green - Secondary
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        accent: {
          peach: '#FDBA74', // Peach
          lightBlue: '#93C5FD', // Light Blue
          coral: '#F87171',
        },
        background: {
          primary: '#FDFDFD', // Off-White
          card: '#FFFFFF', // Pure White
        },
        text: {
          primary: '#374151', // Charcoal
          secondary: '#6B7280',
          muted: '#9CA3AF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};