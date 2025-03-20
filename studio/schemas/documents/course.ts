import { PortableText, SanitySlug } from "../../../types/sanityTypes";
import { AdLocation, Author } from "../schemaTypes";

export type Course = {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  price: string;
  venue: string;
  location: AdLocation;
  courseHolders: Author[];
  signUpLink: string;
  slug: SanitySlug;
  body: PortableText;
};

export default {
  name: 'course',
  type: 'document',
  groups: [
    {
      name: 'metadata',
      title: 'Metadata',
    },
  ],
  fieldsets: [
    {
      name: 'dato',
      title: 'Dato',
      options: { columns: 2 },
    },
    {
      name: 'tidspunkt',
      title: 'Klokkeslett',
      options: { columns: 2 },
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Tittel*',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Ingress*',
      type: 'text',
      description: 'Vises i thumbnails på forsiden og i toppen av siden',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Brødtekst*',
      description:
        'Bruk "overskrift" som standard, hvis man trenger flere nivåer, kan man spe på med "underoverskrift"',
      type: 'articleContent',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'startDate',
      title: 'Startdato*',
      type: 'date',
      fieldset: 'dato',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'endDate',
      title: 'Sluttdato',
      type: 'date',
      fieldset: 'dato',
      validation: (Rule: any) =>
        Rule.custom((endDate: string, context: { document: Course }) => {
          const startDate = context.document.startDate;
          if (!endDate || !startDate) {
            return true; // Validation is considered successful if either date is not set
          }
          return startDate <= endDate
            ? true
            : 'Sluttdato må være etter startdato';
        }).required(),
    },
    {
      name: 'startTime',
      title: 'Starttid*',
      type: 'string',
      fieldset: 'tidspunkt',
      validation: (Rule: any) =>
        Rule.required().custom((startTime: string) => {
          const isValidTimeFormat = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(
            startTime
          );
          return isValidTimeFormat || 'Starttid må være i formatet HH:MM';
        }),
    },
    {
      name: 'endTime',
      title: 'Sluttid',
      fieldset: 'tidspunkt',
      type: 'string',
      validation: (Rule: any) =>
        Rule.custom((endTime: string, context: { document: Course }) => {
          const { startDate, startTime, endDate } = context.document;
          if (!endTime || !startTime) {
            return true; // Validation is considered successful if either time is not set
          }
          const isValidTimeFormat = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(
            endTime
          );
          if (!isValidTimeFormat) {
            return 'Sluttid må være i formatet HH:MM';
          }
          if (startDate === endDate) {
            // If dates are the same, compare times
            const start = new Date(`1970/01/01 ${startTime}`);
            const end = new Date(`1970/01/01 ${endTime}`);
            return start < end ? true : 'Sluttid må være etter starttid';
          }
          return true;
        }),
    },
    {
      name: 'price',
      title: 'Pris',
      type: 'string',
    },
    {
      name: 'location',
      type: 'reference',
      title: 'Sted',
      to: [{ type: 'adLocation' }],
    },
    {
      name: 'venue',
      title: 'Venue',
      type: 'string',
    },
    {
      name: 'courseHolders',
      title: 'Kursholdere',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'author' }] }],
    },
    {
      name: 'signUpLink',
      title: 'Påmeldingslenke',
      type: 'url',
    },
    {
      name: 'slug',
      title: 'Slug*',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'metadata',
      validation: (Rule: any) => Rule.required(),
    },
  ],
};
