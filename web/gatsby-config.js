const path = require("path");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const isProd = process.env.NODE_ENV === "production";
const previewEnabled =
  (process.env.GATSBY_IS_PREVIEW || "false").toLowerCase() === "true";

const siteUrl = `https://uxnorge.no`;

module.exports = {
  siteMetadata: {
    title: `UX Norge`,
    siteUrl,
  },
  plugins: [
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        token: process.env.SANITY_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd || previewEnabled,
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
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: siteUrl,
        sitemap: siteUrl + "/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-plugin-plausible`,
      options: {
        domain: `uxnorge.no`,
      },
    },
    "gatsby-plugin-sitemap",
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    "gatsby-plugin-postcss",
    "gatsby-plugin-netlify",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/logo.svg",
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        "@Types": path.join(__dirname, "..", "types"),
        "@Ui": path.join(__dirname, "src", "ui"),
        "@Features": path.join(__dirname, "src", "features"),
        "@Images": path.join(__dirname, "src", "images"),
        "@Lib": path.join(__dirname, "src", "lib"),
        "@Components": path.join(__dirname, "src", "components"),
      },
    },
  ],
};
