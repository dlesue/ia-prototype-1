import React from 'react';

const feedbackItems = [
  { giver: "Alex Chen", recipient: "Jordan Kim", date: "Mar 10, 2026", type: "Peer", status: "Completed" },
  { giver: "Maria Santos", recipient: "Sarah Chen", date: "Mar 9, 2026", type: "Upward", status: "Completed" },
  { giver: "Priya Patel", recipient: "Marcus Williams", date: "Mar 8, 2026", type: "Peer", status: "Pending" },
  { giver: "Carlos Rivera", recipient: "David Lee", date: "Mar 7, 2026", type: "Downward", status: "Completed" },
  { giver: "Emma Thompson", recipient: "Tyler Brooks", date: "Mar 6, 2026", type: "Peer", status: "Completed" },
  { giver: "James Brien", recipient: "Aisha Johnson", date: "Mar 5, 2026", type: "Upward", status: "Pending" },
];

export default function PerformanceFeedback() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)]">Feedback</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Peer, upward, and downward feedback requests</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
          Request Feedback
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Requests Sent", value: "47" },
          { label: "Responses Received", value: "38" },
          { label: "Response Rate", value: "81%" },
        ].map(s => (
          <div key={s.label} className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-4">
            <div className="text-xs text-[var(--text-neutral-medium)] uppercase tracking-wide font-medium mb-1">{s.label}</div>
            <div className="text-2xl font-bold text-[var(--text-neutral-xx-strong)]">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {feedbackItems.map((f, i) => (
          <div key={i} className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-4 flex items-center gap-4 hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer transition-colors">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "var(--color-primary-strong)" }}>
                {f.giver.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <span className="text-sm text-[var(--text-neutral-x-strong)]">{f.giver}</span>
                <span className="text-sm text-[var(--text-neutral-medium)]"> gave feedback to </span>
                <span className="text-sm font-medium text-[var(--text-neutral-xx-strong)]">{f.recipient}</span>
              </div>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              f.type === "Peer" ? "bg-blue-50 text-blue-700" :
              f.type === "Upward" ? "bg-purple-50 text-purple-700" :
              "bg-amber-50 text-amber-700"
            }`}>{f.type}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${f.status === "Completed" ? "bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)]" : "bg-amber-50 text-amber-700"}`}>
              {f.status}
            </span>
            <span className="text-xs text-[var(--text-neutral-weak)]">{f.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
