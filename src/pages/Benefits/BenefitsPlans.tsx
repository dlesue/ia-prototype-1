import React from 'react';
import { HubHeader } from '../../components/HubHeader';

const metrics = [
  { label: "Enrollment", value: "94%", ringPercent: 94 },
  { label: "Active Plans", value: "12" },
  { label: "COBRA", value: "3" },
  { label: "Cost / Employee", value: "$847/mo" },
];

const insights = [
  { text: "Open enrollment closes in 14 days" },
  { text: "HDHP adoption up 12% vs last year" },
  { text: "3 employees missing dependent information" },
];

const planGroups = [
  {
    type: "Medical",
    plans: [
      { carrier: "Blue Shield", plan: "PPO 500", tiers: { employee: "$180", spouse: "$340", family: "$480" }, enrolled: 412 },
      { carrier: "Blue Shield", plan: "HDHP 1500", tiers: { employee: "$95", spouse: "$185", family: "$260" }, enrolled: 287 },
      { carrier: "Kaiser", plan: "HMO", tiers: { employee: "$145", spouse: "$275", family: "$390" }, enrolled: 148 },
    ],
  },
  {
    type: "Dental",
    plans: [
      { carrier: "Delta Dental", plan: "PPO Plus", tiers: { employee: "$28", spouse: "$52", family: "$76" }, enrolled: 710 },
      { carrier: "Delta Dental", plan: "Basic", tiers: { employee: "$15", spouse: "$28", family: "$42" }, enrolled: 137 },
    ],
  },
  {
    type: "Vision",
    plans: [
      { carrier: "VSP Vision", plan: "Standard", tiers: { employee: "$8", spouse: "$14", family: "$20" }, enrolled: 634 },
      { carrier: "VSP Vision", plan: "Enhanced", tiers: { employee: "$14", spouse: "$24", family: "$34" }, enrolled: 213 },
    ],
  },
  {
    type: "Life Insurance",
    plans: [
      { carrier: "Principal Life", plan: "Basic Life 1x", tiers: { employee: "$0", spouse: "N/A", family: "N/A" }, enrolled: 847 },
      { carrier: "Principal Life", plan: "Supplemental Life", tiers: { employee: "$12", spouse: "$8", family: "N/A" }, enrolled: 284 },
    ],
  },
  {
    type: "401(k)",
    plans: [
      { carrier: "Fidelity", plan: "401(k) with 4% match", tiers: { employee: "Varies", spouse: "N/A", family: "N/A" }, enrolled: 743 },
    ],
  },
  {
    type: "HSA",
    plans: [
      { carrier: "Fidelity", plan: "HSA (HDHP eligible)", tiers: { employee: "$0", spouse: "N/A", family: "N/A" }, enrolled: 287 },
    ],
  },
];

export default function BenefitsPlans() {
  return (
    <div>
      <HubHeader product="Benefits" metrics={metrics} insights={insights} />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Plans</h1>
            <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">All active benefit plans by category</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
            + Add Plan
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {planGroups.map(g => (
            <div key={g.type}>
              <div className="text-xs font-semibold text-[var(--text-neutral-medium)] uppercase tracking-wide mb-2">{g.type}</div>
              <div className="flex flex-col gap-2">
                {g.plans.map(p => (
                  <div key={p.plan} className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-4 flex items-center gap-6">
                    <div className="w-10 h-10 rounded-[var(--radius-small)] bg-[var(--surface-neutral-x-weak)] flex items-center justify-center shrink-0">
                      <span className="text-lg">&#127973;</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">{p.carrier}</div>
                      <div className="text-xs text-[var(--text-neutral-medium)]">{p.plan}</div>
                    </div>
                    <div className="flex gap-6 text-xs">
                      <div className="text-center">
                        <div className="text-[var(--text-neutral-medium)] mb-0.5">Employee</div>
                        <div className="font-semibold text-[var(--text-neutral-xx-strong)]">{p.tiers.employee}<span className="font-normal text-[var(--text-neutral-medium)]">/mo</span></div>
                      </div>
                      <div className="text-center">
                        <div className="text-[var(--text-neutral-medium)] mb-0.5">+Spouse</div>
                        <div className="font-semibold text-[var(--text-neutral-xx-strong)]">{p.tiers.spouse !== "N/A" ? p.tiers.spouse + "/mo" : "—"}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[var(--text-neutral-medium)] mb-0.5">+Family</div>
                        <div className="font-semibold text-[var(--text-neutral-xx-strong)]">{p.tiers.family !== "N/A" ? p.tiers.family + "/mo" : "—"}</div>
                      </div>
                    </div>
                    <div className="text-center shrink-0">
                      <div className="text-xs text-[var(--text-neutral-medium)] mb-0.5">Enrolled</div>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: "var(--color-primary-weak)", color: "var(--color-primary-strong)" }}>{p.enrolled}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
