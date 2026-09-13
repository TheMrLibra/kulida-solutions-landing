/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"GT America Regular"', '"GT America Regular Placeholder"', 'sans-serif'],
        mono: ['"GT America Regular"', '"GT America Regular Placeholder"', 'sans-serif'],
      },
      colors: {
        duna: {
          canvas: '#FFFFFF',
          offwhite: '#FBFBF9',
          surface: '#F4F4F0',
          border: '#E6E4DF',
          dark: '#0D0D0C',
          darkcard: '#161614',
          muted: '#73706B',
          blue: '#0047FF',
          emerald: '#10B981',
        }
      },
      boxShadow: {
        'duna': '0 2px 10px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'duna-hover': '0 12px 32px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04)',
        'duna-glass': '0 20px 40px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
