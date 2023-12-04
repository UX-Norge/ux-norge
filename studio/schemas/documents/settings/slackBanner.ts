export interface SlackBannerType {
  title: string;
  text: string;
  buttonText: string;
  invitationLink: string;
}

export default {
  name: "slackBanner",
  title: "Slack banner",
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
      type: "text",
    },
    {
      name: "buttonText",
      title: "Knapptekst",
      type: "string",
    },
    {
      name: "invitationLink",
      title: "Invitasjonslenke",
      type: "url",
    },
  ],
};
