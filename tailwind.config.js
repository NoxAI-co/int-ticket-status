/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter"],
    },
    extend: {
      colors: {
        primary: "#63ECBC",
        secondary: "#001128",
        tertiary: "#D9F3F0",
        quaternary: "#F3F9FF",
      },
    },
  },
  plugins: [],
};