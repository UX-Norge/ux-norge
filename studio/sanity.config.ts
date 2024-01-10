import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas/schema";
import { uxNorgeTheme } from "./theme";
import structure from "./structure";
import {
  scheduledPublishing,
  ScheduleAction,
} from "@sanity/scheduled-publishing";
import { RouteTypes } from "../types";
import { getRoute } from "../web/src/lib/getRoute";

export default defineConfig({
  name: "default",
  title: "UX Norge",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  document: {
    productionUrl: async (prev, context) => {
      // context includes the client and other details

      const doc = context.document;
      const type = doc._type;
      const { slug } = doc;
      if (slug) {
        const path = getRoute(type, (slug as any).current);
        return Promise.resolve("https://preview-uxnorge.netlify.app"+path);
      }
    }
  },
  plugins: [
    deskTool({
      structure,
    }),
    scheduledPublishing(),
  ],

  theme: uxNorgeTheme,

  schema: {
    types: schemaTypes,
    actions: (previousActions, { schemaType }) => {
      if (["article", "ad"].includes(schemaType.name)) {
        return previousActions.filter((action) => action !== ScheduleAction);
      }

      return previousActions;
    },
  },
});
