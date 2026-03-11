import React from 'react';

const teams = [
  { name: "Platform Migration", lead: "Alex Chen", members: 12, purpose: "Migrate core infrastructure to new cloud platform", created: "Jan 10, 2026" },
  { name: "Q2 Launch", lead: "Jordan Kim", members: 8, purpose: "Coordinate cross-functional Q2 product launch", created: "Feb 1, 2026" },
  { name: "AI Pilot", lead: "Priya Patel", members: 6, purpose: "Pilot AI-assisted workflows across product teams", created: "Feb 15, 2026" },
  { name: "Customer Advisory", lead: "Carlos Rivera", members: 15, purpose: "Engage key customers for product feedback and roadmap input", created: "Nov 5, 2025" },
  { name: "Onboarding Refresh", lead: "Emma Thompson", members: 4, purpose: "Redesign new hire onboarding experience for 2026", created: "Mar 1, 2026" },
];

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase();
}

export default function PeopleTeams() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)]">Teams</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Cross-functional project and initiative teams</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
          + New Team
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {teams.map(t => (
          <div key={t.name} className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-4 flex items-center gap-4 hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer transition-colors">
            <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-sm font-bold text-white" style={{ background: "var(--color-primary-strong)" }}>
              {getInitials(t.lead)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">{t.name}</span>
              </div>
              <p className="text-xs text-[var(--text-neutral-medium)] truncate">{t.purpose}</p>
              <p className="text-xs text-[var(--text-neutral-weak)] mt-0.5">Lead: {t.lead} &middot; Created {t.created}</p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: "var(--color-primary-weak)", color: "var(--color-primary-strong)" }}>
                {t.members} members
              </span>
              <button className="text-sm text-[var(--color-primary-strong)] font-medium hover:underline">View Team</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
