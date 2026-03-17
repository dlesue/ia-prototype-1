import React from 'react';
import { HubHeader } from '../../components/HubHeader';
import type { HubAutomation } from '../../components/HubHeader';
import { Icon } from '../../components/Icon';
import { CardGrid } from '../../components/CardGrid';
import type { CardGridItem } from '../../components/CardGrid';

const insights = [
  { text: 'Headcount report has been run 34 times this month — most popular', shortText: 'Headcount most used', icon: 'chart-bar' },
  { text: '3 scheduled reports failed delivery last week', shortText: '3 reports failed', icon: 'triangle-exclamation' },
  { text: 'Turnover report shows 18% increase vs. last quarter', shortText: 'Turnover up 18%', icon: 'chart-line' },
];

const FAVORITES: CardGridItem[] = [
  { name: 'Benefit Summary', icon: 'star' },
  { name: 'Headcount Summary', icon: 'star' },
  { name: 'Employee Turnover', icon: 'star' },
];

const FOLDERS: CardGridItem[] = [
  { name: 'People Reports', icon: 'folder' },
  { name: 'Hiring Reports', icon: 'folder' },
  { name: 'Payroll Reports', icon: 'folder' },
  { name: 'Benefits Reports', icon: 'folder' },
  { name: 'Performance Reports', icon: 'folder' },
  { name: 'Time & Attendance', icon: 'folder' },
  { name: 'Compensation Reports', icon: 'folder' },
];

const RECENT = [
  { name: 'Additions & Terminations', date: 'Mar 06', owner: 'BambooHR' },
  { name: 'Employee Turnover', date: 'Mar 06', owner: 'BambooHR' },
  { name: 'Headcount Summary', date: 'Mar 05', owner: 'Sarah Chen' },
  { name: 'Time Off Balances', date: 'Mar 04', owner: 'Mike Torres' },
  { name: 'Compensation Distribution', date: 'Mar 03', owner: 'Priya Patel' },
];

const AUTOMATIONS: HubAutomation[] = [
  { text: 'Auto-retry failed scheduled report deliveries', shortText: 'Retry failed reports', fields: [
    { label: 'Retry interval', options: ['Every 15 minutes', 'Every hour', 'Every 4 hours'] },
    { label: 'Max retries', options: ['3 attempts', '5 attempts', '10 attempts'] },
    { label: 'Notify on failure', options: ['Report owner', 'Admin', 'Report owner + Admin'] },
  ] },
  { text: 'Send weekly headcount summary to leadership', shortText: 'Weekly headcount digest', fields: [
    { label: 'Send on', options: ['Monday morning', 'Friday afternoon', 'Sunday evening'] },
    { label: 'Recipients', options: ['Leadership team', 'All managers', 'Custom distribution list'] },
    { label: 'Include', options: ['Headcount only', 'Headcount + Turnover', 'Full HR summary'] },
  ] },
];

export default function ReportsHub() {
  return (
    <div>
      <HubHeader title="Reports" product="Reports" metrics={[]} insights={insights} automations={AUTOMATIONS} />
      <div className="px-8 pb-8 space-y-6">
        {/* Favorites */}
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-neutral-x-strong)] mb-3">Favorites</h3>
          <CardGrid items={FAVORITES} linkPrefix="/reports/view" dismissable />
        </div>

        {/* Folders */}
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-neutral-x-strong)] mb-3">Folders</h3>
          <CardGrid items={FOLDERS} />
        </div>

        {/* Recent list */}
        <div className="bg-white rounded-xl border border-[var(--border-neutral-xx-weak)] p-6">
          <h3 className="text-sm font-semibold text-[var(--text-neutral-x-strong)] mb-4">Recent</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-neutral-xx-weak)]">
                <th className="text-left text-xs font-medium text-[var(--text-neutral-weak)] uppercase tracking-wider pb-2">Report</th>
                <th className="text-left text-xs font-medium text-[var(--text-neutral-weak)] uppercase tracking-wider pb-2">Last Viewed</th>
                <th className="text-left text-xs font-medium text-[var(--text-neutral-weak)] uppercase tracking-wider pb-2">Owner</th>
              </tr>
            </thead>
            <tbody>
              {RECENT.map((item) => (
                <tr key={item.name} className="border-b border-[var(--border-neutral-xx-weak)]">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <Icon name="chart-line" size={14} className="text-[var(--color-primary-strong)]" />
                      <span className="text-sm text-[var(--color-primary-strong)] hover:underline cursor-pointer">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-[var(--text-neutral-weak)]">{item.date}</td>
                  <td className="py-3 text-sm text-[var(--text-neutral-weak)]">{item.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
