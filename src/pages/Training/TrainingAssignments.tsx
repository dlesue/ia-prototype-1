import React, { useState } from 'react';

const assignments = [
  { employee: "Jordan Kim", training: "Security Awareness Training", dept: "Product", status: "Completed", due: "Mar 31, 2026", completed: "Mar 5, 2026" },
  { employee: "Alex Chen", training: "Harassment Prevention", dept: "Engineering", status: "In Progress", due: "Mar 31, 2026", completed: "—" },
  { employee: "Maria Santos", training: "HIPAA Compliance", dept: "People Ops", status: "Completed", due: "Mar 15, 2026", completed: "Mar 10, 2026" },
  { employee: "James Brien", training: "Data Privacy & GDPR", dept: "Engineering", status: "Overdue", due: "Feb 28, 2026", completed: "—" },
  { employee: "Priya Patel", training: "Security Awareness Training", dept: "Product", status: "Completed", due: "Mar 31, 2026", completed: "Mar 8, 2026" },
  { employee: "Marcus Williams", training: "Workplace Safety", dept: "Sales", status: "In Progress", due: "Mar 31, 2026", completed: "—" },
  { employee: "Sarah Chen", training: "Leadership Essentials", dept: "Engineering", status: "Completed", due: "Mar 31, 2026", completed: "Mar 6, 2026" },
  { employee: "David Lee", training: "Financial Literacy", dept: "Finance", status: "Overdue", due: "Feb 15, 2026", completed: "—" },
  { employee: "Emma Thompson", training: "Harassment Prevention", dept: "Product", status: "Completed", due: "Mar 31, 2026", completed: "Mar 7, 2026" },
  { employee: "Carlos Rivera", training: "Data Privacy & GDPR", dept: "Customer Success", status: "Overdue", due: "Mar 1, 2026", completed: "—" },
  { employee: "Aisha Johnson", training: "Unconscious Bias", dept: "People Ops", status: "In Progress", due: "Mar 31, 2026", completed: "—" },
  { employee: "Tyler Brooks", training: "Security Awareness Training", dept: "Engineering", status: "Completed", due: "Mar 31, 2026", completed: "Mar 11, 2026" },
];

export default function TrainingAssignments() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All Departments");
  const [status, setStatus] = useState("All");

  const filtered = assignments.filter(a =>
    (a.employee.toLowerCase().includes(search.toLowerCase()) || a.training.toLowerCase().includes(search.toLowerCase())) &&
    (dept === "All Departments" || a.dept === dept) &&
    (status === "All" || a.status === status)
  );

  const depts = ["All Departments", ...Array.from(new Set(assignments.map(a => a.dept)))];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Assignments</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Training assignments across all employees</p>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="flex items-center gap-2 border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-xx-small)] px-3 py-1.5 bg-[var(--surface-neutral-white)] w-56">
          <span className="text-[var(--text-neutral-medium)] text-xs">&#128269;</span>
          <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="border-none outline-none text-sm bg-transparent text-[var(--text-neutral-x-strong)] w-full placeholder:text-[var(--text-neutral-weak)]" />
        </div>
        <select value={dept} onChange={e => setDept(e.target.value)} className="border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-xx-small)] px-3 py-1.5 text-sm bg-[var(--surface-neutral-white)] text-[var(--text-neutral-x-strong)] outline-none">
          {depts.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)} className="border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-xx-small)] px-3 py-1.5 text-sm bg-[var(--surface-neutral-white)] text-[var(--text-neutral-x-strong)] outline-none">
          {["All", "Completed", "In Progress", "Overdue"].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border-neutral-xx-weak)]">
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Employee</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Training</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Department</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Status</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Due Date</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Completion Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <tr key={i} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)]">
                <td className="py-3 px-4 text-sm font-medium text-[var(--text-neutral-xx-strong)]">{a.employee}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)]">{a.training}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{a.dept}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    a.status === "Completed" ? "bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)]" :
                    a.status === "In Progress" ? "bg-amber-50 text-amber-700" :
                    "bg-red-50 text-red-700"
                  }`}>{a.status}</span>
                </td>
                <td className={`py-3 px-4 text-sm ${a.status === "Overdue" ? "text-red-600 font-medium" : "text-[var(--text-neutral-medium)]"}`}>{a.due}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{a.completed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
