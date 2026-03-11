import React from 'react';

const reportCategories = [
  {
    name: "People & Headcount",
    reports: [
      { name: "Headcount Summary", description: "Current headcount by department, location, and employment type.", lastRun: "Mar 11, 2026" },
      { name: "Employee Directory", description: "Full list of active employees with contact and job information.", lastRun: "Mar 10, 2026" },
      { name: "New Hires", description: "Employees hired within a specified date range.", lastRun: "Mar 9, 2026" },
      { name: "Terminations", description: "Employees terminated within a specified date range with departure reasons.", lastRun: "Mar 8, 2026" },
      { name: "Tenure Analysis", description: "Breakdown of employee tenure distribution and average length of service.", lastRun: "Mar 5, 2026" },
    ],
  },
  {
    name: "Payroll",
    reports: [
      { name: "Payroll Summary", description: "Gross pay, deductions, taxes, and net pay by period.", lastRun: "Mar 1, 2026" },
      { name: "Tax Liability", description: "Federal, state, and local tax obligations by period.", lastRun: "Feb 29, 2026" },
      { name: "Deduction Detail", description: "Breakdown of all employee deductions by type and amount.", lastRun: "Mar 1, 2026" },
      { name: "Gross-to-Net", description: "Full earnings statement reconciliation from gross to net pay.", lastRun: "Mar 1, 2026" },
    ],
  },
  {
    name: "Benefits",
    reports: [
      { name: "Enrollment Summary", description: "Benefit enrollment counts and rates by plan type.", lastRun: "Mar 7, 2026" },
      { name: "Plan Distribution", description: "Employee distribution across benefit plans and tiers.", lastRun: "Mar 7, 2026" },
      { name: "Cost Analysis", description: "Total benefit cost breakdown by plan, including employer and employee contributions.", lastRun: "Mar 1, 2026" },
    ],
  },
  {
    name: "Performance & Culture",
    reports: [
      { name: "Review Completion", description: "Performance review completion rates by cycle, department, and manager.", lastRun: "Mar 10, 2026" },
      { name: "Goal Attainment", description: "Summary of goal completion rates at company, team, and individual levels.", lastRun: "Mar 8, 2026" },
      { name: "eNPS Trend", description: "Employee Net Promoter Score over time with promoter, passive, detractor breakdown.", lastRun: "Mar 5, 2026" },
      { name: "1:1 Coverage", description: "Percentage of manager-report pairs with recent 1:1 meetings.", lastRun: "Mar 3, 2026" },
    ],
  },
  {
    name: "Hiring",
    reports: [
      { name: "Pipeline Summary", description: "Candidate pipeline by stage, job, and department.", lastRun: "Mar 11, 2026" },
      { name: "Time-to-Hire", description: "Average days to hire by role, department, and hiring manager.", lastRun: "Mar 10, 2026" },
      { name: "Source Effectiveness", description: "Application and hire rates by candidate source channel.", lastRun: "Mar 9, 2026" },
    ],
  },
  {
    name: "Training",
    reports: [
      { name: "Compliance Report", description: "Required training completion status across all employees.", lastRun: "Mar 11, 2026" },
      { name: "Certification Status", description: "Active, expiring, and expired certifications by employee.", lastRun: "Mar 10, 2026" },
      { name: "Course Completion", description: "Training completion rates by course, department, and time period.", lastRun: "Mar 8, 2026" },
    ],
  },
];

export default function ReportsStandard() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)]">Standard Reports</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Pre-built reports across all HR modules</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium border border-[var(--border-neutral-x-weak)] text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
          Schedule Report
        </button>
      </div>
      <div className="flex flex-col gap-6">
        {reportCategories.map(cat => (
          <div key={cat.name}>
            <div className="text-xs font-semibold text-[var(--text-neutral-medium)] uppercase tracking-wide mb-2">{cat.name}</div>
            <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
              {cat.reports.map((r, i) => (
                <div key={r.name} className={`flex items-center gap-4 px-4 py-3 hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer transition-colors ${i < cat.reports.length - 1 ? "border-b border-[var(--border-neutral-xx-weak)]" : ""}`}>
                  <div className="w-8 h-8 rounded-[var(--radius-small)] flex items-center justify-center shrink-0" style={{ background: "var(--color-primary-weak)" }}>
                    <span className="text-base">&#128196;</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[var(--text-neutral-xx-strong)]">{r.name}</div>
                    <div className="text-xs text-[var(--text-neutral-medium)] truncate">{r.description}</div>
                  </div>
                  <div className="text-xs text-[var(--text-neutral-weak)] shrink-0">Last run {r.lastRun}</div>
                  <button className="px-3 py-1.5 rounded-[var(--radius-xx-small)] text-xs font-medium text-white shrink-0" style={{ background: "var(--color-primary-strong)" }}>
                    Run
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
