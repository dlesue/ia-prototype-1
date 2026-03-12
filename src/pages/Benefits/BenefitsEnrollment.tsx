import React from 'react';

const employees = [
  { name: "Jordan Kim", status: "Enrolled", plans: "Medical, Dental, Vision, 401k", updated: "Mar 1, 2026" },
  { name: "Alex Chen", status: "Enrolled", plans: "Medical, Dental, Vision, Life, 401k", updated: "Feb 28, 2026" },
  { name: "Maria Santos", status: "Pending", plans: "Medical", updated: "Mar 8, 2026" },
  { name: "James Brien", status: "Enrolled", plans: "Dental, Vision", updated: "Jan 15, 2026" },
  { name: "Priya Patel", status: "Not Started", plans: "—", updated: "—" },
  { name: "Marcus Williams", status: "Enrolled", plans: "Medical, Dental, 401k", updated: "Mar 3, 2026" },
  { name: "Sarah Chen", status: "Enrolled", plans: "Medical PPO, Dental, Vision, Life, HSA", updated: "Feb 20, 2026" },
  { name: "David Lee", status: "Waived", plans: "Dental only", updated: "Mar 5, 2026" },
];

export default function BenefitsEnrollment() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Enrollment</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Employee benefit enrollment status</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
          Manage Open Enrollment
        </button>
      </div>

      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">Open Enrollment 2026</div>
            <div className="text-xs text-[var(--text-neutral-medium)] mt-0.5">Closes Mar 31, 2026</div>
          </div>
          <span className="text-2xl font-bold text-[var(--color-primary-strong)]">94%</span>
        </div>
        <div className="h-2 bg-[var(--surface-neutral-x-weak)] rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: "94%", background: "var(--color-primary-strong)" }} />
        </div>
        <div className="flex justify-between text-xs text-[var(--text-neutral-medium)] mt-2">
          <span>797 of 847 employees enrolled</span>
          <span>50 remaining</span>
        </div>
      </div>

      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border-neutral-xx-weak)]">
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Name</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Status</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Plans Elected</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Last Updated</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(e => (
              <tr key={e.name} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "var(--color-primary-strong)" }}>
                      {e.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span className="text-sm font-medium text-[var(--text-neutral-xx-strong)]">{e.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    e.status === "Enrolled" ? "bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)]" :
                    e.status === "Pending" ? "bg-amber-50 text-amber-700" :
                    e.status === "Not Started" ? "bg-red-50 text-red-700" :
                    "bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]"
                  }`}>{e.status}</span>
                </td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)]">{e.plans}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{e.updated}</td>
                <td className="py-3 px-4">
                  <button className="text-xs text-[var(--color-primary-strong)] hover:underline">
                    {e.status === "Enrolled" ? "View" : "Send Reminder"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
