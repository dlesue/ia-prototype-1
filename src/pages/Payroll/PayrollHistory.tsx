import React, { useState } from 'react';

const runs = [
  { date: "Feb 28, 2026", schedule: "Bi-weekly", period: "Feb 15 - Feb 28", employees: 847, gross: "$2,134,200", taxes: "$534,050", net: "$1,600,150", status: "Complete" },
  { date: "Feb 14, 2026", schedule: "Bi-weekly", period: "Feb 1 - Feb 14", employees: 844, gross: "$2,126,800", taxes: "$531,700", net: "$1,595,100", status: "Complete" },
  { date: "Jan 31, 2026", schedule: "Bi-weekly", period: "Jan 17 - Jan 31", employees: 840, gross: "$2,118,400", taxes: "$529,600", net: "$1,588,800", status: "Complete" },
  { date: "Jan 15, 2026", schedule: "Bi-weekly", period: "Jan 1 - Jan 14", employees: 840, gross: "$2,118,400", taxes: "$529,600", net: "$1,588,800", status: "Complete" },
  { date: "Dec 31, 2025", schedule: "Bi-weekly", period: "Dec 17 - Dec 31", employees: 835, gross: "$2,105,900", taxes: "$526,475", net: "$1,579,425", status: "Complete" },
  { date: "Dec 15, 2025", schedule: "Bi-weekly", period: "Dec 1 - Dec 14", employees: 835, gross: "$2,105,900", taxes: "$526,475", net: "$1,579,425", status: "Complete" },
  { date: "Nov 30, 2025", schedule: "Bi-weekly", period: "Nov 17 - Nov 30", employees: 831, gross: "$2,094,200", taxa: "$523,550", net: "$1,570,650", status: "Complete" },
  { date: "Nov 14, 2025", schedule: "Bi-weekly", period: "Nov 1 - Nov 14", employees: 831, gross: "$2,094,200", taxes: "$523,550", net: "$1,570,650", status: "Complete" },
];

export default function PayrollHistory() {
  const [year, setYear] = useState("2026");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)]">Payroll History</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Past payroll runs and summaries</p>
        </div>
        <select value={year} onChange={e => setYear(e.target.value)} className="border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-xx-small)] px-3 py-1.5 text-sm bg-[var(--surface-neutral-white)] text-[var(--text-neutral-x-strong)] outline-none">
          <option>2026</option>
          <option>2025</option>
          <option>2024</option>
        </select>
      </div>
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border-neutral-xx-weak)]">
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Run Date</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Schedule</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Pay Period</th>
              <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Employees</th>
              <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Gross Pay</th>
              <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Taxes</th>
              <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Net Pay</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody>
            {runs.map(r => (
              <tr key={r.date} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer">
                <td className="py-3 px-4 text-sm font-medium text-[var(--text-neutral-xx-strong)]">{r.date}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)]">{r.schedule}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{r.period}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)] text-right">{r.employees}</td>
                <td className="py-3 px-4 text-sm font-medium text-[var(--text-neutral-xx-strong)] text-right">{r.gross}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)] text-right">{r.taxes}</td>
                <td className="py-3 px-4 text-sm font-medium text-[var(--text-neutral-xx-strong)] text-right">{r.net}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)]">{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
