import { SanityImage } from "@Types";
import { ArticleImageRenderer } from "../../../components/render/ArticleImageRenderer";

export interface ArticleImage {
  image: SanityImage;
  alt: string;
  caption?: string;
}

export default {
  name: "articleImage",
  type: "object",
  title: "Article Image",
  fields: [
    {
      name: "image",
      type: "image",
      title: "Bilde",
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "alt",
      type: "string",
      title: "Alt-tekst",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "caption",
      title: "Bildetekst",
      type: "string",
    },
  ],
  // preview: {
  //   component: ArticleImageRenderer,
  // },
};
