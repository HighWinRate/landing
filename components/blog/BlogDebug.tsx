'use client';

import { useEffect, useState } from 'react';

interface BlogDebugProps {
  isConfigured: boolean;
  projectId?: string;
  postsCount: number;
}

export default function BlogDebug({ isConfigured, projectId, postsCount }: BlogDebugProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Log to browser console
    console.log('🔍 Blog Debug Info:');
    console.log('  - Sanity Configured:', isConfigured ? '✅ Yes' : '❌ No');
    console.log('  - Project ID:', projectId || 'Not set');
    console.log('  - Posts Found:', postsCount);
    
    if (!isConfigured) {
      console.error('⚠️ Sanity is not configured! Please set NEXT_PUBLIC_SANITY_PROJECT_ID');
    } else if (postsCount === 0) {
      console.warn('⚠️ Sanity is configured but no posts found. Make sure you have published at least one post.');
    }
  }, [isConfigured, projectId, postsCount]);

  if (!mounted) return null;

  return (
    <div className="mb-6 p-4 bg-muted rounded-lg border">
      <h3 className="font-semibold mb-2">🔍 Debug Information:</h3>
      <ul className="text-sm space-y-1">
        <li>
          Sanity Configured:{' '}
          <span className={isConfigured ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
            {isConfigured ? '✅ Yes' : '❌ No'}
          </span>
        </li>
        <li>
          Project ID:{' '}
          <code className="bg-background px-1 rounded text-xs">
            {projectId || 'Not set'}
          </code>
        </li>
        <li>
          Posts Found: <span className="font-semibold">{postsCount}</span>
        </li>
        {!isConfigured && (
          <li className="text-red-600 dark:text-red-400 mt-2">
            ⚠️ Please set NEXT_PUBLIC_SANITY_PROJECT_ID in your .env.local file
          </li>
        )}
        {isConfigured && postsCount === 0 && (
          <li className="text-yellow-600 dark:text-yellow-400 mt-2">
            ⚠️ Sanity is configured but no posts found. Make sure you have published at least one post in Sanity Studio.
          </li>
        )}
      </ul>
    </div>
  );
}

