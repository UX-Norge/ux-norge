import { buildLegacyTheme } from "sanity";

const props = {
  "--black": "#3a3333",
  "--white": "#fff",
  "--brand-darkest": "var(--black)",
  "--brand-darkest--inverted": "color(var(--brand-darkest) contrast(80%))",
  "--brand-lightest": "var(--white)",
  "--brand-primary": "#7061EA",
  "--brand-primary--inverted": "color(var(--brand-primary) contrast(80%))",
  "--brand-secondary": "#1b4533",
  "--brand-secondary--inverted": "var(--brand-lightest)",

  "--font-family-base": '"Inter"',

  /* Navigation */
  "--main-navigation-color": "var(--brand-primary)",
  "--main-navigation-color--inverted":
    "color(var(--main-navigation-color) contrast(80%))",

  "--border-radius-base": "8px",

  /* Base */
  "--brand-faded": "color(var(--brand-primary) blend(var(--white) 60%))",
  "--gray-base": "color(var(--black) blend(var(--brand-faded) 50%))",
};

export const uxNorgeTheme = buildLegacyTheme({
  /* Base theme colors */
  "--black": props["--black"],
  "--white": props["--white"],

  "--gray": "#666",
  "--gray-base": "#666",

  "--component-bg": props["--white"],
  "--component-text-color": props["--black"],

  /* Brand */
  "--brand-primary": props["--brand-primary"],

  "--font-family-base": props["--font-family-base"],

  // Default button
  //   "--default-button-color": "#666",

  /* State */
  //   "--state-info-color": props["--my-blue"],
  //   "--state-success-color": props["--my-green"],
  //   "--state-warning-color": props["--my-yellow"],
  //   "--state-danger-color": props["--my-red"],

  /* Navbar */
  "--main-navigation-color": props["--brand-primary"],
//   "--main-navigation-color--inverted":
//     props["--main-navigation-color--inverted"],

//   "--focus-color": props["--my-blue"],
});
