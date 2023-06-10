export default {
  name: "newsletterSignupForm",
  title: "Newsletter signup form",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
    },
    {
      name: "text",
      title: "Text",
      type: "text",
    },
    {
      name: "placeholder",
      title: "Placeholder",
      type: "string",
    },
    {
      name: "buttonText",
      title: "buttonText",
      type: "string",
    },
    {
      name: "privacyText",
      title: "Personvernstekst",
      type: "simpleBlockContent",
    },
  ],
};
