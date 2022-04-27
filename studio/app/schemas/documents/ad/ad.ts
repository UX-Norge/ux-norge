import {
  AdPackageType,
  Company,
  PortableText,
  SanityDocument,
  SanityImage,
} from "@Types";

import showAdDuration from "../../../components/input/showAdDuration";

export interface Ad extends SanityDocument {
  title: string;
  text: PortableText;
  image: SanityImage;
  jobType: "fulltid" | "deltid" | "sommerjobb";
  location: "string";
  link: string;
  startDate: string;
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
  ],
  fields: [
    {
      name: "title",
      title: "title",
      type: "string",
      group: "content",
    },
    {
      name: "text",
      title: "text",
      type: "simpleBlockContent",
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
    },
    {
      name: "location",
      type: "autocomplete",
      title: "Sted",
      options: {
        autocompleteFieldPath: "location",
        options: [{ value: "Trondheim" }, { value: "Oslo" }],
        groq: {
          query: '*[_type == $type] { "value": location }',
          params: {
            type: "ad",
          },
          transform: (values: any) => values,
        },
      },
    },
    {
      name: "link",
      title: "link",
      type: "url",
      group: "content",
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
    },
    {
      name: "advertiser",
      title: "Annonsør",
      type: "reference",
      to: [{ type: "company" }],
      group: "settings",
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
