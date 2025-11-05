module.exports = {
  darkMode: 'media',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        'niabi-green': '#024731',
        'niabi-emerald': '#0d5e42',
        'niabi-yellow': '#f6e05e',
        'niabi-cream': '#fff8dc',
        'niabi-navy': '#0a1a1f',
      },
      backgroundImage: {
        'niabi-gradient': 'linear-gradient(145deg, #0d5e42 0%, #136f4c 100%)',
      },
      fontFamily: {
        niabi: ['"Open Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
      },
    },
  },
  plugins: [],
};