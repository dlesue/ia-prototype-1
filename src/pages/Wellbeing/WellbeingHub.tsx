import { HubHeader } from '../../components/HubHeader';
import type { HubAutomation } from '../../components/HubHeader';
import { ContentBlock } from '../../components/ContentBlock';

const AUTOMATIONS: HubAutomation[] = [
  { text: 'Remind non-respondents to complete the wellbeing survey', shortText: 'Survey reminders', fields: [
    { label: 'Remind after', options: ['2 days', '5 days', '7 days'] },
    { label: 'Repeat', options: ['Once', 'Every 3 days', 'Weekly until complete'] },
    { label: 'Channel', options: ['Email only', 'Email + Slack', 'In-app notification'] },
  ] },
  { text: 'Alert HR when team wellbeing scores drop significantly', shortText: 'Alert on score drops', fields: [
    { label: 'Drop threshold', options: ['5+ point decline', '10+ point decline', '15+ point decline'] },
    { label: 'Compare to', options: ['Previous survey', 'Same period last year', 'Company average'] },
    { label: 'Notify', options: ['HRBP only', 'HRBP + Manager', 'HR leadership'] },
  ] },
];

const insights = [
  { text: 'October Wellbeing survey open — 47% responded', shortText: 'Survey 47% response', icon: 'clipboard' },
  { text: 'eNPS improved 5 points this quarter', shortText: 'eNPS up 5', icon: 'chart-line' },
];

export default function WellbeingHub() {
  return (
    <div className="flex flex-col flex-1">
      <HubHeader title="Wellbeing" product="Wellbeing" metrics={[]} insights={insights} automations={AUTOMATIONS} />
      <div className="px-6 pb-6 flex-1 flex flex-col">
        <ContentBlock fillHeight showJtbd />
      </div>
    </div>
  );
}
