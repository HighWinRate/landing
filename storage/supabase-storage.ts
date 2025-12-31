import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { CollectionBeforeChangeHook, CollectionAfterDeleteHook } from 'payload';

interface SupabaseStorageAdapterArgs {
  supabaseUrl: string;
  supabaseKey: string;
  bucket?: string;
}

let supabaseClient: SupabaseClient | null = null;
let storageBucket: string = 'media';

export function getSupabaseClient(supabaseUrl: string, supabaseKey: string): SupabaseClient {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseKey);
  }
  return supabaseClient;
}

export function supabaseStorageAdapter({
  supabaseUrl,
  supabaseKey,
  bucket = 'media',
}: SupabaseStorageAdapterArgs) {
  storageBucket = bucket;
  const supabase = getSupabaseClient(supabaseUrl, supabaseKey);

  // Hook to handle file upload to Supabase Storage
  const beforeChange: CollectionBeforeChangeHook = async ({ data, req, operation }) => {
    if (operation === 'create' && req.file) {
      const file = req.file;
      const filename = file.name || 'file';
      
      // Generate unique filename
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      const fileExt = filename.split('.').pop() || 'bin';
      const storageFileName = `${randomName}.${fileExt}`;
      const storagePath = `media/${storageFileName}`;

      // Convert file buffer
      let buffer: Buffer;
      if (Buffer.isBuffer(file.data)) {
        buffer = file.data;
      } else {
        buffer = Buffer.from(file.data);
      }

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(storageBucket)
        .upload(storagePath, buffer, {
          contentType: file.mimetype || 'application/octet-stream',
          upsert: false,
        });

      if (uploadError) {
        throw new Error(`Failed to upload file to Supabase Storage: ${uploadError.message}`);
      }

      // Get public URL
      const { data: urlData } = supabase.storage.from(storageBucket).getPublicUrl(storagePath);

      // Update file data with Supabase URL
      return {
        ...data,
        url: urlData.publicUrl,
        filename: storageFileName,
      };
    }

    return data;
  };

  // Hook to handle file deletion from Supabase Storage
  const afterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
    if (doc.url) {
      // Extract path from URL
      const url = new URL(doc.url);
      const path = url.pathname.split('/').slice(-2).join('/'); // Get last 2 parts (bucket/path)

      const { error } = await supabase.storage.from(storageBucket).remove([path]);

      if (error) {
        console.warn(`Failed to delete file from Supabase Storage: ${error.message}`);
      }
    }
  };

  return {
    beforeChange,
    afterDelete,
  };
}

