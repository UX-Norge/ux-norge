import { SanityDocument, SanityImage } from "@Types";
import { PasswordGenerator } from "../../components/inputs/passwordGenerator";

export interface Company extends SanityDocument {
  name: string;
  logo?: SanityImage;
  isPartner?: boolean;
}
export default {
  name: 'company',
  title: 'Company',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Navn*',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Helst .svg',
    },
    {
      name: 'isPartner',
      title: 'Er støttespiller',
      type: 'boolean',
    },
    {
      name: 'code',
      title: 'Firmakode',
      type: 'string',
      components: {
        input: PasswordGenerator,
      },
    },
  ],
  initialValue: {
    isPartner: false,
  },
  preview: {
    select: {
      name: 'name',
      media: 'logo',
      isPartner: 'isPartner',
    },
    prepare({ name, media, isPartner }: any) {
      return {
        title: name,
        media,
        subtitle: isPartner ? 'Støttespiller' : '',
      };
    },
  },
};
