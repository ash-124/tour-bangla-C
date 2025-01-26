/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'banner-img': "url('https://i.pinimg.com/474x/fc/19/49/fc1949b6d97e4c425d0afbb61e3bcddd.jpg')",
      }
    },
  },
  plugins: [daisyui],
}

