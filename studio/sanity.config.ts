import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: "default",
  title: "UX Norge",

  projectId: "dcdo4kbx",
  dataset: "staging",

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
});
