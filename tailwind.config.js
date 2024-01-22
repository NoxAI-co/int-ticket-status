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

      backgroundImage: theme => ({
        'gradient-buttons': 'radial-gradient(ellipse at bottom, #65ecbd 31.03%, #26c78f 99.96%)',
        'gradient-linear': 'linear-gradient(182deg, #63ECBC 31.03%, #26c78f 99.96%)'
     })
    },
  },
  plugins: [],
};
