/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C96A3D",
        cream: "#FAF7F2",
        brown: "#3E2723",
        accent: "#D9B38C",
        olive: "#5C9E6E",
      },
    },
  },
  plugins: [],
};