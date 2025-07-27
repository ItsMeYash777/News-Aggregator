/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f9fa',
          100: '#f1f3f4',
          200: '#e8eaed',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        background: {
          light: '#ffffff',
          dark: '#0f0f0f',
        },
        surface: {
          light: '#f8f9fa',
          dark: '#1a1a1a',
        },
        text: {
          primary: {
            light: '#111827',
            dark: '#f9fafb',
          },
          secondary: {
            light: '#6b7280',
            dark: '#9ca3af',
          }
        },
        border: {
          light: '#e5e7eb',
          dark: '#374151',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
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
      },
    },
  },
  plugins: [],
};
