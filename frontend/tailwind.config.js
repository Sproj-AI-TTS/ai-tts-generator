/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    "./node_modules/react-tailwindcss-select/dist/index.esm.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E8EAED",
        stext: "#529AF2",
        etext: "#9AB7EC",
        background: "#0E0E0E",
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}