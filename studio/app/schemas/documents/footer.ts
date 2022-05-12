import { RelativeLink } from "@Types";

export interface Footer {
  contactInformation: string[];
  pages: RelativeLink[];
  resources: RelativeLink[];
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
      of: [{ type: "relativeLink" }],
    },
    {
      name: "resources",
      type: "array",
      title: "Ressurser",
      of: [{ type: "relativeLink" }],
    },
  ],
};
