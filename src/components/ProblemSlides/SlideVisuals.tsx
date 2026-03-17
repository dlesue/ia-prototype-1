import React, { useState, useEffect } from 'react';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';

type Mode = 'problem' | 'solution';

const boxBase = 'rounded-lg text-[17px] font-medium flex items-center justify-center';
const dimBox = `${boxBase} bg-white/[0.10] text-white/50 border border-white/[0.15]`;
const litBox = `${boxBase} bg-amber-400/25 text-amber-300 border border-amber-400/40`;
const redBox = `${boxBase} bg-red-400/20 text-red-300 border border-red-400/35`;
const navItem = 'px-5 py-3 rounded-lg text-[17px] font-medium text-left';
const navDim = `${navItem} bg-white/[0.10] text-white/50`;
const navLit = `${navItem} bg-amber-400/25 text-amber-300`;
const navRed = `${navItem} bg-red-400/20 text-red-300`;
const navLock = `${navItem} bg-white/[0.12] text-white/35 flex items-center gap-3`;

// 1. Taxonomy
function TaxonomyVisual({ mode }: { mode: Mode }) {
  if (mode === 'problem') {
    const rotations = [-3, 2, -1, 4, -2, 3, -4];
    return (
      <div className="flex flex-wrap gap-3 justify-center max-w-[500px]">
        {['Product?', 'Module?', 'Feature?', 'Add-on?', 'Tool?', 'Widget?', 'Setting?'].map((l, i) => (
          <div key={l} className={`${redBox} px-5 py-3 animate-slideFadeIn`} style={{ transform: `rotate(${rotations[i]}deg)`, animationDelay: `${i * 80}ms` }}>{l}</div>
        ))}
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-amber-400/25 bg-amber-400/[0.12] px-6 py-5 flex flex-col items-center gap-3 animate-slideFadeIn">
      <div className="text-amber-300 text-[17px] font-semibold">Product</div>
      <div className="flex gap-4">
        <div className="rounded-lg border border-amber-400/20 bg-amber-400/[0.12] px-5 py-3 flex flex-col items-center gap-2 animate-slideFadeIn" style={{ animationDelay: '200ms' }}>
          <div className="text-amber-300/80 text-[15px] font-medium">Module</div>
          <div className="flex gap-2">
            <div className="rounded bg-amber-400/10 text-amber-300/60 text-[13px] px-3 py-1.5">Feature</div>
            <div className="rounded bg-amber-400/10 text-amber-300/60 text-[13px] px-3 py-1.5">Feature</div>
          </div>
        </div>
        <div className="rounded-lg border border-amber-400/20 bg-amber-400/[0.12] px-5 py-3 flex flex-col items-center gap-2 animate-slideFadeIn" style={{ animationDelay: '350ms' }}>
          <div className="text-amber-300/80 text-[15px] font-medium">Module</div>
          <div className="flex gap-2">
            <div className="rounded bg-amber-400/10 text-amber-300/60 text-[13px] px-3 py-1.5">Feature</div>
            <div className="rounded bg-amber-400/10 text-amber-300/60 text-[13px] px-3 py-1.5">Feature</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Placement
function PlacementVisual({ mode }: { mode: Mode }) {
  if (mode === 'problem') {
    return (
      <div className="flex items-center gap-6 justify-center">
        <div className={`${redBox} px-6 py-5 animate-slideFadeIn`}>New thing</div>
        <div className="text-red-300/70 text-4xl animate-slideFadeIn" style={{ animationDelay: '100ms' }}>?</div>
        <div className="flex flex-col items-center gap-2 animate-slideFadeIn" style={{ animationDelay: '200ms' }}>
          <div className="text-red-300/70 text-2xl">&rarr;</div>
          <div className="text-red-300/70 text-2xl">&rarr;</div>
          <div className="text-red-300/70 text-2xl">&rarr;</div>
        </div>
        <div className="flex flex-col gap-2.5">
          {['New T1?', 'EE Profile?', 'Settings?'].map((l, i) => (
            <div key={l} className={`${dimBox} px-5 py-2.5 animate-slideFadeIn`} style={{ animationDelay: `${300 + i * 100}ms` }}>{l}</div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-6 justify-center">
      <div className={`${litBox} px-6 py-5 animate-slideFadeIn`}>New thing</div>
      <div className="flex flex-col items-center gap-2 animate-slideFadeIn" style={{ animationDelay: '150ms' }}>
        <div className="text-amber-300/50 text-2xl">&rarr;</div>
        <div className="text-amber-300/50 text-2xl">&rarr;</div>
        <div className="text-amber-300/50 text-2xl">&rarr;</div>
      </div>
      <div className="flex flex-col gap-2.5">
        {[
          { q: 'Own pricing?', a: 'Product', lit: true },
          { q: 'Major area?', a: 'Module', lit: true },
          { q: 'Everything else', a: 'Feature', lit: false },
        ].map((b, i) => (
          <div key={b.a} className="flex items-center gap-3 animate-slideFadeIn" style={{ animationDelay: `${250 + i * 100}ms` }}>
            <div className="text-amber-300/50 text-[14px] w-[120px] text-right whitespace-nowrap">{b.q}</div>
            <div className={`${litBox} px-5 py-2.5`}>{b.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. Product groupings
function GroupingsVisual({ mode }: { mode: Mode }) {
  if (mode === 'problem') {
    return (
      <div className="flex gap-3 justify-center">
        {['Community', 'Recognition', 'Wellbeing', 'eNPS'].map((l, i) => (
          <div key={l} className={`${redBox} px-5 py-10 animate-slideFadeIn`} style={{ animationDelay: `${i * 100}ms` }}>{l}</div>
        ))}
      </div>
    );
  }
  return (
    <div className={`${litBox} px-10 py-5 flex flex-col items-center gap-3 animate-slideFadeIn`} style={{ border: '1px solid rgba(251, 191, 36, 0.25)' }}>
      <div className="text-amber-300 text-[18px] font-semibold">Culture</div>
      <div className="flex gap-3">
        {['Community', 'Recognition', 'Wellbeing', 'eNPS'].map((l, i) => (
          <div key={l} className={`${dimBox} px-4 py-2 animate-slideFadeIn`} style={{ animationDelay: `${200 + i * 80}ms` }}>{l}</div>
        ))}
      </div>
    </div>
  );
}

// 4. Nav presence
function NavPresenceVisual({ mode }: { mode: Mode }) {
  if (mode === 'problem') {
    const orphans = [
      { label: 'Performance', rot: -3 },
      { label: 'Training', rot: 4 },
      { label: 'Benefits', rot: -2 },
      { label: 'Apps', rot: 3 },
      { label: 'Compensation', rot: -4 },
      { label: 'Global Employment', rot: 2 },
      { label: 'Onboarding', rot: -3 },
      { label: 'Offboarding', rot: 3 },
    ];
    const navItems = [
      { icon: 'home', label: 'Home' },
      { icon: 'user-group', label: 'People' },
      { icon: 'id-badge', label: 'Hiring' },
      { icon: 'money-bill-1', label: 'Payroll' },
      { icon: 'chart-pie-simple', label: 'Reports' },
      { icon: 'gear', label: 'Settings' },
    ];
    return (
      <div className="flex items-center gap-6">
        <div className="w-[180px] flex flex-col gap-1.5 animate-slideFadeIn">
          {navItems.map(({ icon, label }) => (
            <div key={label} className={`${navDim} flex items-center gap-2.5`}><Icon name={icon as any} size={13} className="text-white/30" /> {label}</div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2.5 max-w-[220px] justify-center items-center">
          {orphans.map(({ label, rot }, i) => (
            <div key={label} className={`${redBox} px-4 py-2 text-[13px] animate-slideFadeIn`} style={{ transform: `rotate(${rot}deg)`, animationDelay: `${300 + i * 80}ms` }}>{label}</div>
          ))}
        </div>
      </div>
    );
  }
  const items = ['Home', 'People', 'Hiring'];
  return (
    <div className="flex items-start">
      <div className="w-[220px] flex flex-col gap-1.5 relative">
        {items.map((l, i) => (
          <div key={l} className={`${navDim} animate-slideFadeIn`} style={{ animationDelay: `${i * 80}ms` }}>{l}</div>
        ))}
        <div className={`${navLit} animate-slideFadeIn`} style={{ animationDelay: '300ms' }}>Compensation</div>
        <div className="flex flex-col gap-0.5 ml-3">
          {['Benchmarks', 'Levels & Bands', 'Planning', 'Total Rewards'].map((l, i) => (
            <div key={l} className="text-[13px] text-amber-300/90 py-1 px-4 flex items-center gap-2 animate-slideFadeIn" style={{ animationDelay: `${400 + i * 60}ms` }}>
              <span className="text-amber-300/40 text-[11px]">&#8627;</span>
              <span>{l}</span>
            </div>
          ))}
        </div>
        <div className={`${navDim} animate-slideFadeIn`} style={{ animationDelay: '700ms' }}>Culture</div>
      </div>
    </div>
  );
}

// 5. Invisible products
function InvisibleVisual({ mode }: { mode: Mode }) {
  if (mode === 'problem') {
    const navItems = [
      { icon: 'home', label: 'Home' },
      { icon: 'circle-user', label: 'My Info' },
      { icon: 'user-group', label: 'People' },
      { icon: 'id-badge', label: 'Hiring' },
      { icon: 'chart-pie-simple', label: 'Reports' },
      { icon: 'file-lines', label: 'Files' },
    ];
    return (
      <div className="flex items-center gap-8">
        <div className="w-[180px] flex flex-col gap-1.5 animate-slideFadeIn">
          {navItems.map(({ icon, label }) => (
            <div key={label} className={`${navDim} flex items-center gap-2.5`}><Icon name={icon as any} size={13} className="text-white/30" /> {label}</div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2.5 max-w-[220px] justify-center">
          {['Benefits', 'Payroll', 'Benchmarks', 'Comp Planning', 'Performance'].map((l, i) => (
            <div key={l} className="px-5 py-3 rounded-lg text-[17px] font-medium text-red-300/80 border border-dashed border-red-400/35 line-through decoration-red-400/50 decoration-2 animate-slideFadeIn" style={{ transform: `rotate(${[2, -3, 3, -2, 4][i]}deg)`, animationDelay: `${300 + i * 100}ms` }}>{l}</div>
          ))}
        </div>
      </div>
    );
  }
  const items = [
    { label: 'Home', lit: false },
    { label: 'People', lit: false },
    { label: 'Hiring', lit: false },
    { label: 'Payroll', lit: false },
    { label: 'Performance', lit: true },
    { label: 'Compensation', lit: true },
    { label: 'Culture', lit: true },
  ];
  return (
    <div className="w-[220px] flex flex-col gap-1.5">
      {items.map((item, i) => (
        <div key={item.label} className={`${item.lit ? `${navLit} flex items-center gap-3` : navDim} animate-slideFadeIn`} style={{ animationDelay: `${i * 80}ms` }}>
          {item.label} {item.lit && <Icon name="lock" size={12} className="text-amber-300/60" />}
        </div>
      ))}
    </div>
  );
}

// 6. Settings damage
function SettingsDamageVisual({ mode }: { mode: Mode }) {
  if (mode === 'problem') {
    return (
      <div className="flex gap-8 justify-center items-stretch">
        <div className="w-[580px] animate-slideFadeIn">
          <div className="rounded-lg border border-white/[0.12] bg-white/[0.05] flex h-full overflow-hidden">
            {/* Collapsed main nav */}
            <div className="w-[36px] border-r border-white/[0.10] py-3 flex flex-col items-center gap-2.5 bg-white/[0.02] shrink-0 rounded-l-lg">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="w-4 h-4 rounded-full bg-white/[0.12]" />
              ))}
            </div>
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="flex items-center px-3 py-2 border-b border-white/[0.12]">
                <div className="h-3 w-16 rounded bg-white/[0.12]" />
                <div className="flex-1" />
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white/[0.12]" />
                  <div className="w-4 h-4 rounded-full bg-white/[0.12]" />
                  <div className="w-4 h-4 rounded-full bg-white/[0.12]" />
                </div>
              </div>
              {/* Page title */}
              <div className="px-4 py-2.5 border-b border-white/[0.12]">
                <div className="text-[15px] text-white/50 font-semibold text-left">Settings</div>
              </div>
              {/* Triple nav: categories > sub-items > content */}
              <div className="flex flex-1">
                <div className="w-[90px] border-r border-white/[0.10] py-2 flex flex-col gap-0.5">
                  {['Account', 'Payroll', 'Benefits', 'Perf', 'Time', 'Hiring', 'Culture', 'Comp'].map(l => (
                    <div key={l} className={`text-[11px] px-3 py-1.5 text-left ${l === 'Account' ? 'text-white/30' : 'text-red-300/80'}`}>{l}</div>
                  ))}
                </div>
                <div className="w-[80px] border-r border-white/[0.10] py-2 flex flex-col gap-0.5">
                  <div className="h-2 w-3/4 rounded bg-white/[0.05] mx-2.5 my-1" />
                  <div className="h-2 w-2/3 rounded bg-white/[0.05] mx-2.5 my-1" />
                  <div className="h-2 w-3/4 rounded bg-white/[0.05] mx-2.5 my-1" />
                </div>
                <div className="flex-1" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[580px] animate-slideFadeIn" style={{ animationDelay: '250ms' }}>
          <div className="rounded-lg border border-white/[0.12] bg-white/[0.05] flex h-full overflow-hidden">
            {/* Collapsed main nav */}
            <div className="w-[36px] border-r border-white/[0.10] py-3 flex flex-col items-center gap-2.5 bg-white/[0.02] shrink-0 rounded-l-lg">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="w-4 h-4 rounded-full bg-white/[0.12]" />
              ))}
            </div>
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="flex items-center px-3 py-2 border-b border-white/[0.12]">
                <div className="h-3 w-16 rounded bg-white/[0.12]" />
                <div className="flex-1" />
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white/[0.12]" />
                  <div className="w-4 h-4 rounded-full bg-white/[0.12]" />
                  <div className="w-4 h-4 rounded-full bg-white/[0.12]" />
                </div>
              </div>
              {/* Profile header with avatar */}
              <div className="flex items-center gap-4 px-5 py-4 bg-white/[0.05] border-b border-white/[0.12]">
                <div className="w-14 h-14 rounded bg-white/[0.12] border border-white/[0.12] flex items-center justify-center shrink-0">
                  <Icon name="circle-user" size={22} className="text-white/35" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-[17px] text-white/50 font-semibold">Jane Smith</div>
                  <div className="text-[12px] text-white/20">Marketing Manager</div>
                </div>
              </div>
              {/* Body: vitals sidebar + tabs/content */}
              <div className="flex flex-1">
                <div className="w-[90px] border-r border-white/[0.10] px-3 py-3 flex flex-col gap-2">
                  <div className="h-2 w-full rounded bg-white/[0.05]" />
                  <div className="h-2 w-3/4 rounded bg-white/[0.05]" />
                  <div className="h-2 w-full rounded bg-white/[0.05]" />
                  <div className="h-2 w-2/3 rounded bg-white/[0.05]" />
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="relative flex border-b border-white/[0.12] px-2 whitespace-nowrap">
                    {['Personal', 'Job', 'Time Off', 'Benefits', 'Perf', 'Training'].map(l => (
                      <div key={l} className={`text-[12px] font-medium px-2.5 py-2.5 shrink-0 ${['Personal', 'Job'].includes(l) ? 'text-white/30' : 'text-red-300/80'}`}>{l}</div>
                    ))}
                    <div className="text-[12px] font-medium px-2.5 py-2.5 shrink-0 text-red-300/80 relative">
                      More ▾
                      <div className="absolute top-full left-0 mt-1 bg-[#1a1a1a] border border-white/[0.12] rounded-md py-1 shadow-lg z-10 w-[75px] text-left">
                        {['Pay', 'Docs', 'Emerg', 'Assets', 'Notes'].map(l => (
                          <div key={l} className="text-[11px] text-red-300/80 px-3 py-1.5">{l}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-8 justify-center items-start">
      <div className="flex flex-col gap-1 animate-slideFadeIn">
        <div className="text-white/20 text-[14px] mb-1.5 text-center">Settings</div>
        {['Account', 'Permissions', 'Branding'].map(l => (
          <div key={l} className={`${navDim} text-[13px] py-1.5`}>{l}</div>
        ))}
      </div>
      <div className="flex flex-col gap-1 animate-slideFadeIn" style={{ animationDelay: '150ms' }}>
        <div className="text-white/20 text-[14px] mb-2 text-center">EE Profile</div>
        <div className="rounded-lg border border-white/[0.12] bg-white/[0.05] overflow-hidden">
          <div className="flex border-b border-white/[0.12]">
            {['Personal', 'Job', 'Pay', 'Docs'].map(l => (
              <div key={l} className="text-[11px] text-white/30 px-3 py-1.5 border-r border-white/[0.10] last:border-r-0">{l}</div>
            ))}
          </div>
          <div className="h-10 flex items-center justify-center">
            <span className="text-white/20 text-[12px]">content</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 animate-slideFadeIn" style={{ animationDelay: '300ms' }}>
        <div className="text-amber-300/50 text-[14px] mb-1.5 text-center">In-product</div>
        {['Perf settings', 'Time settings', 'Hiring settings'].map(l => (
          <div key={l} className={`${navLit} text-[13px] py-1.5`}>{l}</div>
        ))}
      </div>
    </div>
  );
}

// 7. Split nav
const beforeNavItems: { label: string; icon: string }[] = [
  { label: 'Home', icon: 'home' },
  { label: 'People', icon: 'user-group' },
  { label: 'Hiring', icon: 'id-badge' },
  { label: 'Payroll', icon: 'money-bill-1' },
  { label: 'Reports', icon: 'chart-pie-simple' },
];

const afterNavItems: { label: string; icon: string; highlight?: boolean }[] = [
  { label: 'Home', icon: 'home' },
  { label: 'Inbox', icon: 'inbox', highlight: true },
  { label: 'People', icon: 'user-group' },
  { label: 'Hiring', icon: 'id-badge' },
  { label: 'Payroll', icon: 'money-bill-1' },
  { label: 'Reports', icon: 'chart-pie-simple' },
  { label: 'Settings', icon: 'gear', highlight: true },
];

function SplitNavVisual({ mode }: { mode: Mode }) {
  if (mode === 'problem') {
    return (
      <div className="flex w-[480px]">
        <div className="w-[130px] flex flex-col gap-1.5 py-4 px-3 bg-white/[0.04] border border-white/[0.12] rounded-l-lg">
          {beforeNavItems.map(({ label, icon }) => (
            <div key={label} className="text-[15px] text-white/35 px-2 py-1.5 text-left flex items-center gap-2.5">
              <Icon name={icon as any} size={13} className="text-white/20" />
              {label}
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center px-6 py-3 bg-red-400/10 border border-red-400/25 border-l-0 rounded-tr-lg">
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <Icon name="inbox" size={16} className="text-red-300/80" />
              <Icon name="gear" size={16} className="text-red-300/80" />
              <div className="px-3 py-1 rounded-md bg-red-400/20 border border-red-400/35 text-[13px] text-red-300/80 font-medium">Ask</div>
            </div>
          </div>
          <div className="flex-1 bg-white/[0.02] border border-white/[0.10] border-l-0 border-t-0 rounded-br-lg">
          </div>
        </div>
      </div>
    );
  }
  const [unified, setUnified] = useState(false);

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Toggle */}
      <button
        onClick={(e) => { e.stopPropagation(); setUnified(!unified); }}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors text-[12px] font-medium ${unified ? 'border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/25 text-amber-300/80' : 'border-red-400/30 bg-red-400/10 hover:bg-red-400/20 text-red-300'}`}
      >
        <span className={unified ? 'text-amber-300/40' : 'text-red-300'}>Before</span>
        <div className={`w-7 h-4 rounded-full relative transition-colors ${unified ? 'bg-amber-400/40' : 'bg-red-400/40'}`}>
          <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all ${unified ? 'bg-amber-300 left-3.5' : 'bg-red-300 left-0.5'}`} />
        </div>
        <span className={unified ? 'text-amber-300/80' : 'text-red-300/80'}>After</span>
      </button>

      {/* Visual */}
      <div className="flex w-[640px] h-[420px] transition-all duration-500">
        {unified ? (
          /* After state — unified nav, no header (amber) */
          <>
            <div className="w-[150px] flex flex-col gap-1.5 rounded-l-lg bg-amber-400/[0.12] border border-amber-400/25 transition-all duration-500">
              {/* Logo + Ask row */}
              <div className="flex items-center justify-between px-3 pt-3 pb-1">
                <div className="w-[30px] h-[14px] rounded bg-amber-300/20" />
                <div className="px-2 py-0.5 rounded-md bg-amber-400/25 border border-amber-400/25 text-[11px] text-amber-300/60 font-medium">Ask</div>
              </div>
              {/* Search */}
              <div className="px-3 text-[15px] px-5 py-1.5 text-left flex items-center gap-2.5 text-amber-300/90">
                <Icon name="magnifying-glass" size={13} className="text-amber-300/50" />
                Search
              </div>
              {/* Separator */}
              <div className="mx-3 border-t border-white/[0.12]" />
              <div className="flex flex-col gap-1.5 px-3 pb-4">
                {afterNavItems.map(({ label, icon, highlight }) => (
                  <div
                    key={label}
                    className={`text-[15px] px-2 py-1.5 text-left flex items-center gap-2.5 ${highlight ? 'text-amber-300/90' : 'text-white/35'}`}
                  >
                    <Icon name={icon as any} size={13} className={highlight ? 'text-amber-300/50' : 'text-white/20'} />
                    {label}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 bg-white/[0.05] border border-white/[0.10] border-l-0 rounded-r-lg" />
          </>
        ) : (
          /* Before state — split nav + header (red) */
          <>
            <div className="w-[150px] flex flex-col gap-1.5 py-4 px-3 rounded-l-lg bg-white/[0.04] border border-white/[0.12] transition-all duration-500">
              {beforeNavItems.map(({ label, icon }) => (
                <div key={label} className="text-[15px] text-white/35 px-2 py-1.5 text-left flex items-center gap-2.5">
                  <Icon name={icon as any} size={13} className="text-white/20" />
                  {label}
                </div>
              ))}
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex items-center px-6 py-3 bg-red-400/10 border border-red-400/25 border-l-0 rounded-tr-lg">
                <div className="w-[30px] h-[14px] rounded bg-red-300/20" />
                <div className="flex-1" />
                <div className="flex items-center gap-4">
                  <Icon name="magnifying-glass" size={16} className="text-red-300/80" />
                  <Icon name="inbox" size={16} className="text-red-300/80" />
                  <Icon name="gear" size={16} className="text-red-300/80" />
                  <div className="px-3 py-1 rounded-md bg-red-400/20 border border-red-400/35 text-[13px] text-red-300/80 font-medium">Ask</div>
                </div>
              </div>
              <div className="flex-1 bg-white/[0.02] border border-white/[0.10] border-l-0 border-t-0 rounded-br-lg" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// 8. Nav order
function NavOrderVisual({ mode }: { mode: Mode }) {
  if (mode === 'problem') {
    const items = ['Reports', 'Payroll', 'Culture', 'Home', 'Hiring', 'Benefits', 'People'];
    return (
      <div className="w-[200px] flex flex-col gap-1.5">
        {items.map((l, i) => (
          <div key={l} className={`${navRed} animate-slideFadeIn`} style={{ animationDelay: `${i * 80}ms` }}>{l}</div>
        ))}
      </div>
    );
  }
  const sectionColors = [
    { text: 'rgb(74 222 128 / 0.7)', icon: 'rgb(74 222 128 / 0.5)', bracket: 'rgb(74 222 128 / 0.4)', label: 'rgb(74 222 128 / 0.6)', divider: 'rgb(74 222 128 / 0.1)' },  // green
    { text: 'rgb(96 165 250 / 0.7)', icon: 'rgb(96 165 250 / 0.5)', bracket: 'rgb(96 165 250 / 0.4)', label: 'rgb(96 165 250 / 0.6)', divider: 'rgb(96 165 250 / 0.1)' },  // blue
    { text: 'rgb(252 211 77 / 0.7)', icon: 'rgb(252 211 77 / 0.5)', bracket: 'rgb(252 211 77 / 0.4)', label: 'rgb(252 211 77 / 0.6)', divider: 'rgb(252 211 77 / 0.1)' },  // amber
  ];
  const sections = [
    { label: 'Core HR', items: [
      { name: 'Home', icon: 'home' },
      { name: 'Inbox', icon: 'inbox' },
      { name: 'My Info', icon: 'circle-user' },
      { name: 'People', icon: 'user-group' },
    ]},
    { label: 'EE Lifecycle', items: [
      { name: 'Hiring', icon: 'id-badge' },
      { name: 'Onboarding', icon: 'clipboard' },
      { name: 'Payroll', icon: 'money-bill-1' },
      { name: 'Benefits', icon: 'heart' },
      { name: 'Performance', icon: 'gauge-high' },
      { name: 'Offboarding', icon: 'handshake' },
    ]},
    { label: 'Cross-product', items: [
      { name: 'Reports', icon: 'chart-pie-simple' },
      { name: 'Files', icon: 'file-lines' },
      { name: 'Settings', icon: 'gear' },
    ]},
  ];
  return (
    <div className="flex items-stretch gap-4">
      <div className="w-[170px] flex flex-col gap-1.5 rounded-lg bg-white/[0.05] border border-white/[0.12] py-4 px-3 animate-slideFadeIn">
        {sections.map((section, si) => (
          <React.Fragment key={section.label}>
            {si > 0 && <div className="mx-1 h-px" style={{ backgroundColor: sectionColors[si].divider }} />}
            {section.items.map(item => (
              <div key={item.name} className="text-[15px] px-2 py-1.5 text-left flex items-center gap-2.5" style={{ color: sectionColors[si].text }}>
                <Icon name={item.icon as any} size={13} style={{ color: sectionColors[si].icon }} />
                {item.name}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="flex flex-col py-4" style={{ gap: '6px' }}>
        {sections.map((section, si) => (
          <div key={section.label} className="flex items-center gap-2 animate-slideFadeIn" style={{ flex: section.items.length, animationDelay: `${300 + si * 150}ms` }}>
            <div className="flex items-center h-full">
              <div className="flex flex-col h-full w-2">
                <div className="h-px self-end w-1/2" style={{ backgroundColor: sectionColors[si].bracket }} />
                <div className="flex-1" style={{ borderRight: `1px solid ${sectionColors[si].bracket}` }} />
                <div className="h-px self-end w-1/2" style={{ backgroundColor: sectionColors[si].bracket }} />
              </div>
              <div className="h-px w-3" style={{ backgroundColor: sectionColors[si].bracket }} />
            </div>
            <span className="text-[13px] whitespace-nowrap" style={{ color: sectionColors[si].label }}>{section.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 9. Screen real estate
function ScreenRealEstateVisual({ mode }: { mode: Mode }) {
  if (mode === 'problem') {
    return (
      <div className="w-[580px] animate-slideFadeIn" style={{ aspectRatio: '16 / 10' }}>
        <div className="rounded-lg border border-white/[0.12] bg-white/[0.05] flex overflow-hidden h-full">
          {/* Main nav with circle icons and label bars */}
          <div className="w-[90px] border-r border-white/[0.10] py-3 flex flex-col gap-2.5 px-3 bg-white/[0.02] shrink-0 rounded-l-lg">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-white/[0.12] shrink-0" />
                <div className="h-2 flex-1 rounded bg-white/[0.10]" />
              </div>
            ))}
          </div>
          <div className="flex-1 flex flex-col">
            {/* Header with right-aligned icons */}
            <div className="flex items-center px-3 py-2 border-b border-white/[0.12]">
              <div className="h-3 w-16 rounded bg-white/[0.12]" />
              <div className="flex-1" />
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-white/[0.12]" />
                <div className="w-4 h-4 rounded-full bg-white/[0.12]" />
                <div className="w-10 h-4 rounded bg-white/[0.12]" />
              </div>
            </div>
            {/* Content area — small and red */}
            <div className="flex flex-1">
              {/* Sub nav columns */}
              <div className="w-[80px] border-r border-white/[0.10] py-2 flex flex-col gap-0.5">
                <div className="h-2 w-3/4 rounded bg-white/[0.05] mx-2.5 my-1" />
                <div className="h-2 w-2/3 rounded bg-white/[0.05] mx-2.5 my-1" />
                <div className="h-2 w-3/4 rounded bg-white/[0.05] mx-2.5 my-1" />
              </div>
              <div className="w-[70px] border-r border-white/[0.10] py-2 flex flex-col gap-0.5">
                <div className="h-2 w-2/3 rounded bg-white/[0.05] mx-2.5 my-1" />
                <div className="h-2 w-3/4 rounded bg-white/[0.05] mx-2.5 my-1" />
              </div>
              <div className="flex-1 bg-red-400/10 border border-red-400/25 flex flex-col items-center justify-center gap-3">
                <Icon name="face-frown" size={32} className="text-red-300/70" />
                <span className="text-[14px] text-red-300/70 font-medium">no room for content</span>
              </div>
              {/* Ask rail */}
              <div className="w-[120px] bg-white/[0.02] border-l border-white/[0.10] flex flex-col gap-2 px-2 py-3">
                <div className="h-2 w-full rounded bg-white/[0.10]" />
                <div className="h-6 w-full rounded bg-white/[0.04]" />
                <div className="h-2 w-3/4 rounded bg-white/[0.10] self-end" />
                <div className="h-6 w-full rounded bg-white/[0.04]" />
                <div className="h-2 w-2/3 rounded bg-white/[0.10]" />
                <div className="h-6 w-full rounded bg-white/[0.04]" />
                <div className="flex-1" />
                <div className="h-5 w-full rounded bg-white/[0.10]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const [clean, setClean] = useState(false);
  return (
    <div className="flex flex-col items-center gap-5">
      {/* Toggle */}
      <button
        onClick={(e) => { e.stopPropagation(); setClean(!clean); }}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors text-[12px] font-medium ${clean ? 'border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/25 text-amber-300/80' : 'border-red-400/30 bg-red-400/10 hover:bg-red-400/20 text-red-300'}`}
      >
        <span className={clean ? 'text-amber-300/40' : 'text-red-300'}>Before</span>
        <div className={`w-7 h-4 rounded-full relative transition-colors ${clean ? 'bg-amber-400/40' : 'bg-red-400/40'}`}>
          <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all ${clean ? 'bg-amber-300 left-3.5' : 'bg-red-300 left-0.5'}`} />
        </div>
        <span className={clean ? 'text-amber-300/80' : 'text-red-300/80'}>After</span>
      </button>

      {/* Single layout that animates between states */}
      <div className="w-[580px]" style={{ aspectRatio: '16 / 10' }}>
        <div className={`rounded-lg border bg-white/[0.05] flex overflow-hidden h-full transition-colors duration-500 ${clean ? 'border-white/[0.12]' : 'border-white/[0.12]'}`}>
          {/* Main nav — always visible */}
          <div className="w-[90px] border-r border-white/[0.10] py-3 flex flex-col gap-2.5 px-3 bg-white/[0.02] shrink-0 rounded-l-lg transition-all duration-500">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-white/[0.12] shrink-0" />
                <div className="h-2 flex-1 rounded bg-white/[0.10]" />
              </div>
            ))}
          </div>
          <div className="flex-1 flex flex-col relative">
            {/* Header — fades out */}
            <div className={`flex items-center px-3 border-b border-white/[0.12] transition-all duration-500 overflow-hidden ${clean ? 'opacity-0 max-h-0' : 'opacity-100 max-h-[48px] py-2'}`}>
              <div className="h-3 w-16 rounded bg-white/[0.12]" />
              <div className="flex-1" />
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-white/[0.12]" />
                <div className="w-4 h-4 rounded-full bg-white/[0.12]" />
                <div className="w-10 h-4 rounded bg-white/[0.12]" />
              </div>
            </div>
            <div className="flex flex-1">
              {/* Sub nav 1 — collapses */}
              <div className={`border-r border-white/[0.10] py-2 flex flex-col gap-0.5 transition-all duration-500 overflow-hidden ${clean ? 'w-0 opacity-0 px-0' : 'w-[80px] opacity-100'}`}>
                <div className="h-2 w-3/4 rounded bg-white/[0.05] mx-2.5 my-1" />
                <div className="h-2 w-2/3 rounded bg-white/[0.05] mx-2.5 my-1" />
                <div className="h-2 w-3/4 rounded bg-white/[0.05] mx-2.5 my-1" />
              </div>
              {/* Sub nav 2 — collapses */}
              <div className={`border-r border-white/[0.10] py-2 flex flex-col gap-0.5 transition-all duration-500 overflow-hidden ${clean ? 'w-0 opacity-0 px-0' : 'w-[70px] opacity-100'}`}>
                <div className="h-2 w-2/3 rounded bg-white/[0.05] mx-2.5 my-1" />
                <div className="h-2 w-3/4 rounded bg-white/[0.05] mx-2.5 my-1" />
              </div>
              {/* Content area — transitions from red/cramped to amber/spacious */}
              <div className={`flex-1 flex flex-col items-center justify-center gap-3 transition-all duration-500 ${clean ? 'bg-amber-400/[0.12] border border-amber-400/25' : 'bg-red-400/[0.06] border border-red-400/25'}`}>
                <Icon name={clean ? 'face-smile' : 'face-frown'} size={32} className={`transition-colors duration-500 ${clean ? 'text-amber-300/50' : 'text-red-300/70'}`} />
                <span className={`text-[14px] font-medium transition-colors duration-500 ${clean ? 'text-amber-300/90' : 'text-red-300/70'}`}>
                  {clean ? 'room to breathe' : 'no room for content'}
                </span>
              </div>
              {/* Ask rail — collapses */}
              <div className={`bg-white/[0.02] border-l border-white/[0.10] flex flex-col gap-2 py-3 transition-all duration-500 overflow-hidden ${clean ? 'w-0 opacity-0 px-0' : 'w-[120px] opacity-100 px-2'}`}>
                <div className="h-2 w-full rounded bg-white/[0.10]" />
                <div className="h-6 w-full rounded bg-white/[0.04]" />
                <div className="h-2 w-3/4 rounded bg-white/[0.10] self-end" />
                <div className="h-6 w-full rounded bg-white/[0.04]" />
                <div className="h-2 w-2/3 rounded bg-white/[0.10]" />
                <div className="h-6 w-full rounded bg-white/[0.04]" />
                <div className="flex-1" />
                <div className="h-5 w-full rounded bg-white/[0.10]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 10. Contextual settings
function ContextualSettingsVisual({ mode }: { mode: Mode }) {
  if (mode === 'problem') {
    const steps = ['In Hiring', 'Go to Settings', 'Find Hiring', 'Change', 'Go back'];
    return (
      <div className="flex items-center gap-3 text-[17px]">
        {steps.map((step, i) => (
          <React.Fragment key={step}>
            {i > 0 && <span className="text-red-300/80 text-xl animate-slideFadeIn" style={{ animationDelay: `${i * 150 - 75}ms` }}>&rarr;</span>}
            <div className={`${redBox} px-5 py-3 animate-slideFadeIn`} style={{ animationDelay: `${i * 150}ms` }}>{step}</div>
          </React.Fragment>
        ))}
      </div>
    );
  }
  const lifecycleItems = [
    { name: 'Hiring', icon: 'id-badge' },
    { name: 'Onboarding', icon: 'clipboard' },
    { name: 'Payroll', icon: 'money-bill-1' },
    { name: 'Benefits', icon: 'heart' },
    { name: 'Performance', icon: 'gauge-high' },
    { name: 'Offboarding', icon: 'handshake' },
  ];
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  useEffect(() => {
    // Start cycling after initial build-in animation
    const startDelay = setTimeout(() => {
      setHoveredIndex(0);
    }, 800);
    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (hoveredIndex < 0) return;
    const timer = setTimeout(() => {
      setHoveredIndex(prev => (prev + 1) % lifecycleItems.length);
    }, 1000);
    return () => clearTimeout(timer);
  }, [hoveredIndex]);

  return (
    <div className="flex items-center gap-6">
      <div className="w-[200px] flex flex-col gap-1.5 rounded-lg bg-white/[0.05] border border-white/[0.12] py-4 px-3 animate-slideFadeIn">
        {lifecycleItems.map((item, i) => {
          const isHovered = i === hoveredIndex;
          return (
            <div
              key={item.name}
              className={`text-[15px] px-2 py-1.5 text-left flex items-center gap-2.5 rounded-lg transition-all duration-300 ${isHovered ? 'bg-amber-400/10 text-amber-300/90' : 'text-white/35'}`}
            >
              <Icon name={item.icon as any} size={13} className={`transition-colors duration-300 ${isHovered ? 'text-amber-300/50' : 'text-white/20'}`} />
              <span className="flex-1">{item.name}</span>
              <Icon
                name="gear"
                size={12}
                className={`transition-all duration-300 ${isHovered ? 'opacity-100 text-amber-300/60' : 'opacity-0'}`}
              />
            </div>
          );
        })}
      </div>
      <div className="text-amber-300/40 text-[14px] animate-slideFadeIn" style={{ animationDelay: '400ms' }}>&larr; settings in context</div>
    </div>
  );
}

// 11. Contextual reports
function ContextualReportsVisual({ mode }: { mode: Mode }) {
  if (mode === 'problem') {
    return (
      <div className="flex gap-5 justify-center">
        {/* Hiring — report icon below the title bar */}
        <div className="w-[240px] rounded-lg border border-white/[0.12] bg-white/[0.05] overflow-hidden animate-slideFadeIn" style={{ animationDelay: '0ms' }}>
          <div className="flex items-center px-4 py-3 border-b border-white/[0.10]">
            <span className="text-[16px] font-medium text-white/50">Hiring</span>
          </div>
          <div className="flex justify-end px-4 pt-3">
            <div className="w-5 h-5 rounded bg-red-400/20 flex items-center justify-center">
              <Icon name="chart-bar" size={10} className="text-red-300/80" />
            </div>
          </div>
          <div className="px-4 py-3 space-y-2">
            <div className="h-2.5 w-3/4 rounded bg-white/[0.10]" />
            <div className="h-2.5 w-1/2 rounded bg-white/[0.10]" />
          </div>
        </div>

        {/* Payroll — report button in title bar, right-aligned */}
        <div className="w-[240px] rounded-lg border border-white/[0.12] bg-white/[0.05] overflow-hidden animate-slideFadeIn" style={{ animationDelay: '150ms' }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.10]">
            <span className="text-[16px] font-medium text-white/50">Payroll</span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-400/20">
              <Icon name="chart-bar" size={9} className="text-red-300/80" />
              <span className="text-[10px] text-red-300/70">Reports</span>
            </div>
          </div>
          <div className="px-4 py-4 space-y-2">
            <div className="h-2.5 w-3/4 rounded bg-white/[0.10]" />
            <div className="h-2.5 w-1/2 rounded bg-white/[0.10]" />
          </div>
        </div>

        {/* Comp — no reports, frown icon centered */}
        <div className="w-[240px] rounded-lg border border-white/[0.12] bg-white/[0.05] overflow-hidden animate-slideFadeIn" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center px-4 py-3 border-b border-white/[0.10]">
            <span className="text-[16px] font-medium text-white/50">Comp</span>
          </div>
          <div className="flex items-center justify-center py-8">
            <div className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-lg bg-red-400/10">
              <Icon name="face-frown" size={22} className="text-red-300/70" />
              <span className="text-[11px] text-red-300/70">no link to reports</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-5 justify-center">
      {['Hiring', 'Payroll', 'Comp'].map((l, i) => (
        <div key={l} className="w-[200px] rounded-lg border border-white/[0.12] bg-white/[0.05] overflow-hidden animate-slideFadeIn" style={{ animationDelay: `${i * 150}ms` }}>
          <div className="text-[15px] font-medium text-white/50 px-3 py-2 border-b border-white/[0.10]">{l}</div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-400/[0.15] border-b border-amber-400/25">
            <div className="flex gap-1.5 flex-1">
              {[1, 2, 3].map(n => (
                <div key={n} className="w-8 h-4 rounded bg-amber-400/25" />
              ))}
            </div>
            <span className="text-[11px] text-amber-300/90 whitespace-nowrap underline">Reports &rarr;</span>
          </div>
          <div className="h-10 flex items-center justify-center">
            <span className="text-white/20 text-[11px]">content</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// 12. Contextual Ask
function ContextualAskVisual({ mode }: { mode: Mode }) {
  if (mode === 'problem') {
    return (
      <div className="flex gap-5 justify-center">
        {['Hiring', 'Payroll', 'Comp'].map((l, i) => (
          <div key={l} className="w-[200px] rounded-lg border border-white/[0.12] bg-white/[0.05] overflow-hidden animate-slideFadeIn" style={{ animationDelay: `${i * 150}ms` }}>
            <div className="text-[15px] font-medium text-white/50 px-3 py-2 border-b border-white/[0.10]">{l}</div>
            <div className="h-16 flex items-center justify-center">
              <span className="text-white/20 text-[11px]">content</span>
            </div>
            <div className="px-3 py-2 border-t border-white/[0.10] flex items-center justify-center">
              <span className="text-red-300/80 text-[12px] italic">no Ask entry point</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex gap-5 justify-center">
      {['Hiring', 'Payroll', 'Comp'].map((l, i) => (
        <div key={l} className="w-[200px] rounded-lg border border-white/[0.12] bg-white/[0.05] overflow-hidden animate-slideFadeIn" style={{ animationDelay: `${i * 150}ms` }}>
          <div className="text-[15px] font-medium text-white/50 px-3 py-2 border-b border-white/[0.10]">{l}</div>
          <div className="h-16 flex items-center justify-center">
            <span className="text-white/20 text-[11px]">content</span>
          </div>
          <div className="px-3 py-2 border-t border-amber-400/25 bg-amber-400/[0.12] flex items-center gap-2">
            <Icon name="sparkles" size={12} className="text-amber-300/50" />
            <div className="flex-1 h-[22px] rounded-md border border-amber-400/25 bg-amber-400/[0.04] flex items-center px-2">
              <span className="text-[11px] text-amber-300/40">Ask about {l}...</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// 13. Contextual Insights
function ContextualInsightsVisual({ mode }: { mode: Mode }) {
  if (mode === 'problem') {
    return (
      <div className="flex gap-5 justify-center">
        {['Hiring', 'Payroll', 'Comp'].map((l, i) => (
          <div key={l} className="w-[200px] rounded-lg border border-white/[0.12] bg-white/[0.05] overflow-hidden animate-slideFadeIn" style={{ animationDelay: `${i * 150}ms` }}>
            <div className="text-[15px] font-medium text-white/50 px-3 py-2 border-b border-white/[0.10]">{l}</div>
            <div className="h-16 flex items-center justify-center">
              <span className="text-white/20 text-[11px]">content</span>
            </div>
            <div className="px-3 py-2 border-t border-white/[0.10] flex items-center justify-center">
              <span className="text-red-300/80 text-[12px] italic">no insights</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex gap-5 justify-center">
      {['Hiring', 'Payroll', 'Comp'].map((l, i) => {
        const insights = [
          ['3 overdue approvals', '2 offers expiring soon'],
          ['Next run in 3 days', '12 missing timesheets'],
          ['5 reviews above band', 'Budget 92% allocated'],
        ][i];
        return (
          <div key={l} className="w-[200px] rounded-lg border border-white/[0.12] bg-white/[0.05] overflow-hidden animate-slideFadeIn" style={{ animationDelay: `${i * 150}ms` }}>
            <div className="text-[15px] font-medium text-white/50 px-3 py-2 border-b border-white/[0.10]">{l}</div>
            <div className="px-3 py-2 border-b border-amber-400/25 bg-amber-400/[0.12] flex flex-col gap-1.5">
              {insights.map(text => (
                <div key={text} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-300/50 shrink-0" />
                  <span className="text-[11px] text-amber-300/60">{text}</span>
                </div>
              ))}
            </div>
            <div className="h-10 flex items-center justify-center">
              <span className="text-white/20 text-[11px]">content</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ContextualAutomationsVisual({ mode }: { mode: Mode }) {
  if (mode === 'problem') {
    return (
      <div className="flex gap-5 justify-center">
        {['Hiring', 'Payroll', 'Comp'].map((l, i) => (
          <div key={l} className="w-[200px] rounded-lg border border-white/[0.12] bg-white/[0.05] overflow-hidden animate-slideFadeIn" style={{ animationDelay: `${i * 150}ms` }}>
            <div className="text-[15px] font-medium text-white/50 px-3 py-2 border-b border-white/[0.10]">{l}</div>
            <div className="h-16 flex items-center justify-center">
              <span className="text-white/20 text-[11px]">content</span>
            </div>
            <div className="px-3 py-2 border-t border-white/[0.10] flex items-center justify-center">
              <span className="text-red-300/80 text-[12px] italic">no automation suggestions</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex gap-5 justify-center">
      {['Hiring', 'Payroll', 'Comp'].map((l, i) => {
        const autos = [
          ['Auto-advance screened candidates', 'Alert on stalled roles'],
          ['Auto-approve timesheets <40hrs', 'Alert on payroll variance'],
          ['Flag low compa-ratios', 'Alert on band ceiling'],
        ][i];
        return (
          <div key={l} className="w-[200px] rounded-lg border border-white/[0.12] bg-white/[0.05] overflow-hidden animate-slideFadeIn" style={{ animationDelay: `${i * 150}ms` }}>
            <div className="text-[15px] font-medium text-white/50 px-3 py-2 border-b border-white/[0.10]">{l}</div>
            <div className="px-3 py-2 border-b border-amber-400/25 bg-amber-400/[0.12] flex flex-col gap-1.5">
              {autos.map(text => (
                <div key={text} className="flex items-center gap-2">
                  <Icon name="bolt" size={9} className="text-amber-300/50 shrink-0" />
                  <span className="text-[11px] text-amber-300/60">{text}</span>
                </div>
              ))}
            </div>
            <div className="h-10 flex items-center justify-center">
              <span className="text-white/20 text-[11px]">content</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const VISUALS: React.FC<{ mode: Mode }>[] = [
  TaxonomyVisual,
  PlacementVisual,
  NavPresenceVisual,
  SettingsDamageVisual,
  InvisibleVisual,
  SplitNavVisual,
  NavOrderVisual,
  ScreenRealEstateVisual,
  ContextualSettingsVisual,
  ContextualReportsVisual,
  ContextualAskVisual,
  ContextualInsightsVisual,
  ContextualAutomationsVisual,
];

// ─── New 2 Visuals ───

const greenBox = `${boxBase} bg-green-400/20 text-green-300 border border-green-400/30`;
const navGreen = `${navItem} bg-green-400/20 text-green-300`;

// Slide 1: Long nav problem
function LongNavVisual() {
  const items = ['Home', 'People', 'Hiring', 'Onboarding', 'Payroll', 'Benefits', 'Performance', 'Training', 'Compensation', 'Culture', 'Emp Community', 'Rewards', 'Wellbeing', 'Time & Att', 'Files', 'Reports', 'Apps'];
  return (
    <div className="w-[200px] flex flex-col gap-0.5 max-h-[420px] overflow-hidden relative">
      {items.map((l, i) => (
        <div key={l} className={`${i < 3 ? navDim : `${navItem} bg-green-400/10 text-green-300/60`} text-[13px] py-1.5 animate-slideFadeIn`} style={{ animationDelay: `${i * 60}ms` }}>{l}</div>
      ))}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/90 to-transparent flex items-end justify-center pb-2">
        <span className="text-green-300/40 text-[12px]">...and more</span>
      </div>
    </div>
  );
}

// Slide 2: Solved problem — market consensus
function SolvedProblemVisual() {
  const competitors = ['Workday', 'ADP', 'UKG', 'Paylocity', 'Paycom', 'Rippling', 'Gusto', 'Namely'];
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap gap-2.5 justify-center max-w-[500px]">
        {competitors.map((c, i) => (
          <div key={c} className={`${dimBox} px-4 py-2.5 text-[14px] animate-slideFadeIn`} style={{ animationDelay: `${i * 80}ms` }}>{c}</div>
        ))}
      </div>
      <div className="flex items-center gap-3 animate-slideFadeIn" style={{ animationDelay: '700ms' }}>
        <div className="h-px w-16 bg-green-400/20" />
        <span className="text-green-300/50 text-[13px]">same patterns</span>
        <div className="h-px w-16 bg-green-400/20" />
      </div>
    </div>
  );
}

// Slide 3: Research methodology — 4 AI logos
function ResearchVisual() {
  const ais = [
    { name: 'Claude', color: '#d4a574' },
    { name: 'Gemini', color: '#8ab4f8' },
    { name: 'ChatGPT', color: '#74aa9c' },
    { name: 'Grok', color: '#e8e8e8' },
  ];
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-5">
        {ais.map((ai, i) => (
          <div key={ai.name} className="flex flex-col items-center gap-2 animate-slideFadeIn" style={{ animationDelay: `${i * 120}ms` }}>
            <div className="w-12 h-12 rounded-xl border border-white/[0.12] bg-white/[0.10] flex items-center justify-center">
              <span className="text-[18px] font-bold" style={{ color: ai.color }}>{ai.name[0]}</span>
            </div>
            <span className="text-[12px] text-white/30">{ai.name}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 text-[13px] text-white/35">
        {['Deep research', 'Cross-check', 'Fact-check', 'Compile'].map((step, i) => (
          <React.Fragment key={step}>
            {i > 0 && <span className="text-green-300/40 animate-slideFadeIn" style={{ animationDelay: `${500 + i * 100}ms` }}>&rarr;</span>}
            <span className={`${i === 3 ? 'text-green-300/60' : ''} animate-slideFadeIn`} style={{ animationDelay: `${500 + i * 100}ms` }}>{step}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// Slide 4: Aggregate IA result
function AggregateIAVisual() {
  const groups = [
    { label: 'People', items: ['Directory', 'Org Chart', 'Onboarding', 'Offboarding', 'Documents'] },
    { label: 'Talent', items: ['Performance', 'Learning', 'Compensation', 'Succession'] },
    { label: 'Time', items: ['Time Off', 'Tracking', 'Scheduling'] },
  ];
  return (
    <div className="flex gap-5 justify-center">
      {groups.map((g, i) => (
        <div key={g.label} className="rounded-lg border border-green-400/20 bg-green-400/[0.04] px-4 py-3 flex flex-col gap-2 animate-slideFadeIn" style={{ animationDelay: `${i * 200}ms` }}>
          <div className="text-green-300 text-[14px] font-semibold">{g.label}</div>
          <div className="flex flex-col gap-0.5">
            {g.items.map(item => (
              <div key={item} className="text-[12px] text-white/30 px-2 py-1">{item}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const NEW2_VISUALS: (React.FC | null)[] = [
  LongNavVisual,
  SolvedProblemVisual,
  ResearchVisual,
  AggregateIAVisual,
];

export function New2SlideVisual({ index, noMargin }: { index: number; noMargin?: boolean }) {
  const Visual = NEW2_VISUALS[index];
  if (!Visual) return null;
  return (
    <div className={`${noMargin ? '' : 'mb-14'} flex justify-center`} style={{ transform: 'scale(1.15)', transformOrigin: 'center bottom' }}>
      <Visual />
    </div>
  );
}

export function SlideVisual({ index, mode, noMargin }: { index: number; mode: Mode; noMargin?: boolean }) {
  const Visual = VISUALS[index];
  if (!Visual) return null;
  return (
    <div className={`${noMargin ? '' : 'mb-14'} flex justify-center`} style={{ transform: 'scale(1.15)', transformOrigin: 'center bottom' }}>
      <Visual mode={mode} />
    </div>
  );
}

// ─── Space Exploration Visuals ───

const blueBox = `${boxBase} bg-blue-400/20 text-blue-300 border border-blue-400/30`;

// Slide 0: "All of that is too little, too late"
function TooLittleTooLateVisual() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-8 items-start">
        {/* Mini "New" nav */}
        <div className="flex flex-col gap-0.5 opacity-40 animate-slideFadeIn" style={{ animationDelay: '0ms' }}>
          <div className="text-[10px] text-white/30 mb-1 text-center">New</div>
          <div className="w-[120px] rounded-md border border-white/[0.08] bg-white/[0.04] overflow-hidden">
            {['Home', 'People', 'Hiring', 'Payroll', 'Benefits', 'Performance'].map(l => (
              <div key={l} className="text-[9px] text-white/25 px-2 py-1 border-b border-white/[0.04] last:border-0">{l}</div>
            ))}
          </div>
        </div>
        {/* Mini "New 2" nav */}
        <div className="flex flex-col gap-0.5 opacity-40 animate-slideFadeIn" style={{ animationDelay: '150ms' }}>
          <div className="text-[10px] text-white/30 mb-1 text-center">New 2</div>
          <div className="w-[120px] rounded-md border border-white/[0.08] bg-white/[0.04] overflow-hidden">
            {['Home', 'People', 'Hiring', 'Payroll', 'Time', 'Talent'].map(l => (
              <div key={l} className="text-[9px] text-white/25 px-2 py-1 border-b border-white/[0.04] last:border-0">{l}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 animate-slideFadeIn" style={{ animationDelay: '400ms' }}>
        <div className="h-px w-12 bg-white/10" />
        <span className="text-white/30 text-[13px] italic">optimization, not strategy</span>
        <div className="h-px w-12 bg-white/10" />
      </div>
    </div>
  );
}

// Slide 1: "Claude Code can rebuild our product in a weekend"
function AIRebuildsVisual() {
  const features = ['PTO Tracking', 'Org Chart', 'Payroll Runs', 'Job Postings', 'Review Cycles', 'Time Off Requests'];
  return (
    <div className="flex gap-12 justify-center animate-slideFadeIn">
      {/* Left: replicated */}
      <div className="flex flex-col gap-2">
        <div className="text-[13px] text-white/30 font-medium mb-1">Replicated by AI</div>
        {features.map((f, i) => (
          <div key={f} className="text-[14px] text-white/25 line-through animate-slideFadeIn" style={{ animationDelay: `${i * 100}ms` }}>{f}</div>
        ))}
      </div>
      {/* Right: what AI runs on */}
      <div className="flex flex-col gap-2">
        <div className="text-[13px] text-white/30 font-medium mb-1">What AI runs on</div>
        <div className={`${blueBox} px-5 py-4 text-[16px] animate-slideFadeIn`} style={{ animationDelay: '600ms' }}>
          The employee graph
        </div>
      </div>
    </div>
  );
}

// Slide 2: "The solution isn't a better app. It's a better platform."
function PlatformNotAppVisual() {
  // Abstract app tiles — different shapes/sizes per screen
  const gridA = [0.7, 0.5, 0.9, 0.4, 0.8, 0.6];
  const gridB = [0.5, 0.8, 0.4, 0.9, 0.6, 0.7];
  return (
    <div className="flex gap-10 justify-center items-end">
      {[gridA, gridB].map((grid, gi) => (
        <div key={gi} className="flex flex-col items-center animate-slideFadeIn" style={{ animationDelay: `${gi * 200}ms` }}>
          {/* Phone outline */}
          <div className="w-[140px] rounded-2xl border-2 border-white/[0.15] bg-white/[0.03] overflow-hidden">
            {/* Status bar */}
            <div className="h-4 border-b border-white/[0.06] flex items-center justify-center">
              <div className="w-8 h-1 rounded-full bg-white/10" />
            </div>
            {/* Shell (shared) */}
            <div className="px-2 py-1.5 border-b border-blue-400/20 bg-blue-400/[0.06]">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-blue-400/30" />
                <div className="h-1.5 w-12 rounded-full bg-blue-300/20" />
              </div>
            </div>
            {/* App grid (different) */}
            <div className="grid grid-cols-3 gap-1.5 p-2.5">
              {grid.map((opacity, i) => (
                <div key={i} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `rgba(255,255,255,${opacity * 0.08})` }}>
                  <div className="w-3.5 h-3.5 rounded-md" style={{ backgroundColor: `rgba(255,255,255,${opacity * 0.12})` }} />
                </div>
              ))}
            </div>
            {/* Bottom bar */}
            <div className="h-4 border-t border-white/[0.06] flex items-center justify-center">
              <div className="w-10 h-1 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Wrapper that adds the shell label
function PlatformNotAppVisualWrapper() {
  return (
    <div className="flex flex-col items-center gap-4">
      <PlatformNotAppVisual />
      <div className="flex items-center gap-3 animate-slideFadeIn" style={{ animationDelay: '500ms' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" className="text-blue-300/50"><path d="M8 2v8M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span className="text-blue-300/50 text-[13px]">this part never changes</span>
        <svg width="16" height="16" viewBox="0 0 16 16" className="text-blue-300/50"><path d="M8 2v8M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    </div>
  );
}

// Slide 3: "BambooHR becomes the data layer AI runs on"
function DataLayerVisual() {
  const appOpacities = [0.08, 0.12, 0.06, 0.10, 0.09];
  return (
    <div className="flex flex-col items-center gap-0">
      {/* Floating app icons */}
      <div className="flex gap-3 mb-3">
        {appOpacities.map((op, i) => (
          <div key={i} className="w-9 h-9 rounded-lg border border-white/[0.10] flex items-center justify-center animate-slideFadeIn" style={{ backgroundColor: `rgba(255,255,255,${op})`, animationDelay: `${800 + i * 80}ms`, animationFillMode: 'both' }}>
            <div className="w-4 h-4 rounded-md" style={{ backgroundColor: `rgba(255,255,255,${op + 0.06})` }} />
          </div>
        ))}
      </div>
      {/* Stack layers */}
      <div className="flex flex-col items-center w-[360px]">
        {/* AI layer */}
        <div className="w-full rounded-t-xl border border-b-0 border-white/[0.10] bg-white/[0.05] px-5 py-3 text-center animate-slideFadeIn" style={{ animationDelay: '500ms' }}>
          <span className="text-[13px] text-white/40">AI layer</span>
        </div>
        {/* System framework */}
        <div className="w-[85%] border border-b-0 border-blue-400/20 bg-blue-400/[0.08] px-5 py-3 text-center animate-slideFadeIn" style={{ animationDelay: '300ms' }}>
          <span className="text-[13px] text-blue-300/60">System framework</span>
        </div>
        {/* Employee graph */}
        <div className={`w-[70%] rounded-b-xl border border-blue-400/30 bg-blue-400/20 px-5 py-4 text-center animate-slideFadeIn`} style={{ animationDelay: '100ms' }}>
          <span className="text-[15px] text-blue-300 font-medium">Employee graph</span>
        </div>
      </div>
    </div>
  );
}

const SPACE_VISUALS: (React.FC | null)[] = [
  TooLittleTooLateVisual,
  AIRebuildsVisual,
  PlatformNotAppVisualWrapper,
  DataLayerVisual,
];

export function SpaceSlideVisual({ index, noMargin }: { index: number; noMargin?: boolean }) {
  const Visual = SPACE_VISUALS[index];
  if (!Visual) return null;
  return (
    <div className={`${noMargin ? '' : 'mb-14'} flex justify-center`} style={{ transform: 'scale(1.15)', transformOrigin: 'center bottom' }}>
      <Visual />
    </div>
  );
}

export default SlideVisual;
