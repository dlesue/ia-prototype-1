import { NAV_ITEMS } from '@shared/nav.ts'
import type { Tier } from '@shared/nav.ts'
import { NavSidebar } from '@shared/NavSidebar.tsx'
import { isItemVisibleForRole, isItemInTier } from '@shared/scenarios.ts'
import { theme } from './helpers'
import {
  FIELDS, INTER, CHARCOAL, SLATE, WHITE,
  BADGE_CORE, BADGE_PRO, BADGE_ELITE,
  sectionCard, smallText,
} from './docStyles'

export default function TierComparisonTab() {
  const tiers: { tier: Tier; label: string; color: string }[] = [
    { tier: 'core', label: 'Core', color: BADGE_CORE },
    { tier: 'pro', label: 'Pro', color: BADGE_PRO },
    { tier: 'elite', label: 'Elite', color: BADGE_ELITE },
  ]

  function countT2ForTier(tier: Tier): number {
    return NAV_ITEMS.filter(
      (n) => n.level === 't2' && isItemInTier(n, tier) && isItemVisibleForRole(n, 'admin'),
    ).length
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {tiers.map(({ tier, label, color }) => {
        const t2Count = countT2ForTier(tier)
        return (
          <div key={tier} style={{ ...sectionCard, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <h3 style={{ fontFamily: FIELDS, fontSize: '1.1rem', fontWeight: 700, color: CHARCOAL, margin: 0 }}>{label}</h3>
              <span style={{
                fontFamily: INTER, fontSize: 10, fontWeight: 600,
                padding: '3px 8px', borderRadius: 100,
                backgroundColor: color, color: WHITE,
                textTransform: 'uppercase',
              }}>
                {label}
              </span>
            </div>
            <NavSidebar theme={theme} role="admin" tier={tier} compact highlightTier={tier} width="100%" />
            <p style={{ ...smallText, textAlign: 'center', marginTop: 12 }}>
              Includes {t2Count} modules
            </p>
          </div>
        )
      })}
    </div>
  )
}
