import { useState } from 'react';
import { LegacySubNav } from '../../components/LegacySubNav';
import type { SubNavItem } from '../../components/LegacySubNav';
import { Icon } from '../../components/Icon';
import type { IconName } from '../../components/Icon';

const SUB_NAV: SubNavItem[] = [
  { id: 'recent', label: 'Recent', icon: 'clock' },
  { id: 'dashboards', label: 'Dashboards', icon: 'table-cells' },
  { id: 'standard', label: 'Standard Reports', icon: 'chart-pie-simple' },
  { id: 'benchmarks', label: 'Benchmarks', icon: 'chart-line' },
  { id: 'custom', label: 'Custom Reports', icon: 'table-cells', badge: '1' },
  { id: 'new-custom', label: 'New Custom Reports', icon: 'sparkles' },
  { id: 'signed-docs', label: 'Signed Documents', icon: 'pen-to-square' },
  { id: 'payroll-reports', label: 'Payroll Reports', icon: 'circle-dollar' },
];

const FOLDER_NAV: SubNavItem[] = [
  { id: 'test-folder', label: 'Test', icon: 'folder' },
];

const FAVORITES = [
  { name: 'Benefit Summary', icon: 'table-cells' as const },
  { name: 'Age Profile', icon: 'clock' as const },
  { name: 'Test', icon: 'table-cells' as const },
  { name: 'Assets by Employee', icon: 'table-cells' as const },
  { name: 'Assets by Department', icon: 'table-cells' as const },
  { name: 'Comp by Job Title', icon: 'table-cells' as const },
  { name: 'Compensation', icon: 'table-cells' as const },
  { name: 'Contact Information', icon: 'table-cells' as const },
  { name: 'New Hires', icon: 'table-cells' as const },
];

const RECENT = [
  { name: 'Additions & Terminations', date: 'Mar 06', owner: 'BambooHR' },
  { name: 'Employee Turnover', date: 'Mar 06', owner: 'BambooHR' },
];

interface ReportRow { icon: IconName; name: string; lastViewed?: string }
interface ReportCategory { id: string; label: string; catIcon: IconName; reports: ReportRow[] }

const STANDARD_CATEGORIES: ReportCategory[] = [
  {
    id: 'benefits', label: 'Benefits', catIcon: 'heart',
    reports: [
      { icon: 'file-lines', name: 'Benefit Summary', lastViewed: 'Oct 07, 2025' },
    ],
  },
  {
    id: 'compensation', label: 'Compensation', catIcon: 'chart-bar',
    reports: [
      { icon: 'chart-bar', name: 'Pay by Department', lastViewed: 'Oct 05, 2025' },
      { icon: 'chart-bar', name: 'Pay by Location' },
      { icon: 'chart-bar', name: 'Pay by Job Title' },
    ],
  },
  {
    id: 'data-review', label: 'Data Review', catIcon: 'file-lines',
    reports: [
      { icon: 'file-lines', name: '2-Step Login Configuration' },
      { icon: 'file-lines', name: 'Audit Trail', lastViewed: 'Nov 05, 2025' },
      { icon: 'file-lines', name: 'Change History', lastViewed: 'Dec 13, 2024' },
      { icon: 'file-lines', name: 'Missing Data', lastViewed: 'Nov 14, 2024' },
      { icon: 'clock', name: 'Point-in-Time' },
    ],
  },
  {
    id: 'employee-info', label: 'Employee Info', catIcon: 'user-group',
    reports: [
      { icon: 'file-lines', name: 'Age Profile', lastViewed: 'Oct 01, 2025' },
      { icon: 'file-lines', name: 'Birthdays', lastViewed: 'Feb 04, 2025' },
      { icon: 'file-lines', name: 'EEO Details', lastViewed: 'Jan 29, 2025' },
      { icon: 'file-lines', name: 'EEO-1' },
      { icon: 'file-lines', name: 'Employment Status History', lastViewed: 'Feb 27, 2024' },
      { icon: 'file-lines', name: 'Gender Profile', lastViewed: 'Feb 04, 2025' },
      { icon: 'file-lines', name: 'Job History', lastViewed: 'Jan 28, 2025' },
      { icon: 'file-lines', name: 'Years of Service', lastViewed: 'Aug 31, 2024' },
    ],
  },
  {
    id: 'headcount', label: 'Headcount And Turnover', catIcon: 'chart-line',
    reports: [
      { icon: 'file-lines', name: 'Additions & Terminations', lastViewed: 'Mar 06' },
      { icon: 'file-lines', name: 'Employee Turnover', lastViewed: 'Mar 06' },
      { icon: 'file-lines', name: 'Headcount', lastViewed: 'Aug 31, 2024' },
    ],
  },
  {
    id: 'hiring', label: 'Hiring', catIcon: 'id-badge',
    reports: [
      { icon: 'file-lines', name: 'Candidate Sources', lastViewed: 'Aug 27, 2024' },
      { icon: 'file-lines', name: 'Candidates by Disability and Gender', lastViewed: 'Jul 08, 2024' },
      { icon: 'file-lines', name: 'Candidates by Race and Gender', lastViewed: 'Feb 04, 2025' },
      { icon: 'file-lines', name: 'Candidates by Veteran Status and Gender', lastViewed: 'Jul 08, 2024' },
      { icon: 'chart-bar', name: 'Candidate Funnel', lastViewed: 'Aug 15, 2025' },
    ],
  },
  {
    id: 'payroll', label: 'Payroll', catIcon: 'money-bill-1',
    reports: [
      { icon: 'file-lines', name: 'Last Pay Change', lastViewed: 'Oct 09, 2024' },
      { icon: 'file-lines', name: 'Direct Deposit' },
      { icon: 'file-lines', name: 'Federal Withholding' },
      { icon: 'file-lines', name: 'Pay Info Tab Missing Data' },
      { icon: 'file-lines', name: 'State Withholding & Unemployment Insurance' },
      { icon: 'file-lines', name: 'Payroll Change', lastViewed: 'Dec 10, 2024' },
      { icon: 'file-lines', name: 'Payroll Deductions Summary' },
      { icon: 'file-lines', name: 'Salary History', lastViewed: 'Feb 04, 2025' },
      { icon: 'file-lines', name: 'Payroll Info Checkup' },
      { icon: 'file-lines', name: 'Payroll Update Summary' },
    ],
  },
  {
    id: 'performance', label: 'Performance And Culture', catIcon: 'circle-dot',
    reports: [
      { icon: 'file-lines', name: 'Assessment Progress', lastViewed: 'Aug 31, 2024' },
      { icon: 'file-lines', name: 'Company Performance', lastViewed: 'Mar 07, 2024' },
      { icon: 'file-lines', name: 'Employee Performance', lastViewed: 'Jan 09, 2025' },
      { icon: 'file-lines', name: 'Employee Satisfaction (eNPS)', lastViewed: 'Aug 13, 2024' },
      { icon: 'file-lines', name: 'Goals Status', lastViewed: 'Dec 12, 2024' },
      { icon: 'file-lines', name: 'Feedback Status', lastViewed: 'Mar 05, 2024' },
      { icon: 'file-lines', name: 'Employee Wellbeing', lastViewed: 'Mar 10, 2025' },
    ],
  },
  {
    id: 'time-off', label: 'Time Off', catIcon: 'clock',
    reports: [
      { icon: 'file-lines', name: 'Time Off Balances', lastViewed: 'Aug 27, 2024' },
      { icon: 'file-lines', name: 'Time Off Schedule', lastViewed: 'Aug 31, 2024' },
      { icon: 'file-lines', name: 'Time Off Used', lastViewed: 'Aug 31, 2024' },
    ],
  },
  {
    id: 'time-tracking', label: 'Time Tracking', catIcon: 'clock',
    reports: [
      { icon: 'file-lines', name: 'Project Pay Rates', lastViewed: 'Dec 17, 2024' },
      { icon: 'file-lines', name: 'Approved Hours', lastViewed: 'Dec 17, 2024' },
    ],
  },
];

