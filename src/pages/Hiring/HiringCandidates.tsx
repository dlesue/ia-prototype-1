import React, { useState } from 'react';

const candidates = [
  { name: "Jordan Kim", job: "Senior Product Designer", stage: "Interview", rating: 4, activity: "Mar 10, 2026" },
  { name: "Alex Chen", job: "Staff Software Engineer", stage: "Offer", rating: 5, activity: "Mar 11, 2026" },
  { name: "Maria Santos", job: "HR Business Partner", stage: "Phone Screen", rating: 3, activity: "Mar 9, 2026" },
  { name: "James Brien", job: "Data Engineer", stage: "Applied", rating: 2, activity: "Mar 8, 2026" },
  { name: "Priya Patel", job: "Product Manager", stage: "Interview", rating: 5, activity: "Mar 11, 2026" },
  { name: "Marcus Williams", job: "Sales Development Rep", stage: "Hired", rating: 4, activity: "Mar 5, 2026" },
  { name: "Sarah Chen", job: "Staff Software Engineer", stage: "Rejected", rating: 2, activity: "Mar 3, 2026" },
  { name: "David Lee", job: "Finance Analyst", stage: "Phone Screen", rating: 3, activity: "Mar 7, 2026" },
  { name: "Emma Thompson", job: "Senior Product Designer", stage: "Applied", rating: 3, activity: "Mar 6, 2026" },
  { name: "Carlos Rivera", job: "Customer Success Manager", stage: "Offer", rating: 4, activity: "Mar 10, 2026" },
];

const stageColors: Record<string, string> = {
  Applied: "bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]",
  "Phone Screen": "bg-amber-50 text-amber-700",
  Interview: "px-2 py-0.5 rounded-full text-xs font-medium",
  Offer: "bg-purple-50 text-purple-700",
  Hired: "",
  Rejected: "bg-red-50 text-red-700",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <span key={s} className={s <= rating ? "text-amber-400" : "text-[var(--border-neutral-weak)]"}>&#9733;</span>
      ))}
    </div>
  );
}

export default function HiringCandidates() {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("All Stages");

  const filtered = candidates.filter(c =>
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.job.toLowerCase().includes(search.toLowerCase())) &&
    (stage === "All Stages" || c.stage === stage)
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)]">Candidates</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">847 total across all job openings</p>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="flex items-center gap-2 border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-xx-small)] px-3 py-1.5 bg-[var(--surface-neutral-white)] w-64">
          <span className="text-[var(--text-neutral-medium)] text-sm">&#128269;</span>
          <input type="text" placeholder="Search candidates..." value={search} onChange={e => setSearch(e.target.value)} className="border-none outline-none text-sm bg-transparent text-[var(--text-neutral-x-strong)] w-full placeholder:text-[var(--text-neutral-weak)]" />
        </div>
        <select value={stage} onChange={e => setStage(e.target.value)} className="border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-xx-small)] px-3 py-1.5 text-sm bg-[var(--surface-neutral-white)] text-[var(--text-neutral-x-strong)] outline-none">
          {["All Stages", "Applied", "Phone Screen", "Interview", "Offer", "Hired", "Rejected"].map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select className="border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-xx-small)] px-3 py-1.5 text-sm bg-[var(--surface-neutral-white)] text-[var(--text-neutral-x-strong)] outline-none">
          <option>All Dates</option>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border-neutral-xx-weak)]">
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Name</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Job Applied For</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Stage</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Rating</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.name + c.job} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "var(--color-primary-strong)" }}>
                      {c.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span className="text-sm font-medium text-[var(--text-neutral-xx-strong)]">{c.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)]">{c.job}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    c.stage === "Hired" ? "bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)]" :
                    c.stage === "Rejected" ? "bg-red-50 text-red-700" :
                    c.stage === "Offer" ? "bg-purple-50 text-purple-700" :
                    c.stage === "Interview" ? "bg-blue-50 text-blue-700" :
                    c.stage === "Phone Screen" ? "bg-amber-50 text-amber-700" :
                    "bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]"
                  }`}>{c.stage}</span>
                </td>
                <td className="py-3 px-4"><StarRating rating={c.rating} /></td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{c.activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
