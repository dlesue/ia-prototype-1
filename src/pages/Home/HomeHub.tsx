import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';

const pendingApprovals = [
  { name: 'Jordan Kim', type: 'PTO', dates: 'Mar 18–21', days: 4 },
  { name: 'Priya Patel', type: 'Sick Day', dates: 'Mar 12', days: 1 },
  { name: 'Marcus Williams', type: 'PTO', dates: 'Mar 24–28', days: 5 },
];

const directReports = [
  { name: 'Jordan Kim', title: 'Sr. Product Designer', avatar: 'JK', color: '#6366f1', status: 'active' },
  { name: 'Alex Chen', title: 'Engineering Manager', avatar: 'AC', color: '#8b5cf6', status: 'active' },
  { name: 'Priya Patel', title: 'Product Manager', avatar: 'PP', color: '#ec4899', status: 'pto' },
  { name: 'Carlos Rivera', title: 'Customer Success Mgr', avatar: 'CR', color: '#14b8a6', status: 'active' },
];

const hiringSnapshot = [
  { label: 'Open Roles', value: '23' },
  { label: 'Candidates', value: '187' },
  { label: 'Offers Out', value: '4' },
];

const payrollSnapshot = [
  { label: 'Next Run', value: 'Mar 15' },
  { label: 'Employees', value: '847' },
  { label: 'Pending', value: '34 timesheets' },
];

const performanceSnapshot = [
  { label: 'Reviews Due', value: '12' },
  { label: 'Goals On Track', value: '71%' },
  { label: '1:1s This Week', value: '8' },
];

