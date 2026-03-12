import React, { useState } from 'react';
import { Icon } from '../../components/Icon';

const tasks = [
  {
    id: 1, category: 'approvals', type: 'Time Off Request',
    title: 'Jordan Kim requests PTO',
    desc: 'March 18–21 (4 days) · Vacation · 14 days remaining after',
    icon: 'calendar', status: 'pending', time: '2h ago',
  },
  {
    id: 2, category: 'approvals', type: 'Time Off Request',
    title: 'Priya Patel requests Sick Day',
    desc: 'March 12 (1 day) · Sick · Doctor appointment',
    icon: 'calendar', status: 'pending', time: '5h ago',
  },
  {
    id: 3, category: 'approvals', type: 'Time Off Request',
    title: 'Marcus Williams requests PTO',
    desc: 'March 24–28 (5 days) · Vacation',
    icon: 'calendar', status: 'pending', time: 'Yesterday',
  },
  {
    id: 4, category: 'tasks', type: 'Onboarding Task',
    title: 'Complete I-9 for Emma Thompson',
    desc: 'New hire starting March 17 · Employment eligibility verification due',
    icon: 'clipboard', status: 'due', time: 'Due Mar 15',
  },
  {
    id: 5, category: 'tasks', type: 'Onboarding Task',
    title: 'Equipment setup for Carlos Rivera',
    desc: 'New hire starting March 20 · IT setup checklist incomplete',
    icon: 'clipboard', status: 'due', time: 'Due Mar 18',
  },
  {
    id: 6, category: 'tasks', type: 'Signature Request',
    title: 'Offer letter awaiting signature',
    desc: 'Tyler Brooks · Senior Engineer offer · Sent March 10',
    icon: 'pen', status: 'pending', time: '1d ago',
  },
  {
    id: 7, category: 'alerts', type: 'System Alert',
    title: 'Benefits carrier sync failed',
    desc: 'Blue Shield connection error · 3 employees may have enrollment discrepancies',
    icon: 'circle-info', status: 'alert', time: '3h ago',
  },
];

const tabs = [
  { id: 'all', label: 'All', count: tasks.length },
  { id: 'approvals', label: 'Approvals', count: tasks.filter(t => t.category === 'approvals').length },
  { id: 'tasks', label: 'Tasks', count: tasks.filter(t => t.category === 'tasks').length },
  { id: 'alerts', label: 'Alerts', count: tasks.filter(t => t.category === 'alerts').length },
];

export default function HomeInbox() {
  const [activeTab, setActiveTab] = useState('all');
  const filtered = activeTab === 'all' ? tasks : tasks.filter(t => t.category === activeTab);

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Inbox</h1>
          <p style={{ fontSize: 13, color: 'var(--text-neutral-medium)', margin: '2px 0 0' }}>Your pending approvals, tasks, and alerts</p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 14px', borderRadius: 'var(--radius-xx-small)',
          background: 'var(--color-primary-strong)', color: '#fff',
          border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500,
        }}>
          <Icon name="check" size={13} />
          Mark All Read
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 16, borderBottom: '1px solid var(--border-neutral-weak)' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 14px', border: 'none', background: 'none',
              cursor: 'pointer', fontSize: 13, fontWeight: activeTab === tab.id ? 600 : 400,
              color: activeTab === tab.id ? 'var(--color-primary-strong)' : 'var(--text-neutral-medium)',
              borderBottom: activeTab === tab.id ? '2px solid var(--color-primary-strong)' : '2px solid transparent',
              marginBottom: -1, transition: 'all 0.15s ease',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            {tab.label}
            <span style={{
              background: activeTab === tab.id ? 'var(--color-primary-weak)' : 'var(--surface-neutral-weak)',
              color: activeTab === tab.id ? 'var(--color-primary-strong)' : 'var(--text-neutral-medium)',
              borderRadius: 'var(--radius-full)', padding: '1px 7px', fontSize: 11, fontWeight: 600,
            }}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Task cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(task => (
          <div key={task.id} style={{
            display: 'flex', alignItems: 'flex-start', gap: 14,
            padding: '14px 16px',
            background: 'var(--surface-neutral-white)',
            border: '1px solid var(--border-neutral-weak)',
            borderRadius: 'var(--radius-small)',
            transition: 'box-shadow 0.15s ease',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 'var(--radius-x-small)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              background: task.status === 'alert' ? '#fef2f2' : task.status === 'due' ? '#fefce8' : 'var(--color-primary-weak)',
              color: task.status === 'alert' ? '#dc2626' : task.status === 'due' ? '#ca8a04' : 'var(--color-primary-strong)',
            }}>
              <Icon name={task.icon as any} size={16} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <span style={{
                  fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em',
                  color: 'var(--text-neutral-medium)', background: 'var(--surface-neutral-weak)',
                  padding: '1px 6px', borderRadius: 'var(--radius-full)',
                }}>
                  {task.type}
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-neutral-medium)' }}>{task.time}</span>
              </div>
              <p style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 600, color: 'var(--text-neutral-xx-strong)' }}>
                {task.title}
              </p>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--text-neutral-medium)' }}>{task.desc}</p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              {task.category === 'approvals' && (
                <>
                  <button style={{
                    padding: '6px 14px', borderRadius: 'var(--radius-xx-small)',
                    background: 'var(--color-primary-strong)', color: '#fff',
                    border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 500,
                  }}>Approve</button>
                  <button style={{
                    padding: '6px 14px', borderRadius: 'var(--radius-xx-small)',
                    background: 'var(--surface-neutral-white)', color: 'var(--text-neutral-strong)',
                    border: '1px solid var(--border-neutral-weak)', cursor: 'pointer', fontSize: 12, fontWeight: 500,
                  }}>Deny</button>
                </>
              )}
              {(task.category === 'tasks' || task.category === 'alerts') && (
                <button style={{
                  padding: '6px 14px', borderRadius: 'var(--radius-xx-small)',
                  background: 'var(--surface-neutral-white)', color: 'var(--text-neutral-strong)',
                  border: '1px solid var(--border-neutral-weak)', cursor: 'pointer', fontSize: 12, fontWeight: 500,
                }}>View</button>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-neutral-medium)' }}>
            <Icon name="check-circle" size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
            <p style={{ margin: 0, fontSize: 14 }}>All caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}
