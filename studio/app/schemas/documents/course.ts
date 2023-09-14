import { Author } from "../schemaTypes";
import { PortableText, SanitySlug } from "../../../../types/sanityTypes";

export type Course = {
  _id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  price: string;
  location: string;
  courseHolder: Author;
  signUpLink: string;
  slug: SanitySlug;
  body: PortableText;
};

export default {
  name: "course",
  type: "document",
  groups: [
    {
      name: "metadata",
      title: "Metadata",
    },
  ],
  fields: [
    {
      name: "title",
      type: "string",
      title: "Tittel",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Ingress",
      type: "text",
      description: "Vises i thumbnails på forsiden og i toppen av siden",
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
      name: "date",
      title: "Dato",
      type: "date",
    },
    {
      name: "startTime",
      title: "StartTid",
      type: "string",
    },
    {
      name: "endTime",
      title: "StartTid",
      type: "string",
    },
    {
      name: "price",
      title: "Pris",
      type: "string",
    },
    {
      name: "location",
      title: "Sted",
      type: "string",
    },
    {
      name: "courseHolder",
      title: "Kursholder",
      type: "reference",
      to: [{ type: "author" }],
    },
    {
      name: "signUpLink",
      title: "Påmeldingslenke",
      type: "url",
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
  ],
};
