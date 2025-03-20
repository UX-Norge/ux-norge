export default {
  name: "youtube",
  title: "Youtube",
  type: "object",
  fields: [
    { name: "url", type: "url", validation: (Rule: any) => Rule.required() },
    {
      name: "title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
  ],
};
