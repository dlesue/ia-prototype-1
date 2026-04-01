import { HubHeader } from '../../components/HubHeader';
import type { HubAutomation } from '../../components/HubHeader';
import { ContentBlock } from '../../components/ContentBlock/ContentBlock';

const metrics = [
  { label: 'Median Salary', value: '$94,200', icon: 'circle-dollar', trend: 'up' as const, trendValue: '+3.2%', sparkData: [88,89,91,92,93,94,94.2], linkTo: '/reports/view/Pay%20by%20Department' },
  { label: 'Avg Compa-Ratio', value: '0.97', icon: 'gauge-high', trend: 'flat' as const, trendValue: '0.0', sparkData: [0.95,0.96,0.96,0.97,0.97,0.96,0.97], linkTo: '/reports/view/Compa-Ratio%20Analysis' },
  { label: 'In-Band %', value: '84%', icon: 'chart-bar', trend: 'up' as const, trendValue: '+2%', sparkData: [78,79,80,81,82,83,84], linkTo: '/reports/view/Pay%20Band%20Distribution' },
  { label: 'Next Cycle', value: 'Apr 1', icon: 'calendar', linkTo: '/reports/view/Compensation%20Cycle' },
];

const insights = [
  { text: '12 employees are above their pay band ceiling', shortText: '12 above band', icon: 'circle-info' },
  { text: 'Engineering compa-ratios are 8% below company avg', shortText: 'Eng compa low', icon: 'chart-line' },
  { text: 'Merit cycle planning opens in 3 weeks', shortText: 'Merit cycle soon', icon: 'calendar' },
];

const AUTOMATIONS: HubAutomation[] = [
  { text: 'Alert when an employee exceeds their pay band ceiling', shortText: 'Alert on band ceiling', fields: [
    { label: 'Alert when', options: ['At ceiling', '95% of ceiling', '90% of ceiling'] },
    { label: 'Notify', options: ['Manager only', 'Manager + HR', 'Comp team'] },
    { label: 'Scope', options: ['All employees', 'Exempt only', 'Non-exempt only'] },
  ] },
  { text: 'Auto-flag compa-ratios below 0.85', shortText: 'Flag low compa-ratios', fields: [
    { label: 'Threshold', options: ['Below 0.80', 'Below 0.85', 'Below 0.90'] },
    { label: 'Notify', options: ['Manager only', 'Manager + Comp team', 'HR Business Partner'] },
  ] },
];

export default function CompensationHub() {
  return (
    <div className="flex flex-col flex-1">
      <HubHeader title="Compensation" product="Compensation" metrics={metrics} insights={insights} automations={AUTOMATIONS} />
      <div className="px-6 pb-6 flex-1 flex flex-col">
        <ContentBlock fillHeight showJtbd />
      </div>
    </div>
  );
}
