const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      main: "#E9E5BA",
      mainDark: "#696754",
      mainLight: "#ECE276",
      secondary: "#696434",
      secondaryLight: "#B5B291",
    },
    fontFamily: {
      title: ["Mate\\ SC", "serif"],
      body: ['Darker\\ Grotesque', 'sans-serif'],
    },
  },
  plugins: [],
};
