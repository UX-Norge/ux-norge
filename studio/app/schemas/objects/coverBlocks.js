import editorMessage from "../../inputComponents/editorMessage";

export const coverArticles = {
  title: "Artikler",
  name: "coverArticles",
  type: "object",
  fields: [
    {
      name: "layout",
      type: "string",
      title: "Layout",
      options: {
        list: [
          { title: "Full bredde", value: "fullWidth" },
          { title: "1/2 bredde", value: "halfWidth" },
          { title: "Liste", value: "list" },
        ],
      },
    },
    {
      type: "array",
      name: "list",
      title: "Liste",
      of: [{ type: "articleThumbnail" }],
      options: {
        layout: "grid",
      },
    },
  ],
};

export const coverCollections = {
  title: "Samlinger",
  type: "object",
  name: "coverCollections",
  fields: [
    {
      type: "string",
      name: "title",
      title: "Tittel",
    },
    {
      type: "array",
      name: "list",
      title: "Liste",
      of: [{ type: "articleThumbnail" }],
      options: {
        layout: "grid",
      },
    },
  ],
};

export const coverAds = {
  title: "Annonser",
  name: "coverAds",
  type: "object",
  fields: [
    {
      name: "ads",
      type: "string",
      readOnly: true,
    },
  ],
};
