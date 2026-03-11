import React from 'react';

const pools = [
  { name: "Engineering", count: 45, updated: "Mar 8, 2026" },
  { name: "Product", count: 23, updated: "Mar 5, 2026" },
  { name: "Design", count: 18, updated: "Feb 28, 2026" },
  { name: "Sales", count: 67, updated: "Mar 10, 2026" },
  { name: "Finance", count: 12, updated: "Feb 15, 2026" },
  { name: "Marketing", count: 31, updated: "Mar 7, 2026" },
];

export default function HiringTalentPools() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)]">Talent Pools</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Curated groups of candidates for future openings</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
          + New Pool
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {pools.map(p => (
          <div key={p.name} className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-5 hover:shadow-[var(--shadow-100)] transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">{p.name}</span>
              <button className="text-xs text-[var(--color-primary-strong)] font-medium hover:underline">+ Add Candidates</button>
            </div>
            <div className="text-4xl font-bold text-[var(--text-neutral-xx-strong)] mb-1">{p.count}</div>
            <div className="text-xs text-[var(--text-neutral-medium)]">candidates</div>
            <div className="mt-3 pt-3 border-t border-[var(--border-neutral-xx-weak)] text-xs text-[var(--text-neutral-weak)]">
              Updated {p.updated}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
