import {
  PortableText,
  SanityDocument,
  SanityImage,
  SanitySlug,
  Company,
} from "@Types";

export interface Author extends SanityDocument {
  name: string;
  slug: SanitySlug;
  company?: Company;
  email?: string;
  image?: SanityImage;
  bio?: PortableText;
}

export default {
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Fullt navn",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "company",
      title: "company",
      type: "reference",
      to: [{ type: "company" }],
    },
    {
      name: "email",
      title: "E-post",
      type: "string",
    },
    {
      name: "image",
      title: "Portrett",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "bio",
      title: "Bio",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
};
