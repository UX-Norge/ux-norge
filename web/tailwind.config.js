module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      gray: {
        0: "var(--color-neutral-0)",
        100: "var(--color-neutral-100)",
        200: "var(--color-neutral-200)",
        300: "var(--color-neutral-300)",
        400: "var(--color-neutral-400)",
        500: "var(--color-neutral-500)",
        600: "var(--color-neutral-600)",
        700: "var(--color-neutral-700)",
        800: "var(--color-neutral-800)",
        900: "var(--color-neutral-900)",
      },
      primary: {
        100: "var(--color-primary-100)",
        400: "var(--color-primary-400)",
        500: "var(--color-primary-500)",
      },
      green: {
        900: "var(--color-green-900)",
        600: "var(--color-green-600)",
        500: "var(--color-green-500)",
        300: "var(--color-green-300)",
        100: "var(--color-green-100)",
      },
      orange: {
        500: "var(--color-orange-500)",
        400: "var(--color-orange-400)",
      },
      blue: {
        900: "var(--color-blue-900)",
        700: "var(--color-blue-700)",
        600: "var(--color-blue-600)",
        500: "var(--color-blue-500)",
        200: "var(--color-blue-200)",
        100: "var(--color-blue-100)",
        50: "var(--color-blue-50)",
      },
      yellow: {
        500: "var(--color-yellow-500)",
        200: "var(--color-yellow-200)",
        100: "var(--color-yellow-100)",
        50: "var(--color-yellow-50)",
      },
    },
    spacing: {
      0: 0,
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
      80: "5rem",
      128: "8rem",
    },
    borderRadius: {
      DEFAULT: "1rem", // 16px
      lg: "1.5rem", // 24px,
      xl: "8rem", //64px
      full: "9999px",
    },
    fontSize: {
      h1: ["3rem", "1.4em"], //48px
      h2: ["2rem", "1.4em"], // 32px
      h3: ["1.5rem", "1.4em"], //24px
      h4: ["1.125rem", "1.4em"], // 18px
      base: "1rem",
      sm: "0.875rem",
      xs: "0.75rem",
    },
    fontFamily: {
      sans: ["DM Sans", "sans-serif"],
      mono: ["Jetbrains Mono", "monospace"],
    },
    boxShadow: {
      door: "5px 0px 0px #000",
    },
    // Extends
    extend: {
      height: {
        aboveFold: "80vh",
      },
      maxWidth: {
        "page-sm": 900,
        page: 1400,
        prose: 700,
      },
      lineHeight: {
        relaxed: 1.8,
      },
      transitionTimingFunction: {
        door: "cubic-bezier(.74,0,.39,1.31)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
