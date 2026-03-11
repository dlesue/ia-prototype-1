import React, { useState } from 'react';
import { Icon } from '../../components/Icon';

const stageColors: Record<string, { bg: string; color: string }> = {
  'Applied': { bg: '#f3f4f6', color: '#6b7280' },
  'Phone Screen': { bg: '#dbeafe', color: '#1d4ed8' },
  'Technical': { bg: '#ede9fe', color: '#7c3aed' },
  'Final Interview': { bg: '#fef9c3', color: '#ca8a04' },
  'Offer Sent': { bg: '#dcfce7', color: '#16a34a' },
  'Hired': { bg: 'var(--color-primary-weak)', color: 'var(--color-primary-strong)' },
  'Rejected': { bg: '#fef2f2', color: '#dc2626' },
};

const candidates = [
  { name: 'Tyler Brooks', job: 'Senior Software Engineer', stage: 'Offer Sent', rating: 5, activity: '1d ago', avatar: 'TB', color: '#6366f1' },
  { name: 'Nadia Okonkwo', job: 'UX Designer', stage: 'Final Interview', rating: 4, activity: '2h ago', avatar: 'NO', color: '#8b5cf6' },
  { name: 'Ben Hartley', job: 'Product Manager', stage: 'Technical', rating: 4, activity: '3h ago', avatar: 'BH', color: '#ec4899' },
  { name: 'Yuki Tanaka', job: 'Data Engineer', stage: 'Phone Screen', rating: 3, activity: '1d ago', avatar: 'YT', color: '#f97316' },
  { name: 'Olivia Grant', job: 'Sales Development Rep', stage: 'Applied', rating: 0, activity: '4h ago', avatar: 'OG', color: '#22c55e' },
  { name: 'Finn McCarthy', job: 'Senior Software Engineer', stage: 'Final Interview', rating: 5, activity: '2d ago', avatar: 'FM', color: '#14b8a6' },
  { name: 'Amara Diallo', job: 'HR Business Partner', stage: 'Phone Screen', rating: 4, activity: '5h ago', avatar: 'AD', color: '#3b82f6' },
  { name: 'Leo Vasquez', job: 'Customer Success Manager', stage: 'Applied', rating: 0, activity: '6h ago', avatar: 'LV', color: '#a855f7' },
  { name: 'Chloe Nakamura', job: 'Marketing Manager', stage: 'Technical', rating: 3, activity: '1d ago', avatar: 'CN', color: '#f43f5e' },
  { name: 'Isaac Osei', job: 'Finance Analyst', stage: 'Rejected', rating: 2, activity: '3d ago', avatar: 'IO', color: '#84cc16' },
  { name: 'Mei Lin', job: 'Staff Engineer', stage: 'Applied', rating: 0, activity: '1h ago', avatar: 'ML', color: '#06b6d4' },
  { name: 'Sam Torres', job: 'UX Designer', stage: 'Hired', rating: 5, activity: '1w ago', avatar: 'ST', color: '#16a34a' },
];

export default function HiringCandidates() {
  const [stageFilter, setStageFilter] = useState('All');
  const stages = ['All', 'Applied', 'Phone Screen', 'Technical', 'Final Interview', 'Offer Sent', 'Hired', 'Rejected'];
  const filtered = stageFilter === 'All' ? candidates : candidates.filter(c => c.stage === stageFilter);

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-neutral-xx-strong)', margin: 0 }}>Candidates</h1>
          <p style={{ fontSize: 13, color: 'var(--text-neutral-medium)', margin: '2px 0 0' }}>187 candidates across all open roles</p>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 'var(--radius-xx-small)', background: 'var(--color-primary-strong)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
          <Icon name="circle-plus" size={13} /> Add Candidate
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--border-neutral-weak)', borderRadius: 'var(--radius-xx-small)', padding: '0 12px', background: 'var(--surface-neutral-white)' }}>
          <Icon name="magnifying-glass" size={13} style={{ color: 'var(--text-neutral-medium)' }} />
          <input placeholder="Search candidates..." style={{ border: 'none', outline: 'none', padding: '7px 0', fontSize: 13, background: 'transparent', width: 200 }} />
        </div>
        <select value={stageFilter} onChange={e => setStageFilter(e.target.value)} style={{ padding: '7px 12px', borderRadius: 'var(--radius-xx-small)', border: '1px solid var(--border-neutral-weak)', background: 'var(--surface-neutral-white)', color: 'var(--text-neutral-strong)', fontSize: 13, cursor: 'pointer' }}>
          {stages.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div style={{ background: 'var(--surface-neutral-white)', border: '1px solid var(--border-neutral-weak)', borderRadius: 'var(--radius-small)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface-neutral-x-weak)' }}>
              {['Name', 'Job Applied For', 'Stage', 'Rating', 'Last Activity', ''].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-neutral-medium)', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--border-neutral-weak)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={c.name} style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--border-neutral-weak)' : 'none', cursor: 'pointer' }}>
                <td style={{ padding: '10px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{c.avatar}</div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-xx-strong)' }}>{c.name}</span>
                  </div>
                </td>
                <td style={{ padding: '10px 16px', fontSize: 13, color: 'var(--text-neutral-medium)' }}>{c.job}</td>
                <td style={{ padding: '10px 16px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: 11, fontWeight: 600, background: stageColors[c.stage]?.bg, color: stageColors[c.stage]?.color }}>{c.stage}</span>
                </td>
                <td style={{ padding: '10px 16px' }}>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[1,2,3,4,5].map(s => (
                      <Icon key={s} name="star" size={12} style={{ color: s <= c.rating ? '#f59e0b' : 'var(--border-neutral-weak)' }} />
                    ))}
                  </div>
                </td>
                <td style={{ padding: '10px 16px', fontSize: 12, color: 'var(--text-neutral-medium)' }}>{c.activity}</td>
                <td style={{ padding: '10px 16px' }}>
                  <button style={{ padding: '5px 12px', borderRadius: 'var(--radius-xx-small)', fontSize: 12, border: '1px solid var(--border-neutral-weak)', background: 'var(--surface-neutral-white)', color: 'var(--text-neutral-strong)', cursor: 'pointer' }}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
