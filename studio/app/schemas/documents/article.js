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
    },
    {
      name: "title",
      title: "Tittel",
      type: "string",
    },
    {
      name: "description",
      title: "Ingress",
      type: "text",
    },
    {
      name: "author",
      title: "Forfatter",
      type: "reference",
      to: { type: "author" },
    },
    {
      name: "publishedAt",
      title: "Publiseringstidspunkt",
      type: "datetime",
      group: "metadata",
    },
    {
      name: "body",
      title: "Brødtekst",
      type: "articleContent",
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
