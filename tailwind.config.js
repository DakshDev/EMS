/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "priBgClr" : "var(--priBgClr)",
        "priBgClr2" : "var(--priBgClr2)",
        "focusClr" : "var(--focusClr)",
        "focusClr2" : "var(--focusClr2)",
        "boxClr" : "var(--boxClr)",
        "mainClr" : "var(--mainClr)",
      }
    },
  },
  plugins: [],
}

