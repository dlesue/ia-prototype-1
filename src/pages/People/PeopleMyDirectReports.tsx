import React from 'react';
import { Icon } from '../../components/Icon';

const reports = [
  { name: 'Priya Patel', title: 'Product Manager', dept: 'Product', start: 'Apr 2022', status: 'Active', avatar: 'PP', color: '#8b5cf6' },
  { name: 'Emma Thompson', title: 'UX Researcher', dept: 'Product Design', start: 'Mar 2026', status: 'New Hire', avatar: 'ET', color: '#f43f5e' },
  { name: 'Carlos Rivera', title: 'Product Analyst', dept: 'Product', start: 'Jan 2023', status: 'Active', avatar: 'CR', color: '#14b8a6' },
  { name: 'Aisha Johnson', title: 'Product Designer', dept: 'Product Design', start: 'Jul 2022', status: 'Active', avatar: 'AJ', color: '#f97316' },
  { name: 'Tyler Brooks', title: 'Senior Engineer', dept: 'Platform Engineering', start: 'Mar 2026', status: 'Offer Sent', avatar: 'TB', color: '#6366f1' },
];

export default function PeopleMyDirectReports() {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">My Direct Reports</h1>
          <p style={{ fontSize: 13, color: 'var(--text-neutral-medium)', margin: '2px 0 0' }}>5 reports · Jordan Kim, Senior Product Designer</p>
        </div>
        <button style={{ padding: '7px 14px', borderRadius: 'var(--radius-xx-small)', border: '1px solid var(--border-neutral-weak)', background: 'var(--surface-neutral-white)', color: 'var(--text-neutral-strong)', cursor: 'pointer', fontSize: 13 }}>
          Export
        </button>
      </div>

      <div style={{ background: 'var(--surface-neutral-white)', border: '1px solid var(--border-neutral-weak)', borderRadius: 'var(--radius-small)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface-neutral-x-weak)' }}>
              {['Name / Title', 'Department', 'Start Date', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-neutral-medium)', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--border-neutral-weak)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={r.name} style={{ borderBottom: i < reports.length - 1 ? '1px solid var(--border-neutral-weak)' : 'none' }}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{r.avatar}</div>
                    <div>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-xx-strong)' }}>{r.name}</p>
                      <p style={{ margin: 0, fontSize: 12, color: 'var(--text-neutral-medium)' }}>{r.title}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-neutral-strong)' }}>{r.dept}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-neutral-medium)' }}>{r.start}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: 11, fontWeight: 600,
                    background: r.status === 'Active' ? 'var(--color-primary-weak)' : r.status === 'New Hire' ? '#dcfce7' : '#fef9c3',
                    color: r.status === 'Active' ? 'var(--color-primary-strong)' : r.status === 'New Hire' ? '#16a34a' : '#ca8a04',
                  }}>{r.status}</span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button style={{ padding: '5px 10px', borderRadius: 'var(--radius-xx-small)', fontSize: 12, border: '1px solid var(--border-neutral-weak)', background: 'var(--surface-neutral-white)', color: 'var(--text-neutral-strong)', cursor: 'pointer' }}>Profile</button>
                    <button style={{ padding: '5px 10px', borderRadius: 'var(--radius-xx-small)', fontSize: 12, border: '1px solid var(--border-neutral-weak)', background: 'var(--surface-neutral-white)', color: 'var(--text-neutral-strong)', cursor: 'pointer' }}>1:1</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
