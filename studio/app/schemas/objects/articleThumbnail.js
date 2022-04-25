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
  preview: {
    select: {
      title: "article.title",
      media: "article.mainImage",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title,
        media,
      };
    },
  },
};
