export default {
  name: "relatedArticle",
  title: "Related article",
  type: "object",
  fields: [
    {
      name: "article",
      type: "reference",
      title: "Relatert artikkel",
      to: [{ type: "article" }],
    },
  ],
};
