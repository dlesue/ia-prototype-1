import { useState } from 'react';
import { HubHeader } from '../../components/HubHeader';
import type { HubAutomation } from '../../components/HubHeader';
import { Icon } from '../../components/Icon';
import { Placeholder } from '../../components/Placeholder/Placeholder';

const metrics = [
  { label: 'Total Headcount', value: '847', icon: 'user-group', trend: 'up' as const, trendValue: '+12', sparkData: [810,818,822,828,835,840,847], linkTo: '/reports/view/Headcount' },
  { label: 'New Hires (30d)', value: '12', icon: 'circle-arrow-up', trend: 'up' as const, trendValue: '+3', sparkData: [6,8,7,9,10,9,12], linkTo: '/reports/view/New%20Hires' },
  { label: 'Avg Tenure', value: '3.8 yr', icon: 'clock', trend: 'flat' as const, trendValue: '0.0', sparkData: [3.6,3.7,3.7,3.8,3.8,3.7,3.8], linkTo: '/reports/view/Years%20of%20Service' },
  { label: 'Turnover (YTD)', value: '8.2%', icon: 'chart-line', trend: 'down' as const, trendValue: '-1.1%', sparkData: [9.8,9.5,9.1,8.8,8.5,8.3,8.2], linkTo: '/reports/view/Employee%20Turnover' },
];

const insights = [
  { text: '3 employees celebrating work anniversaries this week', shortText: '3 anniversaries', icon: 'star' },
  { text: 'Engineering turnover is 2.1x above company average', shortText: 'Eng turnover high', icon: 'chart-line' },
  { text: '5 open roles have been unfilled for 60+ days', shortText: '5 roles unfilled', icon: 'circle-info' },
];

const AUTOMATIONS: HubAutomation[] = [
  { text: 'Send anniversary recognition to managers automatically', shortText: 'Auto-send anniversaries', fields: [
    { label: 'Milestones', options: ['Every year', '1, 3, 5, 10 years', '5, 10, 15, 20 years'] },
    { label: 'Send to', options: ['Manager only', 'Manager + Employee', 'Manager + Team'] },
    { label: 'Timing', options: ['Day of', '1 week before', '1 day before'] },
  ] },
  { text: 'Alert HR when department turnover exceeds company average', shortText: 'Alert on high turnover', fields: [
    { label: 'Threshold', options: ['Above company avg', '1.5x company avg', '2x company avg'] },
    { label: 'Lookback period', options: ['Last 90 days', 'Last 6 months', 'Last 12 months'] },
    { label: 'Notify', options: ['HRBP only', 'HRBP + Department head', 'HR leadership'] },
  ] },
];

type ViewTab = 'list' | 'directory' | 'org-chart';

export default function PeopleHub() {
  const [activeView, setActiveView] = useState<ViewTab>('directory');

  return (
    <div>
      <HubHeader title="People" product="People" metrics={metrics} insights={insights} automations={AUTOMATIONS} />
      <div className="px-8 pb-8">
        {/* Top bar: New Employee + tabs */}
        <div className="flex items-center justify-between mb-6">
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--color-primary-strong)] text-[var(--color-primary-strong)] text-sm font-medium hover:bg-[var(--color-primary-weak)] transition-colors">
            <Icon name="circle-plus" size={14} />
            New Employee
          </button>

          <div className="flex items-center gap-1">
            {([
              { id: 'list' as ViewTab, label: 'List', icon: 'table-cells' as const },
              { id: 'directory' as ViewTab, label: 'Directory', icon: 'address-card' as const },
              { id: 'org-chart' as ViewTab, label: 'Org Chart', icon: 'user-group' as const },
            ]).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors border-b-2 ${
                  activeView === tab.id
                    ? 'text-[var(--color-primary-strong)] border-[var(--color-primary-strong)]'
                    : 'text-[var(--text-neutral-medium)] border-transparent hover:text-[var(--text-neutral-x-strong)]'
                }`}
              >
                <Icon name={tab.icon} size={14} variant={activeView === tab.id ? 'solid' : 'regular'} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <Placeholder variant="table" />
      </div>
    </div>
  );
}
