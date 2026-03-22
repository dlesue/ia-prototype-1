import React, { useState } from 'react'
import { NAV_ITEMS, getChildren, getT0Items, getT1Items } from '@shared/nav.ts'
import type { NavItem, Role, Tier, Status, NavLevel } from '@shared/nav.ts'
import { tierBadge, levelBadge, roleDots, statusDisplay, getParentLabel } from './helpers'
import {
  INTER, CHARCOAL, SLATE, MIST, CLOUD, WHITE,
  filterBar, filterSelect, filterInput, sectionCard, tableHeader, tableCell,
} from './docStyles'

export default function ProductsModulesTab() {
  const [levelFilter, setLevelFilter] = useState<NavLevel | 'all'>('all')
  const [tierFilter, setTierFilter] = useState<Tier | 'all'>('all')
  const [roleFilter, setRoleFilter] = useState<Role | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all')
  const [search, setSearch] = useState('')
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [statuses, setStatuses] = useState<Record<string, Status>>(() => {
    const init: Record<string, Status> = {}
    NAV_ITEMS.forEach((item) => { init[item.id] = item.status })
    return init
  })

  function toggleExpand(id: string) {
    setExpandedRows((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function cycleStatus(id: string) {
    setStatuses((prev) => {
      const order: Status[] = ['built', 'planned', 'not-started']
      const current = prev[id]
      const nextIdx = (order.indexOf(current) + 1) % order.length
      return { ...prev, [id]: order[nextIdx] }
    })
  }

  const searchLower = search.toLowerCase()

  function matchesFilters(item: NavItem): boolean {
    if (levelFilter !== 'all' && item.level !== levelFilter) return false
    if (tierFilter !== 'all' && item.tier !== tierFilter) return false
    if (roleFilter !== 'all' && !item.roles.includes(roleFilter)) return false
    if (statusFilter !== 'all' && statuses[item.id] !== statusFilter) return false
    if (searchLower && !item.label.toLowerCase().includes(searchLower)) return false
    return true
  }

  function renderRow(item: NavItem, indent: number, hasChildren: boolean, isExpanded: boolean) {
    const pl = indent === 0 ? 12 : indent === 1 ? 32 : 56
    return (
      <tr key={item.id} style={{ borderBottom: `1px solid ${CLOUD}` }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = MIST)}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <td style={{ ...tableCell, paddingLeft: pl }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {hasChildren ? (
              <button onClick={() => toggleExpand(item.id)} style={{ color: SLATE, width: 16, fontSize: 12, background: 'none', border: 'none', cursor: 'pointer' }}>
                {isExpanded ? '▾' : '▸'}
              </button>
            ) : (
              <span style={{ width: 16 }} />
            )}
            <span style={{ fontFamily: INTER, fontSize: 13, color: CHARCOAL }}>{item.label}</span>
          </div>
        </td>
        <td style={tableCell}>{levelBadge(item.level)}</td>
        <td style={{ ...tableCell, color: SLATE }}>{getParentLabel(item)}</td>
        <td style={tableCell}>{tierBadge(item.tier, 'sm')}</td>
        <td style={tableCell}>{roleDots(item.roles, false)}</td>
        <td style={tableCell}>
          <button onClick={() => cycleStatus(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            {statusDisplay(statuses[item.id])}
          </button>
        </td>
      </tr>
    )
  }

  function renderRows() {
    const rows: React.ReactElement[] = []
    const t0Items = getT0Items()
    const t1Items = getT1Items()

    t0Items.forEach((t0) => {
      if (!matchesFilters(t0)) return
      const t0Children = getChildren(t0.id).filter((c) => c.level === 't2')
      const hasChildren = t0Children.length > 0
      const isExpanded = expandedRows.has(t0.id)
      rows.push(renderRow(t0, 0, hasChildren, isExpanded))
      if (isExpanded) {
        t0Children.forEach((t2) => {
          if (!matchesFilters(t2)) return
          rows.push(renderRow(t2, 1, false, false))
        })
      }
    })

    t1Items.forEach((t1) => {
      if (!matchesFilters(t1)) return
      const t2Children = getChildren(t1.id).filter((c) => c.level === 't2')
      const hasChildren = t2Children.length > 0
      const isExpanded = expandedRows.has(t1.id)
      rows.push(renderRow(t1, 0, hasChildren, isExpanded))
      if (isExpanded) {
        t2Children.forEach((t2) => {
          if (!matchesFilters(t2)) return
          const t3Children = getChildren(t2.id).filter((c) => c.level === 't3')
          const t2HasChildren = t3Children.length > 0
          const t2Expanded = expandedRows.has(t2.id)
          rows.push(renderRow(t2, 1, t2HasChildren, t2Expanded))
          if (t2Expanded) {
            t3Children.forEach((t3) => {
              if (!matchesFilters(t3)) return
              rows.push(renderRow(t3, 2, false, false))
            })
          }
        })
      }
    })

    return rows
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={filterBar}>
        <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value as NavLevel | 'all')} style={filterSelect}>
          <option value="all">All levels</option>
          <option value="t0">T0</option><option value="t1">T1</option><option value="t2">T2</option><option value="t3">T3</option>
        </select>
        <select value={tierFilter} onChange={(e) => setTierFilter(e.target.value as Tier | 'all')} style={filterSelect}>
          <option value="all">All tiers</option>
          <option value="core">Core</option><option value="pro">Pro</option><option value="elite">Elite</option>
        </select>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value as Role | 'all')} style={filterSelect}>
          <option value="all">All roles</option>
          <option value="employee">Employee</option><option value="manager">Manager</option><option value="admin">Admin</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as Status | 'all')} style={filterSelect}>
          <option value="all">All statuses</option>
          <option value="built">Built</option><option value="planned">Planned</option><option value="not-started">Not started</option>
        </select>
        <input type="text" placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} style={filterInput} />
      </div>

      <div style={sectionCard}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tableHeader}>Name</th>
                <th style={tableHeader}>Level</th>
                <th style={tableHeader}>Parent</th>
                <th style={tableHeader}>Tier</th>
                <th style={tableHeader}>Roles</th>
                <th style={tableHeader}>Status</th>
              </tr>
            </thead>
            <tbody>{renderRows()}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
