import React from 'react';

const reports = [
  { title: "Payroll Summary", description: "Overview of all payroll runs including gross pay, deductions, and net pay totals." },
  { title: "Tax Liability Report", description: "Federal, state, and local tax obligations by period and employee." },
  { title: "Deduction Report", description: "Breakdown of all deductions by type: benefits, retirement, garnishments." },
  { title: "W-2 Preview", description: "Preview year-to-date W-2 data before final processing." },
  { title: "Workers Compensation", description: "Payroll data formatted for workers compensation audit and reporting." },
];

export default function PayrollReports() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)]">Payroll Reports</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Generate and download payroll reports</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {reports.map(r => (
          <div key={r.title} className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-4 flex items-center gap-4 hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer transition-colors">
            <div className="w-10 h-10 rounded-[var(--radius-small)] flex items-center justify-center shrink-0" style={{ background: "var(--color-primary-weak)" }}>
              <span className="text-lg">&#128196;</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">{r.title}</div>
              <div className="text-xs text-[var(--text-neutral-medium)] mt-0.5">{r.description}</div>
            </div>
            <button className="px-3 py-1.5 rounded-[var(--radius-xx-small)] text-xs font-medium text-white shrink-0" style={{ background: "var(--color-primary-strong)" }}>
              Run Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