export default function LegacyReportsPage() {
  const [active, setActive] = useState('recent');

  return (
    <div className="p-8">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[var(--text-neutral-xx-strong)]">Reports</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-primary-strong)] text-[var(--color-primary-strong)] text-sm font-medium hover:bg-[var(--color-primary-strong)]/5 transition-colors">
            <Icon name="circle-plus" size={13} />
            New Report
          </button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-6">
        {/* Sub-nav */}
        <div className="shrink-0 w-[220px]">
          <LegacySubNav items={SUB_NAV} activeId={active} onSelect={setActive} />
          <div className="h-px bg-[var(--border-neutral-xx-weak)] my-3" />
          <LegacySubNav items={FOLDER_NAV} activeId={active} onSelect={setActive} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-6">
          {active === 'standard' ? (
            /* Standard Reports — category cards */
            STANDARD_CATEGORIES.map((cat) => (
              <div key={cat.id} className="bg-white rounded-xl border border-[var(--border-neutral-xx-weak)] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name={cat.catIcon} size={16} className="text-[var(--text-neutral-x-strong)]" />
                  <h3 className="text-base font-semibold text-[var(--text-neutral-xx-strong)]">{cat.label}</h3>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border-neutral-xx-weak)]">
                      <th className="text-left text-xs font-semibold text-[var(--text-neutral-weak)] uppercase tracking-wider pb-2">Name</th>
                      <th className="text-right text-xs font-semibold text-[var(--text-neutral-weak)] uppercase tracking-wider pb-2 w-[140px]">Last Viewed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.reports.map((r) => (
                      <tr key={r.name} className="border-b border-[var(--border-neutral-xx-weak)] last:border-b-0">
                        <td className="py-2.5">
                          <div className="flex items-center gap-2">
                            <Icon name={r.icon} size={13} className="text-[var(--color-primary-strong)]" />
                            <span className="text-sm text-[var(--color-primary-strong)] hover:underline cursor-pointer">{r.name}</span>
                          </div>
                        </td>
                        <td className="py-2.5 text-right text-sm text-[var(--text-neutral-weak)]">
                          {r.lastViewed || ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <>
              {/* Favorites */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="star" size={16} className="text-[var(--text-neutral-xx-strong)]" />
                  <h2 className="text-lg font-semibold text-[var(--text-neutral-xx-strong)]">Favorites</h2>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {FAVORITES.map((fav) => (
                    <button
                      key={fav.name}
                      className="bg-white rounded-xl border border-[var(--border-neutral-xx-weak)] p-4 text-left hover:shadow-sm transition-shadow cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[var(--surface-neutral-xx-weak)] flex items-center justify-center mb-3">
                        <Icon name={fav.icon} size={16} className="text-[var(--text-neutral-x-strong)]" />
                      </div>
                      <p className="text-sm font-medium text-[var(--text-neutral-xx-strong)]">{fav.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent */}
              <div className="bg-white rounded-xl border border-[var(--border-neutral-xx-weak)] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="clock" size={16} className="text-[var(--text-neutral-xx-strong)]" />
                  <h2 className="text-lg font-semibold text-[var(--text-neutral-xx-strong)]">Recent</h2>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border-neutral-xx-weak)]">
                      <th className="text-left text-xs font-medium text-[var(--text-neutral-weak)] uppercase tracking-wider pb-2">Last 7 days</th>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
