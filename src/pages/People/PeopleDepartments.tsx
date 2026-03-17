import { HubHeader } from '../../components/HubHeader';
import { Placeholder } from '../../components/Placeholder/Placeholder';

const metrics = [
  { label: 'Total Departments', value: '24', icon: 'building', sparkData: [22, 22, 23, 23, 23, 24, 24], linkTo: '/reports/view/Total%20Departments' },
  { label: 'Largest Dept', value: 'Engineering (142)', icon: 'user-group', linkTo: '/reports/view/Department%20Headcount' },
  { label: 'Avg Dept Size', value: '35', icon: 'users', sparkData: [32, 33, 33, 34, 34, 35, 35], linkTo: '/reports/view/Avg%20Department%20Size' },
  { label: 'Depts Over Budget', value: '2', icon: 'circle-dollar', trend: 'down' as const, trendValue: '-1', sparkData: [5, 4, 4, 3, 3, 3, 2], linkTo: '/reports/view/Department%20Budget' },
];

const insights = [
  { text: 'Marketing department grew 22% — fastest this quarter', shortText: 'Marketing grew 22%', icon: 'chart-line' },
  { text: 'Finance has 4 open roles with no candidates yet', shortText: '4 Finance roles open', icon: 'clock' },
  { text: 'Customer Success turnover is 2x company average', shortText: 'CS turnover high', icon: 'circle-info' },
];

export default function PeopleDepartments() {
  return (
    <div>
      <HubHeader title="Departments" product="People" metrics={metrics} insights={insights} />
      <div className="px-8 pb-8">
        <Placeholder variant="table" />
      </div>
    </div>
  );
}
