const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      white: colors.white,
      main: "#F4D0A1",
      mainDark: "#A8885E",
      mainLight: "#FFE4C2",
      secondary: "#4D88A8",
      secondary2: "#A2D7F5",
    },
  },
  plugins: [],
};
