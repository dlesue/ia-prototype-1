import React from 'react';

const carriers = [
  { name: "Blue Shield", type: "EDI", status: "Healthy", sync: "Mar 11, 2026 2:14 AM", plans: 2, actions: ["Configure", "View Logs"] },
  { name: "Kaiser", type: "EDI", status: "Healthy", sync: "Mar 11, 2026 2:14 AM", plans: 1, actions: ["Configure", "View Logs"] },
  { name: "Delta Dental", type: "EDI", status: "Healthy", sync: "Mar 11, 2026 2:14 AM", plans: 2, actions: ["Configure", "View Logs"] },
  { name: "VSP Vision", type: "EDI", status: "Warning", sync: "Mar 9, 2026 2:14 AM", plans: 2, actions: ["Configure", "View Logs"] },
  { name: "Principal Life", type: "Manual", status: "Healthy", sync: "Mar 7, 2026", plans: 2, actions: ["Configure", "Update"] },
  { name: "Fidelity 401k", type: "API", status: "Healthy", sync: "Mar 11, 2026 6:00 AM", plans: 2, actions: ["Configure", "View Logs"] },
];

export default function BenefitsCarriers() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)]">Carriers</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Benefit carrier connections and sync status</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
          + Add Carrier
        </button>
      </div>
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border-neutral-xx-weak)]">
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Carrier</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Connection Type</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Status</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Last Sync</th>
              <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Plans</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {carriers.map(c => (
              <tr key={c.name} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)]">
                <td className="py-3 px-4 text-sm font-medium text-[var(--text-neutral-xx-strong)]">{c.name}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]">{c.type}</span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.status === "Healthy" ? "bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)]" : "bg-amber-50 text-amber-700"}`}>
                    {c.status === "Healthy" ? "&#9679; " : "&#9888; "}{c.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{c.sync}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)] text-right">{c.plans}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    {c.actions.map(a => (
                      <button key={a} className="text-xs text-[var(--color-primary-strong)] hover:underline">{a}</button>
                    ))}
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
