'use client';

import { RichText } from '@payloadcms/richtext-lexical/react';
import { SerializedEditorState } from 'lexical';

interface LexicalRendererProps {
  data: SerializedEditorState;
}

export default function LexicalRenderer({ data }: LexicalRendererProps) {
  if (!data) return null;

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <RichText data={data} />
    </div>
  );
}

