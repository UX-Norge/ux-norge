export default {
  name: "ad",
  title: "Ad",
  type: "document",
  groups: [
    { name: "content", title: "Annonseinnhold" },
    { name: "settings", title: "Annonseinnstillinger" },
  ],
  fields: [
    {
      name: "title",
      title: "title",
      type: "string",
      group: "content",
    },
    {
      name: "text",
      title: "text",
      type: "simpleBlockContent",
      group: "content",
    },
    {
      name: "image",
      title: "image",
      type: "image",
      options: { hotspot: true },
      group: "content",
    },
    {
      name: "fulltime",
      title: "fulltime",
      type: "boolean",
      group: "content",
    },
    {
      name: "location",
      type: "autocomplete",
      title: "Sted",
      options: {
        autocompleteFieldPath: "location",
        options: [{ value: "Trondheim" }, { value: "Oslo" }],
        groq: {
          query: '*[_type == $type] { "value": location }',
          params: {
            type: "ad",
          },
          transform: (values) => values,
        },
      },
    },
    {
      name: "link",
      title: "link",
      type: "url",
      group: "content",
    },
    {
      name: "startDate",
      title: "Startdato",
      type: "date",
      validation: (Rule) => Rule.required(),
      group: "settings",
    },
    {
      name: "endDate",
      type: "date",
      title: "Sluttdato",
      validation: (Rule) => Rule.required(),
      group: "settings",
    },
    {
      name: "packageType",
      title: "Pakketype",
      type: "reference",
      to: [{ type: "ad.packageType" }],
      group: "settings",
    },
    {
      name: "advertiser",
      title: "Annonsør",
      type: "reference",
      to: [{ type: "company" }],
      group: "settings",
    },
  ],
  preview: {
    select: {
      title: "title",
      startDate: "startDate",
      endDate: "endDate",
      advertiser: "advertiser.name",
    },
    prepare(selection) {
      const { title, startDate, endDate, advertiser } = selection;
      let media = "";
      if (!!startDate && !!endDate) {
        const isActive = new Date(endDate) > new Date();
        const isPending = new Date(startDate) > new Date();
        media = isPending ? "🟡" : isActive ? "🟢" : "";
      }
      return {
        title,
        subtitle: advertiser,
        media,
      };
    },
  },
  initialValue: {
    fullTime: true,
  },
};
