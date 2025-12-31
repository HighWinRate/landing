import type { CollectionConfig } from 'payload';
import { supabaseStorageAdapter } from '../storage/supabase-storage';

// Initialize Supabase Storage Adapter hooks
const storageHooks = supabaseStorageAdapter({
  supabaseUrl: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '',
  bucket: process.env.SUPABASE_STORAGE_BUCKET || 'media',
});

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: true,
  hooks: {
    beforeChange: [storageHooks.beforeChange],
    afterDelete: [storageHooks.afterDelete],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
};

