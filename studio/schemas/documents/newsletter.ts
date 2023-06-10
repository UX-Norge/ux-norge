export default {
  name: "newsletter",
  title: "Newsletter",
  type: "document",
  fields: [
    {
      name: "subject",
      title: "Subject",
      type: "string",
    },
    {
      name: "publishedAt",
      title: "Publiseringstidspunkt",
      type: "datetime",
    },
    {
      name: "content",
      title: "Egen tekst",
      type: "blockContent",
    },
    {
      name: "articles",
      type: "array",
      title: "Artikler",
      of: [{ type: "reference", to: [{ type: "article" }] }],
    },
    {
      name: "ads",
      type: "array",
      title: "Annonser",
      of: [{ type: "reference", to: [{ type: "ad" }] }],
    },
  ],
};
