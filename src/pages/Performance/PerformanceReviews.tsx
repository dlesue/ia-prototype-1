import React from 'react';

const cycles = [
  { name: "Q1 2026 Review", period: "Jan 1 - Mar 31, 2026", type: "Quarterly", participants: 847, completion: 84, status: "Active", due: "Mar 31, 2026" },
  { name: "Annual Review 2025", period: "Jan 1 - Dec 31, 2025", type: "Annual", participants: 831, completion: 100, status: "Completed", due: "Dec 31, 2025" },
  { name: "Mid-Year 2025", period: "Jan 1 - Jun 30, 2025", type: "Mid-Year", participants: 820, completion: 97, status: "Completed", due: "Jul 15, 2025" },
  { name: "Q4 2025 Review", period: "Oct 1 - Dec 31, 2025", type: "Quarterly", participants: 835, completion: 92, status: "Completed", due: "Jan 10, 2026" },
  { name: "Q3 2025 Review", period: "Jul 1 - Sep 30, 2025", type: "Quarterly", participants: 824, completion: 89, status: "Completed", due: "Oct 10, 2025" },
];

export default function PerformanceReviews() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Reviews</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Performance review cycles and completion tracking</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
          + New Cycle
        </button>
      </div>
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border-neutral-xx-weak)]">
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Cycle Name</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Period</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Type</th>
              <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Participants</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Completion</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Status</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(c => (
              <tr key={c.name} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer">
                <td className="py-3 px-4 text-sm font-medium text-[var(--text-neutral-xx-strong)]">{c.name}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{c.period}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)]">{c.type}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)] text-right">{c.participants}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-[var(--surface-neutral-x-weak)] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${c.completion}%`, background: "var(--color-primary-strong)" }} />
                    </div>
                    <span className="text-xs text-[var(--text-neutral-medium)]">{c.completion}%</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.status === "Active" ? "bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)]" : "bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]"}`}>
                    {c.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{c.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
