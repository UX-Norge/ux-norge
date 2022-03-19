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
      options: {
        accept: "image/.svg",
      },
    },
  ],
};
