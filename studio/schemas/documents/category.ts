import { SanityDocument, SanitySlug } from "@Types";
import { SlugWithUrl } from "../../components/inputs/SlugWithUrl";

export interface Category extends SanityDocument {
  name: string;
  slug: SanitySlug;
}

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Navn*',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug*',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule: any) => Rule.required(),
      components: {
        input: SlugWithUrl,
      },
    },
  ],
};
