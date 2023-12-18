export default {
  name: "discussInSlack",
  title: "Discuss in slack",
  type: "document",
  fields: [
    {
      name: "title",
      title: "title",
      type: "string",
    },
    {
      name: "text",
      title: "text",
      type: "simpleBlockContent",
    },
  ],
};
