'use client';

import React from 'react';
import LexicalRenderer from './LexicalRenderer';

interface ContentRendererProps {
  content: any;
}

export default function ContentRenderer({ content }: ContentRendererProps) {
  // Debug info
  const contentType = typeof content;
  const isNull = content === null;
  const isUndefined = content === undefined;
  const hasRoot = content && typeof content === 'object' && 'root' in content;

  console.log('ContentRenderer Debug:', {
    contentType,
    isNull,
    isUndefined,
    hasRoot,
    content: content ? JSON.stringify(content).slice(0, 200) : 'no content',
  });

  if (!content) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          ⚠️ محتوایی برای نمایش وجود ندارد
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Type: {contentType} | Null: {isNull ? 'Yes' : 'No'} | Undefined:{' '}
          {isUndefined ? 'Yes' : 'No'}
        </p>
      </div>
    );
  }

  if (typeof content === 'string') {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-sm text-red-800 dark:text-red-200">
          ⚠️ محتوا به صورت رشته است و باید parse شود
        </p>
        <pre className="text-xs mt-2 overflow-auto max-h-32">
          {content.slice(0, 500)}
        </pre>
      </div>
    );
  }

  if (!hasRoot) {
    return (
      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
        <p className="text-sm text-orange-800 dark:text-orange-200">
          ⚠️ ساختار Lexical معتبر نیست (root موجود نیست)
        </p>
        <pre className="text-xs mt-2 overflow-auto max-h-32">
          {JSON.stringify(content, null, 2).slice(0, 500)}
        </pre>
      </div>
    );
  }

  try {
    return <LexicalRenderer data={content} />;
  } catch (error) {
    console.error('Error rendering Lexical content:', error);
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-sm text-red-800 dark:text-red-200">
          ❌ خطا در نمایش محتوا
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      </div>
    );
  }
}

