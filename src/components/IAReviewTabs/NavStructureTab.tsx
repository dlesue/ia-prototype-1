import { useState } from 'react'
import { NAV_ITEMS, getChildren } from '@shared/nav.ts'
import type { Role, Tier } from '@shared/nav.ts'
import { NavSidebar } from '@shared/NavSidebar.tsx'
import { theme, tierBadge, roleDots } from './helpers'
import {
  FIELDS, INTER, CHARCOAL, SLATE, FOREST, LEAF_GREEN, MIST, CLOUD, WHITE,
  filterBar, filterButton, sectionCard, bodyText, smallText,
} from './docStyles'

export default function NavStructureTab() {
  const [selectedRole, setSelectedRole] = useState<Role>('admin')
  const [selectedTier, setSelectedTier] = useState<Tier>('elite')
  const [expandedT1, setExpandedT1] = useState<string | null>('home')
  const [selectedT2, setSelectedT2] = useState<string>('home-dashboard')
  const [selectedT3, setSelectedT3] = useState<string | null>(null)

  const selectedT2Item = NAV_ITEMS.find((n) => n.id === selectedT2)
  const t3Children = selectedT2Item ? getChildren(selectedT2Item.id).filter((c) => c.level === 't3') : []
  const selectedT3Item = selectedT3 ? NAV_ITEMS.find((n) => n.id === selectedT3) : null

  function handleT1Click(id: string) {
    if (expandedT1 === id) {
      setExpandedT1(null)
    } else {
      setExpandedT1(id)
      const firstT2 = getChildren(id).find((c) => c.level === 't2')
      if (firstT2) {
        setSelectedT2(firstT2.id)
        setSelectedT3(null)
      }
    }
  }

  function handleT2Click(id: string) {
    setSelectedT2(id)
    setSelectedT3(null)
  }

  const tierColors: Record<Tier, string> = { core: '#6B7280', pro: '#2563EB', elite: '#7C3AED' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Controls */}
      <div style={filterBar}>
        <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 500, color: CHARCOAL }}>Role:</span>
        {(['employee', 'manager', 'admin'] as Role[]).map((r) => (
          <button key={r} onClick={() => setSelectedRole(r)} style={filterButton(selectedRole === r, FOREST)}>
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
        <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 500, color: CHARCOAL, marginLeft: 12 }}>Tier:</span>
        {(['core', 'pro', 'elite'] as Tier[]).map((t) => (
          <button key={t} onClick={() => setSelectedTier(t)} style={filterButton(selectedTier === t, tierColors[t])}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Sidebar + Content */}
      <div style={{ display: 'flex', gap: 0, borderRadius: 10, overflow: 'hidden', border: `1px solid ${CLOUD}`, minHeight: 600 }}>
        <div>
          <NavSidebar
            theme={theme} role={selectedRole} tier={selectedTier}
            expandedT1={expandedT1} selectedT2={selectedT2}
            onT1Click={handleT1Click} onT2Click={handleT2Click}
            width={280} showTopChrome showBottomChrome showGearIcons sortLockedToBottom
          />
        </div>

        <div style={{ flex: 1, backgroundColor: WHITE, padding: 24, overflowY: 'auto' }}>
          {selectedT2Item ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <h2 style={{ fontFamily: FIELDS, fontSize: '1.35rem', fontWeight: 700, color: CHARCOAL, margin: 0 }}>{selectedT2Item.label}</h2>
                {tierBadge(selectedT2Item.tier)}
              </div>
              <div style={{ marginBottom: 16 }}>{roleDots(selectedT2Item.roles)}</div>
              <p style={{ ...bodyText, marginBottom: 24 }}>{selectedT2Item.description}</p>

              {t3Children.length > 0 && (
                <div>
                  <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${CLOUD}`, marginBottom: 16 }}>
                    {t3Children.map((t3) => (
                      <button
                        key={t3.id}
                        onClick={() => setSelectedT3(selectedT3 === t3.id ? null : t3.id)}
                        style={{
                          fontFamily: INTER, fontSize: 13, fontWeight: 500,
                          padding: '8px 16px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer',
                          borderBottom: `2px solid ${selectedT3 === t3.id ? LEAF_GREEN : 'transparent'}`,
                          color: selectedT3 === t3.id ? FOREST : SLATE,
                          transition: 'all 150ms',
                        }}
                      >
                        {t3.label}
                      </button>
                    ))}
                  </div>
                  {selectedT3Item && (
                    <div style={{ backgroundColor: MIST, borderRadius: 8, padding: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <h3 style={{ fontFamily: INTER, fontSize: '1rem', fontWeight: 600, color: CHARCOAL, margin: 0 }}>{selectedT3Item.label}</h3>
                        {tierBadge(selectedT3Item.tier, 'sm')}
                      </div>
                      <div style={{ marginBottom: 8 }}>{roleDots(selectedT3Item.roles)}</div>
                      <p style={smallText}>{selectedT3Item.description}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', ...smallText }}>
              Select a module from the sidebar
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
