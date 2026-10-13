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
  preview: {
    select: {
      title: "inlineRelatedArticle.title",
      media: "inlineRelatedArticle.mainImage.image",
      category: "inlineRelatedArticle.category.name",
    },
    prepare({ title, category, media }: any) {
      return {
        title: title || "Relatert artikkel (ikke valgt)",
        subtitle: category || "Relatert artikkel i teksten",
        media,
      };
    },
  },
};
