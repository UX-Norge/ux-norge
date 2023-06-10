import { hasExpired } from "../../../../web/src/features/ad/lib/adHelpers";

import {
  AdPackageType,
  Company,
  PortableText,
  SanityDocument,
  SanityImage,
  SanitySlug,
  AdLocation,
} from "@Types";

import ShowAdDuration from "../../../components/inputs/showAdDuration";

export interface Ad extends SanityDocument {
  title: string;
  slug: SanitySlug;
  description: string;
  body: PortableText;
  image: SanityImage;
  jobType: "fulltid" | "deltid" | "sommerjobb";
  location: AdLocation[];
  remote: boolean;
  startDate: string;
  link: string;
  linkText: string;
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
      type: "adContent",
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
      name: "remote",
      title: "Remote?",
      type: "boolean",
    },
    {
      name: "link",
      title: "link",
      type: "url",
      group: "content",
    },
    {
      name: "linkText",
      title: "Tekst på lenke-knappen",
      type: "string",
      group: "content",
      description: 'Hvis denne står tom, skriver vi "Søk her"',
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
      components: {
        input: ShowAdDuration,
      },
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
      duration: "packageType.duration",
      adType: "packageType.name",
    },
    prepare(selection: any) {
      const { title, startDate, advertiser, duration, adType, deadline } =
        selection;
      let media = "";
      if (!!startDate && !!duration) {
        const isActive = !hasExpired(startDate, duration, deadline);
        const isPending = new Date(startDate) > new Date();
        media = isPending ? "🟡" : isActive ? "🟢" : "";
      }
      return {
        title,
        subtitle: `${media} ${advertiser} | ${adType}`,
      };
    },
  },
  orderings: [
    {
      title: "Start date, Newest first",
      name: "startDate",
      by: [{ field: "startDate", direction: "desc" }],
    },
  ],
};
