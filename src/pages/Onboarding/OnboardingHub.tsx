import React from 'react';
import { HubHeader } from '../../components/HubHeader';
import type { HubAutomation } from '../../components/HubHeader';
import { Placeholder } from '../../components/Placeholder/Placeholder';

const metrics = [
  { label: "Active Onboarding", value: "8", icon: "door-open", sparkData: [5, 6, 4, 7, 6, 9, 8], linkTo: '/reports/view/Active%20Onboarding' },
  { label: "Avg Completion", value: "67%", icon: "check-circle", ringPercent: 67, linkTo: '/reports/view/Onboarding%20Completion' },
  { label: "Overdue Tasks", value: "12", icon: "clock", trend: "down" as const, trendValue: "+2", sparkData: [18, 16, 15, 14, 13, 13, 12], linkTo: '/reports/view/Overdue%20Tasks' },
  { label: "90-Day Attrition", value: "4.2%", icon: "chart-line", sparkData: [6.1, 5.8, 5.4, 5.0, 4.7, 4.5, 4.2], linkTo: '/reports/view/90-Day%20Attrition' },
];

const insights = [
  { text: "Tyler Brooks is 3 days behind on IT setup tasks", shortText: "Tyler behind", icon: "clock" },
  { text: "2 new hires start next week", shortText: "2 hires next week", icon: "user-plus" },
  { text: "Onboarding completion has improved 8% vs last quarter", shortText: "Completion up 8%", icon: "chart-line" },
];

const AUTOMATIONS: HubAutomation[] = [
  { text: 'Auto-assign IT setup tasks when a new hire is added', shortText: 'Auto-assign IT tasks', fields: [
    { label: 'Task template', options: ['Standard IT setup', 'Engineering setup', 'Remote employee setup'] },
    { label: 'Assign to', options: ['IT team lead', 'Hiring manager', 'Auto-route by department'] },
    { label: 'Due', options: ['Before start date', '1 day after start', '3 days after start'] },
  ] },
  { text: 'Send day-1 welcome email to new hires automatically', shortText: 'Auto welcome email', fields: [
    { label: 'Send timing', options: ['Day of start', '1 day before start', 'Morning of start'] },
    { label: 'Template', options: ['Default welcome', 'Remote welcome', 'Department-specific'] },
    { label: 'CC', options: ['Manager only', 'Manager + HRBP', 'No one'] },
  ] },
];

export default function OnboardingHub() {
  return (
    <div>
      <HubHeader title="Onboarding" product="Onboarding" metrics={metrics} insights={insights} automations={AUTOMATIONS} />
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold text-[var(--text-neutral-xx-strong)] mb-4">Active Onboarding</h2>
        <Placeholder variant="table" />
      </div>
    </div>
  );
}
