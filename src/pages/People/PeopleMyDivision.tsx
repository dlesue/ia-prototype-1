import React, { useState } from 'react';
import { Icon } from '../../components/Icon';

const depts = [
  { name: 'Product', head: 'Priya Patel', count: 12, openRoles: 2 },
  { name: 'Product Design', head: 'Jordan Kim', count: 5, openRoles: 1 },
  { name: 'Product Research', head: 'Emma Thompson', count: 3, openRoles: 0 },
  { name: 'Product Analytics', head: 'David Lee', count: 4, openRoles: 1 },
];

export default function PeopleMyDivision() {
  const [activeTab, setActiveTab] = useState('People');
  return (
    <div style={{ padding: 24 }}>
      <div style={{ background: 'var(--surface-neutral-white)', border: '1px solid var(--border-neutral-weak)', borderRadius: 'var(--radius-small)', padding: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-small)', background: '#8b5cf622', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="building" size={24} style={{ color: '#8b5cf6' }} />
          </div>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-neutral-xx-strong)', margin: 0 }}>Product Division</h1>
            <p style={{ fontSize: 13, color: 'var(--text-neutral-medium)', margin: '2px 0 0' }}>VP of Product: Priya Patel · 4 departments · 24 employees</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 20, textAlign: 'center' }}>
            {[{ label: 'Headcount', value: '24' }, { label: 'Departments', value: '4' }, { label: 'Open Roles', value: '4' }].map(s => (
              <div key={s.label}>
                <p style={{ margin: 0, fontSize: 20, fontWeight: 700, color: 'var(--text-neutral-xx-strong)' }}>{s.value}</p>
                <p style={{ margin: 0, fontSize: 11, color: 'var(--text-neutral-medium)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-neutral-weak)', marginBottom: 20 }}>
        {['People', 'Hiring', 'Performance'].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer',
            fontSize: 13, fontWeight: activeTab === t ? 600 : 400,
            color: activeTab === t ? 'var(--color-primary-strong)' : 'var(--text-neutral-medium)',
            borderBottom: activeTab === t ? '2px solid var(--color-primary-strong)' : '2px solid transparent', marginBottom: -1,
          }}>{t}</button>
        ))}
      </div>
      {activeTab === 'People' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {depts.map(d => (
            <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', background: 'var(--surface-neutral-white)', border: '1px solid var(--border-neutral-weak)', borderRadius: 'var(--radius-small)' }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--text-neutral-xx-strong)' }}>{d.name}</p>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--text-neutral-medium)' }}>Head: {d.head}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--text-neutral-xx-strong)' }}>{d.count}</p>
                <p style={{ margin: 0, fontSize: 11, color: 'var(--text-neutral-medium)' }}>Employees</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: d.openRoles > 0 ? '#f97316' : 'var(--text-neutral-xx-strong)' }}>{d.openRoles}</p>
                <p style={{ margin: 0, fontSize: 11, color: 'var(--text-neutral-medium)' }}>Open Roles</p>
              </div>
              <button style={{ padding: '5px 12px', borderRadius: 'var(--radius-xx-small)', fontSize: 12, border: '1px solid var(--border-neutral-weak)', background: 'var(--surface-neutral-white)', color: 'var(--text-neutral-strong)', cursor: 'pointer' }}>View</button>
            </div>
          ))}
        </div>
      )}
      {activeTab !== 'People' && (
        <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-neutral-medium)' }}>
          <p style={{ margin: 0, fontSize: 14 }}>{activeTab} content for Product Division</p>
        </div>
      )}
    </div>
  );
}
