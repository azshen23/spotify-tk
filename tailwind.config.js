module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1db954",
        secondary: "#212121",
        tertiary: "#121212",
        sNuetral: "#535353",
        sNeutralLight: "#b3b3b3",
      },
    },
  },
  plugins: [],
};
