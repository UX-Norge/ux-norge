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
      name: 'footerHeading',
      title: 'Footeroverskrift',
      type: 'string'
    },
    {
      name: 'footerText',
      title: 'Footertekst',
      type: 'array',
      of: [{ type: 'block' }]
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
