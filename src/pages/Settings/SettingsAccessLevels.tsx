import React from 'react';

const roles = [
  { name: "Full Admin", users: 3, description: "Complete access to all features and settings", color: "#7c3aed" },
  { name: "HR Admin", users: 8, description: "Access to all HR features, excluding billing and permissions", color: "var(--color-primary-strong)" },
  { name: "Manager", users: 47, description: "View and manage direct reports, approve requests", color: "#0ea5e9" },
  { name: "Payroll Admin", users: 2, description: "Access to payroll processing and reporting", color: "#f59e0b" },
  { name: "Recruiting Admin", users: 4, description: "Manage job openings, candidates, and offers", color: "#10b981" },
  { name: "Employee", users: 783, description: "Self-service access to personal information", color: "#6b7280" },
];

export default function SettingsAccessLevels() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Access Levels</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Manage user roles and permissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
          + New Access Level
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {roles.map(role => (
          <div key={role.name} className="flex items-center gap-4 bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] px-4 py-3 hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer transition-colors">
            <div className="w-9 h-9 rounded-[var(--radius-small)] flex items-center justify-center shrink-0 text-white text-sm font-bold" style={{ background: role.color }}>
              {role.name[0]}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">{role.name}</span>
                <span className="text-xs text-[var(--text-neutral-medium)]">{role.users} users</span>
              </div>
              <div className="text-xs text-[var(--text-neutral-medium)] mt-0.5">{role.description}</div>
            </div>
            <button className="text-xs text-[var(--color-primary-strong)] hover:underline shrink-0">Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}
