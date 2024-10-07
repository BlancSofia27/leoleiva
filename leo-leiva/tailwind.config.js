/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        normal:'#222324',
        leo:'#ebd50f',
        celeste: "#2fae93",
        slate:"#cbd5e1",
        smooke: "#C4C4C4",
        whitee:"#c7ced8",
        greyStep:"#E8E8E8",
        },
        screens:{
          xs:'300px',
        }
    },
  },
  plugins: [],
}


