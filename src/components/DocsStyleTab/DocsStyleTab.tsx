import { useState } from 'react';
import MarkdownContent from '../MarkdownContent/MarkdownContent';
import {
  FIELDS, INTER, MONO, CHARCOAL, SLATE, LEAF_GREEN, FOREST, BARK, MIST, CLOUD, WHITE,
  BADGE_CORE, BADGE_PRO, BADGE_ELITE,
  ROLE_EMPLOYEE, ROLE_MANAGER, ROLE_ADMIN,
  STATUS_BUILT, STATUS_PLANNED, STATUS_NOT_STARTED,
  sectionCard, sectionCardBody, filterBar, filterButton, filterSelect, filterInput,
  expandButton, sectionTitle, sectionSubtitle, tableHeader, tableCell, bodyText, smallText,
} from '../IAReviewTabs/docStyles';
import { tierBadge, levelBadge, roleDots, statusDisplay } from '../IAReviewTabs/helpers';

const SAMPLE_MARKDOWN = `# This is an H1 heading

This is body text in Inter at 16px with 1.6 line height. It should feel comfortable to read — warm and clear, never dense or academic. **Bold text** highlights key terms. *Italic text* provides light emphasis. Here's some \`inline code\` for technical references.

## This is an H2 heading

H2s are major section dividers. They render in Fields Bold with a Leaf Green bottom border, creating clear visual separation between topics.

### This is an H3 heading

H3s use the warm Bark color for a softer contrast. They mark subsections within a major topic.

#### This is an H4 heading

H4s switch to Inter Semi-Bold. Use them for group labels and FAQ entries.

##### H5 heading

###### H6 heading

## Lists

- First item with a brief description
- Second item — keep items to 1–2 sentences
- Third item with \`inline code\` and **bold** mixed in

1. Open the employee record
2. Navigate to the Pay tab
3. Click **Edit** to modify settings

## Tables

| Feature | Core | Pro | Elite |
|---|---|---|---|
| Employee records | ✓ | ✓ | ✓ |
| Performance reviews | — | ✓ | ✓ |
| Compensation benchmarks | — | — | ✓ |

## Blockquotes

> BambooHR freed up 40% of our HR team's time in the first quarter. The hub-based navigation made it possible for managers to self-serve.

## Code

\`\`\`python
def get_employee(employee_id: int) -> dict:
    response = bamboo.get(f"/employees/{employee_id}")
    return response.json()
\`\`\`

Links render in [Forest green](#) with an underline.
`;

function SampleSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h3 style={{ fontFamily: FIELDS, fontSize: '1.15rem', fontWeight: 700, color: BARK, marginBottom: 16 }}>{title}</h3>
      {children}
    </div>
  );
}

