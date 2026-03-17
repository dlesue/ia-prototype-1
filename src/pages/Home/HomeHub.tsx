import { HubHeader } from '../../components/HubHeader';
import type { HubAutomation } from '../../components/HubHeader';
import { ContentBlock } from '../../components/ContentBlock';
import { getEmployee } from '../../data/currentEmployee';
import { useScenario } from '../../contexts/ScenarioContext';

const metrics = [
  { label: 'Total Headcount', value: '847', icon: 'user-group', trend: 'up' as const, trendValue: '+12', sparkData: [810, 818, 822, 828, 835, 840, 847] },
  { label: 'Open Roles', value: '23', icon: 'id-badge', trend: 'up' as const, trendValue: '+4', sparkData: [14, 16, 18, 19, 21, 20, 23] },
  { label: 'Pending Approvals', value: '7', icon: 'inbox', linkTo: '/home/inbox', sparkData: [10, 8, 12, 9, 7, 11, 7] },
  { label: 'Upcoming Time Off', value: '14 this week', icon: 'plane', linkTo: '/time-and-attendance/time-off', sparkData: [8, 11, 9, 13, 10, 12, 14] },
];

const AUTOMATIONS: HubAutomation[] = [
  { text: 'Auto-remind approvers of pending requests after 2 days', shortText: 'Remind pending approvals', fields: [
    { label: 'Remind after', options: ['1 day', '2 days', '3 days'] },
    { label: 'Repeat', options: ['Once', 'Daily until resolved', 'Every 2 days'] },
    { label: 'Request types', options: ['All requests', 'Time off only', 'Time off + Expenses'] },
  ] },
  { text: 'Send weekly digest of upcoming deadlines', shortText: 'Weekly deadline digest', fields: [
    { label: 'Send on', options: ['Monday morning', 'Friday afternoon', 'Sunday evening'] },
    { label: 'Look ahead', options: ['Next 7 days', 'Next 14 days', 'Next 30 days'] },
    { label: 'Include', options: ['My deadlines only', 'My team deadlines', 'All deadlines I follow'] },
  ] },
];

const insights = [
  { text: '3 time-off requests awaiting your approval', shortText: '3 time-off requests', icon: 'clock' },
  { text: '5 new hires starting this month', shortText: '5 new hires', icon: 'circle-info' },
  { text: '12 performance reviews due this week', shortText: '12 reviews due', icon: 'chart-line' },
];

export default function HomeHub() {
  const { persona } = useScenario();
  const ee = getEmployee(persona);
  return (
    <div>
      {/* Greeting */}
      <div className="px-8 pt-6 flex items-center gap-4">
        <img src={ee.avatar} alt={`${ee.preferredName} ${ee.lastName}`} className="w-16 h-16 rounded-xl object-cover shrink-0" />
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)]">Hi, {ee.preferredName}</h1>
          <p className="text-sm text-[var(--text-neutral-medium)]">{ee.title}</p>
        </div>
      </div>
      <HubHeader title="" product="Home" metrics={[]} insights={insights} automations={AUTOMATIONS} />
      <div className="px-8 pb-8 space-y-4">
        {/* My Time + Time Off (left) | What's Happening (right) */}
        <div className="flex gap-4">
          <div className="w-[280px] shrink-0 space-y-4">
            <ContentBlock height={220} />
            <ContentBlock height={140} />
          </div>
          <div className="flex-1 min-w-0">
            <ContentBlock height={376} />
          </div>
        </div>

        {/* My Direct Reports */}
        <ContentBlock height={180} />

        {/* Celebrations / Who's Out / Company Links */}
        <div className="grid grid-cols-3 gap-4">
          <ContentBlock height={160} />
          <ContentBlock height={160} />
          <ContentBlock height={160} />
        </div>

        {/* Age / Benefit Enrollments / Candidates With Offers */}
        <div className="grid grid-cols-3 gap-4">
          <ContentBlock height={180} />
          <ContentBlock height={180} />
          <ContentBlock height={180} />
        </div>

        {/* Department / Division / Employment Status */}
        <div className="grid grid-cols-3 gap-4">
          <ContentBlock height={180} />
          <ContentBlock height={180} />
          <ContentBlock height={180} />
        </div>

        {/* Ethnicity / Gender / Incomplete Trainings */}
        <div className="grid grid-cols-3 gap-4">
          <ContentBlock height={180} />
          <ContentBlock height={180} />
          <ContentBlock height={180} />
        </div>

        {/* Length of Service / Location / Onboarding */}
        <div className="grid grid-cols-3 gap-4">
          <ContentBlock height={180} />
          <ContentBlock height={180} />
          <ContentBlock height={180} />
        </div>

        {/* People Without a Pay Raise / Time Off Requests / Time Off Used */}
        <div className="grid grid-cols-3 gap-4">
          <ContentBlock height={180} />
          <ContentBlock height={180} />
          <ContentBlock height={180} />
        </div>

        {/* Time to Hire / Welcome */}
        <div className="grid grid-cols-3 gap-4">
          <ContentBlock height={180} />
          <ContentBlock height={180} />
        </div>
      </div>
    </div>
  );
}
