import { PortableText, Cta } from "@Types";
import { FiFile } from "react-icons/fi";

export type PageType = {
  title: string;
  text: string;
  cta: Cta;
  emptyState: PortableText;
};
export default {
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
    },
    {
      name: "text",
      title: "Introduksjon",
      type: "text",
    },
    {
      name: "cta",
      title: "Button",
      type: "cta",
    },
    {
      name: "emptyState",
      title: "Empty State",
      type: "simpleBlockContent",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }: any) {
      return {
        title: title,
        subtitle: "Side",
        media: FiFile,
      };
    },
  },
};
