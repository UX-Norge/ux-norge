import { SanityDocument } from "@Types";
export interface AdLocation extends SanityDocument {
  name: string;
}

export default {
  name: "adLocation",
  title: "Ad location",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Navn",
      type: "string",
    },
  ],
};
