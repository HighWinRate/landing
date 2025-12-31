import type { CollectionConfig, CollectionBeforeChangeHook, CollectionAfterDeleteHook } from 'payload';
import { supabaseStorageAdapter } from '../storage/supabase-storage';

// Initialize Supabase Storage Adapter hooks (lazy initialization)
function getStorageHooks(): {
  beforeChange: CollectionBeforeChangeHook[];
  afterDelete: CollectionAfterDeleteHook[];
} {
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
  
  const hooks = supabaseStorageAdapter({
    supabaseUrl,
    supabaseKey,
    bucket: process.env.SUPABASE_STORAGE_BUCKET || 'media',
  });
  
  return {
    beforeChange: hooks.beforeChange ? [hooks.beforeChange] : [],
    afterDelete: hooks.afterDelete ? [hooks.afterDelete] : [],
  };
}

const storageHooks = getStorageHooks();

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
    beforeChange: storageHooks.beforeChange,
    afterDelete: storageHooks.afterDelete,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
};

