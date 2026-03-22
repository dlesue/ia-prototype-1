import { NavSidebar } from '@shared/NavSidebar.tsx'
import { getTheme } from '@shared/tokens.ts'

const theme = getTheme('green')

// ── Shared wrapper for all illustrations ─────────────────────────────

function IllustrationContainer({
  children,
  caption,
}: {
  children: React.ReactNode
  caption: string
}) {
  return (
    <div className="bg-slate-50 rounded-lg p-4 mb-4">
      {children}
      <p className="text-xs text-slate-500 mt-3 text-center italic">{caption}</p>
    </div>
  )
}

// ── 1. Vocabulary: mapping diagram ───────────────────────────────────

function VocabularyIllustration() {
  const rows = [
    { left: 'Product', right: 'T1', color: '#16a34a', bg: '#f0fdf4' },
    { left: 'Module', right: 'T2', color: '#2563eb', bg: '#eff6ff' },
    { left: 'Feature', right: 'T3', color: '#6b7280', bg: '#f9fafb' },
  ]

  return (
    <IllustrationContainer caption="How business concepts map to navigation tiers">
      <div className="flex flex-col gap-2 max-w-sm mx-auto">
        {rows.map((row) => (
          <div key={row.left} className="flex items-center gap-3">
            <span
              className="inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium bg-white border border-slate-200"
              style={{ minWidth: 80, color: '#334155' }}
            >
              {row.left}
            </span>
            <span className="text-slate-400 text-sm">&#8594;</span>
            <span
              className="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: row.bg, color: row.color, minWidth: 40 }}
            >
              {row.right}
            </span>
          </div>
        ))}
      </div>
    </IllustrationContainer>
  )
}

// ── 2. T0 Rules: static chrome illustration ──────────────────────────

