export default {
  name: "company",
  title: "Company",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Navn",
      type: "string",
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Helst .svg",
    },
    {
      name: "isPartner",
      title: "Er støttespiller",
      type: "boolean",
    },
    // {
    //   name: "invoiceInformation",
    //   title: "invoiceInformation",
    //   type: "invoiceInformation",
    // },
  ],
  initialValue: {
    isPartner: false,
  },
};
