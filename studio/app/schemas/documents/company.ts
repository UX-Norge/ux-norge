import { SanityDocument, SanityImage } from "@Types";

export interface Company extends SanityDocument {
  name: string;
  logo?: SanityImage;
  isPartner?: boolean;
}
export default {
  name: "company",
  title: "Company",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Navn",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Helst .svg",
    },
    {
      name: "isPartner",
      title: "Er støttespiller",
      type: "boolean",
    },
    // {
    //   name: "invoiceInformation",
    //   title: "invoiceInformation",
    //   type: "invoiceInformation",
    // },
  ],
  initialValue: {
    isPartner: false,
  },
  preview: {
    select: {
      name: "name",
      media: "logo",
      isPartner: "isPartner",
    },
    prepare({ name, media, isPartner }: any) {
      return {
        title: name,
        media,
        subtitle: isPartner ? "Støttespiller" : "",
      };
    },
  },
};
