import React from 'react';

const policies = [
  { name: "Vacation", balance: "10 days avg", accrual: "1.25 days/month", carryover: "5 days max" },
  { name: "Sick", balance: "5.25 days avg", accrual: "0.5 days/month", carryover: "Unlimited" },
  { name: "Personal", balance: "2 days avg", accrual: "Flat grant", carryover: "None" },
];

const pending = [
  { employee: "Jordan Kim", type: "Vacation", dates: "Mar 20-22, 2026", days: 3, requested: "Mar 8, 2026", status: "Pending" },
  { employee: "Priya Patel", type: "Sick", dates: "Mar 12, 2026", days: 1, requested: "Mar 11, 2026", status: "Pending" },
  { employee: "Carlos Rivera", type: "Vacation", dates: "Apr 7-11, 2026", days: 5, requested: "Mar 5, 2026", status: "Pending" },
  { employee: "Mei Zhang", type: "Personal", dates: "Mar 18, 2026", days: 1, requested: "Mar 9, 2026", status: "Pending" },
  { employee: "Oliver Grant", type: "Vacation", dates: "Mar 25-27, 2026", days: 3, requested: "Mar 7, 2026", status: "Pending" },
];

export default function TimeAttendanceTimeOff() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Time Off</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Manage time-off policies and approve requests</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
          + Add Policy
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {policies.map(p => (
          <div key={p.name} className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-4">
            <div className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] mb-2">{p.name}</div>
            <div className="text-lg font-bold text-[var(--color-primary-strong)] mb-1">{p.balance}</div>
            <div className="text-xs text-[var(--text-neutral-medium)]">Accrual: {p.accrual}</div>
            <div className="text-xs text-[var(--text-neutral-medium)]">Carryover: {p.carryover}</div>
          </div>
        ))}
      </div>

      <div>
        <div className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] mb-3">Pending Requests <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">{pending.length}</span></div>
        <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-neutral-xx-weak)]">
                <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Employee</th>
                <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Type</th>
                <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Dates</th>
                <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Days</th>
                <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Requested</th>
                <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((r, i) => (
                <tr key={i} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)]">
                  <td className="py-3 px-4 text-sm font-medium text-[var(--text-neutral-xx-strong)]">{r.employee}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]">{r.type}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)]">{r.dates}</td>
                  <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)] text-right">{r.days}</td>
                  <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{r.requested}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="px-2.5 py-1 rounded-[var(--radius-xx-small)] text-xs font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>Approve</button>
                      <button className="px-2.5 py-1 rounded-[var(--radius-xx-small)] text-xs font-medium border border-[var(--border-neutral-x-weak)] text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">Deny</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
