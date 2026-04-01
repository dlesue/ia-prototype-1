import { HubHeader } from '../../components/HubHeader';
import type { HubAutomation } from '../../components/HubHeader';
import { ContentBlock } from '../../components/ContentBlock';

const AUTOMATIONS: HubAutomation[] = [
  { text: 'Auto-send birthday and anniversary recognitions', shortText: 'Auto milestone recognition', fields: [
    { label: 'Events', options: ['Birthdays only', 'Anniversaries only', 'Birthdays + Anniversaries'] },
    { label: 'Send from', options: ['Company account', 'Manager', 'HR team'] },
    { label: 'Include', options: ['Message only', 'Message + Points', 'Message + Gift card'] },
  ] },
  { text: 'Nudge managers in teams with low recognition activity', shortText: 'Nudge low-activity teams', fields: [
    { label: 'Threshold', options: ['No activity in 14 days', 'No activity in 30 days', 'Bottom 25% of teams'] },
    { label: 'Nudge frequency', options: ['Once', 'Weekly', 'Bi-weekly'] },
    { label: 'Channel', options: ['Email only', 'Slack DM', 'Email + Slack'] },
  ] },
];

const insights = [
  { text: '847 recognitions sent this month', shortText: '847 recognitions', icon: 'trophy' },
  { text: 'Engineering team has low recognition activity', shortText: 'Eng low activity', icon: 'triangle-exclamation' },
];

export default function RewardsRecognitionHub() {
  return (
    <div className="flex flex-col flex-1">
      <HubHeader title="Rewards & Recognition" product="Rewards & Recognition" metrics={[]} insights={insights} automations={AUTOMATIONS} />
      <div className="px-6 pb-6 flex-1 flex flex-col">
        <ContentBlock fillHeight showJtbd />
      </div>
    </div>
  );
}
