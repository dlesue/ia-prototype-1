import React, { useState } from 'react';

const workflowTypes = [
  { name: "Time Off", description: "Requests for vacation, sick leave, and other time off", chain: ["Direct Manager", "HR Admin (if >5 days)"] },
  { name: "Information Updates", description: "Changes to personal or job information", chain: ["HR Admin"] },
  { name: "Compensation", description: "Salary changes, promotions, and merit increases", chain: ["Direct Manager", "Department Head", "HR Admin", "Finance"] },
  { name: "Employment Status", description: "Hires, terminations, and employment type changes", chain: ["HR Admin", "Finance"] },
  { name: "Job Information", description: "Title changes, department transfers, reporting changes", chain: ["Direct Manager", "HR Admin"] },
  { name: "Promotion", description: "Official promotions with title and comp changes", chain: ["Direct Manager", "Department Head", "HR Admin"] },
  { name: "Asset Requests", description: "Equipment, software, and resource requests", chain: ["Direct Manager", "IT Admin"] },
];

export default function SettingsApprovals() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Approvals</h1>
        <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Configure approval chains for cross-product workflows</p>
      </div>

      <div className="flex flex-col gap-2">
        {workflowTypes.map((wf, idx) => (
          <div key={wf.name} className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
              onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
            >
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">{wf.name}</span>
                <span className="text-xs text-[var(--text-neutral-medium)]">{wf.description}</span>
              </div>
              <span className="text-[var(--text-neutral-medium)] text-xs">{expandedIdx === idx ? "▲" : "▼"}</span>
            </button>
            {expandedIdx === idx && (
              <div className="px-4 pb-4 border-t border-[var(--border-neutral-xx-weak)]">
                <div className="mt-3">
                  <div className="text-xs font-semibold text-[var(--text-neutral-medium)] uppercase tracking-wide mb-2">Approval Chain</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {wf.chain.map((step, i) => (
                      <React.Fragment key={step}>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-xx-small)] text-sm font-medium border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-xx-weak)] text-[var(--text-neutral-x-strong)]">
                          <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "var(--color-primary-medium)" }}>{i + 1}</span>
                          {step}
                        </div>
                        {i < wf.chain.length - 1 && <span className="text-[var(--text-neutral-weak)]">→</span>}
                      </React.Fragment>
                    ))}
                    <button className="text-xs text-[var(--color-primary-strong)] hover:underline ml-2">Edit Chain</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
