/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      height: {
        100: "55rem",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
