import React from 'react';

const oneOnOnes = [
  { manager: "Alex Chen", report: "Jordan Kim", last: "Mar 9, 2026", next: "Mar 23, 2026", recurring: true, actionItems: 3 },
  { manager: "Sarah Chen", report: "Tyler Brooks", last: "Mar 10, 2026", next: "Mar 24, 2026", recurring: true, actionItems: 1 },
  { manager: "Marcus Williams", report: "Mei Zhang", last: "Feb 24, 2026", next: "Mar 17, 2026", recurring: false, actionItems: 0 },
  { manager: "Maria Santos", report: "Oliver Grant", last: "Mar 5, 2026", next: "Mar 19, 2026", recurring: true, actionItems: 2 },
  { manager: "Priya Patel", report: "Carlos Rivera", last: "Mar 7, 2026", next: "Mar 21, 2026", recurring: true, actionItems: 4 },
  { manager: "David Lee", report: "Fatima Hassan", last: "Feb 20, 2026", next: "Not scheduled", recurring: false, actionItems: 0 },
  { manager: "Alex Chen", report: "Aisha Johnson", last: "Mar 11, 2026", next: "Mar 25, 2026", recurring: true, actionItems: 2 },
];

export default function PerformanceOneOnOnes() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)]">1:1s</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Manager and direct report 1:1 meeting tracking</p>
        </div>
      </div>

      <div className="bg-[var(--color-primary-weak)] rounded-[var(--radius-medium)] px-4 py-3 mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--color-primary-strong)]">78% of manager-report pairs had a 1:1 in the last 2 weeks</span>
        <div className="w-32 h-1.5 bg-white/50 rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: "78%", background: "var(--color-primary-strong)" }} />
        </div>
      </div>

      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border-neutral-xx-weak)]">
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Manager</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Direct Report</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Last Meeting</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Next Meeting</th>
              <th className="text-center py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Recurring</th>
              <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Action Items</th>
            </tr>
          </thead>
          <tbody>
            {oneOnOnes.map((o, i) => (
              <tr key={i} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer">
                <td className="py-3 px-4 text-sm font-medium text-[var(--text-neutral-xx-strong)]">{o.manager}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)]">{o.report}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{o.last}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{o.next}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${o.recurring ? "bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)]" : "bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]"}`}>
                    {o.recurring ? "Yes" : "No"}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)] text-right">
                  {o.actionItems > 0 ? <span className="font-medium">{o.actionItems}</span> : <span className="text-[var(--text-neutral-weak)]">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
