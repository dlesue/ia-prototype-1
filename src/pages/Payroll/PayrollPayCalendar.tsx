import React from 'react';
import { HubHeader } from '../../components/HubHeader';

const metrics = [
  { label: "Next Payroll", value: "Mar 15" },
  { label: "Employees", value: "847", trend: "up" as const, trendValue: "+12" },
  { label: "Pending Timesheets", value: "34" },
  { label: "Gross Cost (Period)", value: "$2.1M" },
];

const insights = [
  { text: "34 timesheets not yet approved" },
  { text: "3 new hires added to this payroll run" },
  { text: "Year-to-date payroll cost: $6.3M" },
];

const payDates = [
  { date: "Mar 15, 2026", schedule: "Bi-weekly", employees: 847, amount: "$2.1M", status: "Upcoming" },
  { date: "Mar 29, 2026", schedule: "Bi-weekly", employees: 847, amount: "$2.1M est.", status: "Upcoming" },
  { date: "Apr 15, 2026", schedule: "Semi-monthly", employees: 847, amount: "$2.1M est.", status: "Upcoming" },
];

const marDays = Array.from({ length: 31 }, (_, i) => i + 1);
const payDateNums = [15, 29];

const firstDayOfMarch = 6; // Sunday = 0, Saturday = 6; March 1, 2026 is Sunday
// March 1, 2026 is actually a Sunday (day 0), so offset = 0
// Let me recalculate: March 1 2026 is Sunday
const dayOffset = 0;

export default function PayrollPayCalendar() {
  return (
    <div>
      <HubHeader product="Payroll" metrics={metrics} insights={insights} />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Pay Calendar</h1>
            <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">March 2026 payroll schedule</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
            Start Payroll
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-4">
            <div className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] mb-3 text-center">March 2026</div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
                <div key={d} className="text-center text-xs font-medium text-[var(--text-neutral-medium)] py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: dayOffset }).map((_, i) => (
                <div key={"empty-" + i} />
              ))}
              {marDays.map(day => (
                <div key={day} className={`h-9 flex items-center justify-center text-sm rounded-[var(--radius-small)] font-medium cursor-pointer transition-colors ${
                  payDateNums.includes(day)
                    ? "text-white font-bold"
                    : day === 11 ? "bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)] font-semibold"
                    : "hover:bg-[var(--surface-neutral-xx-weak)] text-[var(--text-neutral-x-strong)]"
                }`} style={payDateNums.includes(day) ? { background: "var(--color-primary-strong)" } : {}}>
                  {day}
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-4 text-xs text-[var(--text-neutral-medium)]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "var(--color-primary-strong)" }} />
                Pay Date
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "var(--color-primary-weak)" }} />
                Today
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-sm font-semibold text-[var(--text-neutral-x-strong)] mb-1">Upcoming Pay Dates</div>
            {payDates.map(pd => (
              <div key={pd.date} className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">{pd.date}</div>
                    <div className="text-xs text-[var(--text-neutral-medium)]">{pd.schedule}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)]">{pd.status}</span>
                </div>
                <div className="flex justify-between text-xs text-[var(--text-neutral-medium)] mb-3">
                  <span>{pd.employees} employees</span>
                  <span className="font-medium text-[var(--text-neutral-xx-strong)]">{pd.amount}</span>
                </div>
                <button className="w-full py-1.5 rounded-[var(--radius-xx-small)] text-xs font-medium border border-[var(--border-neutral-x-weak)] text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
