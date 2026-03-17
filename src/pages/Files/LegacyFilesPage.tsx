import { useState } from 'react';
import { LegacySubNav } from '../../components/LegacySubNav';
import type { SubNavItem } from '../../components/LegacySubNav';
import { Icon } from '../../components/Icon';

const SUB_NAV: SubNavItem[] = [
  { id: 'all-files', label: 'All Files', icon: 'file-lines' },
  { id: 'signature-templates', label: 'Signature Templates', icon: 'pen-to-square' },
  { id: 'implementation', label: 'Implementation', icon: 'user-group' },
];

const FOLDERS: SubNavItem[] = [
  { id: 'applicant-offer-letters', label: 'Applicant Offer Letters (5)', icon: 'folder' },
  { id: 'applicant-resumes', label: 'Applicant Resumes (67)', icon: 'folder' },
  { id: 'application-attachments', label: 'Application Comment Attachments (0)', icon: 'folder' },
  { id: 'bamboohr', label: 'BambooHR (8)', icon: 'folder' },
  { id: 'benefits-recovery', label: 'Benefits Recovery (9)', icon: 'folder' },
  { id: 'benefits-upgrade', label: 'Benefits Upgrade (2)', icon: 'folder' },
  { id: 'company-files', label: 'Company Files (4)', icon: 'folder' },
  { id: 'new-hire-forms', label: 'New Hire Forms (4)', icon: 'folder' },
  { id: 'test', label: 'Test (1)', icon: 'folder' },
];

const SAMPLE_FILES = [
  { name: 'Background_Check_Auth.pdf', date: '02/13/2024', by: 'Cora Parsons', size: '2.60MB' },
  { name: 'Clarissa Jones Offer.pdf', date: '01/27/2024', by: 'David Lesue', size: '482KB' },
  { name: 'Domination (US Master Account) Cora Parsons Offer.pdf', date: '02/13/2024', by: 'Shannon Anderson', size: '1.13MB' },
  { name: 'Jennifer Williams Offer.pdf', date: '02/10/2024', by: 'David Lesue', size: '495KB' },
  { name: 'Jeremy Steel Offer.pdf', date: '02/10/2024', by: 'David Lesue', size: '492KB' },
];

export default function LegacyFilesPage() {
  const [active, setActive] = useState('applicant-offer-letters');

  const allItems = [...SUB_NAV, ...FOLDERS];
  const activeItem = allItems.find(i => i.id === active);
  const folderName = activeItem?.label?.replace(/\s*\(\d+\)$/, '') || 'All Files';

  return (
    <div className="p-8">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[var(--text-neutral-xx-strong)]">Files</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-primary-strong)] text-[var(--color-primary-strong)] text-sm font-medium hover:bg-[var(--color-primary-strong)]/5 transition-colors">
            <Icon name="arrow-up-from-bracket" size={13} />
            Upload File
          </button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-6">
        {/* Sub-nav */}
        <div className="shrink-0 w-[220px]">
          <LegacySubNav items={SUB_NAV} activeId={active} onSelect={setActive} />
          <div className="h-px bg-[var(--border-neutral-xx-weak)] my-3" />
          <LegacySubNav items={FOLDERS} activeId={active} onSelect={setActive} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl border border-[var(--border-neutral-xx-weak)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--text-neutral-xx-strong)]">{folderName}</h2>
              <div className="flex items-center gap-2 text-sm text-[var(--text-neutral-weak)]">
                <span>Sort by</span>
                <select className="border border-[var(--border-neutral-weak)] rounded-md px-2 py-1 text-sm bg-white">
                  <option>Name: A - Z</option>
                </select>
              </div>
            </div>

            <div className="text-sm text-[var(--text-neutral-weak)] mb-4">
              Select All Files ({SAMPLE_FILES.length})
            </div>

            <div className="divide-y divide-[var(--border-neutral-xx-weak)]">
              {SAMPLE_FILES.map((file) => (
                <div key={file.name} className="flex items-start gap-3 py-3">
                  <Icon name="file-lines" size={16} className="text-red-700 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-primary-strong)] hover:underline cursor-pointer">{file.name}</p>
                    <p className="text-xs text-[var(--text-neutral-weak)] mt-0.5">
                      Added {file.date} by {file.by} ({file.size})
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
