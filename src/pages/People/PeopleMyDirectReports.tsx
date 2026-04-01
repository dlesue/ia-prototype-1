import { HubHeader } from '../../components/HubHeader';
import { ContentBlock } from '../../components/ContentBlock/ContentBlock';

const metrics = [
  { label: 'Direct Reports', value: '8', icon: 'users', sparkData: [7, 7, 8, 8, 8, 7, 8], linkTo: '/reports/view/Direct%20Reports' },
  { label: 'Pending Reviews', value: '3', icon: 'bullseye', trend: 'up' as const, trendValue: '+1', sparkData: [1, 2, 1, 3, 2, 4, 3], linkTo: '/reports/view/Assessment%20Progress' },
  { label: 'Time Off This Week', value: '2', icon: 'plane', sparkData: [1, 3, 0, 2, 1, 3, 2], linkTo: '/reports/view/Time%20Off%20Schedule' },
  { label: 'Avg Tenure', value: '2.4 yrs', icon: 'clock', sparkData: [2.1, 2.2, 2.2, 2.3, 2.3, 2.4, 2.4], linkTo: '/reports/view/Years%20of%20Service' },
];

const insights = [
  { text: 'Jordan Chen has a 1:1 overdue by 2 weeks', shortText: '1:1 overdue', icon: 'clock' },
  { text: 'Riley Park is approaching their 1-year anniversary', shortText: 'Riley 1-year anniv', icon: 'cake' },
  { text: '3 direct reports have incomplete goals for Q1', shortText: '3 incomplete goals', icon: 'bullseye' },
];

export default function PeopleMyDirectReports() {
  return (
    <div className="flex flex-col flex-1">
      <HubHeader title="My Direct Reports" product="People" metrics={metrics} insights={insights} />
      <div className="px-6 pb-6 flex-1 flex flex-col">
        <ContentBlock fillHeight showJtbd />
      </div>
    </div>
  );
}
