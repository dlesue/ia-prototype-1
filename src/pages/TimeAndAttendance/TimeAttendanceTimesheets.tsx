import React from 'react';

const employees = [
  { name: "Jordan Kim", mon: 8, tue: 8, wed: 8, thu: 8, fri: 8, ot: false },
  { name: "Alex Chen", mon: 9, tue: 9.5, wed: 10, thu: 9, fri: 8.5, ot: true },
  { name: "Maria Santos", mon: 8, tue: 8, wed: 7.5, thu: 8, fri: 8, ot: false },
  { name: "Priya Patel", mon: 8, tue: 8, wed: 8, thu: 11, fri: 9, ot: true },
  { name: "Marcus Williams", mon: 8, tue: 8, wed: 8, thu: 8, fri: 8, ot: false },
];

const approvalQueue = [
  { employee: "Alex Chen", week: "Mar 9-13, 2026", total: "46h", ot: "6h", submitted: "Mar 13, 2026" },
  { employee: "Priya Patel", week: "Mar 9-13, 2026", total: "44h", ot: "4h", submitted: "Mar 13, 2026" },
];

export default function TimeAttendanceTimesheets() {
  return (
    <div>
      <div className="mx-6 mt-4 flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-[var(--radius-medium)]">
        <span className="text-amber-700 font-medium text-sm">&#9888; Timesheets require the Time Tracking add-on</span>
        <button className="ml-auto text-xs font-semibold text-amber-700 border border-amber-300 rounded px-2 py-1 hover:bg-amber-100 transition-colors">Learn More</button>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Timesheets</h1>
            <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Week of Mar 9-13, 2026</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-xx-small)] text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)]">&#8249; Prev</button>
            <button className="px-3 py-1.5 text-sm border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-xx-small)] text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)]">Next &#8250;</button>
          </div>
        </div>

        <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-neutral-xx-weak)]">
                <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Employee</th>
                <th className="text-center py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Mon 3/9</th>
                <th className="text-center py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Tue 3/10</th>
                <th className="text-center py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Wed 3/11</th>
                <th className="text-center py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Thu 3/12</th>
                <th className="text-center py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Fri 3/13</th>
                <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Total</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(e => {
                const total = e.mon + e.tue + e.wed + e.thu + e.fri;
                return (
                  <tr key={e.name} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)]">
                    <td className="py-3 px-4 text-sm font-medium text-[var(--text-neutral-xx-strong)]">{e.name}</td>
                    {[e.mon, e.tue, e.wed, e.thu, e.fri].map((h, i) => (
                      <td key={i} className={`py-3 px-4 text-sm text-center ${h > 8 ? "text-amber-600 font-semibold" : "text-[var(--text-neutral-x-strong)]"}`}>{h}h</td>
                    ))}
                    <td className={`py-3 px-4 text-sm font-semibold text-right ${e.ot ? "text-amber-600" : "text-[var(--text-neutral-xx-strong)]"}`}>{total}h{e.ot ? " OT" : ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div>
          <div className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] mb-3">Manager Approval Queue</div>
          <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-neutral-xx-weak)]">
                  <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Employee</th>
                  <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Week</th>
                  <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Total Hours</th>
                  <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Overtime</th>
                  <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Submitted</th>
                  <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {approvalQueue.map((a, i) => (
                  <tr key={i} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)]">
                    <td className="py-3 px-4 text-sm font-medium text-[var(--text-neutral-xx-strong)]">{a.employee}</td>
                    <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{a.week}</td>
                    <td className="py-3 px-4 text-sm font-medium text-[var(--text-neutral-xx-strong)] text-right">{a.total}</td>
                    <td className="py-3 px-4 text-sm font-medium text-amber-600 text-right">{a.ot}</td>
                    <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{a.submitted}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="px-2.5 py-1 rounded-[var(--radius-xx-small)] text-xs font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>Approve</button>
                        <button className="px-2.5 py-1 rounded-[var(--radius-xx-small)] text-xs font-medium border border-[var(--border-neutral-x-weak)] text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">Review</button>
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
  );
}
