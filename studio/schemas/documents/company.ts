import {
  ArticleImage,
  PortableText,
  SanityDocument,
  SanityImage,
  SanitySlug,
} from "@Types";
import { PasswordGenerator } from "../../components/inputs/passwordGenerator";
import { CompanyArticlesInput } from "../../components/inputs/companyArticlesInput";

export interface Company extends SanityDocument {
  name: string;
  logo?: SanityImage;
  isPartner?: boolean;
  slug?: SanitySlug;
  partnerTitle?: string;
  partnerMainImage?: ArticleImage;
  partnerDescription?: string;
  partnerBody?: PortableText;
}

const onlyWhenPartner = ({ document }: { document?: Company }) =>
  !document?.isPartner;

export default {
  name: "company",
  title: "Company",
  type: "document",
  groups: [
    { name: "company", title: "Bedrift", default: true },
    { name: "partnerPage", title: "Partnerside" },
  ],
  fields: [
    {
      name: "name",
      title: "Navn*",
      type: "string",
      group: "company",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Helst .svg",
      group: "company",
    },
    {
      name: "code",
      title: "Firmakode",
      type: "string",
      group: "company",
      components: {
        input: PasswordGenerator,
      },
    },
    {
      name: "isPartner",
      title: "Er støttespiller",
      type: "boolean",
      group: "partnerPage",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "partnerPage",
      options: {
        source: "name",
        maxLength: 96,
      },
      hidden: onlyWhenPartner,
      validation: (Rule: any) =>
        Rule.custom((slug: SanitySlug | undefined, context: any) => {
          if (context.document?.isPartner && !slug?.current) {
            return "Slug er påkrevd for støttespillere";
          }
          return true;
        }),
    },
    {
      name: "partnerTitle",
      title: "Tittel",
      type: "string",
      group: "partnerPage",
      hidden: onlyWhenPartner,
    },
    {
      name: "partnerMainImage",
      title: "Hovedbilde",
      type: "articleImage",
      group: "partnerPage",
      hidden: onlyWhenPartner,
    },
    {
      name: "partnerDescription",
      title: "Ingress",
      type: "text",
      group: "partnerPage",
      hidden: onlyWhenPartner,
    },
    {
      name: "partnerBody",
      title: "Brødtekst",
      type: "articleContent",
      group: "partnerPage",
      hidden: onlyWhenPartner,
    },
    {
      name: "companyArticles",
      title: "Bedriftens artikler",
      type: "string",
      group: "partnerPage",
      readOnly: true,
      components: {
        input: CompanyArticlesInput,
      },
      hidden: onlyWhenPartner,
    },
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
