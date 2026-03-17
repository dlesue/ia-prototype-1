import { useState, useEffect } from 'react';
import { LegacySubNav } from '../../components/LegacySubNav';
import type { SubNavItem } from '../../components/LegacySubNav';
import { ContentBlock } from '../../components/ContentBlock';
import { Icon } from '../../components/Icon';
import type { IconName } from '../../components/Icon';
import { useScenario } from '../../contexts/ScenarioContext';

const SUB_NAV: SubNavItem[] = [
  { id: 'account', label: 'Account', icon: 'wrench' },
  { id: 'access-levels', label: 'Access Levels', icon: 'lock' },
  { id: 'employee-fields', label: 'Employee Fields', icon: 'user-group' },
  { id: 'approvals', label: 'Approvals', icon: 'check-circle' },
  { id: 'apps', label: 'Apps', icon: 'compass' },
  { id: 'ask-bamboohr', label: 'Ask BambooHR', icon: 'sparkles' },
  { id: 'benefits', label: 'Benefits', icon: 'shield' },
  { id: 'company-directory', label: 'Company Directory', icon: 'user-group' },
  { id: 'compensation', label: 'Compensation', icon: 'circle-dollar' },
  { id: 'custom-fields', label: 'Custom Fields & Tables', icon: 'table-cells' },
  { id: 'email-alerts', label: 'Email Alerts', icon: 'envelope' },
  { id: 'employee-community', label: 'Employee Community', icon: 'face-smile' },
  { id: 'employee-satisfaction', label: 'Employee Satisfaction', icon: 'face-smile' },
  { id: 'employee-wellbeing', label: 'Employee Wellbeing', icon: 'face-smile' },
  { id: 'global-employment', label: 'Global Employment', icon: 'building' },
  { id: 'hiring', label: 'Hiring', icon: 'id-badge' },
  { id: 'holidays', label: 'Holidays', icon: 'calendar' },
  { id: 'logo-color', label: 'Logo & Color', icon: 'palette' },
  { id: 'offboarding', label: 'Offboarding', icon: 'door-open' },
  { id: 'onboarding', label: 'Onboarding', icon: 'door-open' },
  { id: 'payroll', label: 'Payroll', icon: 'circle-dollar' },
  { id: 'performance', label: 'Performance', icon: 'bullseye' },
  { id: 'time-off', label: 'Time Off', icon: 'clock' },
  { id: 'time-tracking', label: 'Time Tracking', icon: 'clock' },
  { id: 'total-rewards', label: 'Total Rewards', icon: 'star' },
  { id: 'training', label: 'Training', icon: 'graduation-cap' },
];

/** Access Levels grouped third nav */
interface AccessLevelGroup {
  header?: string;
  items: string[];
}
const ACCESS_LEVEL_GROUPS: AccessLevelGroup[] = [
  { items: ['All (91)', 'Full Admin (2)', 'Payroll Admin (0)'] },
  { header: 'Employee Levels', items: ['Employees Australia (6)', 'Employees Canada (7)', 'Employees UK (13)', 'Employees US (63)'] },
  { header: 'Manager Levels', items: ['Managers Australia (0)', 'Managers Canada (0)', 'Managers UK (0)', 'Managers US (0)'] },
  { header: 'Custom Levels', items: ['Benefits Administrator (0)', 'Finance (0)', 'IT (0)', 'Payroll Admin (Non-Approver) (0)', 'Payroll Reports Only (0)', 'Recruitment (0)', 'Sales (0)', 'Training and Development (0)'] },
  { items: ['Post-Employment Access (0)', 'No Access (7)'] },
];

