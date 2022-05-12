import {
  AdPackageType,
  Company,
  PortableText,
  SanityDocument,
  SanityImage,
  SanitySlug,
  AdLocation,
} from "@Types";

import showAdDuration from "../../../components/input/showAdDuration";

export interface Ad extends SanityDocument {
  title: string;
  slug: SanitySlug;
  description: string;
  body: PortableText;
  image: SanityImage;
  jobType: "fulltid" | "deltid" | "sommerjobb";
  location: AdLocation[];
  link: string;
  startDate: string;
  deadline: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  packageType: AdPackageType;
  advertiser: Company;
}

export default {
  name: "ad",
  title: "Ad",
  type: "document",
  groups: [
    { name: "content", title: "Annonseinnhold" },
    { name: "settings", title: "Annonseinnstillinger" },
    { name: "contactPerson", title: "Kontaktperson" },
  ],
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      group: "content",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Ingress",
      type: "text",
      group: "content",
      validation: (Rule: any) => Rule.max(200),
    },
    {
      name: "body",
      title: "Innhold",
      type: "blockContent",
      group: "content",
    },
    {
      name: "image",
      title: "image",
      type: "image",
      options: { hotspot: true },
      group: "content",
    },
    {
      name: "jobType",
      title: "Jobbtype",
      type: "string",
      options: {
        list: ["fulltid", "deltid", "sommerjobb"],
      },
      group: "content",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "location",
      type: "array",
      title: "Sted",
      of: [{ type: "reference", to: [{ type: "adLocation" }] }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "link",
      title: "link",
      type: "url",
      group: "content",
    },

    {
      name: "deadline",
      title: "Deadline",
      type: "date",
      description: 'Hvis denne står tom, skriver vi "løpende"',
    },
    {
      name: "contactName",
      title: "Navn (kontaktperson)",
      type: "string",
      group: "contactPerson",
    },
    {
      name: "contactPhone",
      title: "Mobil (kontaktperson)",
      type: "string",
      group: "contactPerson",
    },
    {
      name: "contactEmail",
      title: "E-post (kontaktperson)",
      type: "string",
      group: "contactPerson",
    },
    {
      name: "startDate",
      title: "Startdato",
      type: "date",
      validation: (Rule: any) => Rule.required(),
      group: "settings",
    },
    {
      name: "endDate",
      type: "string",
      title: "Sluttdato",
      group: "settings",
      readonly: true,
      inputComponent: showAdDuration,
    },
    {
      name: "packageType",
      title: "Pakketype",
      type: "reference",
      to: [{ type: "adPackageType" }],
      group: "settings",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "advertiser",
      title: "Annonsør",
      type: "reference",
      to: [{ type: "company" }],
      group: "settings",
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
      startDate: "startDate",
      endDate: "endDate",
      advertiser: "advertiser.name",
    },
    prepare(selection: any) {
      const { title, startDate, endDate, advertiser } = selection;
      let media = "";
      if (!!startDate && !!endDate) {
        const isActive = new Date(endDate) > new Date();
        const isPending = new Date(startDate) > new Date();
        media = isPending ? "🟡" : isActive ? "🟢" : "";
      }
      return {
        title,
        subtitle: advertiser,
        media,
      };
    },
  },
  initialValue: {
    fullTime: true,
  },
};
