# Blog Content Features - Implementation Guide

## ✅ پشتیبانی شده

### Text Formatting
- [x] **Bold** - `format & 1`
- [x] *Italic* - `format & 2`
- [x] ~~Strikethrough~~ - `format & 4`
- [x] <u>Underline</u> - `format & 8`
- [x] `Inline Code` - `format & 16`
- [x] Subscript - `format & 32`
- [x] Superscript - `format & 64`

### Headings
- [x] H1 (5xl-6xl)
- [x] H2 (4xl-5xl)
- [x] H3 (3xl-4xl)
- [x] H4 (2xl-3xl)
- [x] H5 (xl-2xl)
- [x] H6 (lg-xl)

### Lists
- [x] Unordered List (bullet)
- [x] Ordered List (number)
- [x] Check List with checkboxes

### Special Elements
- [x] Paragraph (21px, serif, 1.58 line-height)
- [x] Blockquote (border-left, italic, muted bg)
- [x] Horizontal Rule (gradient line)
- [x] Code Block (pre with syntax)
- [x] Line Break

### Media & Links
- [x] Links (internal & external)
- [x] Upload/Images (Next.js Image optimization)
- [x] Relationship (related posts)

## 🎨 Substack-Style Typography

### Font Stack
```css
font-family: Georgia, 'Times New Roman', serif;
```

### Sizes (Responsive)
- Body: 21px
- H1: 3xl-6xl
- H2: 2xl-5xl
- H3: xl-4xl

### Spacing
- Paragraph margin: 24px
- Heading margin-top: 40-48px
- Image margin: 40px

### Colors
- Text: foreground/90
- Headings: foreground/100
- Links: primary
- Code: primary + muted bg

## 📁 File Structure

```
components/blog/
├── RichTextRenderer.tsx    # Main renderer (Substack-style)
├── ContentRenderer.tsx      # Wrapper with error handling
├── LexicalRenderer.tsx      # Original PayloadCMS renderer
└── BlogPost.tsx            # Post component
```

## 🔧 How It Works

### 1. RichTextRenderer
Custom recursive renderer for Lexical JSON:

```typescript
// Input: Lexical JSON
{
  root: {
    children: [
      { type: 'heading', tag: 'h2', children: [...] },
      { type: 'paragraph', children: [...] },
      { type: 'list', listType: 'bullet', children: [...] }
    ]
  }
}

// Output: Styled React components
```

### 2. Node Type Mapping

| Lexical Type | React Component | Styling |
|--------------|----------------|---------|
| `paragraph` | `<p>` | 21px, serif, 1.58 line-height |
| `heading` | `<h1-h6>` | Dynamic sizes, bold |
| `list` | `<ul>/<ol>` | Custom bullets/numbers |
| `quote` | `<blockquote>` | Border-left, italic |
| `text` | Format-aware | Bold/Italic/Code etc. |
| `link` | `<Link>/<a>` | Primary color, underline |
| `upload` | `<Image>` | Next.js optimized |
| `horizontalrule` | `<hr>` | Gradient |

### 3. Text Format Flags

Lexical uses bitwise flags for text formatting:

```typescript
1   = Bold (0001)
2   = Italic (0010)
4   = Strikethrough (0100)
8   = Underline (1000)
16  = Code (10000)
32  = Subscript (100000)
64  = Superscript (1000000)
```

Example:
```typescript
format: 3 = Bold + Italic (11 in binary)
format: 5 = Bold + Strikethrough (101 in binary)
```

## 🎯 Usage

### In BlogPost Component
```tsx
import ContentRenderer from './ContentRenderer';

<article>
  <ContentRenderer content={post.content} />
</article>
```

### Debug Mode
```tsx
<ContentRenderer content={post.content} debug={true} />
```

### Direct Renderer
```tsx
import RichTextRenderer from './RichTextRenderer';

<RichTextRenderer data={lexicalJSON} />
```

## 🧪 Testing

### Test All Features
Create a post in PayloadCMS with:
1. All heading levels (H1-H6)
2. Bold, Italic, Strikethrough, Underline
3. Unordered list
4. Ordered list
5. Check list
6. Blockquote
7. Horizontal rule
8. Code block
9. Inline code
10. Image upload
11. Internal link
12. External link
13. Relationship to another post

### Debug Page
Visit: `/blog/[slug]/debug` to see:
- Raw content JSON
- Data types
- Parsing status

## 🐛 Troubleshooting

### Content not showing
1. Check if `content` field exists (not `body`)
2. Verify JSON structure has `root` property
3. Check console for errors

### Styles not applied
1. Restart dev server
2. Clear browser cache
3. Check `globals.css` loaded
4. Verify Tailwind config

### Images not loading
1. Check Supabase Storage bucket is public
2. Verify image URL
3. Check alt text exists

## 📚 References

- [Lexical Data Model](https://lexical.dev/docs/concepts/serialization)
- [PayloadCMS Rich Text](https://payloadcms.com/docs/fields/rich-text)
- [Substack Typography](https://substack.design/)

---

**Last Updated**: 2025-01-03

