import React from 'react';

const divisions = [
  { name: 'Product', head: 'Priya Patel', depts: 4, headcount: 24, openRoles: 4, turnover: '6.2%' },
  { name: 'Engineering', head: 'Alex Chen', depts: 6, headcount: 187, openRoles: 12, turnover: '11.4%' },
  { name: 'Revenue', head: 'Marcus Williams', depts: 4, headcount: 134, openRoles: 8, turnover: '18.7%' },
  { name: 'Operations', head: 'Maria Santos', depts: 5, headcount: 98, openRoles: 3, turnover: '7.3%' },
  { name: 'Finance & Legal', head: 'David Lee', depts: 3, headcount: 42, openRoles: 2, turnover: '4.1%' },
];

export default function PeopleDivisions() {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-neutral-xx-strong)', margin: 0 }}>Divisions</h1>
          <p style={{ fontSize: 13, color: 'var(--text-neutral-medium)', margin: '2px 0 0' }}>5 divisions · 847 total employees</p>
        </div>
      </div>
      <div style={{ background: 'var(--surface-neutral-white)', border: '1px solid var(--border-neutral-weak)', borderRadius: 'var(--radius-small)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface-neutral-x-weak)' }}>
              {['Division', 'Head', 'Departments', 'Headcount', 'Open Roles', 'Turnover'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-neutral-medium)', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--border-neutral-weak)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {divisions.map((d, i) => (
              <tr key={d.name} style={{ borderBottom: i < divisions.length - 1 ? '1px solid var(--border-neutral-weak)' : 'none', cursor: 'pointer' }}>
                <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 600, color: 'var(--text-neutral-xx-strong)' }}>{d.name}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-neutral-strong)' }}>{d.head}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-neutral-strong)' }}>{d.depts}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-neutral-strong)' }}>{d.headcount}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: d.openRoles > 5 ? '#f97316' : 'var(--text-neutral-strong)', fontWeight: d.openRoles > 5 ? 600 : 400 }}>{d.openRoles}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: parseFloat(d.turnover) > 15 ? '#dc2626' : parseFloat(d.turnover) > 10 ? '#f97316' : '#16a34a', fontWeight: 600 }}>{d.turnover}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
