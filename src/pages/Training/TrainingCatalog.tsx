import React, { useState } from 'react';
import { HubHeader } from '../../components/HubHeader';

const metrics = [
  { label: "Compliance Rate", value: "91%", ringPercent: 91 },
  { label: "Overdue", value: "34" },
  { label: "Expiring Certs", value: "8" },
  { label: "Courses in Catalog", value: "47" },
];

const insights = [
  { text: "8 certifications expiring this month" },
  { text: "Security Awareness training completion at 87%" },
  { text: "3 new courses added this quarter" },
];

const courses = [
  { title: "Security Awareness Training", type: "Required", frequency: "Annual", audience: "All Employees", completion: 87 },
  { title: "Harassment Prevention", type: "Required", frequency: "Annual", audience: "All Employees", completion: 94 },
  { title: "HIPAA Compliance", type: "Required", frequency: "Biannual", audience: "HR, Legal", completion: 100 },
  { title: "Data Privacy & GDPR", type: "Required", frequency: "Annual", audience: "All Employees", completion: 78 },
  { title: "Workplace Safety", type: "Required", frequency: "Annual", audience: "All Employees", completion: 91 },
  { title: "Leadership Essentials", type: "Optional", frequency: "One-time", audience: "Managers", completion: 62 },
  { title: "Unconscious Bias", type: "Optional", frequency: "Annual", audience: "All Employees", completion: 55 },
  { title: "Financial Literacy", type: "Optional", frequency: "One-time", audience: "All Employees", completion: 34 },
  { title: "Excel Advanced", type: "Optional", frequency: "One-time", audience: "Finance, Ops", completion: 48 },
];

const tabs = ["All", "Required", "Optional", "My Assignments"];

function RingChart({ percent }: { percent: number }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width={44} height={44} viewBox="0 0 44 44">
      <circle cx={22} cy={22} r={r} fill="none" stroke="var(--border-neutral-x-weak)" strokeWidth={4} />
      <circle cx={22} cy={22} r={r} fill="none" stroke="var(--color-primary-medium)" strokeWidth={4}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 22 22)" />
      <text x={22} y={26} textAnchor="middle" fontSize={10} fontWeight={600} fill="var(--text-neutral-xx-strong)">{percent}%</text>
    </svg>
  );
}

export default function TrainingCatalog() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = courses.filter(c =>
    activeTab === "All" ? true :
    activeTab === "Required" ? c.type === "Required" :
    activeTab === "Optional" ? c.type === "Optional" :
    true
  );

  return (
    <div>
      <HubHeader product="Training" metrics={metrics} insights={insights} />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Catalog</h1>
            <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">47 courses across compliance, skills, and development</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
            + Add Course
          </button>
        </div>

        <div className="flex gap-0 border-b border-[var(--border-neutral-x-weak)] mb-4">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === t ? "border-[var(--color-primary-strong)] text-[var(--color-primary-strong)]" : "border-transparent text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)]"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filtered.map(c => (
            <div key={c.title} className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-4 hover:shadow-[var(--shadow-100)] transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 pr-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.type === "Required" ? "bg-red-50 text-red-700" : "bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]"}`}>
                    {c.type}
                  </span>
                </div>
                <RingChart percent={c.completion} />
              </div>
              <div className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] mb-1">{c.title}</div>
              <div className="text-xs text-[var(--text-neutral-medium)]">{c.frequency} &middot; {c.audience}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
