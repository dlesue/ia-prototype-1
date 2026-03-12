import React, { useState } from 'react';

const categories = [
  {
    name: "HR",
    templates: [
      { name: "Benefits Enrollment", tasks: 5, departments: "All", required: true },
      { name: "Policy Acknowledgment", tasks: 8, departments: "All", required: true },
      { name: "Emergency Contact Form", tasks: 2, departments: "All", required: true },
      { name: "Handbook Review", tasks: 3, departments: "All", required: false },
    ],
  },
  {
    name: "IT",
    templates: [
      { name: "Laptop Setup", tasks: 6, departments: "Engineering, Product", required: true },
      { name: "Software Access", tasks: 12, departments: "All", required: true },
      { name: "Security Training", tasks: 4, departments: "All", required: true },
    ],
  },
  {
    name: "Manager",
    templates: [
      { name: "30-Day Check-in", tasks: 3, departments: "All", required: true },
      { name: "60-Day Check-in", tasks: 3, departments: "All", required: true },
      { name: "90-Day Review", tasks: 5, departments: "All", required: true },
      { name: "Team Introduction", tasks: 2, departments: "All", required: false },
      { name: "Goal Setting", tasks: 4, departments: "All", required: false },
    ],
  },
  {
    name: "Paperwork",
    templates: [
      { name: "I-9 Verification", tasks: 3, departments: "All", required: true },
      { name: "W-4 Withholding", tasks: 2, departments: "All", required: true },
      { name: "Direct Deposit Setup", tasks: 3, departments: "All", required: true },
      { name: "NDA Signing", tasks: 1, departments: "All", required: true },
      { name: "Offer Letter Acknowledgment", tasks: 1, departments: "All", required: true },
      { name: "Background Check Authorization", tasks: 2, departments: "All", required: false },
    ],
  },
];

export default function OnboardingTaskTemplates() {
  const [expanded, setExpanded] = useState<string[]>(["HR"]);

  const toggle = (name: string) => {
    setExpanded(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Task Templates</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Reusable task checklists for onboarding workflows</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
          + New Template
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {categories.map(cat => (
          <div key={cat.name} className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
            <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-[var(--surface-neutral-xx-weak)] transition-colors" onClick={() => toggle(cat.name)}>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">{cat.name}</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]">{cat.templates.length} templates</span>
              </div>
              <span className="text-[var(--text-neutral-medium)]">{expanded.includes(cat.name) ? "▲" : "▼"}</span>
            </button>
            {expanded.includes(cat.name) && (
              <div className="border-t border-[var(--border-neutral-xx-weak)]">
                {cat.templates.map((t, i) => (
                  <div key={t.name} className={`flex items-center gap-4 px-4 py-3 hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer ${i < cat.templates.length - 1 ? "border-b border-[var(--border-neutral-xx-weak)]" : ""}`}>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[var(--text-neutral-xx-strong)]">{t.name}</div>
                      <div className="text-xs text-[var(--text-neutral-medium)] mt-0.5">{t.tasks} tasks &middot; {t.departments}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${t.required ? "bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)]" : "bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]"}`}>
                      {t.required ? "Required" : "Optional"}
                    </span>
                    <button className="text-xs text-[var(--color-primary-strong)] hover:underline">Edit</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
