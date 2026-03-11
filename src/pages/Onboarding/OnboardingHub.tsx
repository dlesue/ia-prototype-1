import React from 'react';
import { HubHeader } from '../../components/HubHeader';

const metrics = [
  { label: "Active Onboarding", value: "8" },
  { label: "Avg Completion", value: "67%", ringPercent: 67 },
  { label: "Overdue Tasks", value: "12", trend: "down" as const, trendValue: "+2" },
  { label: "90-Day Attrition", value: "4.2%" },
];

const insights = [
  { text: "Tyler Brooks is 3 days behind on IT setup tasks" },
  { text: "2 new hires start next week" },
  { text: "Onboarding completion has improved 8% vs last quarter" },
];

const employees = [
  { name: "Tyler Brooks", start: "Feb 24, 2026", completion: 42, hr: "Maria Santos", manager: "Alex Chen", days: 15 },
  { name: "Mei Zhang", start: "Mar 3, 2026", completion: 68, hr: "Jordan Kim", manager: "Sarah Chen", days: 8 },
  { name: "Oliver Grant", start: "Mar 3, 2026", completion: 71, hr: "Maria Santos", manager: "Priya Patel", days: 8 },
  { name: "Fatima Hassan", start: "Mar 10, 2026", completion: 25, hr: "Jordan Kim", manager: "Marcus Williams", days: 1 },
  { name: "Aisha Johnson", start: "Feb 17, 2026", completion: 89, hr: "Maria Santos", manager: "Carlos Rivera", days: 22 },
  { name: "James Brien", start: "Feb 10, 2026", completion: 94, hr: "Jordan Kim", manager: "David Lee", days: 29 },
];

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[var(--surface-neutral-x-weak)] rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: value < 50 ? "#dc2626" : value < 75 ? "#f59e0b" : "var(--color-primary-strong)" }} />
      </div>
      <span className="text-xs text-[var(--text-neutral-medium)] w-8">{value}%</span>
    </div>
  );
}

export default function OnboardingHub() {
  return (
    <div>
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)]">Onboarding</h1>
      </div>
      <HubHeader product="Onboarding" metrics={metrics} insights={insights} />
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold text-[var(--text-neutral-xx-strong)] mb-4">Active Onboarding</h2>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">8 employees currently in onboarding</p>
          <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
            + Add Employee
          </button>
        </div>
        <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-neutral-xx-weak)]">
                <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Employee</th>
                <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Start Date</th>
                <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Completion</th>
                <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">HR Contact</th>
                <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Hiring Manager</th>
                <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Days Since Start</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(e => (
                <tr key={e.name} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "var(--color-primary-strong)" }}>
                        {e.name.split(" ").map((n: string) => n[0]).join("")}
                      </div>
                      <span className="text-sm font-medium text-[var(--text-neutral-xx-strong)]">{e.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)]">{e.start}</td>
                  <td className="py-3 px-4 w-40"><ProgressBar value={e.completion} /></td>
                  <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)]">{e.hr}</td>
                  <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)]">{e.manager}</td>
                  <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)] text-right">{e.days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
