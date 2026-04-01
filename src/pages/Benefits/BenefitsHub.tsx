import React from 'react';
import { HubHeader } from '../../components/HubHeader';
import type { HubAutomation } from '../../components/HubHeader';
import Placeholder from '../../components/Placeholder/Placeholder';
import { ContentBlock } from '../../components/ContentBlock/ContentBlock';

const metrics = [
  { label: "Enrollment", value: "94%", progressPercent: 94, vizType: 'progress' as const, linkTo: '/reports/view/Enrollment' },
  { label: "Active Plans", value: "12", sparkData: [10, 10, 11, 11, 12, 12, 12], linkTo: '/reports/view/Active%20Plans' },
  { label: "COBRA", value: "3", trend: 'down' as const, trendValue: '-2', sparkData: [5, 4, 4, 3, 3, 3, 3], linkTo: '/reports/view/COBRA' },
  { label: "Cost / Employee", value: "$847/mo", trend: 'up' as const, trendValue: '+$12', sparkData: [810, 818, 825, 830, 838, 842, 847], linkTo: '/reports/view/Cost%20per%20Employee' },
];

const insights = [
  { text: "Open enrollment closes in 14 days", shortText: "Enrollment closing", icon: 'calendar' },
  { text: "HDHP adoption up 12% vs last year", shortText: "HDHP up 12%", icon: 'chart-line' },
  { text: "3 employees missing dependent information", shortText: "3 missing dependents", icon: 'circle-info' },
];

const AUTOMATIONS: HubAutomation[] = [
  { text: 'Remind employees 7 days before open enrollment closes', shortText: 'Enrollment reminders', fields: [
    { label: 'Remind before', options: ['3 days', '7 days', '14 days'] },
    { label: 'Repeat', options: ['Once', 'Daily until enrolled', 'Every 3 days'] },
    { label: 'Channel', options: ['Email only', 'Email + Slack', 'Email + In-app notification'] },
  ] },
  { text: 'Auto-notify employees with missing dependent information', shortText: 'Alert missing dependents', fields: [
    { label: 'Check frequency', options: ['Daily', 'Weekly', 'Bi-weekly'] },
    { label: 'Notify', options: ['Employee only', 'Employee + HR', 'Employee + Manager'] },
  ] },
];

export default function BenefitsHub() {
  return (
    <div className="flex flex-col flex-1">
      <HubHeader title="Benefits" product="Benefits" metrics={metrics} insights={insights} automations={AUTOMATIONS} />
      <div className="px-6 pb-6 flex-1 flex flex-col">
        <ContentBlock fillHeight showJtbd />
      </div>
    </div>
  );
}
