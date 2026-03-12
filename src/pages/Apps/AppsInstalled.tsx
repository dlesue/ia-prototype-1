import React from 'react';

const integrations = [
  { name: "Okta", type: "SSO/Security", status: "Healthy", sync: "Mar 11, 2026 3:00 AM", errors: 0 },
  { name: "Slack", type: "Communication", status: "Error", sync: "Mar 10, 2026 11:32 PM", errors: 2 },
  { name: "Greenhouse", type: "Hiring", status: "Healthy", sync: "Mar 11, 2026 4:15 AM", errors: 0 },
  { name: "DocuSign", type: "E-Sign", status: "Healthy", sync: "Mar 11, 2026 1:00 AM", errors: 0 },
  { name: "Zoom", type: "Communication", status: "Healthy", sync: "Mar 11, 2026 6:00 AM", errors: 0 },
  { name: "GitHub", type: "Dev", status: "Healthy", sync: "Mar 11, 2026 2:00 AM", errors: 0 },
  { name: "Fidelity", type: "401k", status: "Healthy", sync: "Mar 11, 2026 7:00 AM", errors: 0 },
  { name: "Checkr", type: "Background Checks", status: "Warning", sync: "Mar 9, 2026 8:00 AM", errors: 1 },
];

export default function AppsInstalled() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Installed</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">8 active integrations</p>
        </div>
      </div>
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border-neutral-xx-weak)]">
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Integration</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Type</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Status</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Last Sync</th>
              <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Errors</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {integrations.map(i => (
              <tr key={i.name} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)]">
                <td className="py-3 px-4 text-sm font-medium text-[var(--text-neutral-xx-strong)]">{i.name}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]">{i.type}</span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    i.status === "Healthy" ? "bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)]" :
                    i.status === "Warning" ? "bg-amber-50 text-amber-700" :
                    "bg-red-50 text-red-700"
                  }`}>{i.status}</span>
                </td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{i.sync}</td>
                <td className="py-3 px-4 text-sm text-right">
                  {i.errors > 0 ? <span className="text-red-600 font-medium">{i.errors}</span> : <span className="text-[var(--text-neutral-weak)]">0</span>}
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button className="text-xs text-[var(--color-primary-strong)] hover:underline">Configure</button>
                    <button className="text-xs text-red-600 hover:underline">Disconnect</button>
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
