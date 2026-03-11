import React, { useState } from 'react';
import { HubHeader } from '../../components/HubHeader';

const metrics = [
  { label: "PTO Utilization", value: "67%" },
  { label: "Pending Requests", value: "12" },
  { label: "Overtime (MTD)", value: "234h" },
  { label: "Approval Time", value: "1.2 days" },
];

const insights = [
  { text: "12 time-off requests pending for more than 3 days" },
  { text: "PTO utilization lower than last year" },
  { text: "March has 3 holidays" },
];

const timeOffBlocks = [
  { day: 9, name: "Jordan K.", type: "Vacation", color: "#16a34a" },
  { day: 10, name: "Jordan K.", type: "Vacation", color: "#16a34a" },
  { day: 11, name: "Jordan K.", type: "Vacation", color: "#16a34a" },
  { day: 9, name: "Alex C.", type: "Sick", color: "#2563eb" },
  { day: 13, name: "Maria S.", type: "Personal", color: "#7c3aed" },
  { day: 17, name: "St. Patrick", type: "Holiday", color: "#d97706" },
  { day: 16, name: "Priya P.", type: "Vacation", color: "#16a34a" },
  { day: 17, name: "Priya P.", type: "Vacation", color: "#16a34a" },
  { day: 18, name: "Priya P.", type: "Vacation", color: "#16a34a" },
  { day: 20, name: "Marcus W.", type: "Sick", color: "#2563eb" },
  { day: 25, name: "Tyler B.", type: "Vacation", color: "#16a34a" },
  { day: 26, name: "Tyler B.", type: "Vacation", color: "#16a34a" },
  { day: 27, name: "Tyler B.", type: "Vacation", color: "#16a34a" },
  { day: 31, name: "Sarah C.", type: "Personal", color: "#7c3aed" },
];

const march2026 = Array.from({ length: 31 }, (_, i) => i + 1);

export default function TimeAttendanceHub() {
  const [viewMode, setViewMode] = useState("Month");

  const getBlocksForDay = (day: number) => timeOffBlocks.filter(b => b.day === day);

  return (
    <div>
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)]">Time &amp; Attendance</h1>
      </div>
      <HubHeader product="Time & Attendance" metrics={metrics} insights={insights} />
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold text-[var(--text-neutral-xx-strong)] mb-4">Calendar</h2>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Team time-off and attendance overview</p>
          <div className="flex items-center gap-3">
            <div className="flex gap-0 border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-xx-small)] overflow-hidden">
              {["Week", "Month"].map(v => (
                <button key={v} onClick={() => setViewMode(v)} className={`px-3 py-1.5 text-xs font-medium transition-colors ${viewMode === v ? "text-white" : "text-[var(--text-neutral-medium)] hover:bg-[var(--surface-neutral-xx-weak)]"}`} style={viewMode === v ? { background: "var(--color-primary-strong)" } : {}}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-3">
          {[
            { type: "Vacation", color: "#16a34a" },
            { type: "Sick", color: "#2563eb" },
            { type: "Holiday", color: "#d97706" },
            { type: "Personal", color: "#7c3aed" },
          ].map(l => (
            <div key={l.type} className="flex items-center gap-1.5 text-xs text-[var(--text-neutral-medium)]">
              <span className="w-3 h-3 rounded-sm inline-block" style={{ background: l.color }} />
              {l.type}
            </div>
          ))}
        </div>

        <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-4">
          <div className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] mb-3 text-center">March 2026</div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
              <div key={d} className="text-center text-xs font-medium text-[var(--text-neutral-medium)] py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {march2026.map(day => {
              const blocks = getBlocksForDay(day);
              const isToday = day === 11;
              return (
                <div key={day} className={`min-h-16 rounded-[var(--radius-small)] p-1 cursor-pointer transition-colors ${isToday ? "border-2" : "border border-transparent hover:bg-[var(--surface-neutral-xx-weak)]"}`} style={isToday ? { borderColor: "var(--color-primary-strong)" } : {}}>
                  <div className={`text-xs font-medium mb-1 ${isToday ? "text-[var(--color-primary-strong)]" : "text-[var(--text-neutral-x-strong)]"}`}>{day}</div>
                  <div className="flex flex-col gap-0.5">
                    {blocks.slice(0, 2).map((b, bi) => (
                      <div key={bi} className="text-white text-xs rounded px-1 truncate" style={{ background: b.color, fontSize: "9px" }}>
                        {b.name}
                      </div>
                    ))}
                    {blocks.length > 2 && <div className="text-xs text-[var(--text-neutral-medium)]" style={{ fontSize: "9px" }}>+{blocks.length - 2}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
