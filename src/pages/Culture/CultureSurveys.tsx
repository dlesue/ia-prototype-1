import React from 'react';

const activeSurveys = [
  { name: "Q1 2026 Engagement Survey", type: "Engagement", sent: 847, responded: 634, rate: "75%", closes: "Mar 20, 2026" },
  { name: "March Wellbeing Pulse", type: "Wellbeing", sent: 847, responded: 398, rate: "47%", closes: "Mar 15, 2026" },
];

const pastSurveys = [
  { name: "Q4 2025 eNPS", type: "eNPS", period: "Dec 2025", participants: 831, rate: "82%", score: "+37" },
  { name: "Q3 2025 eNPS", type: "eNPS", period: "Sep 2025", participants: 820, rate: "78%", score: "+31" },
  { name: "2025 Annual Engagement", type: "Engagement", period: "Nov 2025", participants: 835, rate: "91%", score: "72%" },
];

export default function CultureSurveys() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Surveys & Wellbeing</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">eNPS, engagement surveys, and wellbeing pulses</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
          + New Survey
        </button>
      </div>

      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-large)] border border-[var(--border-neutral-xx-weak)] p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs font-semibold text-[var(--text-neutral-medium)] uppercase tracking-wide mb-1">Current eNPS Score</div>
            <div className="text-4xl font-bold text-[var(--text-neutral-xx-strong)]">+42</div>
            <div className="flex items-center gap-1 mt-1 text-emerald-600 text-sm font-medium">
              <span>&#8593;</span> +5 vs last quarter
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">61%</div>
              <div className="text-xs text-[var(--text-neutral-medium)]">Promoters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--text-neutral-medium)]">20%</div>
              <div className="text-xs text-[var(--text-neutral-medium)]">Passives</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">19%</div>
              <div className="text-xs text-[var(--text-neutral-medium)]">Detractors</div>
            </div>
          </div>
        </div>
        <div className="h-2 rounded-full overflow-hidden flex">
          <div className="bg-emerald-400" style={{ width: "61%" }} />
          <div className="bg-gray-300" style={{ width: "20%" }} />
          <div className="bg-red-400" style={{ width: "19%" }} />
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] mb-3">Active Surveys</div>
        <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-neutral-xx-weak)]">
                <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Survey</th>
                <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Type</th>
                <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Sent</th>
                <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Responded</th>
                <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Rate</th>
                <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Closes</th>
              </tr>
            </thead>
            <tbody>
              {activeSurveys.map(s => (
                <tr key={s.name} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer">
                  <td className="py-3 px-4 text-sm font-medium text-[var(--text-neutral-xx-strong)]">{s.name}</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)]">{s.type}</span></td>
                  <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)] text-right">{s.sent}</td>
                  <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)] text-right">{s.responded}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-[var(--text-neutral-xx-strong)] text-right">{s.rate}</td>
                  <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{s.closes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] mb-3">Past Surveys</div>
        <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-neutral-xx-weak)]">
                <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Survey</th>
                <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Period</th>
                <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Participants</th>
                <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Response Rate</th>
                <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Score / Result</th>
              </tr>
            </thead>
            <tbody>
              {pastSurveys.map(s => (
                <tr key={s.name} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer">
                  <td className="py-3 px-4 text-sm font-medium text-[var(--text-neutral-xx-strong)]">{s.name}</td>
                  <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{s.period}</td>
                  <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)] text-right">{s.participants}</td>
                  <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)] text-right">{s.rate}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-[var(--color-primary-strong)] text-right">{s.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