/** Third-level tabs for sub-nav items that have them */
const THIRD_NAV: Record<string, string[]> = {
  'account': ['Account Info', 'Billing', 'ACA Settings', 'General Settings', 'iCalendar Feeds', 'Webhooks', 'Import Hours', 'Login Settings', 'API & App Access', 'Company Ownership'],
  'employee-fields': ['Department', 'Division', 'Employment Status', 'Job Title', 'Location', 'Teams', 'Compensation Change Reason', 'Degree', 'Emergency Contact Relationship', 'Termination Reason', 'Pay Schedule'],
  'approvals': ['Information Updates', 'Time Off Requests', 'Compensation', 'Employment Status', 'Job Information', 'Promotion', 'Asset Request'],
  'hiring': ['Candidate Statuses', 'Candidate Sources', 'Email Templates', 'Interview Templates', 'Offer Templates', 'Calendar & Video Access'],
  'offboarding': ['Offboarding Tasks', 'Post-Employment Access'],
  'payroll': ['Company Information', 'Bank Account', 'Pay Schedules', 'Taxes', 'Garnishment Payments', 'Extra Pay', 'Journal Entry', 'Workers\' Comp', 'Paper Checks'],
  'time-off': ['Overview'],
  'time-tracking': ['Employees', 'Project Tracking', 'Shift Differentials'],
};

interface UpsellConfig {
  eyebrow: string;
  headline: string;
  subheadline: string;
  benefits: { icon: IconName; title: string; description: string }[];
  trustSignal: string;
  ctaLabel: string;
  ctaReassurance: string;
  ctaSecondary?: string;
}

const SETTINGS_UPSELL: Record<string, UpsellConfig> = {
  payroll: {
    eyebrow: 'Payroll Add-On',
    headline: 'Payroll that runs itself (almost)',
    subheadline: 'Your employee data is already here. Payroll just picks it up \u2014 no re-entering names, addresses, or tax info. A few clicks and everyone gets paid, on time, every time.',
    benefits: [
      { icon: 'clock', title: 'Minutes, not hours', description: 'New hires, terminations, and address changes flow straight from BambooHR into your payroll run. No spreadsheets, no copy-paste, no "wait, did I update that?"' },
      { icon: 'circle-dollar', title: 'Taxes handled, filings done', description: 'Federal, state, and local taxes are calculated automatically. Quarterly and year-end filings happen without you chasing deadlines or second-guessing the math.' },
      { icon: 'check-circle', title: 'One place for everything', description: 'Stop toggling between systems. Pay stubs, tax documents, deductions, and garnishments all live where your employee records already do.' },
    ],
    trustSignal: 'Companies using BambooHR Payroll spend 40% less time on payroll processing each month.',
    ctaLabel: 'Add Payroll to Your Account',
    ctaReassurance: 'No long-term commitment. You can start with your next pay cycle.',
    ctaSecondary: 'See pricing details',
  },
  benefits: {
    eyebrow: 'Benefits Add-On',
    headline: 'Benefits without the back-and-forth',
    subheadline: 'Open enrollment, life events, carrier changes \u2014 it all happens where your employee data already lives. Less paperwork for you, less confusion for your people.',
    benefits: [
      { icon: 'user-check', title: 'Enrollment on autopilot', description: 'Employees pick their plans, you review and approve. No chasing people down with forms or manually keying elections into a carrier portal.' },
      { icon: 'shield', title: 'Carrier connections built in', description: 'Changes sync directly to your carriers. When someone adds a dependent or switches plans, the update goes through without you playing middleman.' },
      { icon: 'chart-line', title: 'Costs you can actually see', description: 'Know what you\u2019re spending on benefits at a glance. Track enrollment rates, plan costs, and COBRA status without pulling it together from three different places.' },
    ],
    trustSignal: 'BambooHR Benefits customers reduce enrollment processing time by up to 60%.',
    ctaLabel: 'Add Benefits to Your Account',
    ctaReassurance: 'Set up at your own pace. Most teams are live within a week.',
    ctaSecondary: 'See pricing details',
  },
};

