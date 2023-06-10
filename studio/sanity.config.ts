import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas/schema";
import { uxNorgeTheme } from "./theme";
import structure from "./structure";
import {
  scheduledPublishing,
  ScheduleAction,
} from "@sanity/scheduled-publishing";

export default defineConfig({
  name: "default",
  title: "UX Norge",

  projectId: "qag5cqiv",
  dataset: "production",

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
