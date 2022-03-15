require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  siteMetadata: {
    title: `UX Norge`,
    siteUrl: `https://uxnorge.no`,
  },
  plugins: [
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        token: process.env.SANITY_TOKEN,
        watchMode: isDev,
        overlayDrafts: isDev,
      },
    },
    {
      resolve: "gatsby-plugin-sanity-image",
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
  ],
};
