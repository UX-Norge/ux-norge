export default {
  name: "ad.packageType",
  title: "Package type",
  type: "document",
  fields: [
    {
      name: "name",
      title: "name",
      type: "string",
    },
    {
      name: "price",
      title: "price",
      type: "number",
      description: "Pris oppgitt i NOK ekskl. MVA",
    },
  ],
};
