import React from 'react';
import { Link } from 'react-router-dom';
import { HubHeader } from '../../components/HubHeader';
import type { HubAutomation } from '../../components/HubHeader';
import { Icon } from '../../components/Icon';

const metrics = [
  { label: 'Open Positions', value: '23', trend: 'up' as const, trendValue: '+4', sparkData: [14, 16, 18, 19, 21, 20, 23], vizType: 'bar' as const, linkTo: '/reports/view/Open%20Positions' },
  { label: 'Avg Time-to-Hire', value: '34 days', trend: 'down' as const, trendValue: '-3d', dotValue: 34, dotMax: 60, vizType: 'dot' as const, linkTo: '/reports/view/Avg%20Time-to-Hire' },
  { label: 'Pipeline', value: '187', trend: 'up' as const, trendValue: '+22', sparkData: [145, 152, 158, 163, 171, 179, 187], linkTo: '/reports/view/Pipeline' },
  { label: 'Offer Accept Rate', value: '82%', trend: 'up' as const, trendValue: '+5%', progressPercent: 82, vizType: 'progress' as const, linkTo: '/reports/view/Offer%20Accept%20Rate' },
];

const insights = [
  { text: 'Senior Engineer roles average 47 days to fill — 38% above target', shortText: 'Eng roles slow', icon: 'chart-line' },
  { text: 'Referral candidates have 2.4x higher offer acceptance rate', shortText: 'Referrals excel', icon: 'sparkles' },
  { text: '5 candidates have been in final interview for 10+ days', shortText: '5 stalled candidates', icon: 'clock' },
];

const jobOpenings = [
  { candidates: 4, newCandidates: 0, title: 'IT Security Engineer', dept: 'IT - Mayfaird, London, City of', lead: 'Eric Asture', created: 'Oct 1, 2023', ago: '2 years ago', status: 'Open', link: '/hiring/job-openings/it-security-engineer' },
  { candidates: 12, newCandidates: 3, title: 'Senior Product Designer', dept: 'Product - Remote', lead: 'David Lesue', created: 'Feb 10, 2025', ago: '1 month ago', status: 'Open', link: '/hiring/job-openings/it-security-engineer' },
  { candidates: 8, newCandidates: 1, title: 'Staff Software Engineer', dept: 'Engineering - Lindon, UT', lead: 'Adam Holt', created: 'Jan 22, 2025', ago: '2 months ago', status: 'Open', link: '/hiring/job-openings/it-security-engineer' },
  { candidates: 0, newCandidates: 0, title: 'Customer Success Manager', dept: 'Customer Success - Remote', lead: 'Aaron Eckerly', created: 'Jan 15, 2025', ago: '2 months ago', status: 'Draft', link: '/hiring/job-openings/it-security-engineer' },
  { candidates: 5, newCandidates: 0, title: 'Marketing Content Strategist', dept: 'Marketing - Lindon, UT', lead: 'Trent Walsh', created: 'Dec 8, 2024', ago: '3 months ago', status: 'Open', link: '/hiring/job-openings/it-security-engineer' },
  { candidates: 3, newCandidates: 0, title: 'Data Analyst', dept: 'Analytics - Remote', lead: 'Sarah Chen', created: 'Nov 20, 2024', ago: '4 months ago', status: 'Open', link: '/hiring/job-openings/it-security-engineer' },
];

const AUTOMATIONS: HubAutomation[] = [
  { text: 'Alert recruiters when candidates stall in final interview for 7+ days', shortText: 'Alert stalled candidates', fields: [
    { label: 'Stall threshold', options: ['5 days', '7 days', '10 days'] },
    { label: 'Stage', options: ['Final interview only', 'Any interview stage', 'All pipeline stages'] },
    { label: 'Notify', options: ['Recruiter only', 'Recruiter + Hiring manager', 'Hiring manager only'] },
  ] },
  { text: 'Auto-advance candidates who pass screening assessment', shortText: 'Auto-advance screened', fields: [
    { label: 'Passing score', options: ['70% or above', '80% or above', '90% or above'] },
    { label: 'Advance to', options: ['Phone screen', 'First interview', 'Next stage'] },
    { label: 'Notify', options: ['Recruiter only', 'Recruiter + Candidate', 'Hiring manager'] },
  ] },
];

