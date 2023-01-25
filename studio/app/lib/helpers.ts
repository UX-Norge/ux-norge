import sanityConfig from "../../sanity.json";
const sanityClient = require("@sanity/client");

export const client = sanityClient({
  projectId: sanityConfig.api.projectId,
  dataset: sanityConfig.api.dataset,
  apiVersion: "2022-04-25", // use current UTC date - see "specifying API version"!
});

export const toLocaleDateString = (date) => {
  return new Date(date).toLocaleDateString("no-NO", { dateStyle: "medium" });
};

export const required = {
  codegen: { required: true },
  validation: (Rule) => Rule.required(),
};
