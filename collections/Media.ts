import type { CollectionConfig } from 'payload';
import { supabaseStorageAdapter } from '../storage/supabase-storage';

// Initialize Supabase Storage Adapter hooks (lazy initialization)
function getStorageHooks() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  
  // Only initialize if we have the required environment variables
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase Storage not configured. Media uploads will use local storage.');
    return {
      beforeChange: [],
      afterDelete: [],
    };
  }
  
  return supabaseStorageAdapter({
    supabaseUrl,
    supabaseKey,
    bucket: process.env.SUPABASE_STORAGE_BUCKET || 'media',
  });
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    // Disable local storage to use Supabase Storage adapter (via hooks)
    disableLocalStorage: true,
  },
  hooks: {
    beforeChange: [getStorageHooks().beforeChange],
    afterDelete: [getStorageHooks().afterDelete],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
};

