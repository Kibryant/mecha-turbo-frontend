/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FE017F",
        secondary: "#0D0D0D",
      },
      fontFamily: {
        body: "Inter_400Regular",
        heading1: "Inter_800ExtraBold",
        headingBold: "Inter_700Bold",
        heading3: "Inter_600SemiBold",
      },
    },
  },
  plugins: [],
};
