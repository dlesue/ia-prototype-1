import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';

const candidates = [
  { name: 'Nathan Rose', location: 'Glasgow City', phone: '+44 20 5555 2023', status: 'Schedule Interview', statusSub: 'Updated over 2 years ago', rating: 5, applied: 'Oct 12, 2023', stage: 'Interview', stageSub: 'Sent over 2 years ago' },
  { name: 'Jodi Edwards', location: 'Paris', phone: '+44 20 5555 1233', status: 'Phone Screened', statusSub: 'Updated over 2 years ago', rating: 3, applied: 'Oct 12, 2023', stage: 'Re: Let\'s Talk', stageSub: 'Received' },
  { name: 'Jacob Parks', location: 'Llanelli', phone: '+44 20 5555 9932', status: 'Reviewed', statusSub: 'Updated over 2 years ago', rating: 5, applied: 'Oct 12, 2023', stage: 'Re: Let\'s Talk', stageSub: 'Received' },
  { name: 'Fred Hunt', location: 'Yate, Bristol, City of', phone: '+44 20 55555 2342', status: 'Reviewed', statusSub: 'Updated over 2 years ago', rating: 4, applied: 'Oct 12, 2023', stage: 'Re: Let\'s Talk', stageSub: 'Received' },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Icon key={i} name="star" size={14} className={i <= count ? 'text-amber-400' : 'text-neutral-200'} variant={i <= count ? 'solid' : 'regular'} />
      ))}
    </div>
  );
}

export default function HiringJobOpeningDetail() {
  const [reportsOpen, setReportsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="px-8 pb-8">
      {/* Back + Breadcrumb */}
      <div className="pt-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-[13px] text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)] transition-colors mb-1"
        >
          <Icon name="chevron-left" size={10} />
          Back
        </button>
        <div className="flex items-center gap-1.5 text-[13px] text-[var(--text-neutral-weak)] mb-2">
          <Link to="/hiring" className="text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)] transition-colors">Hiring</Link>
          <Icon name="chevron-right" size={8} />
          <Link to="/hiring/job-openings" className="text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)] transition-colors">Job Openings</Link>
          <Icon name="chevron-right" size={8} />
          <span>IT Security Engineer</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-primary-strong)', lineHeight: 1.2 }}>IT Security Engineer</h1>
          <div className="h-2.5 w-48 rounded bg-[var(--border-neutral-xx-weak)] mt-2" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[var(--border-neutral-xx-weak)]" />
            <div className="flex flex-col gap-1">
              <div className="h-2 w-16 rounded bg-[var(--border-neutral-xx-weak)]" />
              <div className="h-2.5 w-20 rounded bg-[var(--border-neutral-xx-weak)]" />
            </div>
          </div>
          <div className="border-l border-[var(--border-neutral-xx-weak)] pl-4 flex flex-col items-center gap-1">
            <div className="h-2 w-10 rounded bg-[var(--border-neutral-xx-weak)]" />
            <div className="h-2.5 w-8 rounded bg-[var(--border-neutral-xx-weak)]" />
          </div>
          <div className="border-l border-[var(--border-neutral-xx-weak)] pl-4 flex flex-col items-center gap-1">
            <div className="h-2 w-10 rounded bg-[var(--border-neutral-xx-weak)]" />
            <div className="h-2.5 w-14 rounded bg-[var(--border-neutral-xx-weak)]" />
          </div>
        </div>
      </div>

      {/* Tabs + toolbar */}
      <div className="flex items-center justify-between border-b border-[var(--border-neutral-xx-weak)] mb-6">
        <div className="flex gap-6 pb-3">
          <div className="h-3 w-20 rounded bg-[var(--border-neutral-xx-weak)]" />
          <div className="h-3 w-24 rounded bg-[var(--border-neutral-xx-weak)]" />
        </div>
        <div className="flex items-center gap-2 pb-3 relative">
          <button
            onClick={() => setReportsOpen(!reportsOpen)}
            className={`h-9 px-3 rounded-full border flex items-center justify-center gap-1.5 transition-colors ${reportsOpen ? 'border-[var(--color-primary-strong)] bg-green-50' : 'border-[var(--border-neutral-weak)] hover:bg-[var(--bg-neutral-weak)]'}`}
          >
            <Icon name="chart-bar" size={14} className={reportsOpen ? 'text-[var(--color-primary-strong)]' : 'text-[var(--text-neutral-weak)]'} />
            <Icon name="chevron-down" size={8} className={reportsOpen ? 'text-[var(--color-primary-strong)]' : 'text-[var(--text-neutral-weak)]'} />
          </button>
          <div className="h-9 w-9 rounded-full bg-[var(--border-neutral-xx-weak)]" />
          <div className="h-9 w-9 rounded-full bg-[var(--border-neutral-xx-weak)]" />
          <div className="h-9 w-9 rounded-full bg-[var(--border-neutral-xx-weak)]" />

          {/* Reports dropdown */}
          {reportsOpen && (
            <div className="absolute top-full right-20 mt-1 bg-white border border-[var(--border-neutral-xx-weak)] rounded-lg shadow-lg py-1.5 z-10 min-w-[230px]">
              <button className="w-full text-left px-4 py-2 text-sm text-[var(--text-neutral-x-strong)] hover:bg-[var(--bg-neutral-weak)]">Candidate Funnel Report</button>
              <button className="w-full text-left px-4 py-2 text-sm text-[var(--text-neutral-x-strong)] hover:bg-[var(--bg-neutral-weak)]">Candidate Sources Report</button>
              <button className="w-full text-left px-4 py-2 text-sm text-[var(--text-neutral-x-strong)] hover:bg-[var(--bg-neutral-weak)]">Export Job Data</button>
            </div>
          )}
        </div>
      </div>

      {/* Abstract table content */}
      <div className="rounded-xl border border-[var(--border-neutral-xx-weak)] bg-white overflow-hidden">
        {/* Abstract header row */}
        <div className="flex gap-8 px-5 py-3 border-b border-[var(--border-neutral-xx-weak)]">
          <div className="h-2.5 w-24 rounded bg-[var(--border-neutral-xx-weak)]" />
          <div className="h-2.5 w-16 rounded bg-[var(--border-neutral-xx-weak)]" />
          <div className="h-2.5 w-14 rounded bg-[var(--border-neutral-xx-weak)]" />
          <div className="h-2.5 w-16 rounded bg-[var(--border-neutral-xx-weak)]" />
          <div className="flex-1" />
        </div>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex items-center gap-8 px-5 py-4 border-b border-[var(--border-neutral-xx-weak)] last:border-b-0">
            <div className="flex flex-col gap-1.5 w-24">
              <div className="h-2.5 w-full rounded bg-[var(--border-neutral-xx-weak)]" />
              <div className="h-2 w-3/4 rounded bg-[var(--border-neutral-xx-weak)]" />
            </div>
            <div className="flex flex-col gap-1.5 w-16">
              <div className="h-2.5 w-full rounded bg-[var(--border-neutral-xx-weak)]" />
              <div className="h-2 w-2/3 rounded bg-[var(--border-neutral-xx-weak)]" />
            </div>
            <div className="flex gap-1 w-14">
              {[1,2,3,4,5].map(s => (
                <div key={s} className="w-2.5 h-2.5 rounded-full bg-[var(--border-neutral-xx-weak)]" />
              ))}
            </div>
            <div className="h-2.5 w-16 rounded bg-[var(--border-neutral-xx-weak)]" />
            <div className="flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
