import React, { useState } from 'react';
import { HubHeader } from '../../components/HubHeader';

const metrics = [
  { label: "Review Completion", value: "84%" },
  { label: "Goal Attainment", value: "71%", ringPercent: 71 },
  { label: "1:1 Coverage", value: "78%" },
  { label: "OKR Alignment", value: "65%" },
];

const insights = [
  { text: "Q1 review cycle closes in 12 days" },
  { text: "Product Design has 3 goals marked At Risk" },
  { text: "1:1 frequency has dropped 15% in Engineering" },
];

const okrs = [
  {
    title: "Grow ARR to $50M by end of FY2026",
    status: "On Track",
    progress: 67,
    children: [
      { title: "Launch 3 new enterprise features", status: "On Track", progress: 72, owner: "Product" },
      { title: "Reduce churn to <5%", status: "At Risk", progress: 45, owner: "Customer Success" },
    ],
  },
  {
    title: "Achieve 90% employee engagement score",
    status: "At Risk",
    progress: 61,
    children: [
      { title: "Complete Q1 engagement survey", status: "At Risk", progress: 47, owner: "People Ops" },
    ],
  },
  {
    title: "Expand to 3 new markets",
    status: "Behind",
    progress: 33,
    children: [
      { title: "Launch EMEA pilot program", status: "Behind", progress: 20, owner: "Sales" },
    ],
  },
];

function statusBadge(status: string) {
  const cls =
    status === "On Track" ? "bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)]" :
    status === "At Risk" ? "bg-amber-50 text-amber-700" :
    "bg-red-50 text-red-700";
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>{status}</span>;
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2 flex-1">
      <div className="flex-1 h-1.5 bg-[var(--surface-neutral-x-weak)] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{
          width: `${value}%`,
          background: value >= 70 ? "var(--color-primary-strong)" : value >= 50 ? "#f59e0b" : "#dc2626"
        }} />
      </div>
      <span className="text-xs text-[var(--text-neutral-medium)] w-8">{value}%</span>
    </div>
  );
}

export default function PerformanceHub() {
  const [view, setView] = useState("Hierarchy");
  const [expanded, setExpanded] = useState<number[]>([0, 1, 2]);

  const toggleOkr = (i: number) => {
    setExpanded(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  return (
    <div>
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)]">Performance</h1>
      </div>
      <HubHeader product="Performance" metrics={metrics} insights={insights} />
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold text-[var(--text-neutral-xx-strong)] mb-4">Goals &amp; OKRs</h2>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Company, team, and individual objectives</p>
          <div className="flex items-center gap-3">
            <div className="flex gap-0 border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-xx-small)] overflow-hidden">
              {["Hierarchy", "List", "My Goals"].map(v => (
                <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 text-xs font-medium transition-colors ${view === v ? "text-white" : "text-[var(--text-neutral-medium)] hover:bg-[var(--surface-neutral-xx-weak)]"}`} style={view === v ? { background: "var(--color-primary-strong)" } : {}}>
                  {v}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
              + New Goal
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {okrs.map((okr, i) => (
            <div key={i} className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
              <button className="w-full flex items-center gap-4 px-4 py-3 hover:bg-[var(--surface-neutral-xx-weak)] transition-colors text-left" onClick={() => toggleOkr(i)}>
                <span className="text-[var(--text-neutral-medium)] text-xs">{expanded.includes(i) ? "▼" : "▶"}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] truncate">{okr.title}</div>
                  <div className="text-xs text-[var(--text-neutral-medium)] mt-0.5">Company OKR &middot; FY2026</div>
                </div>
                <ProgressBar value={okr.progress} />
                {statusBadge(okr.status)}
              </button>
              {expanded.includes(i) && okr.children.map((child, j) => (
                <div key={j} className="flex items-center gap-4 px-4 py-2.5 border-t border-[var(--border-neutral-xx-weak)] bg-[var(--surface-neutral-xx-weak)] pl-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--border-neutral-weak)] shrink-0 ml-1" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-[var(--text-neutral-x-strong)] truncate">{child.title}</div>
                    <div className="text-xs text-[var(--text-neutral-medium)] mt-0.5">Team Goal &middot; {child.owner}</div>
                  </div>
                  <ProgressBar value={child.progress} />
                  {statusBadge(child.status)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
