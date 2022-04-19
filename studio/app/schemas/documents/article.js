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
      type: "image",
      options: {
        hotspot: true,
      },
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
      name: "categories",
      title: "Kategori",
      type: "reference",
      to: { type: "category" },
      group: "metadata",
      ...required,
    },
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};
