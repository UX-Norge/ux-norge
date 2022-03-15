export default {
  name: "articleImage",
  type: "object",
  title: "Article Image",
  fields: [
    {
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "alt",
      type: "string",
      title: "Alt text",
    },
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
  ],
};