function T0Illustration() {
  const surfaceBg = theme.surface.xxWeak
  const borderColor = theme.border.xxWeak
  const textStrong = theme.text.xxStrong
  const textWeak = theme.text.weak

  return (
    <IllustrationContainer caption="T0 items are pinned above the domain nav — utilities, not destinations">
      <div className="flex gap-4 items-start justify-center">
        {/* Mini nav mockup */}
        <div
          className="rounded-[10px] overflow-hidden flex-shrink-0"
          style={{
            width: 200,
            backgroundColor: surfaceBg,
            border: `1px solid ${borderColor}`,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          {/* T0 section */}
          <div className="flex flex-col gap-0.5" style={{ padding: '10px 8px 8px 8px' }}>
            {/* Search */}
            <div
              className="flex items-center rounded-[8px] gap-2"
              style={{ padding: '5px 8px', fontSize: 12, fontWeight: 500, color: textStrong }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Search</span>
              <span style={{ marginLeft: 'auto', fontSize: 9, color: textWeak }}>&#8984;K</span>
            </div>
            {/* Inbox */}
            <div
              className="flex items-center rounded-[8px] gap-2"
              style={{ padding: '5px 8px', fontSize: 12, fontWeight: 500, color: textStrong }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
              </svg>
              <span>Inbox</span>
              <span
                className="rounded-full font-semibold"
                style={{
                  fontSize: 9, lineHeight: '16px', padding: '0 5px',
                  backgroundColor: '#9b9895', color: '#fff', marginLeft: 'auto',
                }}
              >
                12
              </span>
            </div>
            {/* My Info */}
            <div
              className="flex items-center rounded-[8px] gap-2"
              style={{ padding: '5px 8px', fontSize: 12, fontWeight: 500, color: textStrong }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
              <span>My Info</span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, backgroundColor: borderColor, margin: '0 8px' }} />

          {/* Grayed-out T1 hint */}
          <div className="flex flex-col gap-0.5" style={{ padding: '8px 8px 10px 8px', opacity: 0.35 }}>
            <div className="flex items-center gap-2" style={{ padding: '5px 8px', fontSize: 12, color: textWeak }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              <span>Home</span>
            </div>
            <div className="flex items-center gap-2" style={{ padding: '5px 8px', fontSize: 12, color: textWeak }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>People</span>
            </div>
            <div style={{ padding: '4px 8px', fontSize: 11, color: textWeak }}>...</div>
          </div>
        </div>

        {/* Annotation */}
        <div className="flex flex-col justify-start pt-2" style={{ minWidth: 140 }}>
          <div
            className="rounded-md border-l-2 pl-2 mb-3"
            style={{ borderColor: '#16a34a', fontSize: 11, color: '#334155', lineHeight: 1.4 }}
          >
            <span className="font-semibold" style={{ color: '#16a34a' }}>T0 Chrome</span>
            <br />
            Always visible, every session.
            <br />
            Utilities, not destinations.
          </div>
          <div
            className="rounded-md border-l-2 pl-2"
            style={{ borderColor: '#cbd5e1', fontSize: 11, color: '#94a3b8', lineHeight: 1.4 }}
          >
            T1 domain nav continues below...
          </div>
        </div>
      </div>
    </IllustrationContainer>
  )
}

// ── 3. T1 Rules: live nav with cluster annotations ───────────────────

function T1Illustration() {
  const clusters: { items: string[]; label: string; color: string }[] = [
    { items: ['Home'], label: 'Entry point anchor', color: '#16a34a' },
    { items: ['People', 'Hiring'], label: 'Identity & acquisition', color: '#2563eb' },
    { items: ['Payroll', 'Time', 'Benefits'], label: 'Operational cluster', color: '#8b5cf6' },
    { items: ['Talent', 'Culture'], label: 'Development & engagement', color: '#d97706' },
    { items: ['Apps'], label: 'Platform & ecosystem', color: '#6b7280' },
    { items: ['Analytics'], label: 'Cross-cutting lens', color: '#6b7280' },
    { items: ['Settings'], label: 'Configuration anchor', color: '#6b7280' },
  ]

  return (
    <IllustrationContainer caption="11 T1 domains organized into clusters — hard cap of 12">
      <div className="flex gap-4 items-start justify-center overflow-x-auto">
        {/* Live NavSidebar */}
        <div className="flex-shrink-0" style={{ maxHeight: 420, overflow: 'hidden' }}>
          <NavSidebar theme={theme} role="admin" tier="elite" compact width={200} />
        </div>

        {/* Cluster annotations */}
        <div className="flex flex-col gap-1 pt-1 flex-shrink-0" style={{ fontSize: 11, minWidth: 180 }}>
          {clusters.map((cluster) => (
            <div key={cluster.label} className="flex items-start gap-2" style={{ marginBottom: cluster.items.length > 1 ? 2 : 0 }}>
              <div className="flex flex-col items-end flex-shrink-0" style={{ minWidth: 70 }}>
                {cluster.items.map((item, i) => (
                  <div key={item} className="flex items-center gap-1">
                    <span style={{ color: '#64748b', fontSize: 10, lineHeight: 1.6 }}>{item}</span>
                    {cluster.items.length > 1 && (
                      <span style={{ color: cluster.color, fontSize: 10, lineHeight: 1 }}>
                        {i === 0 ? '\u250C' : i === cluster.items.length - 1 ? '\u2514' : '\u2502'}
                      </span>
                    )}
                    {cluster.items.length === 1 && (
                      <span style={{ color: cluster.color, fontSize: 10 }}>&mdash;</span>
                    )}
                  </div>
                ))}
              </div>
              <div
                className="flex items-center self-center"
                style={{ color: cluster.color, fontWeight: 500, fontSize: 10, lineHeight: 1.3 }}
              >
                {cluster.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </IllustrationContainer>
  )
}

// ── 4. T2 Rules: live nav with People expanded ───────────────────────

function T2Illustration() {
  return (
    <IllustrationContainer caption="T2 modules appear under their T1 parent — max 7 per T1, ordered by frequency">
      <div className="flex justify-center overflow-x-auto">
        <div className="flex-shrink-0" style={{ maxHeight: 460, overflow: 'hidden' }}>
          <NavSidebar
            theme={theme}
            role="admin"
            tier="elite"
            compact
            width={240}
            expandedT1="people"
            onT1Click={() => {}}
          />
        </div>
      </div>
    </IllustrationContainer>
  )
}

// ── 5. T3 Rules: tab illustration ────────────────────────────────────

function T3Illustration() {
  const tabs = [
    { label: 'Active', active: true },
    { label: 'Inactive', active: false },
    { label: 'Contractors', active: false },
  ]

  return (
    <IllustrationContainer caption="T3 items organize content within a T2 page — max 6 tabs per page">
      <div
        className="bg-white rounded-lg border border-slate-200 overflow-hidden mx-auto"
        style={{ maxWidth: 400 }}
      >
        {/* Page header */}
        <div style={{ padding: '16px 20px 0 20px' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1e293b', margin: 0 }}>
            Employee Directory
          </h3>
        </div>

        {/* Tab bar */}
        <div className="flex gap-0" style={{ padding: '12px 20px 0 20px', borderBottom: '1px solid #e2e8f0' }}>
          {tabs.map((tab) => (
            <button
              key={tab.label}
              className="relative pb-2 px-3 text-sm font-medium"
              style={{
                color: tab.active ? theme.colors.primaryStrong : '#64748b',
                background: 'none',
                border: 'none',
                cursor: 'default',
              }}
            >
              {tab.label}
              {tab.active && (
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{ height: 2, backgroundColor: theme.colors.primaryStrong, borderRadius: 1 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content hint */}
        <div style={{ padding: '12px 20px 16px 20px' }}>
          <div className="flex flex-col gap-1.5">
            <div className="h-2 rounded-full bg-slate-100" style={{ width: '80%' }} />
            <div className="h-2 rounded-full bg-slate-100" style={{ width: '60%' }} />
            <div className="h-2 rounded-full bg-slate-100" style={{ width: '70%' }} />
          </div>
          <p style={{ fontSize: 10, color: '#94a3b8', marginTop: 10, fontStyle: 'italic' }}>
            T3 elements are in-page tabs, not sidebar entries
          </p>
        </div>
      </div>
    </IllustrationContainer>
  )
}

// ── 6. Ordering Rules: three-section nav with labels ─────────────────

function OrderingIllustration() {
  return (
    <IllustrationContainer caption="Three nav sections: chrome utilities, domain workflows, platform tools">
      <div className="flex gap-4 items-start justify-center overflow-x-auto">
        {/* Live NavSidebar */}
        <div className="flex-shrink-0" style={{ maxHeight: 420, overflow: 'hidden' }}>
          <NavSidebar theme={theme} role="admin" tier="elite" compact width={200} />
        </div>

        {/* Section annotations */}
        <div className="flex flex-col flex-shrink-0" style={{ fontSize: 11, minWidth: 150 }}>
          {/* T0 Chrome label */}
          <div
            className="rounded-md border border-slate-200 bg-white px-2 py-1.5"
            style={{ marginBottom: 6 }}
          >
            <div className="flex items-center gap-1.5">
              <div className="rounded-full" style={{ width: 6, height: 6, backgroundColor: '#f59e0b', flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: '#334155', fontSize: 11 }}>T0 Chrome</span>
            </div>
            <p style={{ fontSize: 9, color: '#94a3b8', margin: '2px 0 0 0' }}>
              Search, Inbox, My Info
            </p>
          </div>

          {/* Divider indicator */}
          <div style={{ height: 1, backgroundColor: '#e2e8f0', margin: '2px 0', width: '80%' }} />

          {/* T1 Domain label */}
          <div
            className="rounded-md border border-slate-200 bg-white px-2 py-1.5"
            style={{ marginTop: 6, marginBottom: 6 }}
          >
            <div className="flex items-center gap-1.5">
              <div className="rounded-full" style={{ width: 6, height: 6, backgroundColor: '#16a34a', flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: '#334155', fontSize: 11 }}>T1 Domain Nav</span>
            </div>
            <p style={{ fontSize: 9, color: '#94a3b8', margin: '2px 0 0 0' }}>
              Home through Culture
            </p>
          </div>

          {/* Divider indicator */}
          <div style={{ height: 1, backgroundColor: '#e2e8f0', margin: '2px 0', width: '80%' }} />

          {/* T1 Platform label */}
          <div
            className="rounded-md border border-slate-200 bg-white px-2 py-1.5"
            style={{ marginTop: 6 }}
          >
            <div className="flex items-center gap-1.5">
              <div className="rounded-full" style={{ width: 6, height: 6, backgroundColor: '#6366f1', flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: '#334155', fontSize: 11 }}>T1 Platform</span>
            </div>
            <p style={{ fontSize: 9, color: '#94a3b8', margin: '2px 0 0 0' }}>
              Apps, Analytics, Settings
            </p>
          </div>
        </div>
      </div>
    </IllustrationContainer>
  )
}

// ── 7. Decision Tree: flowchart ──────────────────────────────────────

function DecisionTreeIllustration() {
  const boxBase = 'rounded-md px-3 py-1.5 text-center font-medium border'
  const startBox = `${boxBase} bg-slate-100 border-slate-300 text-slate-700`
  const decisionBox = `${boxBase} bg-blue-50 border-blue-200 text-blue-800`
  const outcomeBox = `${boxBase} bg-green-50 border-green-200 text-green-800`
  const connectorV = 'w-px bg-slate-300 mx-auto'
  const connectorLabel = 'text-center text-slate-400 font-medium'

  return (
    <IllustrationContainer caption="Walk through this tree when placing any new feature, module, or product">
      <div className="flex flex-col items-center gap-0" style={{ fontSize: 11 }}>
        {/* Start */}
        <div className={startBox}>New feature — where does it go?</div>
        <div className={connectorV} style={{ height: 12 }} />

        {/* Decision 1 */}
        <div className={decisionBox}>Cross-cutting, every session?</div>
        <div className="flex items-start justify-center w-full" style={{ maxWidth: 500 }}>
          {/* YES branch */}
          <div className="flex flex-col items-center" style={{ width: '30%' }}>
            <div className={connectorLabel} style={{ fontSize: 9, padding: '2px 0' }}>YES</div>
            <div className={connectorV} style={{ height: 8 }} />
            <div className={outcomeBox} style={{ fontSize: 10 }}>T0 (or sub-page of existing T0)</div>
          </div>

          {/* NO branch */}
          <div className="flex flex-col items-center" style={{ width: '40%' }}>
            <div className={connectorLabel} style={{ fontSize: 9, padding: '2px 0' }}>NO</div>
            <div className={connectorV} style={{ height: 8 }} />

            {/* Decision 2 */}
            <div className={decisionBox}>Belongs to existing T1?</div>

            <div className="flex items-start justify-center w-full">
              {/* YES -> Decision 3 */}
              <div className="flex flex-col items-center" style={{ width: '50%' }}>
                <div className={connectorLabel} style={{ fontSize: 9, padding: '2px 0' }}>YES</div>
                <div className={connectorV} style={{ height: 8 }} />
                <div className={decisionBox} style={{ fontSize: 10 }}>Distinct workflow?</div>

                <div className="flex items-start justify-center w-full">
                  <div className="flex flex-col items-center" style={{ width: '50%' }}>
                    <div className={connectorLabel} style={{ fontSize: 9, padding: '2px 0' }}>YES</div>
                    <div className={connectorV} style={{ height: 6 }} />
                    <div className={outcomeBox} style={{ fontSize: 10 }}>New T2</div>
                    <div className={connectorV} style={{ height: 4 }} />
                    <div style={{ fontSize: 9, color: '#64748b', textAlign: 'center' }}>
                      Has sub-views? Those are T3
                    </div>
                  </div>
                  <div className="flex flex-col items-center" style={{ width: '50%' }}>
                    <div className={connectorLabel} style={{ fontSize: 9, padding: '2px 0' }}>NO</div>
                    <div className={connectorV} style={{ height: 6 }} />
                    <div className={outcomeBox} style={{ fontSize: 10 }}>Feature within T2/T3</div>
                  </div>
                </div>
              </div>

              {/* NO -> Decision 4 */}
              <div className="flex flex-col items-center" style={{ width: '50%' }}>
                <div className={connectorLabel} style={{ fontSize: 9, padding: '2px 0' }}>NO</div>
                <div className={connectorV} style={{ height: 8 }} />
                <div className={decisionBox} style={{ fontSize: 10 }}>Meets all 5 T1 criteria?</div>

                <div className="flex items-start justify-center w-full">
                  <div className="flex flex-col items-center" style={{ width: '50%' }}>
                    <div className={connectorLabel} style={{ fontSize: 9, padding: '2px 0' }}>YES</div>
                    <div className={connectorV} style={{ height: 6 }} />
                    <div className={outcomeBox} style={{ fontSize: 10 }}>New T1 (check count)</div>
                  </div>
                  <div className="flex flex-col items-center" style={{ width: '50%' }}>
                    <div className={connectorLabel} style={{ fontSize: 9, padding: '2px 0' }}>NO</div>
                    <div className={connectorV} style={{ height: 6 }} />
                    <div className={outcomeBox} style={{ fontSize: 10 }}>Expand closest T1 or nest in Settings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IllustrationContainer>
  )
}

// ── 9. Structural Guardrails: card grid ──────────────────────────────

function GuardrailsIllustration() {
  const guardrails = [
    { label: 'No solo T1s', desc: 'Every T1 needs 2+ T2s' },
    { label: 'No duplicates', desc: 'Each feature lives in one place' },
    { label: 'Max 12 T1s', desc: 'Hard cap on sidebar items' },
    { label: 'No hidden T2s', desc: 'All T2s visible when T1 expanded' },
    { label: 'No Settings dumping', desc: 'Settings is not a catch-all' },
    { label: 'No stealth gating', desc: 'Locked items show lock/tier badge' },
  ]

  return (
    <IllustrationContainer caption="Six things that should never happen in the nav">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-md mx-auto">
        {guardrails.map((g) => (
          <div
            key={g.label}
            className="bg-white border border-slate-200 rounded-lg p-2.5 flex flex-col items-center text-center"
          >
            <div
              className="flex items-center justify-center rounded-full mb-1.5"
              style={{ width: 24, height: 24, backgroundColor: '#fef2f2', color: '#ef4444', fontSize: 12, fontWeight: 700 }}
            >
              &#10005;
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#334155', lineHeight: 1.3 }}>
              {g.label}
            </span>
            <span style={{ fontSize: 9, color: '#94a3b8', marginTop: 2, lineHeight: 1.3 }}>
              {g.desc}
            </span>
          </div>
        ))}
      </div>
    </IllustrationContainer>
  )
}

// ── 10. Expansion Framework: phase diagram ───────────────────────────

function ExpansionIllustration() {
  const phases = [
    { phase: 'Phase 1', label: 'Integration', desc: 'Partner app in Apps directory', bg: '#f1f5f9', border: '#cbd5e1', color: '#475569' },
    { phase: 'Phase 2', label: 'Native Lite', desc: 'T2 under closest T1', bg: '#eff6ff', border: '#93c5fd', color: '#1d4ed8' },
    { phase: 'Phase 3', label: 'Domain Promotion', desc: 'New T1', bg: '#f0fdf4', border: '#86efac', color: '#16a34a' },
  ]

  const arrows = [
    'Demand validated',
    '3+ modules, own persona',
  ]

  return (
    <IllustrationContainer caption="Non-HCM domains enter through three phases">
      <div className="flex items-center justify-center gap-1 overflow-x-auto">
        {phases.map((p, i) => (
          <div key={p.label} className="flex items-center gap-1">
            {/* Phase box */}
            <div
              className="rounded-lg border px-3 py-2 text-center flex-shrink-0"
              style={{ backgroundColor: p.bg, borderColor: p.border, minWidth: 110 }}
            >
              <div style={{ fontSize: 9, fontWeight: 600, color: p.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {p.phase}
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: p.color, marginTop: 2 }}>
                {p.label}
              </div>
              <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 2, lineHeight: 1.3 }}>
                {p.desc}
              </div>
            </div>

            {/* Arrow + label */}
            {i < phases.length - 1 && (
              <div className="flex flex-col items-center flex-shrink-0" style={{ minWidth: 60 }}>
                <span style={{ fontSize: 8, color: '#94a3b8', textAlign: 'center', lineHeight: 1.2, marginBottom: 2 }}>
                  {arrows[i]}
                </span>
                <svg width="24" height="12" viewBox="0 0 24 12">
                  <line x1="0" y1="6" x2="18" y2="6" stroke="#cbd5e1" strokeWidth="1.5" />
                  <polygon points="18,2 24,6 18,10" fill="#cbd5e1" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </IllustrationContainer>
  )
}

// ── Main export ──────────────────────────────────────────────────────

export function getRuleIllustration(sectionId: string): React.ReactElement | null {
  switch (sectionId) {
    case 'vocabulary':
      return <VocabularyIllustration />
    case 't0-rules':
      return <T0Illustration />
    case 't1-rules':
      return <T1Illustration />
    case 't2-rules':
      return <T2Illustration />
    case 't3-rules':
      return <T3Illustration />
    case 'ordering-rules':
      return <OrderingIllustration />
    case 'decision-tree':
      return <DecisionTreeIllustration />
    case 'naming-rules':
      return null
    case 'structural-guardrails':
      return <GuardrailsIllustration />
    case 'expansion-framework':
      return <ExpansionIllustration />
    case 'worked-examples':
      return null
    default:
      return null
  }
}
