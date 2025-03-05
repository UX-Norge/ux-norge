import { ConfigContext, defineConfig } from "sanity";
import { StructureBuilder, structureTool } from 'sanity/structure';
import { schemaTypes } from "./schemas/schema";
import { uxNorgeTheme } from "./theme";
import structure from "./structure";
import {
  ScheduleAction
} from "sanity";

import { getRoute } from "../web/src/lib/getRoute";
import { RouteTypes } from '@Types';

interface DocumentContext {
  document: {
    _type: string;
    slug?: {
      current: string;
    };
  };
}

interface SchemaType {
  name: string;
}

interface ActionContext {
  schemaType: SchemaType;
}

export default defineConfig({
  name: 'default',
  scheduledPublishing: {
    enabled: true,
  },
  title:
    process.env.SANITY_STUDIO_DATASET === 'staging'
      ? 'UX Norge'
      : 'UX Norge kopi av databasen',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  document: {
    productionUrl: async (prev: any, context: DocumentContext) => {
      const doc = context.document;
      const type = doc._type;
      const { slug } = doc;
      if (slug) {
        const path = getRoute(type as RouteTypes, (slug as any).current);
        return Promise.resolve('https://preview-uxnorge.netlify.app' + path);
      }
    },
  },
  plugins: [
    structureTool({
      structure: (S: StructureBuilder, context: ConfigContext) => {
        return structure(S);
      },
    }),
  ],

  theme: uxNorgeTheme,

  schema: {
    types: schemaTypes,
    actions: (previousActions: any[], context: ActionContext) => {
      if (['article', 'ad'].includes(context.schemaType.name)) {
        return previousActions.filter((action) => action !== ScheduleAction);
      }

      return previousActions;
    },
  },
});
