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
  hasPartnerPage?: boolean;
  slug?: SanitySlug;
  partnerTitle?: string;
  partnerMainImage?: ArticleImage;
  partnerDescription?: string;
  partnerBody?: PortableText;
}

const onlyWhenNoPartnerPage = ({ document }: { document?: Company }) =>
  !document?.hasPartnerPage;

export default {
  name: "company",
  title: "Company",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Navn*",
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
      name: "code",
      title: "Firmakode",
      type: "string",
      components: {
        input: PasswordGenerator,
      },
    },
    {
      name: "isPartner",
      title: "Er støttespiller",
      type: "boolean",
    },
    {
      name: "hasPartnerPage",
      title: "Har partnerside",
      type: "boolean",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      hidden: onlyWhenNoPartnerPage,
      validation: (Rule: any) =>
        Rule.custom((slug: SanitySlug | undefined, context: any) => {
          if (context.document?.hasPartnerPage && !slug?.current) {
            return "Slug er påkrevd for bedrifter med partnerside";
          }
          return true;
        }),
    },
    {
      name: "partnerTitle",
      title: "Tittel",
      type: "string",
      hidden: onlyWhenNoPartnerPage,
    },
    {
      name: "partnerMainImage",
      title: "Hovedbilde",
      type: "articleImage",
      hidden: onlyWhenNoPartnerPage,
    },
    {
      name: "partnerDescription",
      title: "Ingress",
      type: "text",
      hidden: onlyWhenNoPartnerPage,
    },
    {
      name: "partnerBody",
      title: "Brødtekst",
      type: "articleContent",
      hidden: onlyWhenNoPartnerPage,
    },
    {
      name: "companyArticles",
      title: "Bedriftens artikler",
      type: "string",
      readOnly: true,
      components: {
        input: CompanyArticlesInput,
      },
      hidden: onlyWhenNoPartnerPage,
    },
  ],
  initialValue: {
    isPartner: false,
    hasPartnerPage: false,
  },
  preview: {
    select: {
      name: "name",
      media: "logo",
      isPartner: "isPartner",
      hasPartnerPage: "hasPartnerPage",
    },
    prepare({ name, media, isPartner, hasPartnerPage }: any) {
      const labels = [
        isPartner && "Støttespiller",
        hasPartnerPage && "Partnerside",
      ].filter(Boolean);

      return {
        title: name,
        media,
        subtitle: labels.join(" · "),
      };
    },
  },
};
