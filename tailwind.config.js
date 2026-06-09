/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Khai báo các file chứa class Tailwind
  ],
  theme: {
    extend: {
      fontFamily: { 
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        orange: {
          50: '#fff4ed', 
          100: '#ffe5d3', 
          200: '#ffc8a5', 
          300: '#ffa46d', 
          400: '#ff762b', 
          500: '#ff5c00', // Màu chủ đạo của dự án
          600: '#ef4400',
        }
      }
    },
  },
  plugins: [],
}