import {
  ArticleImage,
  Category,
  PortableText,
  SanityDocument,
  SanitySlug,
  Author,
} from "@Types";

export interface Article extends SanityDocument {
  mainImage?: ArticleImage;
  title: string;
  description: string;
  authors: Author[];
  publishedAt: string;
  body: PortableText;
  slug: SanitySlug;
  relatedArticles?: Article[];
  category: Category;
  isFeature?: boolean;
  isReadersLetter?: boolean;
}

export default {
  name: "article",
  title: "Article",
  type: "document",
  groups: [
    {
      name: "metadata",
      title: "Metadata",
    },
  ],
  fields: [
    {
      name: "mainImage",
      title: "Hovedbilde",
      type: "articleImage",
    },
    {
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Ingress",
      type: "text",
      description: "Vises i thumbnails på forsiden og i toppen av artikler",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "authors",
      title: "Forfatter",
      type: "array",
      of: [{ type: "reference", to: [{ type: "author" }] }],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: "publishedAt",
      title: "Publiseringstidspunkt",
      type: "datetime",
      group: "metadata",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "body",
      title: "Brødtekst",
      type: "articleContent",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      group: "metadata",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "relatedArticles",
      type: "array",
      title: "Relaterte artikler",
      of: [{ type: "reference", to: [{ type: "article" }] }],
    },
    {
      name: "category",
      title: "Kategori",
      type: "reference",
      to: { type: "category" },
      group: "metadata",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "isFeature",
      title: "isFeature",
      type: "boolean",
    },
    {
      name: "isReadersLetter",
      title: "Leserinnlegg",
      type: "boolean",
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage.image",
      category: "category.name",
    },
    prepare({ title, media, category }: any) {
      return {
        title,
        subtitle: `${category}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Published at, Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  initialValue: {
    isReadersLetter: false,
  },
};
