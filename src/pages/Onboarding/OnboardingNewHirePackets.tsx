import React from 'react';

const packets = [
  { name: "Standard New Hire Packet", documents: 8, completionRate: 94, departments: "All", updated: "Mar 1, 2026" },
  { name: "Engineering Onboarding", documents: 12, completionRate: 87, departments: "Engineering", updated: "Feb 15, 2026" },
  { name: "Sales Onboarding", documents: 10, completionRate: 91, departments: "Sales", updated: "Feb 20, 2026" },
  { name: "Executive Onboarding", documents: 6, completionRate: 100, departments: "Leadership", updated: "Jan 10, 2026" },
  { name: "Remote Employee Packet", documents: 9, completionRate: 78, departments: "Remote", updated: "Mar 5, 2026" },
];

export default function OnboardingNewHirePackets() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">New Hire Packets</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Document bundles for new employee onboarding</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
          + New Packet
        </button>
      </div>
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border-neutral-xx-weak)]">
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Packet Name</th>
              <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Documents</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Completion Rate</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Assigned To</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Last Updated</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packets.map(p => (
              <tr key={p.name} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer">
                <td className="py-3 px-4 text-sm font-medium text-[var(--text-neutral-xx-strong)]">{p.name}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)] text-right">{p.documents}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-[var(--surface-neutral-x-weak)] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${p.completionRate}%`, background: "var(--color-primary-strong)" }} />
                    </div>
                    <span className="text-xs text-[var(--text-neutral-medium)]">{p.completionRate}%</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)]">{p.departments}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{p.updated}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button className="text-xs text-[var(--color-primary-strong)] hover:underline">Edit</button>
                    <button className="text-xs text-[var(--text-neutral-medium)] hover:underline">Duplicate</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
