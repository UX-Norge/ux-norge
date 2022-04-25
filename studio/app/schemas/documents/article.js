import { required } from "../../lib/helpers";

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
      ...required,
    },
    {
      name: "title",
      title: "Tittel",
      type: "string",
      ...required,
    },
    {
      name: "description",
      title: "Ingress",
      type: "text",
      description: "Vises i thumbnails på forsiden og i toppen av artikler",
      ...required,
    },
    {
      name: "author",
      title: "Forfatter",
      type: "reference",
      to: { type: "author" },
      ...required,
    },
    {
      name: "publishedAt",
      title: "Publiseringstidspunkt",
      type: "datetime",
      group: "metadata",
      ...required,
    },
    {
      name: "body",
      title: "Brødtekst",
      type: "articleContent",
      ...required,
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
      ...required,
    },
    {
      name: "relatedArticles",
      type: "array",
      title: "Relaterte artikler",
      of: [{ type: "reference", to: [{ type: "article" }] }],
    },
    {
      name: "ads",
      title: "Stillingsannonser",
      description: "Hvis dere ønsker å overskrive annonser, kan det gjøres her",
      type: "array",
      of: [{ type: "reference", to: [{ type: "ad" }] }],
    },
    {
      name: "category",
      title: "Kategori",
      type: "reference",
      to: { type: "category" },
      group: "metadata",
      ...required,
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
      author: "author.name",
      media: "mainImage.image",
      category: "category.name",
    },
    prepare({ title, media, author, category }) {
      return {
        title,
        subtitle: `${category} | ${author}`,
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
};
