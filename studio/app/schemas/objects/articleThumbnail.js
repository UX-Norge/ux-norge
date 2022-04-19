export default {
  name: "articleThumbnail",
  title: "Article thumbnail",
  type: "object",
  fields: [
    {
      name: "article",
      title: "Artikkel",
      type: "reference",
      to: [{ type: "article" }],
    },
  ],
};
