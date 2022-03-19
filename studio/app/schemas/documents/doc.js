export default {
  name: "doc",
  title: "Document",
  type: "document",
  fields: [
    {
      name: "title",
      title: "title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
    },
    {
      name: "body",
      title: "Innhold",
      type: "blockContent",
    },
  ],
};