export default function HiringHub() {
  return (
    <div>
      <HubHeader title="Hiring" product="Hiring" metrics={metrics} insights={insights} automations={AUTOMATIONS} />
      <div className="px-8 pb-8 space-y-6">
        <h2 className="text-lg font-semibold text-[var(--text-neutral-xx-strong)]">Job Openings</h2>

        {/* Abstract toolbar */}
        <div className="flex items-center justify-between">
          <div className="h-8 w-36 rounded-full bg-[var(--border-neutral-xx-weak)]" />
          <div className="flex items-center gap-3">
            <div className="h-3 w-24 rounded bg-[var(--border-neutral-xx-weak)]" />
            <div className="h-8 w-28 rounded-lg bg-[var(--border-neutral-xx-weak)]" />
            <div className="h-8 w-8 rounded bg-[var(--border-neutral-xx-weak)]" />
          </div>
        </div>

        {/* Table card */}
        <div className="bg-white rounded-xl border border-[var(--border-neutral-xx-weak)] overflow-hidden">
          {/* Abstract header row */}
          <div className="flex gap-8 px-5 py-3 border-b border-[var(--border-neutral-xx-weak)]">
            <div className="h-2.5 w-20 rounded bg-[var(--border-neutral-xx-weak)]" />
            <div className="h-2.5 w-24 rounded bg-[var(--border-neutral-xx-weak)]" />
            <div className="h-2.5 w-20 rounded bg-[var(--border-neutral-xx-weak)]" />
            <div className="h-2.5 w-20 rounded bg-[var(--border-neutral-xx-weak)]" />
            <div className="h-2.5 w-14 rounded bg-[var(--border-neutral-xx-weak)]" />
          </div>

          {/* Real IT Security Engineer row */}
          <Link to="/hiring/job-openings/it-security-engineer" className="flex items-center px-5 py-3.5 border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--bg-neutral-weak)] cursor-pointer">
            <div className="w-20">
              <div className="flex items-center gap-1.5">
                <Icon name="user-group" size={12} className="text-green-600" />
                <span className="text-sm text-[var(--text-neutral-x-strong)]">4</span>
              </div>
            </div>
            <div className="flex-1 min-w-0 px-4">
              <span className="text-sm font-medium text-[var(--color-primary-strong)] hover:underline">IT Security Engineer</span>
              <div className="text-xs text-[var(--text-neutral-weak)]">IT - Mayfaird, London, City of</div>
            </div>
            <div className="w-28 px-4 text-sm text-[var(--text-neutral-x-strong)]">Eric Asture</div>
            <div className="w-28 px-4">
              <div className="text-sm text-[var(--text-neutral-x-strong)]">Oct 1, 2023</div>
              <div className="text-xs text-[var(--text-neutral-weak)]">2 years ago</div>
            </div>
            <div className="w-16 text-sm text-[var(--text-neutral-x-strong)]">Open</div>
          </Link>

          {/* Abstract remaining rows */}
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center gap-8 px-5 py-4 border-b border-[var(--border-neutral-xx-weak)] last:border-b-0">
              <div className="w-20">
                <div className="h-2.5 w-8 rounded bg-[var(--border-neutral-xx-weak)]" />
              </div>
              <div className="flex-1 min-w-0 px-4 flex flex-col gap-1.5">
                <div className="h-2.5 w-40 rounded bg-[var(--border-neutral-xx-weak)]" />
                <div className="h-2 w-28 rounded bg-[var(--border-neutral-xx-weak)]" />
              </div>
              <div className="w-28 px-4">
                <div className="h-2.5 w-20 rounded bg-[var(--border-neutral-xx-weak)]" />
              </div>
              <div className="w-28 px-4 flex flex-col gap-1.5">
                <div className="h-2.5 w-20 rounded bg-[var(--border-neutral-xx-weak)]" />
                <div className="h-2 w-16 rounded bg-[var(--border-neutral-xx-weak)]" />
              </div>
              <div className="w-16">
                <div className="h-2.5 w-10 rounded bg-[var(--border-neutral-xx-weak)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
