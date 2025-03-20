import { PortableText, SanityDocument, SanitySlug, Link } from "@Types";
import { FiFileText } from "react-icons/fi";

export interface Document extends SanityDocument {
  _type: string;
  title: string;
  description: string;
  cta: Link;
  slug: SanitySlug;
  body: PortableText;
}

export default {
  name: 'doc',
  title: 'Document',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'title*',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'description*',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Innhold*',
      type: 'blockContent',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'cta',
      title: 'cta',
      type: 'cta',
    },
    {
      name: 'slug',
      title: 'Slug*',
      type: 'slug',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }: any) {
      return {
        title: title,
        subtitle: "Dokument",
        media: FiFileText,
      };
    },
  },
};
