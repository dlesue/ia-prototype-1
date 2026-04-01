import React from 'react';
import { HubHeader } from '../../components/HubHeader';
import type { HubAutomation } from '../../components/HubHeader';
import { ContentBlock } from '../../components/ContentBlock/ContentBlock';

const metrics = [
  { label: "Active", value: "8", icon: "compass", sparkData: [6, 6, 7, 7, 7, 8, 8], linkTo: '/reports/view/Active%20Integrations' },
  { label: "Healthy", value: "7", icon: "check-circle", sparkData: [5, 6, 6, 7, 6, 7, 7], linkTo: '/reports/view/Integration%20Health' },
  { label: "Errors", value: "2", icon: "circle-x", sparkData: [4, 3, 3, 2, 3, 2, 2], linkTo: '/reports/view/Integration%20Errors' },
  { label: "Categories", value: "24", icon: "folder", sparkData: [20, 21, 22, 22, 23, 23, 24], linkTo: '/reports/view/App%20Categories' },
];

const insights = [
  { text: "Slack integration sync error needs attention", shortText: "Slack sync error", icon: "triangle-exclamation" },
  { text: "2 new integrations available in your category", shortText: "2 new integrations", icon: "puzzle-piece" },
  { text: "API usage up 23% this month", shortText: "API usage up 23%", icon: "chart-line" },
];

const AUTOMATIONS: HubAutomation[] = [
  { text: 'Auto-retry failed integration syncs every 15 minutes', shortText: 'Auto-retry syncs', fields: [
    { label: 'Retry interval', options: ['Every 5 minutes', 'Every 15 minutes', 'Every 30 minutes'] },
    { label: 'Max retries', options: ['3 attempts', '5 attempts', '10 attempts'] },
    { label: 'Notify on failure', options: ['Admin only', 'Admin + App owner', 'No one'] },
  ] },
  { text: 'Notify admin when API usage exceeds 80% of limit', shortText: 'Alert on API limit', fields: [
    { label: 'Usage threshold', options: ['Over 70%', 'Over 80%', 'Over 90%'] },
    { label: 'Check frequency', options: ['Every hour', 'Every 6 hours', 'Daily'] },
    { label: 'Notify', options: ['Admin only', 'Admin + IT team', 'App owner'] },
  ] },
];

export default function AppsHub() {
  return (
    <div className="flex flex-col flex-1">
      <HubHeader title="Apps" product="Apps" metrics={metrics} insights={insights} automations={AUTOMATIONS} />
      <div className="px-6 pb-6 flex-1 flex flex-col">
        <ContentBlock fillHeight showJtbd />
      </div>
    </div>
  );
}
