import React, { useState } from 'react';
import { Icon } from '../../components/Icon';

const members = [
  { name: 'Jordan Kim', title: 'Senior Product Designer', level: 'Senior', tenure: '3.7 yr', avatar: 'JK', color: '#6366f1' },
  { name: 'Aisha Johnson', title: 'Product Designer', level: 'Mid', tenure: '2.6 yr', avatar: 'AJ', color: '#f97316' },
  { name: 'Emma Thompson', title: 'UX Researcher', level: 'Mid', tenure: '0.1 yr', avatar: 'ET', color: '#f43f5e' },
  { name: 'Lena Park', title: 'Junior Designer', level: 'Junior', tenure: '1.1 yr', avatar: 'LP', color: '#22c55e' },
  { name: 'Raj Nair', title: 'Design Lead', level: 'Lead', tenure: '4.2 yr', avatar: 'RN', color: '#14b8a6' },
];

export default function PeopleMyDepartment() {
  const [activeTab, setActiveTab] = useState('People');
  return (
    <div style={{ padding: 24 }}>
      <div style={{ background: 'var(--surface-neutral-white)', border: '1px solid var(--border-neutral-weak)', borderRadius: 'var(--radius-small)', padding: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-small)', background: '#6366f122', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="compass" size={24} style={{ color: '#6366f1' }} />
          </div>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-neutral-xx-strong)', margin: 0 }}>Product Design</h1>
            <p style={{ fontSize: 13, color: 'var(--text-neutral-medium)', margin: '2px 0 0' }}>Head: Jordan Kim · 5 members · Product Division</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 20, textAlign: 'center' }}>
            {[{ label: 'Headcount', value: '5' }, { label: 'Open Roles', value: '1' }, { label: 'Avg Tenure', value: '2.3 yr' }].map(s => (
              <div key={s.label}>
                <p style={{ margin: 0, fontSize: 20, fontWeight: 700, color: 'var(--text-neutral-xx-strong)' }}>{s.value}</p>
                <p style={{ margin: 0, fontSize: 11, color: 'var(--text-neutral-medium)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-neutral-weak)', marginBottom: 20 }}>
        {['People', 'Performance', 'Training'].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer',
            fontSize: 13, fontWeight: activeTab === t ? 600 : 400,
            color: activeTab === t ? 'var(--color-primary-strong)' : 'var(--text-neutral-medium)',
            borderBottom: activeTab === t ? '2px solid var(--color-primary-strong)' : '2px solid transparent', marginBottom: -1,
          }}>{t}</button>
        ))}
      </div>
      {activeTab === 'People' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {members.map(m => (
            <div key={m.name} style={{ background: 'var(--surface-neutral-white)', border: '1px solid var(--border-neutral-weak)', borderRadius: 'var(--radius-small)', padding: 16, textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 auto 10px' }}>{m.avatar}</div>
              <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-xx-strong)' }}>{m.name}</p>
              <p style={{ margin: '0 0 6px', fontSize: 12, color: 'var(--text-neutral-medium)' }}>{m.title}</p>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 'var(--radius-full)', background: 'var(--surface-neutral-weak)', color: 'var(--text-neutral-medium)', fontWeight: 500 }}>{m.level}</span>
                <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 'var(--radius-full)', background: 'var(--surface-neutral-weak)', color: 'var(--text-neutral-medium)', fontWeight: 500 }}>{m.tenure}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab !== 'People' && (
        <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-neutral-medium)' }}>
          <p style={{ margin: 0, fontSize: 14 }}>{activeTab} content for Product Design</p>
        </div>
      )}
    </div>
  );
}
