import { PortableText, SanityDocument, SanitySlug } from "@Types";

export interface Document extends SanityDocument {
  title: string;
  slug: SanitySlug;
  body: PortableText;
}

export default {
  name: "doc",
  title: "Document",
  type: "document",
  fields: [
    {
      name: "title",
      title: "title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "body",
      title: "Innhold",
      type: "blockContent",
      validation: (Rule: any) => Rule.required(),
    },
  ],
};
