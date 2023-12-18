import { Cta, Document } from "@Types";

export interface Footer {
  contactInformation: string[];
  pages: (Cta | Document)[];
  resources: (Cta | Document)[];
}

export default {
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    {
      name: "contactInformation",
      title: "Kontaktinformasjon",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "pages",
      type: "array",
      title: "Sider",
      of: [{ type: "reference", to: [{ type: "doc" }] }, { type: "cta" }],
    },
    {
      name: "resources",
      type: "array",
      title: "Ressurser",
      of: [{ type: "reference", to: [{ type: "doc" }] }, { type: "cta" }],
    },
  ],
};
