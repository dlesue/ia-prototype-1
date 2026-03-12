import React, { useState } from 'react';
import { HubHeader } from '../../components/HubHeader';
import { Icon } from '../../components/Icon';

const metrics = [
  { label: 'Total Headcount', value: '847', trend: 'up' as const, trendValue: '+12', sparkData: [810, 818, 822, 828, 835, 840, 847] },
  { label: 'New Hires (30d)', value: '12', trend: 'up' as const, trendValue: '+3', sparkData: [6, 8, 7, 9, 10, 9, 12] },
  { label: 'Avg Tenure', value: '3.8 yr', trend: 'flat' as const, trendValue: '0.0', sparkData: [3.6, 3.7, 3.7, 3.8, 3.8, 3.7, 3.8] },
  { label: 'Turnover (YTD)', value: '8.2%', trend: 'down' as const, trendValue: '-1.1%', sparkData: [9.8, 9.5, 9.1, 8.8, 8.5, 8.3, 8.2] },
];

const insights = [
  { text: '3 employees celebrating work anniversaries this week', icon: 'star' },
  { text: 'Engineering turnover is 2.1x above company average', icon: 'chart-line' },
  { text: '5 open roles have been unfilled for 60+ days', icon: 'circle-info' },
];

const employees = [
  { name: 'Jordan Kim', title: 'Senior Product Designer', dept: 'Product Design', location: 'San Francisco', start: 'Jun 2022', avatar: 'JK' },
  { name: 'Alex Chen', title: 'Engineering Manager', dept: 'Platform Engineering', location: 'Remote', start: 'Jan 2021', avatar: 'AC' },
  { name: 'Maria Santos', title: 'HR Business Partner', dept: 'People Ops', location: 'New York', start: 'Mar 2023', avatar: 'MS' },
  { name: 'James O\'Brien', title: 'Senior Software Engineer', dept: 'Platform Engineering', location: 'Austin', start: 'Sep 2020', avatar: 'JO' },
  { name: 'Priya Patel', title: 'Product Manager', dept: 'Product', location: 'San Francisco', start: 'Apr 2022', avatar: 'PP' },
  { name: 'Marcus Williams', title: 'Sales Manager', dept: 'Revenue', location: 'Chicago', start: 'Jul 2021', avatar: 'MW' },
  { name: 'Sarah Chen', title: 'Staff Engineer', dept: 'Infrastructure', location: 'Remote', start: 'Feb 2019', avatar: 'SC' },
  { name: 'David Lee', title: 'Finance Analyst', dept: 'Finance', location: 'New York', start: 'Nov 2022', avatar: 'DL' },
  { name: 'Emma Thompson', title: 'UX Researcher', dept: 'Product Design', location: 'San Francisco', start: 'Mar 2026', avatar: 'ET' },
  { name: 'Carlos Rivera', title: 'Customer Success Manager', dept: 'Customer Success', location: 'Austin', start: 'Jan 2023', avatar: 'CR' },
];

const avatarColors = ['#6366f1','#8b5cf6','#ec4899','#f97316','#22c55e','#14b8a6','#3b82f6','#a855f7','#f43f5e','#84cc16'];

export default function PeopleHubPage() {
  const [view, setView] = useState<'list' | 'directory' | 'orgchart'>('list');
  const [search, setSearch] = useState('');

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.dept.toLowerCase().includes(search.toLowerCase()) ||
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <HubHeader product="People" metrics={metrics} insights={insights} />
      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Hub</h1>
            <p style={{ fontSize: 13, color: 'var(--text-neutral-medium)', margin: '2px 0 0' }}>All 847 employees across 14 departments</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ display: 'flex', border: '1px solid var(--border-neutral-weak)', borderRadius: 'var(--radius-xx-small)', overflow: 'hidden' }}>
              {(['list', 'directory', 'orgchart'] as const).map(v => (
                <button key={v} onClick={() => setView(v)} style={{
                  padding: '7px 14px', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 500,
                  background: view === v ? 'var(--color-primary-strong)' : 'var(--surface-neutral-white)',
                  color: view === v ? '#fff' : 'var(--text-neutral-medium)',
                  textTransform: 'capitalize',
                }}>
                  {v === 'orgchart' ? 'Org Chart' : v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 14px', borderRadius: 'var(--radius-xx-small)',
              background: 'var(--color-primary-strong)', color: '#fff',
              border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500,
            }}>
              <Icon name="circle-plus" size={13} />
              Add Employee
            </button>
          </div>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            border: '1px solid var(--border-neutral-weak)', borderRadius: 'var(--radius-xx-small)',
            padding: '0 12px', background: 'var(--surface-neutral-white)', width: 280,
          }}>
            <Icon name="magnifying-glass" size={13} style={{ color: 'var(--text-neutral-medium)' }} />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search employees..."
              style={{ border: 'none', outline: 'none', padding: '8px 0', fontSize: 13, background: 'transparent', color: 'var(--text-neutral-strong)', width: '100%' }}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ background: 'var(--surface-neutral-white)', border: '1px solid var(--border-neutral-weak)', borderRadius: 'var(--radius-small)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface-neutral-x-weak)' }}>
                {['Name', 'Title', 'Department', 'Location', 'Start Date', ''].map(h => (
                  <th key={h} style={{
                    padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600,
                    color: 'var(--text-neutral-medium)', textTransform: 'uppercase', letterSpacing: '0.04em',
                    borderBottom: '1px solid var(--border-neutral-weak)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp, i) => (
                <tr key={emp.name} style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--border-neutral-weak)' : 'none' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                        background: avatarColors[i % avatarColors.length],
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 700, color: '#fff',
                      }}>
                        {emp.avatar}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-xx-strong)' }}>{emp.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-neutral-strong)' }}>{emp.title}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-neutral-strong)' }}>{emp.dept}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-neutral-medium)' }}>{emp.location}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-neutral-medium)' }}>{emp.start}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <button style={{
                      padding: '5px 12px', borderRadius: 'var(--radius-xx-small)', fontSize: 12,
                      border: '1px solid var(--border-neutral-weak)', background: 'var(--surface-neutral-white)',
                      color: 'var(--text-neutral-strong)', cursor: 'pointer',
                    }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
