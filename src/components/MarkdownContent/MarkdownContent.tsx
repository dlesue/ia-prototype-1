import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

/**
 * Renders markdown content styled according to BambooHR markdown style rules.
 * Source of truth: src/data/markdown-style-rules.ts
 *
 * Typography: Fields (serif) for H1–H3 and blockquotes, Inter (sans-serif) for everything else.
 * Colors: Light mode palette from the style rules.
 */

const FIELDS = "'Fields', Georgia, serif";
const INTER = "'Inter', system-ui, sans-serif";
const MONO = "'JetBrains Mono', 'Fira Code', ui-monospace, monospace";

// Light mode colors from style rules
const CHARCOAL = '#333333';
const SLATE = '#555555';
const LEAF_GREEN = '#73C41D';
const FOREST = '#2D7262';
const BARK = '#5C342C';
const MIST = '#F5F5F0';
const CLOUD = '#EAEAE4';

interface MarkdownContentProps {
  text: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ text }) => {
  const components: Components = {
    // H1: Fields Bold, 4rem — one per document
    h1: ({ children }) => (
      <h1
        style={{ fontFamily: FIELDS, fontSize: '3rem', fontWeight: 700, color: CHARCOAL, lineHeight: 1.15, marginTop: 0, marginBottom: '1.5rem' }}
      >
        {children}
      </h1>
    ),

    // H2: Fields Bold, 2.5rem — major sections, green bottom border
    h2: ({ children }) => (
      <h2
        style={{ fontFamily: FIELDS, fontSize: '1.75rem', fontWeight: 700, color: CHARCOAL, lineHeight: 1.2, marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: `2px solid ${LEAF_GREEN}` }}
      >
        {children}
      </h2>
    ),

    // H3: Fields Bold, 1.75rem — subsections, warm Bark color
    h3: ({ children }) => (
      <h3
        style={{ fontFamily: FIELDS, fontSize: '1.35rem', fontWeight: 700, color: BARK, lineHeight: 1.25, marginTop: '2rem', marginBottom: '0.75rem' }}
      >
        {children}
      </h3>
    ),

    // H4: Inter Semi-Bold, 1.3rem
    h4: ({ children }) => (
      <h4
        style={{ fontFamily: INTER, fontSize: '1.15rem', fontWeight: 600, color: CHARCOAL, lineHeight: 1.3, marginTop: '1.5rem', marginBottom: '0.5rem' }}
      >
        {children}
      </h4>
    ),

    // H5: Inter Semi-Bold, 1.1rem
    h5: ({ children }) => (
      <h5
        style={{ fontFamily: INTER, fontSize: '1rem', fontWeight: 600, color: CHARCOAL, lineHeight: 1.3, marginTop: '1.25rem', marginBottom: '0.5rem' }}
      >
        {children}
      </h5>
    ),

    // H6: Inter Semi-Bold, 0.95rem — secondary text color
    h6: ({ children }) => (
      <h6
        style={{ fontFamily: INTER, fontSize: '0.875rem', fontWeight: 600, color: SLATE, lineHeight: 1.3, marginTop: '1rem', marginBottom: '0.5rem' }}
      >
        {children}
      </h6>
    ),

    // Body: Inter Regular, 16px, line-height 1.6
    p: ({ children }) => (
      <p
        style={{ fontFamily: INTER, fontSize: '16px', lineHeight: 1.6, color: CHARCOAL, margin: '0.75rem 0' }}
      >
        {children}
      </p>
    ),

    strong: ({ children }) => (
      <strong style={{ fontWeight: 600, color: CHARCOAL }}>{children}</strong>
    ),

    em: ({ children }) => (
      <em style={{ fontStyle: 'italic', color: CHARCOAL }}>{children}</em>
    ),

    // Lists: Inter, 16px
    ul: ({ children }) => (
      <ul
        style={{ fontFamily: INTER, fontSize: '16px', lineHeight: 1.6, color: CHARCOAL, listStyleType: 'disc', marginLeft: '1.25rem', margin: '0.75rem 0 0.75rem 1.25rem' }}
      >
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol
        style={{ fontFamily: INTER, fontSize: '16px', lineHeight: 1.6, color: CHARCOAL, listStyleType: 'decimal', marginLeft: '1.25rem', margin: '0.75rem 0 0.75rem 1.25rem' }}
      >
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li style={{ color: CHARCOAL, marginBottom: '0.25rem' }}>{children}</li>
    ),

    // Inline code: monospace
    code: ({ children, className }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code
            style={{ fontFamily: MONO, fontSize: '0.875em', padding: '0.15em 0.4em', borderRadius: '4px', backgroundColor: MIST, border: `1px solid ${CLOUD}`, color: CHARCOAL }}
          >
            {children}
          </code>
        );
      }
      return (
        <pre
          style={{ fontFamily: MONO, fontSize: '14px', lineHeight: 1.5, padding: '1rem', borderRadius: '8px', backgroundColor: '#1e293b', color: '#e2e8f0', overflowX: 'auto', margin: '1rem 0' }}
        >
          <code className={className}>{children}</code>
        </pre>
      );
    },

    // Links: Forest green
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: FOREST, textDecoration: 'underline', textUnderlineOffset: '2px' }}
      >
        {children}
      </a>
    ),

    // Blockquotes: Fields Italic, green left border, mist background
    blockquote: ({ children }) => (
      <blockquote
        style={{ fontFamily: FIELDS, fontStyle: 'italic', borderLeft: `4px solid ${LEAF_GREEN}`, backgroundColor: MIST, padding: '0.75rem 1rem', margin: '1rem 0', borderRadius: '0 6px 6px 0', color: SLATE }}
      >
        {children}
      </blockquote>
    ),

    // Tables
    table: ({ children }) => (
      <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
        <table
          style={{ width: '100%', borderCollapse: 'collapse', fontFamily: INTER, fontSize: '14px' }}
        >
          {children}
        </table>
      </div>
    ),

    thead: ({ children }) => (
      <thead style={{ backgroundColor: MIST }}>{children}</thead>
    ),

    tbody: ({ children }) => <tbody>{children}</tbody>,

    tr: ({ children }) => (
      <tr style={{ borderBottom: `1px solid ${CLOUD}` }}>{children}</tr>
    ),

    th: ({ children }) => (
      <th
        style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontWeight: 600, color: CHARCOAL, borderBottom: `2px solid ${CLOUD}`, fontSize: '13px' }}
      >
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td
        style={{ padding: '0.6rem 0.75rem', color: CHARCOAL, fontSize: '14px', verticalAlign: 'top' }}
      >
        {children}
      </td>
    ),

    // Horizontal rule
    hr: () => (
      <hr style={{ border: 'none', borderTop: `1px solid ${CLOUD}`, margin: '2rem 0' }} />
    ),

    // Strikethrough
    del: ({ children }) => (
      <del style={{ color: SLATE, textDecoration: 'line-through' }}>{children}</del>
    ),
  };

  return (
    <div className="markdown-content" style={{ fontFamily: INTER, color: CHARCOAL }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
