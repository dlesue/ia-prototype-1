import React from 'react';

const departments = [
  { name: 'Platform Engineering', division: 'Engineering', head: 'Alex Chen', count: 48, openRoles: 4, tenure: '3.2 yr' },
  { name: 'Frontend Engineering', division: 'Engineering', head: 'Sarah Chen', count: 34, openRoles: 3, tenure: '2.8 yr' },
  { name: 'Product', division: 'Product', head: 'Priya Patel', count: 12, openRoles: 2, tenure: '3.1 yr' },
  { name: 'Product Design', division: 'Product', head: 'Jordan Kim', count: 5, openRoles: 1, tenure: '2.3 yr' },
  { name: 'Revenue / Sales', division: 'Revenue', head: 'Marcus Williams', count: 67, openRoles: 5, tenure: '2.1 yr' },
  { name: 'Customer Success', division: 'Revenue', head: 'Carlos Rivera', count: 34, openRoles: 2, tenure: '2.4 yr' },
  { name: 'People Operations', division: 'Operations', head: 'Maria Santos', count: 18, openRoles: 1, tenure: '4.1 yr' },
  { name: 'Finance', division: 'Finance & Legal', head: 'David Lee', count: 22, openRoles: 1, tenure: '4.7 yr' },
  { name: 'Legal', division: 'Finance & Legal', head: 'James O\u2019Brien', count: 8, openRoles: 0, tenure: '5.2 yr' },
  { name: 'Infrastructure', division: 'Engineering', head: 'Sarah Chen', count: 21, openRoles: 2, tenure: '3.8 yr' },
];

export default function PeopleDepartments() {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Departments</h1>
          <p style={{ fontSize: 13, color: 'var(--text-neutral-medium)', margin: '2px 0 0' }}>10 departments across 5 divisions</p>
        </div>
      </div>
      <div style={{ background: 'var(--surface-neutral-white)', border: '1px solid var(--border-neutral-weak)', borderRadius: 'var(--radius-small)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface-neutral-x-weak)' }}>
              {['Department', 'Division', 'Head', 'Headcount', 'Open Roles', 'Avg Tenure'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-neutral-medium)', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--border-neutral-weak)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {departments.map((d, i) => (
              <tr key={d.name} style={{ borderBottom: i < departments.length - 1 ? '1px solid var(--border-neutral-weak)' : 'none', cursor: 'pointer' }}>
                <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-xx-strong)' }}>{d.name}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-neutral-medium)' }}>{d.division}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-neutral-strong)' }}>{d.head}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-neutral-strong)' }}>{d.count}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: d.openRoles > 3 ? '#f97316' : 'var(--text-neutral-strong)', fontWeight: d.openRoles > 3 ? 600 : 400 }}>{d.openRoles}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-neutral-medium)' }}>{d.tenure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
