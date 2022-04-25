import ArticleImageRenderer from "../../../renderComponents/ArticleImageRenderer";

export default {
  name: "articleImage",
  type: "object",
  title: "Article Image",
  fields: [
    {
      name: "image",
      type: "image",
      title: "Bilde",
      options: {
        hotspot: true,
      },
    },
    {
      name: "alt",
      type: "string",
      title: "Alt-tekst",
    },
    {
      name: "caption",
      title: "Bildetekst",
      type: "string",
    },
  ],
  preview: {
    component: ArticleImageRenderer,
  },
};
