/**
 * SOURCE OF TRUTH: BambooHR Markdown Style Rules
 *
 * This file defines the brand-standard rules for writing and styling
 * markdown content across all BambooHR documents. All markdown rendering
 * components should reference these rules.
 *
 * When updating style rules, update THIS FILE.
 */

export const MARKDOWN_STYLE_RULES = {
  voice: {
    principles: [
      { label: 'Warm, not casual', description: 'Friendly and human, but never slangy or flippant.' },
      { label: 'Clear, not clever', description: 'Use plain language. If a simpler word works, use it.' },
      { label: 'Confident, not pushy', description: 'State things directly without hedging, but don\'t oversell.' },
      { label: 'Helpful, not condescending', description: 'Assume the reader is competent.' },
      { label: 'Concise, not curt', description: 'Say what needs saying, then stop.' },
    ],
  },

  typography: {
    headline: { family: 'Fields', style: 'serif', usage: 'H1–H3, block quotes, pull quotes' },
    body: { family: 'Inter', style: 'sans-serif', usage: 'H4–H6, body, bold, italic, captions, footnotes' },
    mono: { family: 'JetBrains Mono or Fira Code', usage: 'Inline code, code blocks' },
  },

  headings: {
    casing: 'sentence case',
    rules: [
      'Never end a heading with punctuation',
      'Never skip levels',
      'Always leave one blank line before and after every heading',
    ],
    scale: [
      { level: 'H1', font: 'Fields Bold', size: '4rem (64px)', notes: 'One per document. Leave two blank lines after it.' },
      { level: 'H2', font: 'Fields Bold', size: '2.5rem (40px)', notes: 'Major sections. Green bottom border in styled contexts.' },
      { level: 'H3', font: 'Fields Bold', size: '1.75rem (28px)', notes: 'Subsections. May use warm Bark color (#5C342C).' },
      { level: 'H4', font: 'Inter Semi-Bold', size: '1.3rem (21px)', notes: 'Group labels, FAQ entries.' },
      { level: 'H5', font: 'Inter Semi-Bold', size: '1.1rem (18px)', notes: 'Use sparingly.' },
      { level: 'H6', font: 'Inter Semi-Bold', size: '0.95rem (15px)', notes: 'Use sparingly. Secondary text color.' },
    ],
  },

  colors: {
    light: [
      { role: 'Primary accent', name: 'Leaf Green', hex: '#73C41D' },
      { role: 'Secondary accent', name: 'Bright Lime', hex: '#BCDC44' },
      { role: 'Dark accent', name: 'Forest', hex: '#2D7262' },
      { role: 'Warm accent', name: 'Bark', hex: '#5C342C' },
      { role: 'Primary text', name: 'Charcoal', hex: '#333333' },
      { role: 'Secondary text', name: 'Slate', hex: '#555555' },
      { role: 'Surface / tint', name: 'Mist', hex: '#F5F5F0' },
      { role: 'Borders', name: 'Cloud', hex: '#EAEAE4' },
      { role: 'Background', name: 'White', hex: '#FFFFFF' },
    ],
    dark: [
      { role: 'Primary accent', name: 'Bright Lime', hex: '#BCDC44' },
      { role: 'Secondary accent', name: 'Leaf Green', hex: '#73C41D' },
      { role: 'Dark accent', name: 'Soft Fern', hex: '#6BBF8A' },
      { role: 'Warm accent', name: 'Sand', hex: '#C9A87C' },
      { role: 'Primary text', name: 'Parchment', hex: '#E8E4DD' },
      { role: 'Secondary text', name: 'Stone', hex: '#9B9690' },
      { role: 'Surface / tint', name: 'Deep Soil', hex: '#252220' },
      { role: 'Borders', name: 'Ember', hex: '#3D3835' },
      { role: 'Background', name: 'Night', hex: '#1A1715' },
    ],
    darkModeNote: 'Dark mode uses warm near-blacks, not pure black. Accents increase luminance to stay visible on dark surfaces.',
  },

  bodyText: {
    font: 'Inter Regular',
    size: '16px',
    lineHeight: 1.6,
    rules: [
      'One blank line between paragraphs',
      'Aim for 3–5 sentences per paragraph',
      'Target 65–85 characters per rendered line',
      'Don\'t hard-wrap in source — let the renderer handle it',
    ],
  },

  calloutTypes: [
    { type: 'Tip', label: '💡 Tip:', accent: '#73C41D' },
    { type: 'Note', label: 'ℹ️ Note:', accent: '#2D7262' },
    { type: 'Warning', label: '⚠️ Warning:', accent: '#D4920B' },
    { type: 'Danger', label: '🚨 Danger:', accent: '#C0392B' },
    { type: 'Success', label: '✅ Done:', accent: '#BCDC44' },
  ],

  syntaxHighlighting: {
    light: [
      { token: 'Keywords', hex: '#2D7262' },
      { token: 'Strings', hex: '#5C342C' },
      { token: 'Comments', hex: '#555555', style: 'italic' },
      { token: 'Functions', hex: '#73C41D' },
      { token: 'Numbers', hex: '#B5651D' },
      { token: 'Variables', hex: '#333333' },
    ],
    dark: [
      { token: 'Keywords', hex: '#6BBF8A' },
      { token: 'Strings', hex: '#C9A87C' },
      { token: 'Comments', hex: '#9B9690', style: 'italic' },
      { token: 'Functions', hex: '#BCDC44' },
      { token: 'Numbers', hex: '#D4A66A' },
      { token: 'Variables', hex: '#E8E4DD' },
    ],
  },

  tables: {
    rules: [
      '5 columns max when possible',
      'Left-align text, right-align numbers',
      'Use ✓ and — instead of Yes / No',
      'Use em dashes (—) for empty cells, never leave them blank',
      'Keep header labels concise',
    ],
  },

  images: {
    rules: [
      'Always include descriptive alt text',
      'Add italic caption text below when context is needed',
      'Prefer PNG for screenshots, SVG for diagrams',
      'Keep files under 500KB',
      'Max display width: 720px',
    ],
  },

  fileNaming: 'Lowercase kebab-case, always. Example: getting-started.md, onboarding-checklist.md',

  doNots: [
    'Don\'t use Title Case in headings (use sentence case)',
    'Don\'t skip heading levels',
    'Don\'t write "click here" link text',
    'Don\'t leave table cells blank (use —)',
    'Don\'t hard-wrap body text',
    'Don\'t use emoji in formal documents',
    'Don\'t use indented code blocks (use fenced)',
    'Don\'t use bold for emphasis where a heading would be clearer',
    'Don\'t nest block quotes more than two levels',
    'Don\'t use more than 5 table columns',
  ],
};