export default function HomeHub() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)]">Home</h1>
        <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Wednesday, March 11, 2026</p>
      </div>

      {/* Top row: prominent actions */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Request Time Off */}
        <div className="bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-xx-weak)] rounded-[var(--radius-medium)] p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-[var(--radius-x-small)] flex items-center justify-center" style={{ background: 'var(--color-primary-weak)' }}>
              <Icon name="calendar" size={16} style={{ color: 'var(--color-primary-strong)' }} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">Request Time Off</h2>
              <p className="text-xs text-[var(--text-neutral-medium)]">18 days remaining</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4 text-center">
            {[{ label: 'Vacation', val: '12' }, { label: 'Sick', val: '5' }, { label: 'Personal', val: '1' }].map(b => (
              <div key={b.label} className="bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-small)] p-2">
                <div className="text-base font-bold text-[var(--text-neutral-xx-strong)]">{b.val}</div>
                <div className="text-xs text-[var(--text-neutral-medium)]">{b.label}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/time-and-attendance/time-off')}
            className="w-full py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white"
            style={{ background: 'var(--color-primary-strong)' }}
          >
            Request Time Off
          </button>
        </div>

        {/* Time Tracking */}
        <div className="bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-xx-weak)] rounded-[var(--radius-medium)] p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-[var(--radius-x-small)] flex items-center justify-center" style={{ background: '#fef3c7' }}>
              <Icon name="clock" size={16} style={{ color: '#d97706' }} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">Time Tracking</h2>
              <p className="text-xs text-[var(--text-neutral-medium)]">This week: 28.5h logged</p>
            </div>
          </div>
          <div className="mb-3">
            <div className="flex justify-between text-xs text-[var(--text-neutral-medium)] mb-1">
              <span>Weekly progress</span>
              <span>28.5 / 40h</span>
            </div>
            <div className="h-2 bg-[var(--surface-neutral-xx-weak)] rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: '71%', background: '#d97706' }} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[{ label: 'Mon–Wed', val: '28.5h' }, { label: 'Timesheets', val: '2 pending' }].map(s => (
              <div key={s.label} className="bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-small)] p-2 text-center">
                <div className="text-sm font-bold text-[var(--text-neutral-xx-strong)]">{s.val}</div>
                <div className="text-xs text-[var(--text-neutral-medium)]">{s.label}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/time-and-attendance')}
            className="w-full py-2 rounded-[var(--radius-xx-small)] text-sm font-medium border border-[var(--border-neutral-weak)] text-[var(--text-neutral-x-strong)]"
            style={{ background: 'var(--surface-neutral-white)' }}
          >
            View Timesheets
          </button>
        </div>

        {/* Inbox */}
        <div className="bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-xx-weak)] rounded-[var(--radius-medium)] p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[var(--radius-x-small)] flex items-center justify-center" style={{ background: '#fce7f3' }}>
                <Icon name="inbox" size={16} style={{ color: '#db2777' }} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">Inbox</h2>
                <p className="text-xs text-[var(--text-neutral-medium)]">7 items need attention</p>
              </div>
            </div>
            <span className="text-xs font-bold text-white px-2 py-0.5 rounded-full" style={{ background: '#db2777' }}>7</span>
          </div>
          <div className="space-y-2 mb-4">
            {pendingApprovals.map(a => (
              <div key={a.name} className="flex items-center justify-between py-2 border-b border-[var(--border-neutral-xx-weak)]">
                <div>
                  <p className="text-xs font-medium text-[var(--text-neutral-xx-strong)]">{a.name}</p>
                  <p className="text-xs text-[var(--text-neutral-medium)]">{a.type} · {a.dates}</p>
                </div>
                <div className="flex gap-1">
                  <button className="text-xs px-2 py-1 rounded text-white" style={{ background: 'var(--color-primary-strong)' }}>✓</button>
                  <button className="text-xs px-2 py-1 rounded border border-[var(--border-neutral-weak)] text-[var(--text-neutral-medium)]">✕</button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/home/inbox')}
            className="w-full py-2 rounded-[var(--radius-xx-small)] text-sm font-medium border border-[var(--border-neutral-weak)] text-[var(--text-neutral-x-strong)]"
            style={{ background: 'var(--surface-neutral-white)' }}
          >
            View All
          </button>
        </div>
      </div>

      {/* My Direct Reports */}
      <div className="bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-xx-weak)] rounded-[var(--radius-medium)] p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">My Direct Reports</h2>
          <button onClick={() => navigate('/people/my-direct-reports')} className="text-xs text-[var(--color-primary-strong)] hover:underline">View all</button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {directReports.map(r => (
            <div key={r.name} className="flex items-center gap-3 p-3 rounded-[var(--radius-small)] bg-[var(--surface-neutral-xx-weak)]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: r.color }}>
                {r.avatar}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[var(--text-neutral-xx-strong)] truncate">{r.name}</p>
                <p className="text-xs text-[var(--text-neutral-medium)] truncate">{r.title}</p>
                {r.status === 'pto' && (
                  <span className="text-xs text-[#d97706]">On PTO</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product snapshot widgets */}
      <div className="grid grid-cols-3 gap-4">
        {/* Hiring */}
        <div className="bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-xx-weak)] rounded-[var(--radius-medium)] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon name="id-badge" size={15} className="text-[var(--text-neutral-medium)]" />
              <h2 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">Hiring</h2>
            </div>
            <button onClick={() => navigate('/hiring')} className="text-xs text-[var(--color-primary-strong)] hover:underline">Open</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {hiringSnapshot.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-base font-bold text-[var(--text-neutral-xx-strong)]">{s.value}</div>
                <div className="text-xs text-[var(--text-neutral-medium)]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Payroll */}
        <div className="bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-xx-weak)] rounded-[var(--radius-medium)] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon name="circle-dollar" size={15} className="text-[var(--text-neutral-medium)]" />
              <h2 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">Payroll</h2>
            </div>
            <button onClick={() => navigate('/payroll')} className="text-xs text-[var(--color-primary-strong)] hover:underline">Open</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {payrollSnapshot.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-base font-bold text-[var(--text-neutral-xx-strong)]">{s.value}</div>
                <div className="text-xs text-[var(--text-neutral-medium)]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance */}
        <div className="bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-xx-weak)] rounded-[var(--radius-medium)] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon name="bullseye" size={15} className="text-[var(--text-neutral-medium)]" />
              <h2 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">Performance</h2>
            </div>
            <button onClick={() => navigate('/performance')} className="text-xs text-[var(--color-primary-strong)] hover:underline">Open</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {performanceSnapshot.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-base font-bold text-[var(--text-neutral-xx-strong)]">{s.value}</div>
                <div className="text-xs text-[var(--text-neutral-medium)]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Onboarding */}
        <div className="bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-xx-weak)] rounded-[var(--radius-medium)] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon name="clipboard" size={15} className="text-[var(--text-neutral-medium)]" />
              <h2 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">Onboarding</h2>
            </div>
            <button onClick={() => navigate('/onboarding')} className="text-xs text-[var(--color-primary-strong)] hover:underline">Open</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[{ label: 'Active', value: '8' }, { label: 'Completion', value: '67%' }, { label: 'Overdue', value: '12 tasks' }].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-base font-bold text-[var(--text-neutral-xx-strong)]">{s.value}</div>
                <div className="text-xs text-[var(--text-neutral-medium)]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-xx-weak)] rounded-[var(--radius-medium)] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon name="shield" size={15} className="text-[var(--text-neutral-medium)]" />
              <h2 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">Benefits</h2>
            </div>
            <button onClick={() => navigate('/benefits')} className="text-xs text-[var(--color-primary-strong)] hover:underline">Open</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[{ label: 'Enrollment', value: '94%' }, { label: 'Active Plans', value: '12' }, { label: 'COBRA', value: '3' }].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-base font-bold text-[var(--text-neutral-xx-strong)]">{s.value}</div>
                <div className="text-xs text-[var(--text-neutral-medium)]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Culture */}
        <div className="bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-xx-weak)] rounded-[var(--radius-medium)] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon name="face-smile" size={15} className="text-[var(--text-neutral-medium)]" />
              <h2 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">Culture</h2>
            </div>
            <button onClick={() => navigate('/culture')} className="text-xs text-[var(--color-primary-strong)] hover:underline">Open</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[{ label: 'eNPS', value: '+42' }, { label: 'Engagement', value: '73%' }, { label: 'Recognitions', value: '847' }].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-base font-bold text-[var(--text-neutral-xx-strong)]">{s.value}</div>
                <div className="text-xs text-[var(--text-neutral-medium)]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
