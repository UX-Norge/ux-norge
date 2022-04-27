import { SanityDocument } from "@Types";

export interface Category extends SanityDocument {
  name: String;
}

export default {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Navn",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
  ],
};
