export interface Cta {
  _type: string;
  text: string;
  url: string;
}

export default {
  name: "cta",
  title: "CTA",
  type: "object",
  fields: [
    {
      name: "text",
      title: "Tekst",
      type: "string",
    },
    {
      name: "url",
      title: "Link",
      type: "url",
      validation: (Rule: any) => Rule.uri({ allowRelative: true }),
    },
  ],
};
