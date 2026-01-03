'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';

interface RichTextRendererProps {
  data: any;
}

// Substack-style Typography Component
export default function RichTextRenderer({ data }: RichTextRendererProps) {
  if (!data || !data.root) return null;

  return (
    <div className="rich-text-content">
      {renderNodes(data.root.children)}
    </div>
  );
}

function renderNodes(nodes: any[]): React.ReactNode {
  if (!nodes || !Array.isArray(nodes)) return null;

  return nodes.map((node, index) => renderNode(node, index));
}

function renderNode(node: any, index: number): React.ReactNode {
  if (!node) return null;

  const key = node.id || `node-${index}`;

  switch (node.type) {
    case 'paragraph':
      return (
        <p
          key={key}
          className="mb-6 text-[21px] leading-[1.58] font-serif tracking-tight"
          style={{ 
            wordBreak: 'break-word',
            color: 'hsl(var(--foreground) / 0.9)'
          }}
        >
          {renderNodes(node.children)}
        </p>
      );

    case 'heading':
      return renderHeading(node, key);

    case 'list':
      return renderList(node, key);

    case 'listitem':
      return (
        <li key={key} className="mb-2">
          {renderNodes(node.children)}
        </li>
      );

    case 'quote':
      return (
        <blockquote
          key={key}
          className="my-8 pl-6 pr-4 py-4 border-l-4 border-primary italic text-[21px] leading-[1.58] font-serif"
          style={{
            backgroundColor: 'hsl(var(--muted) / 0.3)',
            color: 'hsl(var(--foreground) / 0.8)'
          }}
        >
          {renderNodes(node.children)}
        </blockquote>
      );

    case 'horizontalrule':
      return (
        <hr
          key={key}
          className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        />
      );

    case 'code':
      return (
        <pre
          key={key}
          className="my-6 p-4 bg-muted border border-border rounded-lg overflow-x-auto text-sm font-mono"
        >
          <code>{renderNodes(node.children)}</code>
        </pre>
      );

    case 'text':
      return renderText(node, key);

    case 'linebreak':
      return <br key={key} />;

    case 'link':
      return renderLink(node, key);

    case 'upload':
      return renderUpload(node, key);

    case 'relationship':
      return renderRelationship(node, key);

    default:
      // For any unknown types, try to render children
      if (node.children) {
        return <span key={key}>{renderNodes(node.children)}</span>;
      }
      return null;
  }
}

function renderHeading(node: any, key: string): React.ReactNode {
  const tag = node.tag || 'h2';
  const children = renderNodes(node.children);

  const baseClasses = 'font-bold tracking-tight text-foreground mt-10 mb-4';

  const headingClasses: Record<string, string> = {
    h1: `${baseClasses} text-5xl md:text-6xl leading-[1.1] mt-12 mb-6`,
    h2: `${baseClasses} text-4xl md:text-5xl leading-[1.15] mt-10 mb-5`,
    h3: `${baseClasses} text-3xl md:text-4xl leading-[1.2]`,
    h4: `${baseClasses} text-2xl md:text-3xl leading-[1.3]`,
    h5: `${baseClasses} text-xl md:text-2xl leading-[1.35]`,
    h6: `${baseClasses} text-lg md:text-xl leading-[1.4]`,
  };

  const className = headingClasses[tag] || headingClasses.h2;

  return React.createElement(tag, { key, className }, children);
}

