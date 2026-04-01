import { HubHeader } from '../../components/HubHeader';
import type { HubAutomation } from '../../components/HubHeader';
import { ContentBlock } from '../../components/ContentBlock';

const AUTOMATIONS: HubAutomation[] = [
  { text: 'Auto-pin company announcements for 7 days', shortText: 'Auto-pin announcements', fields: [
    { label: 'Pin duration', options: ['3 days', '7 days', '14 days'] },
    { label: 'Pin where', options: ['All communities', 'Company-wide feed only', 'Selected communities'] },
    { label: 'Source', options: ['HR announcements', 'Leadership posts', 'All announcements'] },
  ] },
  { text: 'Notify community admins of flagged content', shortText: 'Alert flagged content', fields: [
    { label: 'Notify after', options: ['1 flag', '3 flags', '5 flags'] },
    { label: 'Auto-hide', options: ['No', 'After 3 flags', 'After 5 flags'] },
    { label: 'Notify', options: ['Community admin only', 'Community admin + HR', 'HR only'] },
  ] },
];

const insights = [
  { text: '12 new posts in the last 24 hours', shortText: '12 new posts', icon: 'comments' },
  { text: '3 company announcements this week', shortText: '3 announcements', icon: 'bullhorn' },
];

export default function EmployeeCommunityHub() {
  return (
    <div className="flex flex-col flex-1">
      <HubHeader title="Employee Community" product="Employee Community" metrics={[]} insights={insights} automations={AUTOMATIONS} />
      <div className="px-6 pb-6 flex-1 flex flex-col">
        <ContentBlock fillHeight showJtbd />
      </div>
    </div>
  );
}
