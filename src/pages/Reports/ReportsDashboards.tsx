import React from 'react';

const savedDashboards = [
  { name: "HR Overview", description: "Key HR metrics at a glance", lastUpdated: "Mar 11, 2026" },
  { name: "Hiring Pipeline", description: "Recruiting funnel and time-to-hire trends", lastUpdated: "Mar 10, 2026" },
  { name: "Payroll & Comp", description: "Payroll costs, comp distribution, and budget tracking", lastUpdated: "Mar 8, 2026" },
];

function MiniBarChart() {
  const data = [62, 68, 71, 74, 79, 82, 85, 87];
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-0.5 h-8">
      {data.map((v, i) => (
        <div key={i} className="flex-1 rounded-sm" style={{ height: `${(v / max) * 100}%`, background: "var(--color-primary-medium)", opacity: i === data.length - 1 ? 1 : 0.5 }} />
      ))}
    </div>
  );
}

function MiniLineChart({ color = "var(--color-primary-medium)" }: { color?: string }) {
  const data = [78, 80, 79, 82, 81, 84];
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ReportsDashboards() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)]">Dashboards</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Visual HR metrics and KPI dashboards</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
          + New Dashboard
        </button>
      </div>

      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-large)] border border-[var(--border-neutral-xx-weak)] p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">HR Overview</span>
          <span className="text-xs text-[var(--text-neutral-medium)]">Updated Mar 11, 2026</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-medium)] p-4">
            <div className="text-xs text-[var(--text-neutral-medium)] uppercase tracking-wide font-medium mb-1">Total Headcount</div>
            <div className="text-3xl font-bold text-[var(--text-neutral-xx-strong)] mb-1">847</div>
            <div className="text-xs text-emerald-600 font-medium mb-2">&#8593; +12 vs last month</div>
            <MiniBarChart />
          </div>
          <div className="bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-medium)] p-4">
            <div className="text-xs text-[var(--text-neutral-medium)] uppercase tracking-wide font-medium mb-1">Annual Turnover Rate</div>
            <div className="text-3xl font-bold text-[var(--text-neutral-xx-strong)] mb-1">8.2%</div>
            <div className="text-xs text-[var(--text-neutral-medium)] font-medium mb-2">&#8594; Stable</div>
            <MiniLineChart />
          </div>
          <div className="bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-medium)] p-4">
            <div className="text-xs text-[var(--text-neutral-medium)] uppercase tracking-wide font-medium mb-1">Time-to-Hire</div>
            <div className="text-3xl font-bold text-[var(--text-neutral-xx-strong)] mb-1">34 days</div>
            <div className="text-xs text-emerald-600 font-medium mb-2">&#8595; -3 days vs last quarter</div>
            <MiniLineChart color="#10b981" />
          </div>
          <div className="bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-medium)] p-4">
            <div className="text-xs text-[var(--text-neutral-medium)] uppercase tracking-wide font-medium mb-1">eNPS</div>
            <div className="text-3xl font-bold text-[var(--text-neutral-xx-strong)] mb-1">+42</div>
            <div className="text-xs text-emerald-600 font-medium mb-2">&#8593; +5 vs last quarter</div>
            <MiniLineChart color="#6366f1" />
          </div>
        </div>
      </div>

      <div>
        <div className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] mb-3">My Saved Dashboards</div>
        <div className="flex flex-col gap-2">
          {savedDashboards.map(d => (
            <div key={d.name} className="flex items-center gap-4 bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] px-4 py-3 hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer transition-colors">
              <div className="w-8 h-8 rounded-[var(--radius-small)] flex items-center justify-center shrink-0" style={{ background: "var(--color-primary-weak)" }}>
                <span>&#128202;</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-[var(--text-neutral-xx-strong)]">{d.name}</div>
                <div className="text-xs text-[var(--text-neutral-medium)]">{d.description}</div>
              </div>
              <div className="text-xs text-[var(--text-neutral-weak)]">Updated {d.lastUpdated}</div>
              <button className="text-xs text-[var(--color-primary-strong)] hover:underline">Open</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
