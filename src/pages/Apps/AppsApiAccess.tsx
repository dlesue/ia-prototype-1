import React, { useState } from 'react';

const apiKeys = [
  { name: "Production API Key", created: "Jan 15, 2026", lastUsed: "Mar 11, 2026", permissions: "Read/Write", status: "Active" },
  { name: "Analytics Integration", created: "Mar 1, 2026", lastUsed: "Mar 10, 2026", permissions: "Read Only", status: "Active" },
  { name: "Legacy Integration Key", created: "Aug 5, 2024", lastUsed: "Nov 12, 2025", permissions: "Read/Write", status: "Active" },
];

const webhooks = [
  { url: "https://hooks.acmecorp.com/bamboo/hr", events: "Employee Created, Updated", status: "Active", lastTriggered: "Mar 11, 2026" },
  { url: "https://api.acmecorp.com/payroll-sync", events: "Payroll Run Completed", status: "Active", lastTriggered: "Mar 1, 2026" },
  { url: "https://slack.acmecorp.com/webhooks/hr", events: "Time Off Approved", status: "Inactive", lastTriggered: "Feb 20, 2026" },
];

export default function AppsApiAccess() {
  const [showKey, setShowKey] = useState<number | null>(null);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">API Access</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Manage API keys, webhooks, and developer integrations</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
          + Generate Key
        </button>
      </div>

      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-large)] border border-[var(--border-neutral-xx-weak)] overflow-hidden mb-6">
        <div className="px-4 py-3 border-b border-[var(--border-neutral-xx-weak)]">
          <h2 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">API Keys</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border-neutral-xx-weak)]">
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Key Name</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Created</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Last Used</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Permissions</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((key, i) => (
              <tr key={key.name} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)]">
                <td className="py-3 px-4">
                  <div className="text-sm font-medium text-[var(--text-neutral-xx-strong)]">{key.name}</div>
                  <div className="font-mono text-xs text-[var(--text-neutral-medium)] mt-0.5 cursor-pointer" onClick={() => setShowKey(showKey === i ? null : i)}>
                    {showKey === i ? "bhr_live_sk_•••••••••••••••••••••••" : "bhr_live_sk_••••••••••••  (click to reveal)"}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{key.created}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{key.lastUsed}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]">{key.permissions}</span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-xs text-red-600 hover:underline">Revoke</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-large)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-neutral-xx-weak)]">
          <h2 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">Webhooks</h2>
          <button className="text-xs text-[var(--color-primary-strong)] hover:underline">+ Add Webhook</button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border-neutral-xx-weak)]">
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Endpoint URL</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Events</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Status</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Last Triggered</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {webhooks.map(w => (
              <tr key={w.url} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)]">
                <td className="py-3 px-4 font-mono text-xs text-[var(--text-neutral-x-strong)] max-w-[200px] truncate">{w.url}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{w.events}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${w.status === "Active" ? "" : "bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]"}`}
                    style={w.status === "Active" ? { background: "var(--color-primary-weak)", color: "var(--color-primary-strong)" } : {}}>
                    {w.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{w.lastTriggered}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button className="text-xs text-[var(--color-primary-strong)] hover:underline">Edit</button>
                    <button className="text-xs text-red-600 hover:underline">Delete</button>
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
