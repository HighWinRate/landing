import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schema';

export default defineConfig({
  name: 'highwinrate-blog',
  title: 'High Win Rate Blog',
  
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_API_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_API_DATASET || 'production',
  
  basePath: '/studio',
  
  plugins: [
    structureTool(),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
});

