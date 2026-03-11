import React, { useState } from 'react';
import { HubHeader } from '../../components/HubHeader';
import { Icon } from '../../components/Icon';

const metrics = [
  { label: 'Total Headcount', value: '847', trend: 'up' as const, trendValue: '+12', sparkData: [810,818,822,828,835,840,847] },
  { label: 'New Hires (30d)', value: '12', trend: 'up' as const, trendValue: '+3', sparkData: [6,8,7,9,10,9,12] },
  { label: 'Avg Tenure', value: '3.8 yr', trend: 'flat' as const, trendValue: '0.0', sparkData: [3.6,3.7,3.7,3.8,3.8,3.7,3.8] },
  { label: 'Turnover (YTD)', value: '8.2%', trend: 'down' as const, trendValue: '-1.1%', sparkData: [9.8,9.5,9.1,8.8,8.5,8.3,8.2] },
];

const insights = [
  { text: '3 employees celebrating work anniversaries this week', icon: 'star' },
  { text: 'Engineering turnover is 2.1x above company average', icon: 'chart-line' },
  { text: '5 open roles have been unfilled for 60+ days', icon: 'circle-info' },
];

const tabs = ['Personal', 'Job', 'Benefits', 'Performance', 'Time Off'];

export default function PeopleHub() {
  const [activeTab, setActiveTab] = useState('Personal');

  return (
    <div>
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)]">People</h1>
      </div>
      <HubHeader product="People" metrics={metrics} insights={insights} />
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold text-[var(--text-neutral-xx-strong)] mb-4">My Info</h2>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%', background: '#6366f1',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 700, color: '#fff', flexShrink: 0,
            }}>JK</div>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-neutral-xx-strong)', margin: 0 }}>Jordan Kim</h3>
              <p style={{ fontSize: 13, color: 'var(--text-neutral-medium)', margin: '2px 0 0' }}>Senior Product Designer · Product Design · San Francisco</p>
              <span style={{
                display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 'var(--radius-full)',
                background: 'var(--color-primary-weak)', color: 'var(--color-primary-strong)',
                fontSize: 11, fontWeight: 600, marginTop: 4,
              }}>Active</span>
            </div>
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
            borderRadius: 'var(--radius-xx-small)', border: '1px solid var(--border-neutral-weak)',
            background: 'var(--surface-neutral-white)', color: 'var(--text-neutral-strong)',
            cursor: 'pointer', fontSize: 13,
          }}>
            <Icon name="pen" size={12} /> Request Change
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-neutral-weak)', marginBottom: 24 }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? 'var(--color-primary-strong)' : 'var(--text-neutral-medium)',
              borderBottom: activeTab === tab ? '2px solid var(--color-primary-strong)' : '2px solid transparent',
              marginBottom: -1,
            }}>{tab}</button>
          ))}
        </div>

        {activeTab === 'Personal' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ background: 'var(--surface-neutral-white)', border: '1px solid var(--border-neutral-weak)', borderRadius: 'var(--radius-small)', padding: 20 }}>
              <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: 'var(--text-neutral-xx-strong)' }}>Contact Information</h3>
              {[
                { label: 'Work Email', value: 'jordan.kim@company.com' },
                { label: 'Personal Email', value: 'jkim@gmail.com' },
                { label: 'Work Phone', value: '+1 (415) 555-0192' },
                { label: 'Mobile', value: '+1 (415) 555-0847' },
              ].map(f => (
                <div key={f.label} style={{ marginBottom: 14 }}>
                  <p style={{ margin: '0 0 2px', fontSize: 11, color: 'var(--text-neutral-medium)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>{f.label}</p>
                  <p style={{ margin: 0, fontSize: 14, color: 'var(--text-neutral-xx-strong)' }}>{f.value}</p>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--surface-neutral-white)', border: '1px solid var(--border-neutral-weak)', borderRadius: 'var(--radius-small)', padding: 20 }}>
              <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: 'var(--text-neutral-xx-strong)' }}>Personal Details</h3>
              {[
                { label: 'Full Name', value: 'Jordan Min-Jun Kim' },
                { label: 'Preferred Name', value: 'Jordan' },
                { label: 'Pronouns', value: 'They/Them' },
                { label: 'Date of Birth', value: '●●●●' },
                { label: 'Address', value: '2847 Market St, San Francisco, CA 94114' },
              ].map(f => (
                <div key={f.label} style={{ marginBottom: 14 }}>
                  <p style={{ margin: '0 0 2px', fontSize: 11, color: 'var(--text-neutral-medium)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>{f.label}</p>
                  <p style={{ margin: 0, fontSize: 14, color: 'var(--text-neutral-xx-strong)' }}>{f.value}</p>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--surface-neutral-white)', border: '1px solid var(--border-neutral-weak)', borderRadius: 'var(--radius-small)', padding: 20 }}>
              <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: 'var(--text-neutral-xx-strong)' }}>Emergency Contact</h3>
              {[
                { label: 'Name', value: 'Sam Kim' },
                { label: 'Relationship', value: 'Spouse' },
                { label: 'Phone', value: '+1 (415) 555-0312' },
                { label: 'Email', value: 'skim@gmail.com' },
              ].map(f => (
                <div key={f.label} style={{ marginBottom: 14 }}>
                  <p style={{ margin: '0 0 2px', fontSize: 11, color: 'var(--text-neutral-medium)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>{f.label}</p>
                  <p style={{ margin: 0, fontSize: 14, color: 'var(--text-neutral-xx-strong)' }}>{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab !== 'Personal' && (
          <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-neutral-medium)' }}>
            <Icon name="clipboard" size={32} style={{ opacity: 0.3, marginBottom: 12 }} />
            <p style={{ fontSize: 14, margin: 0 }}>{activeTab} tab content</p>
          </div>
        )}
      </div>
    </div>
  );
}
