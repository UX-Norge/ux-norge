export interface SiteSettings {
  title: string;
  siteUrl: string;
  titleTemplate: string;
  description: string;
}

export default {
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
    },
    {
      name: "siteUrl",
      title: "URL",
      type: "url",
    },
    {
      name: "titleTemplate",
      title: "Tittelmal",
      type: "string",
      description: "%s fylles av den spesifikke siden sin tittel",
    },
    {
      name: "description",
      title: "Beskrivelse",
      type: "text",
      description: "Beskrivelse av uxnorge.no",
    },
  ],
};
