import { SanityDocument, SanitySlug } from "@Types";

export interface Category extends SanityDocument {
  name: String;
  slug: SanitySlug;
}

export default {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Navn",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
};
