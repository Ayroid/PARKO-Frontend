/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      width:{
        '100':'100rem',
      },
      height:{
        '30':'30rem',
        '25':'20rem',
      },
      fontFamily: {
        Nunito: ['Nunito', 'sans'],
      },

    },
  },
  plugins: [],
}

