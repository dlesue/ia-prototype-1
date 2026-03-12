import React, { useState } from 'react';
import { HubHeader } from '../../components/HubHeader';

const metrics = [
  { label: "Total Files", value: "1,247" },
  { label: "Pending Signatures", value: "8" },
  { label: "Storage", value: "4.2 GB" },
  { label: "Shared Docs", value: "342" },
];

const insights = [
  { text: "8 employees haven’t signed the updated handbook" },
  { text: "4 new documents uploaded this week" },
  { text: "Storage approaching 50% of limit" },
];

const categories = ["All Files", "Hiring", "Benefits", "Onboarding", "Company Policies", "Custom"];

const files = [
  { name: "Employee Handbook 2026.pdf", category: "Company Policies", size: "2.4 MB", uploadedBy: "Maria Santos", date: "Mar 1, 2026", access: "All Employees" },
  { name: "Benefits Guide 2026.pdf", category: "Benefits", size: "1.8 MB", uploadedBy: "Jordan Kim", date: "Feb 15, 2026", access: "All Employees" },
  { name: "Onboarding Checklist.docx", category: "Onboarding", size: "145 KB", uploadedBy: "Maria Santos", date: "Jan 10, 2026", access: "HR Only" },
  { name: "Offer Letter Template.docx", category: "Hiring", size: "98 KB", uploadedBy: "Alex Chen", date: "Jan 5, 2026", access: "Managers" },
  { name: "NDA Template.pdf", category: "Hiring", size: "320 KB", uploadedBy: "David Lee", date: "Dec 15, 2025", access: "HR Only" },
  { name: "Code of Conduct.pdf", category: "Company Policies", size: "890 KB", uploadedBy: "Maria Santos", date: "Nov 20, 2025", access: "All Employees" },
  { name: "Remote Work Policy.pdf", category: "Company Policies", size: "210 KB", uploadedBy: "Maria Santos", date: "Oct 1, 2025", access: "All Employees" },
  { name: "Performance Review Template.docx", category: "Custom", size: "78 KB", uploadedBy: "Priya Patel", date: "Mar 5, 2026", access: "Managers" },
];

export default function FilesAll() {
  const [activeCategory, setActiveCategory] = useState("All Files");

  const filtered = activeCategory === "All Files" ? files : files.filter(f => f.category === activeCategory);

  return (
    <div>
      <HubHeader product="Files" metrics={metrics} insights={insights} />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">All Files</h1>
            <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">1,247 files across all categories</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
            Upload File
          </button>
        </div>

        <div className="flex gap-4">
          <div className="w-44 shrink-0">
            <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`w-full text-left px-3 py-2.5 text-sm transition-colors border-b border-[var(--border-neutral-xx-weak)] last:border-0 ${activeCategory === cat ? "font-semibold text-white" : "text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)]"}`} style={activeCategory === cat ? { background: "var(--color-primary-strong)" } : {}}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border-neutral-xx-weak)]">
                    <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Name</th>
                    <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Category</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Size</th>
                    <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Uploaded By</th>
                    <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Date</th>
                    <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Access</th>
                    <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(f => (
                    <tr key={f.name} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{f.name.endsWith(".pdf") ? "&#128196;" : "&#128209;"}</span>
                          <span className="text-sm font-medium text-[var(--text-neutral-xx-strong)]">{f.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]">{f.category}</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)] text-right">{f.size}</td>
                      <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)]">{f.uploadedBy}</td>
                      <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{f.date}</td>
                      <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{f.access}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="text-xs text-[var(--color-primary-strong)] hover:underline">Download</button>
                          <button className="text-xs text-[var(--text-neutral-medium)] hover:underline">Share</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
