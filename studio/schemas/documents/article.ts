import {
  ArticleImage,
  Category,
  PortableText,
  SanityDocument,
  SanitySlug,
  Author,
  Company,
} from "@Types";

export interface Article extends SanityDocument {
  mainImage?: ArticleImage;
  title: string;
  coverPageTitle?: string;
  description: string;
  authors: Author[];
  metaTitle?: string;
  company: Company;
  publishedAt: string;
  updatedAt: string;
  body: PortableText;
  slug: SanitySlug;
  relatedArticles?: Article[];
  category: Category;
  isReadersLetter?: boolean;
  isSponsoredContent?: boolean;
  slackMessageLink?: string;
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
      name: "coverPageTitle",
      title: "Forsidetittel",
      type: "string",
    },
    {
      name: "metaTitle",
      title: "Meta Title (optional)",
      type: "string",
      group: "metadata",
      description: "Egen tittel når artikkelen blir delt i SoMe og Google",
    },
    {
      name: "description",
      title: "Ingress",
      type: "text",
      description: "Vises i thumbnails på forsiden og i toppen av artikler",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "body",
      title: "Brødtekst",
      description:
        'Bruk "overskrift" som standard, hvis man trenger flere nivåer, kan man spe på med "underoverskrift"',
      type: "articleContent",
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
      name: "updatedAt",
      title: "Sist oppdatert",
      type: "datetime",
      group: "metadata"
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
      name: "isReadersLetter",
      title: "Leserinnlegg",
      type: "boolean",
    },
    {
      name: "isSponsoredContent",
      title: "Annonsørinnhold",
      type: "boolean",
    },
    {
      name: "slackMessageLink",
      title: "Link til Slackmeldingen",
      description:
        'Hover over en melding i Slack, finn "share message" og trykk "copy link"',
      type: "url",
    },
    {
      name: "company",
      validation: (Rule: any) => Rule.custom((value: any, {document}: any) => {
        if (!value && document.isSponsoredContent) {
          return "Artikkelen er merket som annonsørinnhold men mangler verdi i feltet 'firma'.";
        } else {
          return true;
        }
      }),
      type: "reference",
      group: "metadata",
      to: [{type: "company" }]
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
