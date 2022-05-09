require("dotenv").config();
const sanityClient = require("@sanity/client");
const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  // Need a write token in order to read schedule metadata and publish documents
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

module.exports = client;
