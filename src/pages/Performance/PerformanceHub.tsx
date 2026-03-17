import { HubHeader } from '../../components/HubHeader';
import type { HubAutomation } from '../../components/HubHeader';
import { Placeholder } from '../../components/Placeholder/Placeholder';

const metrics = [
  { label: "Review Completion", value: "84%", progressPercent: 84, vizType: 'progress' as const, linkTo: '/reports/view/Review%20Completion' },
  { label: "Goal Attainment", value: "71%", progressPercent: 71, vizType: 'progress' as const, linkTo: '/reports/view/Goal%20Attainment' },
  { label: "1:1 Coverage", value: "78%", sparkData: [82, 80, 79, 78, 77, 78, 78], linkTo: '/reports/view/1%3A1%20Coverage' },
  { label: "OKR Alignment", value: "65%", trend: 'up' as const, trendValue: '+4%', sparkData: [55, 58, 60, 61, 63, 64, 65], linkTo: '/reports/view/OKR%20Alignment' },
];

const insights = [
  { text: "Q1 review cycle closes in 12 days", shortText: "Q1 cycle closing", icon: 'calendar' },
  { text: "Product Design has 3 goals marked At Risk", shortText: "3 goals at risk", icon: 'triangle-exclamation' },
  { text: "1:1 frequency has dropped 15% in Engineering", shortText: "1:1s down 15%", icon: 'chart-line' },
];

const AUTOMATIONS: HubAutomation[] = [
  { text: 'Remind managers 7 days before review cycle deadline', shortText: 'Review deadline alerts', fields: [
    { label: 'Remind before', options: ['3 days', '7 days', '14 days'] },
    { label: 'Repeat', options: ['Once', 'Daily until complete', 'Every 3 days'] },
    { label: 'Include', options: ['Managers only', 'Managers + Employees', 'Managers + HRBP'] },
  ] },
  { text: 'Auto-flag goals marked At Risk for more than 2 weeks', shortText: 'Flag stale at-risk goals', fields: [
    { label: 'Flag after', options: ['1 week', '2 weeks', '30 days'] },
    { label: 'Notify', options: ['Goal owner only', 'Goal owner + Manager', 'Manager only'] },
    { label: 'Escalate', options: ['No escalation', 'Skip-level after 30 days', 'HRBP after 30 days'] },
  ] },
];

export default function PerformanceHub() {
  return (
    <div>
      <HubHeader title="Performance" product="Performance" metrics={metrics} insights={insights} automations={AUTOMATIONS} />
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold text-[var(--text-neutral-xx-strong)] mb-4">Goals &amp; OKRs</h2>
        <Placeholder />
      </div>
    </div>
  );
}