function renderList(node: any, key: string): React.ReactNode {
  const listType = node.listType || 'bullet';
  const Tag = listType === 'number' ? 'ol' : 'ul';

  // Check if this is a check list
  const isCheckList = listType === 'check';

  if (isCheckList) {
    return (
      <ul key={key} className="my-6 space-y-3">
        {node.children?.map((item: any, idx: number) => (
          <li key={`check-${idx}`} className="flex items-start gap-3">
            <span
              className={`flex-shrink-0 mt-1.5 w-5 h-5 rounded border-2 flex items-center justify-center ${
                item.checked
                  ? 'bg-primary border-primary'
                  : 'border-border bg-background'
              }`}
            >
              {item.checked && <Check className="w-3 h-3 text-primary-foreground" />}
            </span>
            <span
              className={`text-[21px] leading-[1.58] ${
                item.checked ? 'text-muted-foreground line-through' : ''
              }`}
              style={!item.checked ? { color: 'hsl(var(--foreground) / 0.9)' } : undefined}
            >
              {renderNodes(item.children)}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  const listClasses =
    listType === 'number'
      ? 'my-6 mr-8 list-decimal list-outside space-y-2'
      : 'my-6 mr-8 list-disc list-outside space-y-2';

  return (
    <Tag key={key} className={listClasses}>
      {renderNodes(node.children)}
    </Tag>
  );
}

function renderText(node: any, key: string): React.ReactNode {
  let text = node.text || '';

  // If empty text, return null
  if (text === '') return null;

  // Apply text formatting
  if (node.format) {
    const format = node.format;

    if (format & 1) {
      // Bold
      text = (
        <strong key={key} className="font-bold text-foreground">
          {text}
        </strong>
      );
    }
    if (format & 2) {
      // Italic
      text = (
        <em key={key} className="italic">
          {text}
        </em>
      );
    }
    if (format & 4) {
      // Strikethrough
      text = (
        <s key={key} className="line-through opacity-70">
          {text}
        </s>
      );
    }
    if (format & 8) {
      // Underline
      text = (
        <u key={key} className="underline decoration-primary/40">
          {text}
        </u>
      );
    }
    if (format & 16) {
      // Code
      text = (
        <code
          key={key}
          className="px-1.5 py-0.5 mx-0.5 bg-muted border border-border rounded text-[0.9em] font-mono text-primary"
        >
          {text}
        </code>
      );
    }
    if (format & 32) {
      // Subscript
      text = (
        <sub key={key} className="text-[0.8em]">
          {text}
        </sub>
      );
    }
    if (format & 64) {
      // Superscript
      text = (
        <sup key={key} className="text-[0.8em]">
          {text}
        </sup>
      );
    }
  }

  return <React.Fragment key={key}>{text}</React.Fragment>;
}

function renderLink(node: any, key: string): React.ReactNode {
  const url = node.url || node.fields?.url || '#';
  const isExternal = url.startsWith('http') || url.startsWith('https');
  const children = renderNodes(node.children);

  if (isExternal) {
    return (
      <a
        key={key}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary transition-colors"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      key={key}
      href={url}
      className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary transition-colors"
    >
      {children}
    </Link>
  );
}

function renderUpload(node: any, key: string): React.ReactNode {
  const value = node.value;

  if (!value) return null;

  // Handle Media upload
  const imageUrl = value.url || value.filename;
  const alt = value.alt || 'Image';
  const width = value.width || 1200;
  const height = value.height || 800;

  if (!imageUrl) return null;

  return (
    <figure key={key} className="my-10">
      <div className="relative w-full rounded-lg overflow-hidden bg-muted">
        <Image
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>
      {value.caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}

function renderRelationship(node: any, key: string): React.ReactNode {
  const value = node.value;

  if (!value) return null;

  // Handle different relationship types
  if (Array.isArray(value)) {
    return (
      <div 
        key={key} 
        className="my-6 p-4 border border-border rounded-lg"
        style={{ backgroundColor: 'hsl(var(--muted) / 0.3)' }}
      >
        <p className="text-sm font-semibold text-muted-foreground mb-2">مطالب مرتبط:</p>
        <ul className="space-y-2">
          {value.map((item: any, idx: number) => (
            <li key={idx}>
              <Link
                href={`/blog/${item.slug}`}
                className="text-primary hover:underline"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Single relationship
  return (
    <div 
      key={key} 
      className="my-6 p-4 border border-border rounded-lg"
      style={{ backgroundColor: 'hsl(var(--muted) / 0.3)' }}
    >
      <Link href={`/blog/${value.slug}`} className="text-primary hover:underline">
        📌 {value.title}
      </Link>
    </div>
  );
}

