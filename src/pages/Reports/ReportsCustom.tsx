import React, { useState } from 'react';

const fieldCategories = [
  { name: "Employee Info", fields: ["Employee ID", "Full Name", "Email", "Phone", "Location", "Department", "Division", "Employment Type"] },
  { name: "Job Info", fields: ["Job Title", "Level", "Manager", "Start Date", "Tenure", "FLSA Status", "Work Schedule"] },
  { name: "Compensation", fields: ["Base Salary", "Pay Type", "Pay Frequency", "Last Raise Date", "Last Raise Amount", "Bonus Target"] },
  { name: "Time Off", fields: ["Vacation Balance", "Sick Balance", "PTO Used YTD", "PTO Remaining"] },
  { name: "Performance", fields: ["Last Review Score", "Goal Completion %", "eNPS Response", "1:1 Frequency"] },
];

const savedReports = [
  { name: "Headcount by Department", created: "Mar 5, 2026", lastRun: "Mar 11, 2026" },
  { name: "Comp Analysis Q1", created: "Feb 20, 2026", lastRun: "Mar 8, 2026" },
  { name: "New Hires 2026", created: "Jan 10, 2026", lastRun: "Mar 7, 2026" },
];

export default function ReportsCustom() {
  const [selectedFields, setSelectedFields] = useState<string[]>(["Full Name", "Department", "Job Title", "Base Salary"]);
  const [expandedCat, setExpandedCat] = useState<string | null>("Employee Info");

  const toggleField = (field: string) => {
    setSelectedFields(prev => prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]);
  };

  const previewRows = [
    { "Full Name": "Jordan Kim", Department: "Product Design", "Job Title": "Sr. Product Designer", "Base Salary": "$145,000" },
    { "Full Name": "Alex Chen", Department: "Platform Engineering", "Job Title": "Director of Engineering", "Base Salary": "$210,000" },
    { "Full Name": "Maria Santos", Department: "People Ops", "Job Title": "VP People", "Base Salary": "$195,000" },
    { "Full Name": "Priya Patel", Department: "Product", "Job Title": "Senior PM", "Base Salary": "$165,000" },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Custom Reports</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Build custom reports by selecting fields and filters</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
          + New Report
        </button>
      </div>

      <div className="flex gap-4">
        <div className="w-56 shrink-0">
          <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden mb-4">
            <div className="px-3 py-2 border-b border-[var(--border-neutral-xx-weak)]">
              <span className="text-xs font-semibold text-[var(--text-neutral-medium)] uppercase tracking-wide">Fields</span>
            </div>
            {fieldCategories.map(cat => (
              <div key={cat.name}>
                <button className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)] border-b border-[var(--border-neutral-xx-weak)]" onClick={() => setExpandedCat(expandedCat === cat.name ? null : cat.name)}>
                  {cat.name}
                  <span>{expandedCat === cat.name ? "▲" : "▼"}</span>
                </button>
                {expandedCat === cat.name && cat.fields.map(f => (
                  <label key={f} className="flex items-center gap-2 px-4 py-1.5 text-xs text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer border-b border-[var(--border-neutral-xx-weak)]">
                    <input type="checkbox" checked={selectedFields.includes(f)} onChange={() => toggleField(f)} className="rounded" />
                    {f}
                  </label>
                ))}
              </div>
            ))}
          </div>

          <div>
            <div className="text-xs font-semibold text-[var(--text-neutral-medium)] uppercase tracking-wide mb-2">Saved Reports</div>
            <div className="flex flex-col gap-2">
              {savedReports.map(r => (
                <div key={r.name} className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-xx-weak)] p-3 cursor-pointer hover:bg-[var(--surface-neutral-xx-weak)]">
                  <div className="text-xs font-medium text-[var(--text-neutral-xx-strong)]">{r.name}</div>
                  <div className="text-xs text-[var(--text-neutral-weak)] mt-0.5">Last run {r.lastRun}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-neutral-xx-weak)]">
              <span className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">Report Preview</span>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs font-medium border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-xx-small)] text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)]">Export CSV</button>
                <button className="px-3 py-1.5 text-xs font-medium text-white rounded-[var(--radius-xx-small)]" style={{ background: "var(--color-primary-strong)" }}>Save Report</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border-neutral-xx-weak)]">
                    {selectedFields.map(f => (
                      <th key={f} className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide whitespace-nowrap">{f}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewRows.map((row, i) => (
                    <tr key={i} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)]">
                      {selectedFields.map(f => (
                        <td key={f} className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)] whitespace-nowrap">{(row as Record<string, string>)[f] || "—"}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2 border-t border-[var(--border-neutral-xx-weak)]">
              <span className="text-xs text-[var(--text-neutral-medium)]">Showing 4 of 847 records</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
