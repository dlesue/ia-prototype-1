import React, { useState } from 'react';
import { HubHeader } from '../../components/HubHeader';
import { Icon } from '../../components/Icon';

const metrics = [
  { label: 'Open Positions', value: '23', trend: 'up' as const, trendValue: '+4', sparkData: [14, 16, 18, 19, 21, 20, 23] },
  { label: 'Avg Time-to-Hire', value: '34 days', trend: 'down' as const, trendValue: '-3d', sparkData: [41, 39, 38, 37, 36, 35, 34] },
  { label: 'Pipeline', value: '187 candidates', trend: 'up' as const, trendValue: '+22', sparkData: [145, 152, 158, 163, 171, 179, 187] },
  { label: 'Offer Accept Rate', value: '82%', trend: 'up' as const, trendValue: '+5%', sparkData: [72, 74, 76, 78, 79, 81, 82] },
];

const insights = [
  { text: 'Senior Engineer roles average 47 days to fill — 38% above target', icon: 'chart-line' },
  { text: 'Referral candidates have 2.4x higher offer acceptance rate', icon: 'sparkles' },
  { text: '5 candidates have been in final interview for 10+ days', icon: 'clock' },
];

const jobs = [
  { title: 'Senior Software Engineer', dept: 'Platform Engineering', candidates: 24, lead: 'Alex Chen', status: 'Active', created: 'Feb 10', daysOpen: 29 },
  { title: 'Product Manager', dept: 'Product', candidates: 18, lead: 'Priya Patel', status: 'Active', created: 'Feb 22', daysOpen: 17 },
  { title: 'UX Designer', dept: 'Product Design', candidates: 31, lead: 'Jordan Kim', status: 'Active', created: 'Jan 28', daysOpen: 42 },
  { title: 'Customer Success Manager', dept: 'Customer Success', candidates: 14, lead: 'Carlos Rivera', status: 'Active', created: 'Mar 1', daysOpen: 10 },
  { title: 'Data Engineer', dept: 'Infrastructure', candidates: 9, lead: 'Sarah Chen', status: 'Active', created: 'Feb 5', daysOpen: 34 },
  { title: 'Sales Development Rep', dept: 'Revenue', candidates: 47, lead: 'Marcus Williams', status: 'Active', created: 'Feb 18', daysOpen: 21 },
  { title: 'Finance Analyst', dept: 'Finance', candidates: 12, lead: 'David Lee', status: 'Paused', created: 'Jan 15', daysOpen: 55 },
  { title: 'HR Business Partner', dept: 'People Ops', candidates: 8, lead: 'Maria Santos', status: 'Active', created: 'Mar 5', daysOpen: 6 },
  { title: 'Staff Engineer', dept: 'Platform Engineering', candidates: 6, lead: 'Alex Chen', status: 'Draft', created: 'Mar 8', daysOpen: 3 },
  { title: 'Marketing Manager', dept: 'Marketing', candidates: 18, lead: 'Aisha Johnson', status: 'Active', created: 'Feb 14', daysOpen: 25 },
];

export default function HiringJobOpenings() {
  const [search, setSearch] = useState('');
  const filtered = jobs.filter(j => j.title.toLowerCase().includes(search.toLowerCase()) || j.dept.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <HubHeader product="Hiring" metrics={metrics} insights={insights} />
      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Job Openings</h1>
            <p style={{ fontSize: 13, color: 'var(--text-neutral-medium)', margin: '2px 0 0' }}>23 open positions across 8 departments</p>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 'var(--radius-xx-small)', background: 'var(--color-primary-strong)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
            <Icon name="circle-plus" size={13} /> New Job Opening
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--border-neutral-weak)', borderRadius: 'var(--radius-xx-small)', padding: '0 12px', background: 'var(--surface-neutral-white)', width: 280 }}>
            <Icon name="magnifying-glass" size={13} style={{ color: 'var(--text-neutral-medium)' }} />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs..." style={{ border: 'none', outline: 'none', padding: '8px 0', fontSize: 13, background: 'transparent', color: 'var(--text-neutral-strong)', width: '100%' }} />
          </div>
        </div>
        <div style={{ background: 'var(--surface-neutral-white)', border: '1px solid var(--border-neutral-weak)', borderRadius: 'var(--radius-small)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface-neutral-x-weak)' }}>
                {['Job Title', 'Department', 'Candidates', 'Hiring Lead', 'Status', 'Created'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-neutral-medium)', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--border-neutral-weak)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((j, i) => (
                <tr key={j.title} style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--border-neutral-weak)' : 'none', cursor: 'pointer' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-xx-strong)' }}>{j.title}</p>
                    {j.daysOpen > 40 && <p style={{ margin: 0, fontSize: 11, color: '#dc2626' }}>{j.daysOpen} days open</p>}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-neutral-medium)' }}>{j.dept}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-neutral-strong)', fontWeight: 500 }}>{j.candidates}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-neutral-strong)' }}>{j.lead}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: 11, fontWeight: 600,
                      background: j.status === 'Active' ? 'var(--color-primary-weak)' : j.status === 'Paused' ? '#fef9c3' : '#f3f4f6',
                      color: j.status === 'Active' ? 'var(--color-primary-strong)' : j.status === 'Paused' ? '#ca8a04' : 'var(--text-neutral-medium)',
                    }}>{j.status}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-neutral-medium)' }}>{j.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
