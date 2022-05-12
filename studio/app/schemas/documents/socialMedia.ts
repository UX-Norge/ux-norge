import { SanityImage } from "@Types";

export interface SocialMedia {
  name: string;
  link: string;
  image: SanityImage;
}

export default {
  name: "socialMedia",
  title: "Social media",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "link",
      title: "Lenke",
      type: "url",
    },
    {
      name: "image",
      title: "image",
      type: "image",
    },
  ],
};
