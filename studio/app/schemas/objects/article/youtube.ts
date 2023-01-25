export default {
  name: "youtube",
  title: "Youtube",
  type: "object",
  fields: [
    { name: "url", type: "url", validation: (Rule) => Rule.required() },
    {
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};
