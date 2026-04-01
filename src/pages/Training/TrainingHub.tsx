import { HubHeader } from '../../components/HubHeader';
import type { HubAutomation } from '../../components/HubHeader';
import { ContentBlock } from '../../components/ContentBlock/ContentBlock';

const metrics = [
  { label: "Compliance Rate", value: "91%", icon: "shield", ringPercent: 91, linkTo: '/reports/view/Compliance%20Rate' },
  { label: "Overdue", value: "34", icon: "clock", sparkData: [42, 40, 38, 37, 36, 35, 34], linkTo: '/reports/view/Overdue%20Training' },
  { label: "Expiring Certs", value: "8", icon: "graduation-cap", sparkData: [12, 11, 10, 9, 9, 8, 8], linkTo: '/reports/view/Expiring%20Certifications' },
  { label: "Courses in Catalog", value: "47", icon: "file-lines", sparkData: [40, 42, 43, 44, 45, 46, 47], linkTo: '/reports/view/Course%20Catalog' },
];

const insights = [
  { text: "8 certifications expiring this month", shortText: "8 certs expiring", icon: "clock" },
  { text: "Security Awareness training completion at 87%", shortText: "Security at 87%", icon: "shield" },
  { text: "3 new courses added this quarter", shortText: "3 new courses", icon: "book" },
];

const AUTOMATIONS: HubAutomation[] = [
  { text: 'Remind employees 30 days before certification expires', shortText: 'Cert expiry reminders', fields: [
    { label: 'Remind before', options: ['14 days', '30 days', '60 days'] },
    { label: 'Remind who', options: ['Employee only', 'Employee + Manager', 'Employee + HR'] },
    { label: 'Repeat', options: ['Once', 'Weekly until renewed', 'Every 3 days'] },
  ] },
  { text: 'Auto-enroll new hires in required compliance training', shortText: 'Auto-enroll compliance', fields: [
    { label: 'Enroll when', options: ['Day of hire', '1 week after hire', 'After onboarding complete'] },
    { label: 'Courses', options: ['All required', 'Role-specific only', 'Department-specific'] },
    { label: 'Due within', options: ['30 days', '60 days', '90 days'] },
  ] },
];

export default function TrainingHub() {
  return (
    <div className="flex flex-col flex-1">
      <HubHeader title="Training" product="Training" metrics={metrics} insights={insights} automations={AUTOMATIONS} />
      <div className="px-6 pb-6 flex-1 flex flex-col">
        <ContentBlock fillHeight showJtbd />
      </div>
    </div>
  );
}
