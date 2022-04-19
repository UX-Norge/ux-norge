export default {
  name: "coverPage",
  title: "Cover page",
  type: "document",
  fields: [
    {
      name: "blocks",
      title: "Blokker",
      type: "array",
      of: [
        { type: "coverArticles" },
        { type: "coverAds" },
        { type: "coverCollections" },
      ],
    },
  ],
};
