/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed',   // Purple accent
        farmGreen: '#16a34a', // Green accent
      },
    },
  },
  plugins: [],
};