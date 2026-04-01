import React from 'react';
import { HubHeader } from '../../components/HubHeader';
import type { HubAutomation } from '../../components/HubHeader';
import { ContentBlock } from '../../components/ContentBlock/ContentBlock';

const metrics = [
  { label: "eNPS", value: "+42", icon: "face-smile", trend: "up" as const, trendValue: "+5", sparkData: [32, 34, 36, 38, 39, 41, 42], linkTo: '/reports/view/eNPS' },
  { label: "Recognition / Month", value: "847", icon: "star", sparkData: [720, 745, 780, 800, 815, 830, 847], linkTo: '/reports/view/Recognition' },
  { label: "Engagement", value: "73%", icon: "heart", ringPercent: 73, linkTo: '/reports/view/Engagement' },
  { label: "Community DAU", value: "234", icon: "users", sparkData: [195, 205, 210, 218, 224, 228, 234], linkTo: '/reports/view/Community%20DAU' },
];

const AUTOMATIONS: HubAutomation[] = [
  { text: 'Send pulse survey reminders to non-respondents after 3 days', shortText: 'Survey reminders', fields: [
    { label: 'Remind after', options: ['2 days', '3 days', '5 days'] },
    { label: 'Repeat', options: ['Once', 'Every 2 days', 'Daily until complete'] },
    { label: 'Channel', options: ['Email only', 'Email + Slack', 'Email + In-app notification'] },
  ] },
  { text: 'Auto-surface low-recognition teams to their managers', shortText: 'Flag low recognition', fields: [
    { label: 'Threshold', options: ['Bottom 10% of teams', 'Bottom 25% of teams', 'Below company average'] },
    { label: 'Lookback period', options: ['Last 30 days', 'Last 60 days', 'Last quarter'] },
    { label: 'Notify', options: ['Manager only', 'Manager + HRBP', 'HR leadership'] },
  ] },
];

const insights = [
  { text: "eNPS improved 5 points this quarter", shortText: "eNPS up 5", icon: "chart-line" },
  { text: "Engineering team has low recognition activity", shortText: "Eng low recognition", icon: "triangle-exclamation" },
  { text: "October Wellbeing survey open \u2014 47% responded", shortText: "Survey 47% response", icon: "clipboard" },
];

export default function CultureHub() {
  return (
    <div className="flex flex-col flex-1">
      <HubHeader title="Culture" product="Culture" metrics={metrics} insights={insights} automations={AUTOMATIONS} />
      <div className="px-6 pb-6 flex-1 flex flex-col">
        <ContentBlock fillHeight showJtbd />
      </div>
    </div>
  );
}
