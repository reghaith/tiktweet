/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#0B0D10',
        card: '#141821',
        'card-foreground': '#E5E7EB',
        primary: '#3B82F6',
        secondary: '#EC4899',
        'primary-foreground': '#E5E7EB',
        'muted-foreground': '#9CA3AF',
      },
      backgroundImage: {
        'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
