import { getRuleIllustration } from './RuleIllustrations'
import { IA_RULES, type RuleContent } from './rulesData'
import {
  FIELDS, INTER, MONO, CHARCOAL, SLATE, BARK, LEAF_GREEN, MIST, CLOUD,
  bodyText, tableHeader, tableCell, codeBlock, listItem,
} from './docStyles'

function renderContent(content: RuleContent, idx: number) {
  switch (content.type) {
    case 'heading':
      return (
        <h4 key={idx} style={{ fontFamily: INTER, fontSize: '1rem', fontWeight: 600, color: CHARCOAL, marginTop: 20, marginBottom: 8 }}>
          {content.value as string}
        </h4>
      )
    case 'text':
      return (
        <p key={idx} style={{ ...bodyText, marginBottom: 12 }}>
          {content.value as string}
        </p>
      )
    case 'list':
      return (
        <ul key={idx} style={{ listStyleType: 'disc', marginLeft: 20, marginBottom: 12 }}>
          {(content.items ?? []).map((item, i) => (
            <li key={i} style={listItem}>{item}</li>
          ))}
        </ul>
      )
    case 'table': {
      const header = content.headers ?? []
      const body = content.rows ?? []
      return (
        <div key={idx} style={{ overflowX: 'auto', marginBottom: 12 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {header.map((h, i) => (
                  <th key={i} style={tableHeader}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri} style={{ backgroundColor: ri % 2 === 1 ? MIST : 'transparent' }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={tableCell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
    case 'code':
      return (
        <pre key={idx} style={codeBlock}>
          {content.value as string}
        </pre>
      )
    default:
      return null
  }
}

export default function IARulesTab() {
  return (
    <div style={{ fontFamily: INTER, color: CHARCOAL }}>
      {IA_RULES.map((section, sectionIdx) => (
        <div key={section.id} style={{ marginBottom: 40 }}>
          <h2 style={{
            fontFamily: FIELDS,
            fontSize: '1.5rem',
            fontWeight: 700,
            color: CHARCOAL,
            lineHeight: 1.2,
            marginTop: sectionIdx === 0 ? 0 : 40,
            marginBottom: 4,
            paddingBottom: 8,
            borderBottom: `2px solid ${LEAF_GREEN}`,
          }}>
            {section.title}
          </h2>
          <p style={{ fontFamily: INTER, fontSize: 13, color: SLATE, marginBottom: 16 }}>
            {section.subtitle}
          </p>
          {getRuleIllustration(section.id)}
          {section.content.map((c, i) => renderContent(c, i))}
        </div>
      ))}
    </div>
  )
}
