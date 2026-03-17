import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import type { IconName } from '../../components/Icon';

interface ReportRow {
  icon: IconName;
  name: string;
  lastViewed?: string;
}

interface ReportCategory {
  id: string;
  label: string;
  catIcon: IconName;
  reports: ReportRow[];
}

const CATEGORIES: ReportCategory[] = [
  {
    id: 'benefits',
    label: 'Benefits',
    catIcon: 'heart',
    reports: [
      { icon: 'file-lines', name: 'Benefit Summary', lastViewed: 'Oct 07, 2025' },
    ],
  },
  {
    id: 'compensation',
    label: 'Compensation',
    catIcon: 'chart-bar',
    reports: [
      { icon: 'chart-bar', name: 'Pay by Department', lastViewed: 'Oct 05, 2025' },
      { icon: 'chart-bar', name: 'Pay by Location' },
      { icon: 'chart-bar', name: 'Pay by Job Title' },
    ],
  },
  {
    id: 'data-review',
    label: 'Data Review',
    catIcon: 'file-lines',
    reports: [
      { icon: 'file-lines', name: '2-Step Login Configuration' },
      { icon: 'file-lines', name: 'Audit Trail', lastViewed: 'Nov 05, 2025' },
      { icon: 'file-lines', name: 'Change History', lastViewed: 'Dec 13, 2024' },
      { icon: 'file-lines', name: 'Missing Data', lastViewed: 'Nov 14, 2024' },
      { icon: 'clock', name: 'Point-in-Time' },
    ],
  },
  {
    id: 'employee-info',
    label: 'Employee Info',
    catIcon: 'user-group',
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
    id: 'headcount',
    label: 'Headcount And Turnover',
    catIcon: 'chart-line',
    reports: [
      { icon: 'file-lines', name: 'Additions & Terminations', lastViewed: 'Mar 06' },
      { icon: 'file-lines', name: 'Employee Turnover', lastViewed: 'Mar 06' },
      { icon: 'file-lines', name: 'Headcount', lastViewed: 'Aug 31, 2024' },
    ],
  },
  {
    id: 'hiring',
    label: 'Hiring',
    catIcon: 'id-badge',
    reports: [
      { icon: 'file-lines', name: 'Candidate Sources', lastViewed: 'Aug 27, 2024' },
      { icon: 'file-lines', name: 'Candidates by Disability and Gender', lastViewed: 'Jul 08, 2024' },
      { icon: 'file-lines', name: 'Candidates by Race and Gender', lastViewed: 'Feb 04, 2025' },
      { icon: 'file-lines', name: 'Candidates by Veteran Status and Gender', lastViewed: 'Jul 08, 2024' },
      { icon: 'chart-bar', name: 'Candidate Funnel', lastViewed: 'Aug 15, 2025' },
    ],
  },
  {
    id: 'payroll',
    label: 'Payroll',
    catIcon: 'money-bill-1',
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
    id: 'performance',
    label: 'Performance And Culture',
    catIcon: 'circle-dot',
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
    id: 'time-off',
    label: 'Time Off',
    catIcon: 'clock',
    reports: [
      { icon: 'file-lines', name: 'Time Off Balances', lastViewed: 'Aug 27, 2024' },
      { icon: 'file-lines', name: 'Time Off Schedule', lastViewed: 'Aug 31, 2024' },
      { icon: 'file-lines', name: 'Time Off Used', lastViewed: 'Aug 31, 2024' },
    ],
  },
  {
    id: 'time-tracking',
    label: 'Time Tracking',
    catIcon: 'clock',
    reports: [
      { icon: 'file-lines', name: 'Project Pay Rates', lastViewed: 'Dec 17, 2024' },
      { icon: 'file-lines', name: 'Approved Hours', lastViewed: 'Dec 17, 2024' },
    ],
  },
];

export default function ReportsStandard() {
  const [searchParams] = useSearchParams();
  const section = searchParams.get('section')?.toLowerCase();
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (section && sectionRefs.current[section]) {
      sectionRefs.current[section]!.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [section]);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)]">Standard Reports</h1>

      {CATEGORIES.map((cat) => (
        <div
          key={cat.id}
          ref={(el) => { sectionRefs.current[cat.id] = el; }}
          className={`scroll-mt-24 rounded-xl border p-6 transition-colors ${
            section === cat.id
              ? 'bg-white border-[var(--color-primary-medium)] shadow-sm'
              : 'bg-white border-[var(--border-neutral-xx-weak)]'
          }`}
        >
          {/* Category header */}
          <div className="flex items-center gap-2 mb-4">
            <Icon name={cat.catIcon} size={16} className="text-[var(--text-neutral-x-strong)]" />
            <h3 className="text-base font-semibold text-[var(--text-neutral-xx-strong)]">{cat.label}</h3>
          </div>

          {/* Table */}
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
      ))}
    </div>
  );
}
