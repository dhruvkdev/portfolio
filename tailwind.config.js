/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#F3EFE7',
        primary: '#171717',
        accent: '#A94F35',
        secondary: '#68645D',
        rules: '#292722',
      },
    },
  },
  plugins: [],
}