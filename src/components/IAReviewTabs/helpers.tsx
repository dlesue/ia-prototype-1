import { getTheme } from '@shared/tokens.ts'
import { NAV_ITEMS } from '@shared/nav.ts'
import type { NavItem, Role, Tier, Status, NavLevel } from '@shared/nav.ts'
import {
  INTER, CHARCOAL, SLATE, WHITE,
  BADGE_CORE, BADGE_PRO, BADGE_ELITE,
  ROLE_EMPLOYEE, ROLE_MANAGER, ROLE_ADMIN,
  STATUS_BUILT, STATUS_PLANNED, STATUS_NOT_STARTED,
} from './docStyles'

export const theme = getTheme('green')

export function tierBadge(tier: Tier, size: 'sm' | 'md' = 'md') {
  const colors: Record<Tier, string> = {
    core: BADGE_CORE,
    pro: BADGE_PRO,
    elite: BADGE_ELITE,
  }
  const px = size === 'sm' ? '4px 8px' : '4px 10px';
  const fs = size === 'sm' ? 10 : 12;
  return (
    <span style={{
      fontFamily: INTER, fontSize: fs, fontWeight: 600,
      padding: px, borderRadius: 100,
      backgroundColor: colors[tier], color: WHITE,
      textTransform: 'uppercase', letterSpacing: '0.03em',
    }}>
      {tier}
    </span>
  )
}

export function levelBadge(level: NavLevel) {
  const colors: Record<NavLevel, { bg: string; text: string }> = {
    t0: { bg: BADGE_CORE, text: WHITE },
    t1: { bg: theme.colors.primaryStrong, text: WHITE },
    t2: { bg: BADGE_PRO, text: WHITE },
    t3: { bg: '#E8E4DD', text: CHARCOAL },
  }
  const c = colors[level]
  return (
    <span style={{
      fontFamily: INTER, fontSize: 11, fontWeight: 600,
      padding: '3px 10px', borderRadius: 100,
      backgroundColor: c.bg, color: c.text,
      textTransform: 'uppercase',
    }}>
      {level}
    </span>
  )
}

export function roleDots(roles: Role[], showLabel = true) {
  const roleConfig: Record<Role, { color: string; label: string }> = {
    employee: { color: ROLE_EMPLOYEE, label: 'Employee' },
    manager: { color: ROLE_MANAGER, label: 'Manager' },
    admin: { color: ROLE_ADMIN, label: 'Admin' },
    'it-admin': { color: ROLE_ADMIN, label: 'IT Admin' },
    'finance-admin': { color: ROLE_ADMIN, label: 'Finance Admin' },
    'workplace-admin': { color: ROLE_ADMIN, label: 'Workplace Admin' },
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {roles.map((r) => (
        <span key={r} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: roleConfig[r].color, display: 'inline-block' }} />
          {showLabel && <span style={{ fontFamily: INTER, fontSize: 12, color: SLATE }}>{roleConfig[r].label}</span>}
        </span>
      ))}
    </div>
  )
}

export function statusDisplay(status: Status) {
  const config: Record<Status, { color: string; label: string }> = {
    built: { color: STATUS_BUILT, label: 'Built' },
    planned: { color: STATUS_PLANNED, label: 'Planned' },
    'not-started': { color: STATUS_NOT_STARTED, label: 'Not Started' },
  }
  const c = config[status]
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: c.color, display: 'inline-block' }} />
      <span style={{ fontFamily: INTER, fontSize: 12, color: SLATE }}>{c.label}</span>
    </span>
  )
}

export function getParentLabel(item: NavItem): string {
  if (!item.parentId) return '—'
  const parent = NAV_ITEMS.find((n) => n.id === item.parentId)
  return parent ? parent.label : '—'
}
