import React from 'react';
import { HubHeader } from '../../components/HubHeader';
import type { HubAutomation } from '../../components/HubHeader';
import { ContentBlock } from '../../components/ContentBlock/ContentBlock';

const metrics = [
  { label: "PTO Utilization", value: "67%", icon: "plane", sparkData: [58, 60, 62, 63, 65, 66, 67], linkTo: '/reports/view/PTO%20Utilization' },
  { label: "Pending Requests", value: "12", icon: "inbox", sparkData: [15, 13, 14, 11, 10, 13, 12], linkTo: '/reports/view/Pending%20Requests' },
  { label: "Overtime (MTD)", value: "234h", icon: "clock", sparkData: [180, 195, 205, 215, 222, 228, 234], linkTo: '/reports/view/Overtime' },
  { label: "Approval Time", value: "1.2 days", icon: "check-circle", sparkData: [1.8, 1.6, 1.5, 1.4, 1.3, 1.3, 1.2], linkTo: '/reports/view/Approval%20Time' },
];

const insights = [
  { text: "12 time-off requests pending for more than 3 days", shortText: "12 requests pending", icon: 'clock' },
  { text: "PTO utilization lower than last year", shortText: "PTO utilization down", icon: 'chart-line' },
  { text: "March has 3 holidays", shortText: "3 March holidays", icon: 'calendar' },
];

const AUTOMATIONS: HubAutomation[] = [
  { text: 'Auto-flag timesheets not submitted by Friday', shortText: 'Flag late timesheets', fields: [
    { label: 'Deadline', options: ['Friday 5 PM', 'Saturday midnight', 'Monday 9 AM'] },
    { label: 'Applies to', options: ['All employees', 'Hourly only', 'Non-exempt only'] },
    { label: 'Notify', options: ['Employee only', 'Employee + Manager', 'Manager only'] },
  ] },
  { text: 'Notify managers of pending time-off requests after 3 days', shortText: 'Remind pending PTO', fields: [
    { label: 'Remind after', options: ['2 days', '3 days', '5 days'] },
    { label: 'Repeat', options: ['Once', 'Daily until approved', 'Every 2 days'] },
    { label: 'Escalate to', options: ['No escalation', 'Skip-level manager', 'HR after 7 days'] },
  ] },
];

export default function TimeAttendanceHub() {
  return (
    <div className="flex flex-col flex-1">
      <HubHeader title="Time & Attendance" product="Time & Attendance" metrics={metrics} insights={insights} automations={AUTOMATIONS} />
      <div className="px-6 pb-6 flex-1 flex flex-col">
        <ContentBlock fillHeight showJtbd />
      </div>
    </div>
  );
}
