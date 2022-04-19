module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    spacing: {
      1: "1px",
      2: "2px",
      4: "0.25rem",
      8: "0.5rem",
      16: "1rem",
      24: "1.5rem",
      32: "2rem",
      40: "2.5rem",
      48: "3rem",
      56: "3.5rem",
      64: "4rem",
      128: "8rem",
    },
    borderRadius: {
      DEFAULT: "1rem", // 16px
      lg: "1.5rem", // 24px,
      full: "9999px",
    },
    fontSize: {
      h1: ["3.5625rem", "1.4em"],
      h2: ["2.6875rem", "1.4em"],
      h3: ["2rem", "1.4em"],
      h4: ["1.5rem", "1.4em"],
      base: ["1rem", "1.6em"],
      sm: "0.875rem",
      xs: "0.75rem",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      display: ["Bitter", "serif"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
