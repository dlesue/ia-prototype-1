import React from 'react';

const offboarding = [
  { name: "Emma Thompson", lastDay: "Mar 15, 2026", completion: 60, exitInterview: "Scheduled", reason: "New Opportunity" },
  { name: "Carlos Rivera", lastDay: "Mar 22, 2026", completion: 30, exitInterview: "Not Scheduled", reason: "Relocation" },
  { name: "Tyler Brooks", lastDay: "Mar 31, 2026", completion: 10, exitInterview: "Not Scheduled", reason: "Voluntary Resignation" },
  { name: "James Brien", lastDay: "Apr 5, 2026", completion: 5, exitInterview: "Not Scheduled", reason: "Retirement" },
];

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[var(--surface-neutral-x-weak)] rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: value < 40 ? "#dc2626" : value < 70 ? "#f59e0b" : "var(--color-primary-strong)" }} />
      </div>
      <span className="text-xs text-[var(--text-neutral-medium)] w-8">{value}%</span>
    </div>
  );
}

export default function OnboardingOffboarding() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Active Offboarding</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">4 employees currently in offboarding</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
          + Start Offboarding
        </button>
      </div>
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border-neutral-xx-weak)]">
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Employee</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Last Day</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Completion</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Exit Interview</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Reason for Departure</th>
            </tr>
          </thead>
          <tbody>
            {offboarding.map(e => (
              <tr key={e.name} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "#6b7280" }}>
                      {e.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span className="text-sm font-medium text-[var(--text-neutral-xx-strong)]">{e.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)]">{e.lastDay}</td>
                <td className="py-3 px-4 w-40"><ProgressBar value={e.completion} /></td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${e.exitInterview === "Scheduled" ? "bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)]" : "bg-amber-50 text-amber-700"}`}>
                    {e.exitInterview}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)]">{e.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
