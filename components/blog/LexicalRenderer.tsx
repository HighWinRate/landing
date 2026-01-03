'use client';

import { RichText } from '@payloadcms/richtext-lexical/react';
import { SerializedEditorState } from 'lexical';

interface LexicalRendererProps {
  data: SerializedEditorState;
}

export default function LexicalRenderer({ data }: LexicalRendererProps) {
  if (!data) return null;

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none
      prose-headings:font-bold prose-headings:text-foreground
      prose-h1:text-4xl prose-h1:mb-4 prose-h1:mt-8
      prose-h2:text-3xl prose-h2:mb-3 prose-h2:mt-6
      prose-h3:text-2xl prose-h3:mb-2 prose-h3:mt-4
      prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-4
      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
      prose-strong:text-foreground prose-strong:font-semibold
      prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
      prose-pre:bg-muted prose-pre:border prose-pre:border-border
      prose-blockquote:border-l-primary prose-blockquote:text-foreground/80
      prose-ul:list-disc prose-ul:mr-6 prose-ul:mb-4
      prose-ol:list-decimal prose-ol:mr-6 prose-ol:mb-4
      prose-li:text-foreground/90 prose-li:mb-2
      prose-img:rounded-lg prose-img:shadow-md
    ">
      <RichText data={data} />
    </div>
  );
}

