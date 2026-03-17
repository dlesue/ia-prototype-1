import { useState, useEffect, useRef } from 'react';
import { Icon } from '../Icon';
import { ContentBlock } from '../ContentBlock';

interface ProductSettingsModalProps {
  productLabel: string;
  isOpen: boolean;
  onClose: () => void;
}

/** Map product labels to their settings nav items */
const PRODUCT_NAV: Record<string, string[]> = {
  People: ['Directory Settings', 'Org Chart', 'Employee Fields'],
  Hiring: ['Candidate Statuses', 'Candidate Sources', 'Email Templates', 'Interview Templates', 'Offer Templates', 'Calendar & Video Access'],
  Onboarding: ['Onboarding Tasks', 'New Hire Packets', 'Offboarding Tasks', 'Post-Employment Access'],
  Payroll: ['Company Information', 'Bank Account', 'Pay Schedules', 'Taxes', 'Garnishment Payments', 'Extra Pay', 'Journal Entry', 'Workers\' Comp', 'Paper Checks'],
  Benefits: ['Enrollment', 'Plan Display', 'Carriers', 'Deductions'],
  Performance: ['Review Cycles', 'Goals', 'Feedback', 'One-on-Ones'],
  Training: ['Course Settings', 'Assignments', 'Certifications'],
  Compensation: ['Compensation Planning', 'Pay Bands', 'Benchmarks', 'Total Rewards'],
  Culture: ['Recognition', 'Community', 'Surveys'],
  'Time & Attendance': ['Overview', 'Time Off Policies', 'Employees', 'Project Tracking', 'Shift Differentials', 'Timesheets'],
  Reports: ['Report Access', 'Scheduled Reports', 'Dashboards'],
  Files: ['File Management', 'E-Signatures', 'Folders'],
  Apps: ['Integrations', 'API Access', 'Marketplace'],
};

export function ProductSettingsModal({ productLabel, isOpen, onClose }: ProductSettingsModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const navItems = PRODUCT_NAV[productLabel] || ['General'];
  const [activeItem, setActiveItem] = useState(navItems[0]);

  // Reset active item when product changes
  useEffect(() => {
    const items = PRODUCT_NAV[productLabel] || ['General'];
    setActiveItem(items[0]);
  }, [productLabel]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40"
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[1100px] h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-neutral-xx-weak)] shrink-0">
          <div className="flex items-center gap-2">
            <Icon name="gear" size={16} className="text-[var(--text-neutral-medium)]" />
            <h2 className="text-base font-semibold text-[var(--text-neutral-xx-strong)]">{productLabel} Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
          >
            <Icon name="xmark" size={14} className="text-[var(--icon-neutral-x-strong)]" />
          </button>
        </div>

        {/* Body — two column */}
        <div className="flex-1 flex min-h-0">
          {/* Vertical nav */}
          <div className="w-[180px] shrink-0 border-r border-[var(--border-neutral-xx-weak)] py-3 px-3 space-y-0.5 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveItem(item)}
                className={`w-full text-left px-3 py-1.5 text-[13px] rounded-md transition-colors ${
                  item === activeItem
                    ? 'text-[var(--color-primary-strong)] font-semibold'
                    : 'text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 p-6 overflow-y-auto">
            <h3 className="text-base font-semibold text-[var(--color-primary-strong)] mb-3">{activeItem}</h3>
            <ContentBlock label={activeItem} height={300} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-[var(--border-neutral-xx-weak)] shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[var(--text-neutral-x-strong)] border border-[var(--border-neutral-weak)] rounded-lg hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary-strong)] rounded-lg hover:opacity-90 transition-opacity"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductSettingsModal;