export default function DocsStyleTab() {
  const [sampleExpanded, setSampleExpanded] = useState(true);
  const [sampleFilter, setSampleFilter] = useState('a');

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 0', fontFamily: INTER }}>
      <h2 style={{
        fontFamily: FIELDS, fontSize: '1.75rem', fontWeight: 700, color: CHARCOAL,
        marginBottom: 8, paddingBottom: 8, borderBottom: `2px solid ${LEAF_GREEN}`,
      }}>
        Doc styles reference
      </h2>
      <p style={{ fontSize: 14, color: SLATE, lineHeight: 1.6, marginBottom: 32 }}>
        Live preview of every style used across project documents — both markdown rendering and interactive components. Source: <code style={{ fontFamily: MONO, fontSize: '0.875em', padding: '2px 6px', borderRadius: 4, backgroundColor: MIST, border: `1px solid ${CLOUD}` }}>src/data/markdown-style-rules.ts</code>
      </p>

      {/* Markdown styles */}
      <SampleSection title="Markdown rendering">
        <div style={{ backgroundColor: WHITE, border: `1px solid ${CLOUD}`, borderRadius: 10, padding: '32px 40px' }}>
          <MarkdownContent text={SAMPLE_MARKDOWN} />
        </div>
      </SampleSection>

      {/* Badges */}
      <SampleSection title="Badges">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 16 }}>
          <span style={{ ...smallText, width: 60 }}>Tier:</span>
          {tierBadge('core')} {tierBadge('pro')} {tierBadge('elite')}
          {tierBadge('core', 'sm')} {tierBadge('pro', 'sm')} {tierBadge('elite', 'sm')}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 16 }}>
          <span style={{ ...smallText, width: 60 }}>Level:</span>
          {levelBadge('t0')} {levelBadge('t1')} {levelBadge('t2')} {levelBadge('t3')}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 16 }}>
          <span style={{ ...smallText, width: 60 }}>Roles:</span>
          {roleDots(['employee', 'manager', 'admin'])}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <span style={{ ...smallText, width: 60 }}>Status:</span>
          {statusDisplay('built')} {statusDisplay('planned')} {statusDisplay('not-started')}
        </div>
      </SampleSection>

      {/* Filter bar */}
      <SampleSection title="Filter bar">
        <div style={filterBar}>
          <button style={filterButton(sampleFilter === 'a', FOREST)} onClick={() => setSampleFilter('a')}>Option A</button>
          <button style={filterButton(sampleFilter === 'b', FOREST)} onClick={() => setSampleFilter('b')}>Option B</button>
          <button style={filterButton(sampleFilter === 'c', FOREST)} onClick={() => setSampleFilter('c')}>Option C</button>
          <select style={filterSelect}><option>All tiers</option><option>Core</option><option>Pro</option></select>
          <input type="text" placeholder="Search..." style={filterInput} />
        </div>
      </SampleSection>

      {/* Expandable section */}
      <SampleSection title="Expandable section">
        <div style={sectionCard}>
          <button
            onClick={() => setSampleExpanded(!sampleExpanded)}
            style={expandButton}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = MIST)}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <div>
              <h3 style={sectionTitle}>Section title in Fields Bold</h3>
              <p style={sectionSubtitle}>Subtitle text in Inter, secondary color</p>
            </div>
            <span style={{ color: SLATE, fontSize: 16 }}>{sampleExpanded ? '▾' : '▸'}</span>
          </button>
          {sampleExpanded && (
            <div style={{ padding: '0 24px 24px', borderTop: `1px solid ${CLOUD}`, paddingTop: 16 }}>
              <p style={bodyText}>Expanded content area. Uses standard body text styling — Inter Regular, 14px, Charcoal color.</p>
            </div>
          )}
        </div>
      </SampleSection>

      {/* Card */}
      <SampleSection title="Content card">
        <div style={sectionCard}>
          <div style={sectionCardBody}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <h3 style={{ fontFamily: FIELDS, fontSize: '1.05rem', fontWeight: 700, color: CHARCOAL, margin: 0 }}>Card title</h3>
              <span style={{ fontFamily: MONO, fontSize: 11, color: SLATE }}>metadata</span>
              <span style={{ ...smallText, marginLeft: 'auto' }}>Right-aligned detail</span>
            </div>
            <p style={{ ...bodyText, marginBottom: 8 }}>Card body text describing the content. Cards use a white background with Cloud border and 10px border radius.</p>
            <p style={smallText}><span style={{ fontWeight: 600, color: CHARCOAL }}>Label:</span> Supporting detail in small text</p>
          </div>
        </div>
      </SampleSection>

      {/* Table */}
      <SampleSection title="Data table">
        <div style={sectionCard}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tableHeader}>Name</th>
                <th style={tableHeader}>Level</th>
                <th style={tableHeader}>Tier</th>
                <th style={tableHeader}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ ...tableCell, fontWeight: 600 }}>People</td>
                <td style={tableCell}>{levelBadge('t1')}</td>
                <td style={tableCell}>{tierBadge('core', 'sm')}</td>
                <td style={tableCell}>{statusDisplay('built')}</td>
              </tr>
              <tr style={{ backgroundColor: MIST }}>
                <td style={{ ...tableCell, fontWeight: 600 }}>Compensation</td>
                <td style={tableCell}>{levelBadge('t1')}</td>
                <td style={tableCell}>{tierBadge('elite', 'sm')}</td>
                <td style={tableCell}>{statusDisplay('planned')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SampleSection>

      {/* Color palette */}
      <SampleSection title="Color palette">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { name: 'Leaf Green', hex: LEAF_GREEN },
            { name: 'Forest', hex: FOREST },
            { name: 'Bark', hex: BARK },
            { name: 'Charcoal', hex: CHARCOAL },
            { name: 'Slate', hex: SLATE },
            { name: 'Mist', hex: MIST },
            { name: 'Cloud', hex: CLOUD },
            { name: 'Core', hex: BADGE_CORE },
            { name: 'Pro', hex: BADGE_PRO },
            { name: 'Elite', hex: BADGE_ELITE },
            { name: 'Employee', hex: ROLE_EMPLOYEE },
            { name: 'Admin', hex: ROLE_ADMIN },
          ].map(c => (
            <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: c.hex, border: c.hex === MIST || c.hex === CLOUD ? `1px solid ${CLOUD}` : 'none', flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: INTER, fontSize: 12, fontWeight: 600, color: CHARCOAL }}>{c.name}</div>
                <div style={{ fontFamily: MONO, fontSize: 10, color: SLATE }}>{c.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </SampleSection>
    </div>
  );
}
