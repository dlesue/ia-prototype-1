import React from 'react';
import { HubHeader } from '../../components/HubHeader';
import type { HubAutomation } from '../../components/HubHeader';
import { CardGrid } from '../../components/CardGrid';
import { ContentBlock } from '../../components/ContentBlock';
import type { CardGridItem } from '../../components/CardGrid';

const metrics = [
  { label: "Total Files", value: "1,247", icon: "folder", sparkData: [1180, 1195, 1210, 1220, 1230, 1240, 1247], linkTo: '/reports/view/Total%20Files' },
  { label: "Pending Signatures", value: "8", icon: "pen", sparkData: [12, 11, 10, 9, 9, 8, 8], linkTo: '/reports/view/Pending%20Signatures' },
  { label: "Storage", value: "4.2 GB", icon: "computer", sparkData: [3.5, 3.6, 3.8, 3.9, 4.0, 4.1, 4.2], linkTo: '/reports/view/Storage' },
  { label: "Shared Docs", value: "342", icon: "users", sparkData: [310, 318, 325, 330, 335, 338, 342], linkTo: '/reports/view/Shared%20Docs' },
];

const insights = [
  { text: "8 employees haven\u2019t signed the updated handbook", shortText: "8 unsigned handbooks", icon: 'file-signature' },
  { text: "4 new documents uploaded this week", shortText: "4 new documents", icon: 'file' },
  { text: "Storage approaching 50% of limit", shortText: "Storage near 50%", icon: 'hard-drive' },
];

const FOLDERS: CardGridItem[] = [
  { name: 'Company Policies', icon: 'folder', count: 24 },
  { name: 'Tax Forms', icon: 'folder', count: 47 },
  { name: 'Onboarding Packets', icon: 'folder', count: 18 },
  { name: 'Benefits Documents', icon: 'folder', count: 31 },
  { name: 'Training Materials', icon: 'folder', count: 12 },
  { name: 'Applicant Offer Letters', icon: 'folder', count: 5 },
  { name: 'Applicant Resumes', icon: 'folder', count: 67 },
];

const AUTOMATIONS: HubAutomation[] = [
  { text: 'Remind employees to sign updated documents within 7 days', shortText: 'Remind unsigned docs', fields: [
    { label: 'Remind after', options: ['3 days', '7 days', '14 days'] },
    { label: 'Repeat', options: ['Once', 'Every 3 days', 'Daily until signed'] },
    { label: 'Escalate to', options: ['No escalation', 'Manager after 14 days', 'HR after 14 days'] },
  ] },
  { text: 'Auto-archive files older than 2 years', shortText: 'Auto-archive old files', fields: [
    { label: 'Archive after', options: ['1 year', '2 years', '3 years'] },
    { label: 'File types', options: ['All files', 'Documents only', 'Exclude signed forms'] },
    { label: 'Notify owner', options: ['Yes, before archiving', 'Yes, after archiving', 'No notification'] },
  ] },
];

export default function FilesHub() {
  return (
    <div>
      <HubHeader title="Files" product="Files" metrics={[]} insights={insights} automations={AUTOMATIONS} />
      <div className="px-8 pb-8 space-y-6">
        <h2 className="text-lg font-semibold text-[var(--text-neutral-xx-strong)] mb-4">All Files</h2>

        {/* Folders */}
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-neutral-x-strong)] mb-3">Folders</h3>
          <CardGrid items={FOLDERS} />
        </div>

        {/* File list placeholder */}
        <ContentBlock height={300} />
      </div>
    </div>
  );
}
