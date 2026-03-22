/**
 * Shared doc style constants for interactive docs.
 * Matches the MarkdownContent rendering from markdown-style-rules.ts.
 * NavSidebar components are excluded — they keep their own styling.
 */

// Fonts
export const FIELDS = "'Fields', Georgia, serif";
export const INTER = "'Inter', system-ui, sans-serif";
export const MONO = "'JetBrains Mono', 'Fira Code', ui-monospace, monospace";

// Colors — light mode
export const CHARCOAL = '#333333';
export const SLATE = '#555555';
export const LEAF_GREEN = '#73C41D';
export const FOREST = '#2D7262';
export const BARK = '#5C342C';
export const MIST = '#F5F5F0';
export const CLOUD = '#EAEAE4';
export const WHITE = '#FFFFFF';

// Interactive element colors (derived from the palette)
export const BADGE_CORE = '#6B7280';
export const BADGE_PRO = '#2563EB';
export const BADGE_ELITE = '#7C3AED';
export const ROLE_EMPLOYEE = FOREST;
export const ROLE_MANAGER = '#2563EB';
export const ROLE_ADMIN = BARK;
export const STATUS_BUILT = FOREST;
export const STATUS_PLANNED = '#D4920B';
export const STATUS_NOT_STARTED = '#9B9690';

// Common element styles
export const sectionCard: React.CSSProperties = {
  backgroundColor: WHITE,
  border: `1px solid ${CLOUD}`,
  borderRadius: 10,
  overflow: 'hidden',
};

export const sectionCardBody: React.CSSProperties = {
  padding: '20px 24px',
};

export const filterBar: React.CSSProperties = {
  backgroundColor: WHITE,
  border: `1px solid ${CLOUD}`,
  borderRadius: 10,
  padding: '12px 16px',
  display: 'flex',
  flexWrap: 'wrap' as const,
  alignItems: 'center',
  gap: 12,
};

export const filterButton = (active: boolean, color?: string): React.CSSProperties => ({
  fontFamily: INTER,
  fontSize: 13,
  fontWeight: 500,
  padding: '6px 12px',
  borderRadius: 6,
  border: 'none',
  cursor: 'pointer',
  transition: 'all 150ms',
  backgroundColor: active ? (color || FOREST) : MIST,
  color: active ? WHITE : SLATE,
});

export const filterSelect: React.CSSProperties = {
  fontFamily: INTER,
  fontSize: 13,
  padding: '6px 12px',
  borderRadius: 6,
  border: `1px solid ${CLOUD}`,
  backgroundColor: WHITE,
  color: CHARCOAL,
};

export const filterInput: React.CSSProperties = {
  fontFamily: INTER,
  fontSize: 13,
  padding: '6px 12px',
  borderRadius: 6,
  border: `1px solid ${CLOUD}`,
  backgroundColor: WHITE,
  color: CHARCOAL,
  flex: '1',
  minWidth: 180,
};

export const pageTitle: React.CSSProperties = {
  fontFamily: FIELDS,
  fontSize: '1.75rem',
  fontWeight: 700,
  color: CHARCOAL,
  lineHeight: 1.2,
  margin: 0,
};

export const sectionTitle: React.CSSProperties = {
  fontFamily: FIELDS,
  fontSize: '1.1rem',
  fontWeight: 700,
  color: CHARCOAL,
  lineHeight: 1.25,
  margin: 0,
};

export const sectionSubtitle: React.CSSProperties = {
  fontFamily: INTER,
  fontSize: 13,
  color: SLATE,
  marginTop: 2,
};

export const bodyText: React.CSSProperties = {
  fontFamily: INTER,
  fontSize: 14,
  lineHeight: 1.6,
  color: CHARCOAL,
};

export const smallText: React.CSSProperties = {
  fontFamily: INTER,
  fontSize: 12,
  lineHeight: 1.5,
  color: SLATE,
};

export const tableHeader: React.CSSProperties = {
  fontFamily: INTER,
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  color: SLATE,
  padding: '10px 12px',
  textAlign: 'left' as const,
  backgroundColor: MIST,
  borderBottom: `2px solid ${CLOUD}`,
};

export const tableCell: React.CSSProperties = {
  fontFamily: INTER,
  fontSize: 13,
  color: CHARCOAL,
  padding: '10px 12px',
  borderBottom: `1px solid ${CLOUD}`,
  verticalAlign: 'top' as const,
};

export const expandButton: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '14px 24px',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  textAlign: 'left' as const,
  transition: 'background-color 150ms',
};

export const codeBlock: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: 13,
  lineHeight: 1.5,
  padding: '16px',
  borderRadius: 8,
  backgroundColor: '#1e293b',
  color: '#e2e8f0',
  overflowX: 'auto' as const,
  margin: '12px 0',
};

export const listItem: React.CSSProperties = {
  fontFamily: INTER,
  fontSize: 14,
  lineHeight: 1.6,
  color: CHARCOAL,
  marginBottom: 4,
};
