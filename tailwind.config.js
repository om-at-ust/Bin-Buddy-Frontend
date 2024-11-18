/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'eco-green': {
          50: '#f0fdf4',  // Very light green
          100: '#dcfce7', // Light green
          200: '#bbf7d0', // Slightly darker
        }
      }
    },
  },
  plugins: [],
}