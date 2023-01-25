export interface NominateBannerType {
  title: string;
  text: string;
  buttonText: string;
  invitationLink: string;
}

export default {
  name: "nominateBanner",
  title: "Nominate Banner",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
    },
    {
      name: "text",
      title: "Tekst",
      type: "simpleBlockContent",
    },
  ],
};