export default function LegacySettingsPage() {
  const { addons } = useScenario();
  const [active, setActive] = useState('account');
  const [activeTab, setActiveTab] = useState('Account Info');

  // Reset third-level tab when sub-nav changes
  useEffect(() => {
    if (active === 'access-levels') {
      setActiveTab('All (91)');
    } else {
      const tabs = THIRD_NAV[active];
      if (tabs) {
        setActiveTab(tabs[0]);
      }
    }
  }, [active]);

  const tabs = THIRD_NAV[active];
  const sectionLabel = SUB_NAV.find(i => i.id === active)?.label || 'Account';

  // Check if current settings section should show upsell
  const upsellConfig = (active === 'payroll' && !addons.includes('payroll'))
    ? SETTINGS_UPSELL.payroll
    : (active === 'benefits' && !addons.includes('benefits'))
      ? SETTINGS_UPSELL.benefits
      : null;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[var(--text-neutral-xx-strong)]">Settings</h1>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-6">
        {/* Sub-nav */}
        <div className="shrink-0 w-[220px] max-h-[calc(100vh-180px)] overflow-y-auto">
          <LegacySubNav items={SUB_NAV} activeId={active} onSelect={setActive} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {upsellConfig ? (
            <div className="flex items-center justify-center py-12">
              <div className="max-w-[580px] w-full">
                <div className="text-center mb-8">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary-strong)] mb-2">
                    {upsellConfig.eyebrow}
                  </p>
                  <h2 className="text-[28px] font-bold text-[var(--text-neutral-xx-strong)] leading-tight mb-3">
                    {upsellConfig.headline}
                  </h2>
                  <p className="text-[15px] text-[var(--text-neutral-medium)] leading-relaxed max-w-[480px] mx-auto">
                    {upsellConfig.subheadline}
                  </p>
                </div>
                <div className="space-y-3 mb-8">
                  {upsellConfig.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white rounded-xl border border-[var(--border-neutral-xx-weak)] p-4">
                      <div className="w-9 h-9 rounded-lg bg-[var(--surface-neutral-xx-weak)] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon name={b.icon} size={16} className="text-[var(--color-primary-strong)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] mb-0.5">{b.title}</h3>
                        <p className="text-[13px] text-[var(--text-neutral-medium)] leading-relaxed">{b.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-[13px] text-[var(--text-neutral-weak)] mb-6 italic">
                  {upsellConfig.trustSignal}
                </p>
                <div className="text-center">
                  <button className="px-6 py-3 text-sm font-semibold text-white bg-[var(--color-primary-strong)] rounded-lg hover:opacity-90 transition-opacity">
                    {upsellConfig.ctaLabel}
                  </button>
                  <p className="text-[12px] text-[var(--text-neutral-weak)] mt-2.5">{upsellConfig.ctaReassurance}</p>
                  {upsellConfig.ctaSecondary && (
                    <button className="mt-2 text-[13px] font-medium text-[var(--color-primary-strong)] hover:underline">
                      {upsellConfig.ctaSecondary}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
          <div className="bg-white rounded-xl border border-[var(--border-neutral-xx-weak)] p-6">
            <h2 className="text-lg font-semibold text-[var(--text-neutral-xx-strong)] mb-4 border-b border-[var(--border-neutral-xx-weak)] pb-3">
              {sectionLabel}
            </h2>

            {active === 'access-levels' ? (
              <div className="flex gap-6">
                {/* Grouped third-level nav */}
                <div className="w-[200px] shrink-0 space-y-5 overflow-y-auto max-h-[calc(100vh-280px)]">
                  {ACCESS_LEVEL_GROUPS.map((group, gi) => (
                    <div key={gi}>
                      {gi > 0 && <div className="h-px bg-[var(--border-neutral-xx-weak)] mb-3" />}
                      {group.header && (
                        <p className="text-[12px] font-bold text-[var(--text-neutral-x-strong)] px-3 mb-1">{group.header}</p>
                      )}
                      <div className="space-y-0.5">
                        {group.items.map((item) => (
                          <button
                            key={item}
                            onClick={() => setActiveTab(item)}
                            className={`w-full text-left px-3 py-1.5 text-[13px] rounded-md transition-colors ${
                              item === activeTab
                                ? 'text-[var(--color-primary-strong)] font-semibold'
                                : 'text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)]'
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tab content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-[var(--color-primary-strong)] mb-3">{activeTab}</h3>
                  <ContentBlock label={activeTab} />
                </div>
              </div>
            ) : tabs ? (
              <div className="flex gap-6">
                {/* Third-level tabs */}
                <div className="w-[170px] shrink-0 space-y-0.5">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`w-full text-left px-3 py-1.5 text-[13px] rounded-md transition-colors ${
                        tab === activeTab
                          ? 'text-[var(--color-primary-strong)] font-semibold'
                          : 'text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-[var(--color-primary-strong)] mb-3">{activeTab}</h3>
                  <ContentBlock label={activeTab} />
                </div>
              </div>
            ) : (
              <ContentBlock label={sectionLabel} />
            )}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
