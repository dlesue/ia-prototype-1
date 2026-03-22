/**
 * Auto-generated doc view for Personas & Packaging.
 * Renders from the source-of-truth data in src/data/personas-and-packaging.ts.
 * Styled using shared doc styles from IAReviewTabs/docStyles.ts.
 */

import {
  PERSONAS,
  PACKAGES,
  ADDONS,
  NAV_VISIBILITY_MATRIX,
  SCENARIO_PRESETS,
} from '../../data/personas-and-packaging';

import {
  FIELDS, INTER, MONO, CHARCOAL, SLATE, MIST, CLOUD, WHITE, LEAF_GREEN, BARK, FOREST,
  BADGE_CORE, BADGE_PRO, BADGE_ELITE,
  sectionCard, sectionCardBody, tableHeader, tableCell, bodyText, smallText,
} from '../IAReviewTabs/docStyles';

export default function PersonasAndPackagingDoc() {
  const h1Style: React.CSSProperties = {
    fontFamily: FIELDS, fontSize: '2rem', fontWeight: 700, color: CHARCOAL, lineHeight: 1.15, margin: 0,
  };
  const h2Style: React.CSSProperties = {
    fontFamily: FIELDS, fontSize: '1.5rem', fontWeight: 700, color: CHARCOAL, lineHeight: 1.2,
    marginTop: 40, marginBottom: 16, paddingBottom: 8, borderBottom: `2px solid ${LEAF_GREEN}`,
  };
  const subtitleStyle: React.CSSProperties = {
    fontFamily: INTER, fontSize: 13, color: SLATE, marginBottom: 24,
  };
  const h3Style: React.CSSProperties = {
    fontFamily: FIELDS, fontSize: '1.15rem', fontWeight: 700, color: BARK, lineHeight: 1.25,
    marginTop: 28, marginBottom: 12,
  };

  return (
    <div style={{ fontFamily: INTER, color: CHARCOAL }}>
      {/* Personas */}
      <h2 style={h2Style}>Four personas</h2>
      <p style={{ ...bodyText, marginBottom: 16 }}>
        Hub specs reference four primary personas. Their relationship to hubs differs by how much of the product they use and what lens they bring.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {PERSONAS.map(p => (
          <div key={p.id} style={sectionCard}>
            <div style={sectionCardBody}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <h3 style={{ fontFamily: FIELDS, fontSize: '1.05rem', fontWeight: 700, color: CHARCOAL, margin: 0 }}>{p.label}</h3>
                <span style={{ fontFamily: MONO, fontSize: 11, color: SLATE }}>{p.id}</span>
                <span style={{ ...smallText, marginLeft: 'auto' }}>{p.jobsPerHub} jobs per hub</span>
              </div>
              <p style={{ ...bodyText, marginBottom: 8 }}>{p.description}</p>
              <p style={smallText}><span style={{ fontWeight: 600, color: CHARCOAL }}>Hub relationship:</span> {p.hubRelationship}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Packages */}
      <h2 style={h2Style}>Package tiers</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeader}>Package</th>
              <th style={tableHeader}>Products included</th>
              <th style={tableHeader}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {PACKAGES.map(pkg => (
              <tr key={pkg.id}>
                <td style={tableCell}>
                  <span style={{
                    fontFamily: INTER, fontSize: 10, fontWeight: 600,
                    padding: '3px 8px', borderRadius: 100, color: WHITE,
                    textTransform: 'uppercase',
                    backgroundColor: pkg.id === 'core' ? BADGE_CORE : pkg.id === 'pro' ? BADGE_PRO : BADGE_ELITE,
                  }}>
                    {pkg.label}
                  </span>
                </td>
                <td style={tableCell}>{pkg.products.join(', ')}</td>
                <td style={{ ...tableCell, color: SLATE }}>{pkg.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add-ons */}
      <h3 style={h3Style}>Add-ons</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeader}>Add-on</th>
              <th style={tableHeader}>What it adds</th>
            </tr>
          </thead>
          <tbody>
            {ADDONS.map(a => (
              <tr key={a.id}>
                <td style={{ ...tableCell, fontWeight: 600 }}>{a.label}</td>
                <td style={tableCell}>{a.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Nav Visibility Matrix */}
      <h2 style={h2Style}>Nav visibility matrix</h2>
      <p style={{ ...bodyText, marginBottom: 16 }}>
        Which products each persona can see. "✓" means visible. "Add-on" or "Pro"/"Elite" means visible only with that package/add-on. "🔒" means visible but locked (HR Admin only). "—" means hidden.
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeader}>T1 product</th>
              <th style={tableHeader}>Employee</th>
              <th style={tableHeader}>Manager</th>
              <th style={tableHeader}>HR Admin</th>
              <th style={tableHeader}>Exec</th>
            </tr>
          </thead>
          <tbody>
            {NAV_VISIBILITY_MATRIX.map((row, i) => (
              <tr key={row.product} style={{ backgroundColor: i % 2 === 1 ? MIST : 'transparent' }}>
                <td style={{ ...tableCell, fontWeight: 600 }}>{row.product}</td>
                <td style={tableCell}>{row.employee}</td>
                <td style={tableCell}>{row.manager}</td>
                <td style={tableCell}>{row.hrAdmin}</td>
                <td style={tableCell}>{row.exec}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Demo Scenarios */}
      <h2 style={h2Style}>Demo scenarios</h2>
      <p style={{ ...bodyText, marginBottom: 16 }}>
        Six preset combinations of persona + package + add-ons used in the prototype's scenario switcher.
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeader}>#</th>
              <th style={tableHeader}>Scenario</th>
              <th style={tableHeader}>Persona</th>
              <th style={tableHeader}>Package</th>
              <th style={tableHeader}>Add-ons</th>
            </tr>
          </thead>
          <tbody>
            {SCENARIO_PRESETS.map((s, i) => (
              <tr key={s.id} style={{ backgroundColor: i % 2 === 1 ? MIST : 'transparent' }}>
                <td style={{ ...tableCell, color: SLATE }}>{i + 1}</td>
                <td style={{ ...tableCell, fontWeight: 600 }}>{s.label}</td>
                <td style={tableCell}>{s.persona}</td>
                <td style={{ ...tableCell, textTransform: 'capitalize' }}>{s.package}</td>
                <td style={tableCell}>{s.addons.length ? s.addons.join(', ') : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 16 }}>
        {SCENARIO_PRESETS.map(s => (
          <div key={s.id} style={{ ...smallText, marginBottom: 6 }}>
            <span style={{ fontWeight: 600, color: CHARCOAL }}>{s.label}:</span> {s.keyDifferences}
          </div>
        ))}
      </div>
    </div>
  );
}
