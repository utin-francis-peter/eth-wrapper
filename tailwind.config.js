/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgba(236, 102, 255, 0.6)",
        primaryLight: "rgba(236, 102, 255, 0.9)",
      },
    },
  },
  plugins: [],
};
