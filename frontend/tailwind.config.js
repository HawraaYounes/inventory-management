/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff", // White
        secondary: "#fff3e3", // Light Peach
        accent: "#B88E2F", // Golden Brown (warnings)
        danger: "#E97171", // Light Red (errors)
        success: "#2EC189", // Teal Green (success messages)
        light: "#FAF3EA", // Off White
        graydarkest: "#333333", // Darkest Gray (informational messages)
        graydarker: "#666666", // Darker Gray
        graydark: "#898989", // Medium Gray
        gray: "#9F9F9F",
        graylight: "#B0B0B0", // Light Gray
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        abhaya: ["Abhaya Libre", "serif"],
      },
    },
  },

  plugins: [],
};
