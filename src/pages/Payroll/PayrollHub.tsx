import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HubHeader } from '../../components/HubHeader';
import type { HubAutomation } from '../../components/HubHeader';

const METRICS_KEY = 'bhr-show-metrics';

const metrics = [
  { label: "Next Payroll", value: "Mar 15", icon: "calendar", linkTo: '/reports/view/Next%20Payroll' },
  { label: "Employees", value: "847", icon: "user-group", trend: "up" as const, trendValue: "+12", sparkData: [810, 818, 822, 828, 835, 840, 847], linkTo: '/reports/view/Employees' },
  { label: "Pending Timesheets", value: "34", icon: "clock", sparkData: [42, 38, 45, 40, 36, 39, 34], linkTo: '/reports/view/Pending%20Timesheets' },
  { label: "Gross Cost (Period)", value: "$2.1M", icon: "circle-dollar", sparkData: [1.9, 1.95, 2.0, 2.0, 2.05, 2.08, 2.1], linkTo: '/reports/view/Gross%20Cost' },
];

const insights = [
  { text: "34 timesheets not yet approved", shortText: "34 timesheets pending", icon: "clipboard-check" },
  { text: "3 new hires added to this payroll run", shortText: "3 new hires", icon: "user-plus" },
  { text: "Year-to-date payroll cost: $6.3M", shortText: "YTD cost $6.3M", icon: "dollar-sign" },
];

const AUTOMATIONS: HubAutomation[] = [
  { text: 'Auto-approve timesheets under 40 hours', shortText: 'Auto-approve <40hrs', fields: [
    { label: 'Threshold', options: ['Under 40 hours', 'Under 35 hours', 'Under 45 hours'] },
    { label: 'Applies to', options: ['All employees', 'Hourly only', 'My direct reports'] },
    { label: 'Notify', options: ['Manager only', 'Manager + Employee', 'No one'] },
  ] },
  { text: 'Notify finance when payroll variance exceeds 5%', shortText: 'Alert on variance >5%', fields: [
    { label: 'Variance threshold', options: ['Over 3%', 'Over 5%', 'Over 10%'] },
    { label: 'Compare to', options: ['Previous period', 'Same period last year', 'Rolling average'] },
    { label: 'Notify', options: ['Finance team', 'Payroll admin', 'Finance + HR'] },
  ] },
];

export default function PayrollHub() {
  const [showMetrics, setShowMetrics] = useState(() => localStorage.getItem(METRICS_KEY) !== 'false');

  useEffect(() => {
    const handler = () => setShowMetrics(localStorage.getItem(METRICS_KEY) !== 'false');
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
    <div>
      <HubHeader title="Payroll" product="Payroll" metrics={metrics} insights={insights} automations={AUTOMATIONS} />
      <div className="px-8 pb-8 space-y-6">
        {/* Header row with abstract title + real Payroll Reports button */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-28 rounded bg-[var(--border-neutral-xx-weak)]" />
          <div className="flex items-center gap-3">
            <div className="h-3 w-28 rounded bg-[var(--border-neutral-xx-weak)]" />
            {!showMetrics && (
              <Link to="/payroll/reports" className="h-9 px-4 rounded-full border border-[var(--color-primary-strong)] bg-green-50 flex items-center justify-center text-sm font-medium text-[var(--color-primary-strong)] hover:bg-green-100 transition-colors shadow-[0_0_12px_rgba(0,128,0,0.15)]">
                Payroll Reports
              </Link>
            )}
            <div className="h-9 w-36 rounded-full bg-[var(--border-neutral-xx-weak)]" />
          </div>
        </div>

        {/* Abstract pay calendar cards */}
        <div className="flex gap-3">
          {[1, 2, 3, 4, 5, 6, 7].map(i => (
            <div key={i} className={`flex-1 rounded-xl p-4 flex flex-col items-center gap-2 ${i === 1 ? 'border-2 border-[var(--border-neutral-xx-weak)]' : 'border border-[var(--border-neutral-xx-weak)]'}`}>
              <div className="w-10 h-10 rounded-lg bg-[var(--border-neutral-xx-weak)]" />
              <div className="h-2.5 w-10 rounded bg-[var(--border-neutral-xx-weak)]" />
              <div className="h-2 w-14 rounded bg-[var(--border-neutral-xx-weak)]" />
            </div>
          ))}
        </div>

        {/* Abstract content blocks */}
        <div className="flex gap-6">
          <div className="flex-1 min-w-0 rounded-xl border border-[var(--border-neutral-xx-weak)] bg-white p-6 space-y-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className={`rounded bg-[var(--border-neutral-xx-weak)] ${i <= 2 ? 'h-3' : 'h-2.5'} ${i === 1 ? 'w-48' : i === 2 ? 'w-32' : i === 3 ? 'w-full' : i === 4 ? 'w-3/4' : i === 5 ? 'w-2/3' : 'w-1/2'}`} />
            ))}
          </div>
          <div className="w-[280px] shrink-0 rounded-xl border border-[var(--border-neutral-xx-weak)] bg-white p-6 space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`rounded bg-[var(--border-neutral-xx-weak)] ${i === 1 ? 'h-10 rounded-full' : 'h-2.5'} ${i === 1 ? 'w-full' : i === 2 ? 'w-full' : i === 3 ? 'w-3/4' : i === 4 ? 'w-full' : 'w-2/3'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
