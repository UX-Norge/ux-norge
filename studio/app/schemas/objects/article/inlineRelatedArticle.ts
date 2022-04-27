export default {
  name: "inlineRelatedArticle",
  title: "Relatert artikkel i teksten",
  type: "object",
  fields: [
    {
      name: "inlineRelatedArticle",
      title: "Relatert artikkel i teksten",
      type: "reference",
      to: [{ type: "article" }],
    },
  ],
};
