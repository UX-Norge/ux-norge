export interface RelativeLink {
  name: string;
  url: string;
}

export default {
  name: "relativeLink",
  title: "Link",
  type: "object",
  fields: [
    {
      name: "name",
      title: "Navn",
      type: "string",
    },
    {
      name: "url",
      title: "url",
      type: "url",
      validation: (Rule: any) => Rule.uri({ relativeOnly: true }),
    },
  ],
};
