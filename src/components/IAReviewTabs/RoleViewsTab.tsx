import { NAV_ITEMS } from '@shared/nav.ts'
import type { Role } from '@shared/nav.ts'
import { NavSidebar } from '@shared/NavSidebar.tsx'
import { countVisibleItems } from '@shared/scenarios.ts'
import { theme } from './helpers'
import {
  FIELDS, INTER, CHARCOAL, SLATE, CLOUD, WHITE,
  ROLE_EMPLOYEE, ROLE_MANAGER, ROLE_ADMIN,
  sectionCard, smallText,
} from './docStyles'

export default function RoleViewsTab() {
  const roles: { role: Role; label: string; color: string }[] = [
    { role: 'employee', label: 'Employee view', color: ROLE_EMPLOYEE },
    { role: 'manager', label: 'Manager view', color: ROLE_MANAGER },
    { role: 'admin', label: 'Admin view', color: ROLE_ADMIN },
  ]

  const totalNavItems = NAV_ITEMS.filter((n) => n.level !== 't3').length

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {roles.map(({ role, label, color }) => {
        const visibleCount = countVisibleItems(NAV_ITEMS, role, 'elite', 't3')
        return (
          <div key={role} style={{ ...sectionCard, padding: 16 }}>
            <h3 style={{ fontFamily: FIELDS, fontSize: '1.1rem', fontWeight: 700, color, margin: 0, marginBottom: 12 }}>{label}</h3>
            <NavSidebar theme={theme} role={role} tier="elite" compact hideFiltered width="100%" />
            <p style={{ ...smallText, textAlign: 'center', marginTop: 12 }}>
              Sees {visibleCount} of {totalNavItems} total nav items
            </p>
          </div>
        )
      })}
    </div>
  )
}
