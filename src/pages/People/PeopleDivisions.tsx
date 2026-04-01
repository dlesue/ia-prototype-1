import { HubHeader } from '../../components/HubHeader';
import { ContentBlock } from '../../components/ContentBlock/ContentBlock';

const metrics = [
  { label: 'Total Divisions', value: '6', icon: 'building', sparkData: [5, 5, 6, 6, 6, 6, 6], linkTo: '/reports/view/Total%20Divisions' },
  { label: 'Total Headcount', value: '847', icon: 'user-group', trend: 'up' as const, trendValue: '+12', sparkData: [810, 818, 822, 828, 835, 840, 847], linkTo: '/reports/view/Headcount' },
  { label: 'Avg Division Size', value: '141', icon: 'users', sparkData: [135, 136, 137, 138, 139, 140, 141], linkTo: '/reports/view/Avg%20Division%20Size' },
  { label: 'Open Roles', value: '23', icon: 'id-badge', trend: 'up' as const, trendValue: '+4', sparkData: [14, 16, 18, 19, 21, 20, 23], linkTo: '/reports/view/Open%20Positions' },
];

const insights = [
  { text: 'Engineering division has grown 18% this quarter', shortText: 'Eng grew 18%', icon: 'chart-line' },
  { text: 'Sales division has 3 unfilled roles past 60 days', shortText: '3 stale Sales roles', icon: 'clock' },
  { text: 'Operations headcount is flat despite approved reqs', shortText: 'Ops headcount flat', icon: 'circle-info' },
];

export default function PeopleDivisions() {
  return (
    <div className="flex flex-col flex-1">
      <HubHeader title="Divisions" product="People" metrics={metrics} insights={insights} />
      <div className="px-6 pb-6 flex-1 flex flex-col">
        <ContentBlock fillHeight showJtbd />
      </div>
    </div>
  );
}
