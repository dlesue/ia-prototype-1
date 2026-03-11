import React from 'react';

const recognitions = [
  { giver: "Alex Chen", recipient: "Jordan Kim", value: "Innovation", message: "Jordan completely transformed our design system tooling. The new component library has already saved the team dozens of hours every sprint.", date: "Mar 11, 2026" },
  { giver: "Maria Santos", recipient: "Tyler Brooks", value: "Teamwork", message: "Tyler stepped up during a critical incident last week and helped the whole team stay coordinated. Real team player.", date: "Mar 10, 2026" },
  { giver: "Priya Patel", recipient: "Sarah Chen", value: "Excellence", message: "Sarah delivered a flawless migration with zero downtime. Incredible technical work and attention to detail.", date: "Mar 10, 2026" },
  { giver: "Carlos Rivera", recipient: "Aisha Johnson", value: "Customer Focus", message: "Aisha went above and beyond to resolve a major customer issue over the weekend. The customer sent us a glowing note.", date: "Mar 9, 2026" },
  { giver: "Emma Thompson", recipient: "Marcus Williams", value: "Integrity", message: "Marcus flagged a billing error that would have overcharged a customer. Doing the right thing even when no one is watching.", date: "Mar 8, 2026" },
];

const valueColors: Record<string, string> = {
  Innovation: "bg-purple-50 text-purple-700",
  Teamwork: "bg-blue-50 text-blue-700",
  Excellence: "bg-amber-50 text-amber-700",
  "Customer Focus": "bg-teal-50 text-teal-700",
  Integrity: "bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)]",
};

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase();
}

export default function CultureRecognition() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)]">Recognition</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Celebrate your team\u2019s wins and values</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
          Give Recognition
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Given This Month", value: "847" },
          { label: "Received This Month", value: "812" },
          { label: "Most Recognized Value", value: "Innovation" },
        ].map(s => (
          <div key={s.label} className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-4">
            <div className="text-xs text-[var(--text-neutral-medium)] uppercase tracking-wide font-medium mb-1">{s.label}</div>
            <div className="text-xl font-bold text-[var(--text-neutral-xx-strong)]">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 max-w-2xl">
        {recognitions.map((r, i) => (
          <div key={i} className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "var(--color-primary-strong)" }}>
                  {getInitials(r.giver)}
                </div>
                <div className="text-sm text-[var(--text-neutral-x-strong)]">
                  <span className="font-semibold">{r.giver}</span>
                  <span className="text-[var(--text-neutral-medium)]"> recognized </span>
                  <span className="font-semibold">{r.recipient}</span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${valueColors[r.value] || "bg-gray-50 text-gray-700"}`}>{r.value}</span>
            </div>
            <p className="text-sm text-[var(--text-neutral-x-strong)] leading-relaxed italic mb-2">&ldquo;{r.message}&rdquo;</p>
            <div className="text-xs text-[var(--text-neutral-weak)]">{r.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
