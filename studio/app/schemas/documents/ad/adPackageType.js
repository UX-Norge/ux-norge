export default {
  name: "adPackageType",
  title: "Package type",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Navn",
      type: "string",
    },
    {
      name: "price",
      title: "Pris",
      type: "number",
      description: "Pris oppgitt i NOK ekskl. MVA",
    },
  ],
};
