/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-blue-600',
    'bg-green-600',
    'bg-purple-600',
    'bg-yellow-600',
  ],
}
