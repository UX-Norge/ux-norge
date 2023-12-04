import { Document } from "@Types";

export interface PartnerBanner {
  title: string;
  buttonText: string;
  page: Document;
}

export default {
  name: "partnerBanner",
  title: "Partner banner",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
    },
    {
      name: "buttonText",
      title: "Knapptekst",
      type: "string",
    },
    {
      name: "page",
      title: "Link til",
      type: "reference",
      to: [{ type: "doc" }],
    },
  ],
};
