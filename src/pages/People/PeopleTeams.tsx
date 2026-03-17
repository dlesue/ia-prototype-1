import { HubHeader } from '../../components/HubHeader';
import { Placeholder } from '../../components/Placeholder/Placeholder';

const metrics = [
  { label: 'Total Teams', value: '38', icon: 'users', sparkData: [34, 35, 35, 36, 37, 37, 38], linkTo: '/reports/view/Total%20Teams' },
  { label: 'Cross-Functional', value: '7', icon: 'arrows-rotate', sparkData: [4, 5, 5, 6, 6, 6, 7], linkTo: '/reports/view/Cross-Functional%20Teams' },
  { label: 'Avg Team Size', value: '8', icon: 'user-group', sparkData: [7, 7, 8, 8, 8, 8, 8], linkTo: '/reports/view/Avg%20Team%20Size' },
  { label: 'New Teams (Q1)', value: '3', icon: 'circle-plus', trend: 'up' as const, trendValue: '+3', sparkData: [0, 0, 1, 1, 2, 2, 3], linkTo: '/reports/view/New%20Teams' },
];

const insights = [
  { text: 'Platform team is 40% over headcount target', shortText: 'Platform over target', icon: 'chart-line' },
  { text: '5 teams have no designated team lead', shortText: '5 teams no lead', icon: 'circle-info' },
  { text: 'Data team has the highest engagement score at 4.6', shortText: 'Data team top score', icon: 'face-smile' },
];

export default function PeopleTeams() {
  return (
    <div>
      <HubHeader title="Teams" product="People" metrics={metrics} insights={insights} />
      <div className="px-8 pb-8">
        <Placeholder variant="table" />
      </div>
    </div>
  );
}
