/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gcp-blue': {
          DEFAULT: '#1967D2',
          hover: '#1557B0',
        },
      },
    },
  },
  plugins: [],
}
