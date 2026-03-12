import React from 'react';

const templates = [
  { name: "Employee Handbook Acknowledgment", type: "Acknowledgment", completion: 88, pending: 8, signed: 68, lastSent: "Mar 1, 2026" },
  { name: "Offer Letter", type: "Contract", completion: 100, pending: 0, signed: 24, lastSent: "Mar 10, 2026" },
  { name: "NDA - Standard", type: "Legal", completion: 96, pending: 1, signed: 23, lastSent: "Mar 8, 2026" },
  { name: "Direct Deposit Authorization", type: "Payroll", completion: 94, pending: 4, signed: 67, lastSent: "Feb 28, 2026" },
  { name: "Benefits Enrollment Confirmation", type: "Benefits", completion: 94, pending: 50, signed: 797, lastSent: "Mar 5, 2026" },
  { name: "Remote Work Agreement", type: "Policy", completion: 91, pending: 7, signed: 78, lastSent: "Feb 20, 2026" },
];

export default function FilesESignatures() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">E-Signatures</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Manage signature templates and track completion</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
          + New Template
        </button>
      </div>

      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border-neutral-xx-weak)]">
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Template Name</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Type</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Completion</th>
              <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Pending</th>
              <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Signed</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Last Sent</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {templates.map(t => (
              <tr key={t.name} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer">
                <td className="py-3 px-4 text-sm font-medium text-[var(--text-neutral-xx-strong)]">{t.name}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]">{t.type}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-[var(--surface-neutral-x-weak)] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${t.completion}%`, background: "var(--color-primary-strong)" }} />
                    </div>
                    <span className="text-xs text-[var(--text-neutral-medium)]">{t.completion}%</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-right">
                  {t.pending > 0 ? <span className="text-amber-600 font-medium">{t.pending}</span> : <span className="text-[var(--text-neutral-medium)]">0</span>}
                </td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)] font-medium text-right">{t.signed}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{t.lastSent}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button className="text-xs text-[var(--color-primary-strong)] hover:underline">Send</button>
                    <button className="text-xs text-[var(--text-neutral-medium)] hover:underline">Edit</button>
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
