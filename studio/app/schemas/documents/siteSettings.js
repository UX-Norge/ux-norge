export default {
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    {
      name: "siteName",
      title: "siteName",
      type: "string",
    },
    {
      name: "siteUrl",
      title: "siteUrl",
      type: "url",
    },
    {
      name: "description",
      title: "description",
      type: "text",
      description: "Beskrivelse av uxnorge.no",
    },
  ],
};
