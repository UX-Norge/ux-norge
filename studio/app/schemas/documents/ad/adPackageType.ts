import { SanityDocument } from "@Types";

export interface AdPackageType extends SanityDocument {
  name: string;
  price: number;
  duration: number;
  onCoverPage: boolean;
  onArticles: boolean;
  onAdsPage: boolean;
  onSlack: boolean;
  onNewsletter: boolean;
}

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
    {
      name: "duration",
      title: "Varighet",
      type: "number",
      description: "Antall dager",
    },
    {
      name: "onCoverPage",
      title: "På forsiden",
      type: "boolean",
    },
    {
      name: "onArticles",
      title: "På artikler",
      type: "boolean",
    },
    {
      name: "onAdsPage",
      title: "På jobbsiden",
      description: "uxnorge.no/jobb",
      type: "boolean",
    },
    {
      name: "onSlack",
      title: "På Slack",
      type: "boolean",
    },
    {
      name: "onNewsletter",
      title: "På nyhetsbrev",
      type: "boolean",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "price",
      duration: "duration",
    },
    prepare(selection: any) {
      const { title, subtitle, duration } = selection;
      return {
        title,
        subtitle: `Varer i ${duration} dager. ${subtitle} NOK`,
      };
    },
  },
};
