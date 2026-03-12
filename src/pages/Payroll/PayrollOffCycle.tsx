import React from 'react';

const offCycleRuns = [
  { date: "Mar 5, 2026", type: "Bonus", employees: 24, amount: "$48,200", initiator: "Maria Santos", status: "Complete" },
  { date: "Feb 20, 2026", type: "Correction", employees: 2, amount: "$1,840", initiator: "Jordan Kim", status: "Complete" },
  { date: "Feb 10, 2026", type: "Termination Pay", employees: 1, amount: "$12,400", initiator: "Maria Santos", status: "Complete" },
];

export default function PayrollOffCycle() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Off-Cycle</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Process ad-hoc payroll runs for bonuses, corrections, termination pay, or other one-off payments.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white shrink-0 ml-4" style={{ background: "var(--color-primary-strong)" }}>
          + New Off-Cycle Run
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Runs This Year", value: "8" },
          { label: "Total Amount", value: "$124,600" },
          { label: "Avg Employees", value: "9" },
        ].map(s => (
          <div key={s.label} className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-4">
            <div className="text-xs text-[var(--text-neutral-medium)] uppercase tracking-wide font-medium mb-1">{s.label}</div>
            <div className="text-2xl font-bold text-[var(--text-neutral-xx-strong)]">{s.value}</div>
          </div>
        ))}
      </div>
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border-neutral-xx-weak)]">
          <span className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">Recent Off-Cycle Runs</span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border-neutral-xx-weak)]">
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Date</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Type</th>
              <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Employees</th>
              <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Amount</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Initiated By</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody>
            {offCycleRuns.map(r => (
              <tr key={r.date + r.type} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer">
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)]">{r.date}</td>
                <td className="py-3 px-4 text-sm font-medium text-[var(--text-neutral-xx-strong)]">{r.type}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)] text-right">{r.employees}</td>
                <td className="py-3 px-4 text-sm font-medium text-[var(--text-neutral-xx-strong)] text-right">{r.amount}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)]">{r.initiator}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)]">{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
