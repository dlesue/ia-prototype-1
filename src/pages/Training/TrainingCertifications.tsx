import React from 'react';

const certifications = [
  { employee: "Jordan Kim", cert: "AWS Solutions Architect", issued: "Mar 15, 2024", expiry: "Mar 15, 2026", status: "Expiring" },
  { employee: "Alex Chen", cert: "Google Cloud Professional", issued: "Apr 1, 2024", expiry: "Apr 1, 2026", status: "Expiring" },
  { employee: "Maria Santos", cert: "SHRM-CP", issued: "Jun 1, 2023", expiry: "Jun 1, 2026", status: "Active" },
  { employee: "James Brien", cert: "PMP Certification", issued: "Jan 10, 2022", expiry: "Jan 10, 2025", status: "Expired" },
  { employee: "Priya Patel", cert: "Certified Scrum Master", issued: "May 5, 2023", expiry: "May 5, 2025", status: "Expired" },
  { employee: "Marcus Williams", cert: "Salesforce Admin", issued: "Mar 20, 2024", expiry: "Mar 20, 2026", status: "Expiring" },
  { employee: "Sarah Chen", cert: "CISSP Security", issued: "Sep 15, 2023", expiry: "Sep 15, 2026", status: "Active" },
  { employee: "David Lee", cert: "CPA License", issued: "Jul 1, 2022", expiry: "Jul 1, 2027", status: "Active" },
  { employee: "Emma Thompson", cert: "Six Sigma Green Belt", issued: "Feb 28, 2024", expiry: "Feb 28, 2027", status: "Active" },
  { employee: "Carlos Rivera", cert: "ITIL Foundation", issued: "Mar 5, 2024", expiry: "Mar 5, 2026", status: "Expiring" },
];

export default function TrainingCertifications() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Certifications</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Employee certification tracking and renewal management</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
          + Add Certification
        </button>
      </div>

      <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-[var(--radius-medium)] mb-4">
        <span className="text-amber-600 text-sm font-medium">&#9888; 8 certifications expiring in the next 30 days</span>
        <button className="ml-auto text-xs text-amber-700 font-medium hover:underline">Send Renewal Reminders</button>
      </div>

      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border-neutral-xx-weak)]">
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Employee</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Certification</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Issue Date</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Expiry Date</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody>
            {certifications.map((c, i) => (
              <tr key={i} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer">
                <td className="py-3 px-4 text-sm font-medium text-[var(--text-neutral-xx-strong)]">{c.employee}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)]">{c.cert}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{c.issued}</td>
                <td className={`py-3 px-4 text-sm ${c.status === "Expired" ? "text-red-600 font-medium" : c.status === "Expiring" ? "text-amber-600 font-medium" : "text-[var(--text-neutral-medium)]"}`}>{c.expiry}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    c.status === "Active" ? "bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)]" :
                    c.status === "Expiring" ? "bg-amber-50 text-amber-700" :
                    "bg-red-50 text-red-700"
                  }`}>{c.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
