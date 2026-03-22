import React, { useState, useEffect, useMemo } from 'react';
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
    <div className="rounded-xl border border-amber-400/25 bg-amber-400/[0.12] px-10 py-8 flex flex-col items-center justify-center gap-5 animate-slideFadeIn" style={{ width: 640, height: 280 }}>
      <div className="text-amber-300 text-[22px] font-semibold">Product</div>
      <div className="flex gap-6">
        <div className="rounded-lg border border-amber-400/20 bg-amber-400/[0.12] px-8 py-5 flex flex-col items-center gap-3 animate-slideFadeIn" style={{ animationDelay: '200ms' }}>
          <div className="text-amber-300/80 text-[19px] font-medium">Module</div>
          <div className="flex gap-3">
            <div className="rounded bg-amber-400/10 text-amber-300/60 text-[16px] px-4 py-2">Feature</div>
            <div className="rounded bg-amber-400/10 text-amber-300/60 text-[16px] px-4 py-2">Feature</div>
          </div>
        </div>
        <div className="rounded-lg border border-amber-400/20 bg-amber-400/[0.12] px-8 py-5 flex flex-col items-center gap-3 animate-slideFadeIn" style={{ animationDelay: '350ms' }}>
          <div className="text-amber-300/80 text-[19px] font-medium">Module</div>
          <div className="flex gap-3">
            <div className="rounded bg-amber-400/10 text-amber-300/60 text-[16px] px-4 py-2">Feature</div>
            <div className="rounded bg-amber-400/10 text-amber-300/60 text-[16px] px-4 py-2">Feature</div>
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
                  {['Account', 'Payroll', 'Benefits', 'Perf', 'Time', 'Hiring', 'Comp'].map(l => (
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

function TaxonomySpreadsheetVisual() {
  // Abstract rows: product bars appear on some rows, modules on all, features vary
  const rows = [
    { product: true, moduleW: 70, featureWs: [50, 60] },
    { product: false, moduleW: 85, featureWs: [65, 45, 40] },
    { product: false, moduleW: 60, featureWs: [55, 50] },
    { product: true, moduleW: 75, featureWs: [60, 45] },
    { product: false, moduleW: 65, featureWs: [50, 55, 45] },
    { product: false, moduleW: 80, featureWs: [65, 40] },
    { product: true, moduleW: 70, featureWs: [55, 50] },
    { product: false, moduleW: 55, featureWs: [45, 60, 50] },
    { product: false, moduleW: 75, featureWs: [55, 45] },
    { product: true, moduleW: 65, featureWs: [50, 60] },
    { product: false, moduleW: 80, featureWs: [60, 45, 35] },
  ];

  return (
    <div style={{ width: 640, height: 280 }} className="flex items-center justify-center">
      <style>{`
        @keyframes sheetFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes barIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <div
        className="rounded-xl border border-amber-400/20 overflow-hidden"
        style={{ width: 640, opacity: 0, animation: 'sheetFadeIn 0.4s ease-out forwards' }}
      >
        {/* Header */}
        <div className="flex border-b border-amber-400/25 bg-amber-400/[0.06]">
          <div className="w-[150px] px-5 py-3 text-[15px] font-semibold text-amber-300/70 border-r border-amber-400/15">Product</div>
          <div className="w-[170px] px-5 py-3 text-[15px] font-semibold text-amber-300/70 border-r border-amber-400/15">Module</div>
          <div className="flex-1 px-5 py-3 text-[15px] font-semibold text-amber-300/70">Features</div>
        </div>
        {/* Rows */}
        {rows.map((row, i) => (
          <div
            key={i}
            className={`flex items-center ${i < rows.length - 1 ? 'border-b border-amber-400/[0.06]' : ''}`}
            style={{ opacity: 0, animation: `barIn 0.3s ease-out ${0.15 + i * 0.05}s forwards` }}
          >
            <div className="w-[150px] px-5 py-[8px] border-r border-amber-400/[0.06]">
              {row.product && <div className="h-[7px] rounded-full bg-amber-400/30" style={{ width: `${60 + (i * 13) % 30}%` }} />}
            </div>
            <div className="w-[170px] px-5 py-[8px] border-r border-amber-400/[0.06]">
              <div className="h-[7px] rounded-full bg-amber-400/20" style={{ width: `${row.moduleW}%` }} />
            </div>
            <div className="flex-1 px-5 py-[8px] flex gap-2.5">
              {row.featureWs.map((w, fi) => (
                <div key={fi} className="h-[7px] rounded-full bg-amber-400/10" style={{ width: w }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Rulebook document visual — abstract doc showing the placement rules have been written
function RulebookDocVisual() {
  const sections = [
    { title: 65, lines: [85, 70, 90, 60] },
    { title: 50, lines: [75, 80, 55, 88] },
    { title: 70, lines: [90, 65, 80, 70, 50] },
    { title: 55, lines: [80, 60, 92, 45] },
    { title: 45, lines: [70, 85, 55, 78, 65] },
  ];
  return (
    <div className="flex flex-col items-center">
      <style>{`
        @keyframes docFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        className="rounded-xl border border-amber-400/20 bg-amber-400/[0.03] px-9 py-10 flex flex-col gap-4 overflow-hidden relative"
        style={{ width: 370, height: 478, opacity: 0, animation: 'docFadeIn 0.4s ease-out forwards' }}
      >
        {/* Doc title */}
        <div className="flex flex-col gap-2 pb-4 border-b border-amber-400/15 text-left shrink-0">
          <div className="text-[17px] font-semibold text-amber-300/70 leading-tight">Navigation IA Governance Rules</div>
          <div className="text-[12px] text-amber-300/35 leading-tight">Where New Things Go — And How to Decide</div>
        </div>
        {/* Abstract body sections */}
        <div className="flex flex-col gap-3.5 flex-1 min-h-0">
          {sections.map((sec, si) => (
            <div
              key={si}
              className="flex flex-col gap-1.5"
              style={{ opacity: 0, animation: `docFadeIn 0.3s ease-out ${0.2 + si * 0.12}s forwards` }}
            >
              <div className="h-[5px] rounded-full bg-amber-400/25" style={{ width: `${sec.title}%` }} />
              {sec.lines.map((w, li) => (
                <div key={li} className="h-[3px] rounded-full bg-amber-400/10" style={{ width: `${w}%` }} />
              ))}
            </div>
          ))}
        </div>
        {/* BambooHR b logo */}
        <div className="absolute bottom-5 left-4">
          <svg width="28" height="22" viewBox="0 0 37 29.35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.26601 0C7.24121 -0.00826622 7.22881 0.0206656 7.24534 0.0413311C10.3658 3.56274 12.6267 7.82398 13.7591 10.556C12.3291 9.02258 10.9651 7.4272 9.43589 6.36499C6.33193 4.19924 3.06264 3.1329 0.0247987 2.72785C0 2.72785 -0.0123993 2.75679 0.00826622 2.77332C7.4396 8.73326 5.70783 11.8496 15.4082 13.0813C15.4248 13.0813 15.4413 13.0648 15.433 13.0482C13.9988 8.62994 13.5318 5.35238 11.0974 2.74852C10.3328 1.93016 8.0761 0.281052 7.26601 0Z" fill="rgba(251,191,36,0.2)"/>
            <path d="M27.0471 9.29537C23.5257 9.29537 21.641 10.5022 20.3184 11.8166L19.9588 12.1968V0H16.9168V19.7025C16.9168 25.6418 21.4922 29.3451 26.7412 29.3451C32.5235 29.3451 36.9046 24.8937 36.9046 19.1735C36.9046 13.8625 32.3375 9.29537 27.0471 9.29537ZM26.7412 26.5263C22.9098 26.5263 19.6653 23.505 19.6653 19.4587C19.6653 15.4124 22.3973 12.0852 26.8074 12.0852C31.2174 12.0852 33.813 15.6521 33.813 19.3843C33.813 23.4471 31.0645 26.5263 26.7371 26.5263H26.7412Z" fill="rgba(251,191,36,0.2)"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

export function PhasesVisual({ phase }: { phase: number }) {
  const phases = [
    { label: 'Identify\nProblems', icon: 'skull' as IconName },
    { label: 'Design &\nPrototype', icon: 'compass' as IconName },
    { label: 'Validate', icon: 'clipboard-check' as IconName },
    { label: 'Plan\nImplementation', icon: 'list-check' as IconName },
    { label: 'Implement', icon: 'gear' as IconName },
    { label: 'Measure &\nIterate', icon: 'chart-line' as IconName },
  ];

  return (
    <div className="mb-14 flex justify-center">
      <style>{`
        @keyframes phaseCardIn {
          from { opacity: 0; transform: translateY(24px) scale(0.92); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes phaseLineGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes miniBoxIn {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div className="flex items-center">
        {phases.map((p, i) => {
          const isProblems = phase === 1 && i === 0;
          const isDesign = phase === 1 && i === 1;
          const dimmed = phase === 1 && i >= 2;
          const highlighted = isProblems || isDesign;

          let borderColor = 'rgba(255,255,255,0.25)';
          let bgColor = 'rgba(255,255,255,0.04)';
          let textColor = 'rgba(255,255,255,0.6)';

          if (isProblems) {
            borderColor = 'rgba(248,113,113,0.5)';
            bgColor = 'rgba(248,113,113,0.08)';
            textColor = 'rgba(248,113,113,0.85)';
          } else if (isDesign) {
            borderColor = 'rgba(255,255,255,0.3)';
            bgColor = 'rgba(255,255,255,0.06)';
            textColor = 'rgba(255,255,255,0.8)';
          } else if (dimmed) {
            borderColor = 'rgba(255,255,255,0.05)';
            textColor = 'rgba(255,255,255,0.12)';
          }

          return (
            <div key={i} className="flex items-center">
              <div
                className="rounded-2xl border flex flex-col items-center gap-3 transition-all duration-500 pt-8 pb-4"
                style={{
                  width: 210,
                  height: 260,
                  borderColor,
                  backgroundColor: bgColor,
                  opacity: 0,
                  animation: `phaseCardIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + i * 0.4}s forwards`,
                }}
              >
                <div className="transition-colors duration-500" style={{ color: textColor }}>
                  <Icon name={p.icon} size={38} />
                </div>
                <div
                  className="text-[18px] font-medium text-center leading-tight whitespace-pre-line transition-colors duration-500"
                  style={{ color: textColor }}
                >
                  {p.label}
                </div>
                {/* Mini problem cards inside Identify Problems */}
                {isProblems && (
                  <div className="flex flex-wrap justify-center gap-1 mt-auto px-3" style={{ maxWidth: 190 }}>
                    {Array.from({ length: 11 }, (_, pi) => (
                      <div
                        key={pi}
                        className="rounded w-7 h-7 flex items-center justify-center text-[10px] font-bold"
                        style={{
                          backgroundColor: 'rgba(248,113,113,0.15)',
                          border: '1px solid rgba(248,113,113,0.3)',
                          color: 'rgba(248,113,113,0.8)',
                          opacity: 0,
                          animation: `miniBoxIn 0.25s ease-out ${0.15 + pi * 0.04}s forwards`,
                        }}
                      >
                        {pi + 1}
                      </div>
                    ))}
                  </div>
                )}
                {/* Mini prototype boxes inside Design & Prototype */}
                {isDesign && (
                  <div className="flex gap-2.5 mt-auto">
                    {[
                      { color: '#fbbf24', label: 'v1', icon: 'compass' as IconName },
                      { color: '#34d399', label: 'v2', icon: 'arrows-rotate' as IconName },
                      { color: '#60a5fa', label: 'v3', icon: 'rocket' as IconName },
                    ].map((b, bi) => (
                      <div
                        key={bi}
                        className="rounded-lg px-3.5 py-2.5 flex flex-col items-center gap-1.5 text-[14px] font-semibold"
                        style={{
                          backgroundColor: `${b.color}20`,
                          border: `1px solid ${b.color}40`,
                          color: b.color,
                          opacity: 0,
                          animation: `miniBoxIn 0.3s ease-out ${0.2 + bi * 0.1}s forwards`,
                        }}
                      >
                        <Icon name={b.icon} size={18} />
                        {b.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {i < phases.length - 1 && (
                <div
                  className="h-[2px] origin-left transition-colors duration-500"
                  style={{
                    width: 24,
                    backgroundColor: dimmed ? 'rgba(255,255,255,0.06)' : highlighted && i === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.12)',
                    opacity: 0,
                    transform: 'scaleX(0)',
                    animation: `phaseCardIn 0.4s ease ${0.9 + i * 0.4}s forwards, phaseLineGrow 0.4s ease ${0.9 + i * 0.4}s forwards`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Wayfinding Visual (new) ───

function WayfindingVisual({ mode }: { mode: Mode }) {
  if (mode === 'problem') {
    return (
      <div className="flex flex-col items-center gap-4 max-w-[520px]">
        <div className="w-full rounded-lg border border-white/[0.12] bg-white/[0.05] overflow-hidden animate-slideFadeIn">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.10]">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-400/40" />
              <div className="w-2 h-2 rounded-full bg-white/15" />
              <div className="w-2 h-2 rounded-full bg-white/15" />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded bg-white/[0.06] text-[10px] text-white/30">
                <span>←</span>
                <span className="text-red-300/60">???</span>
                <span>→</span>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-[120px] border-r border-white/[0.10] p-2 space-y-1">
              {['Home', 'People', 'Hiring', 'Payroll'].map((l, i) => (
                <div key={l} className={`text-[11px] px-2 py-1 rounded ${i === 2 ? 'bg-white/[0.08] text-white/40' : 'text-white/20'}`}>{l}</div>
              ))}
            </div>
            <div className="flex-1 p-4 flex flex-col items-center justify-center gap-2">
              <div className="text-red-300/70 text-[13px] font-medium">Where am I?</div>
              <div className="text-white/20 text-[11px]">No breadcrumbs</div>
              <div className="text-white/20 text-[11px]">No "back to list"</div>
              <div className="text-white/20 text-[11px]">Back button exits app</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-4 max-w-[520px]">
      <div className="w-full rounded-lg border border-white/[0.12] bg-white/[0.05] overflow-hidden animate-slideFadeIn">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.10]">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-amber-400/40" />
            <div className="w-2 h-2 rounded-full bg-white/15" />
            <div className="w-2 h-2 rounded-full bg-white/15" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded bg-white/[0.06] text-[10px] text-white/30">
              <span>←</span>
              <span className="text-amber-300/60">/hiring/candidates/jane-smith</span>
              <span>→</span>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-[120px] border-r border-white/[0.10] p-2 space-y-1">
            {['Home', 'People', 'Hiring', 'Payroll'].map((l, i) => (
              <div key={l} className={`text-[11px] px-2 py-1 rounded ${i === 2 ? 'bg-amber-400/15 text-amber-300/70 font-medium' : 'text-white/20'}`}>{l}</div>
            ))}
          </div>
          <div className="flex-1 p-3">
            <div className="flex items-center gap-1.5 text-[10px] mb-3">
              <span className="text-amber-300/50">Hiring</span>
              <span className="text-white/20">›</span>
              <span className="text-amber-300/50">Candidates</span>
              <span className="text-white/20">›</span>
              <span className="text-white/40">Jane Smith</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-amber-300/50 text-[11px]">
                <span>←</span>
                <span>Back to Candidates</span>
              </div>
            </div>
            <div className="text-white/30 text-[12px] font-medium">Jane Smith</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Multi-Product Strategy Visual (new) ───

function MultiProductVisual({ mode }: { mode: Mode }) {
  if (mode === 'problem') {
    return (
      <div className="flex flex-col items-center gap-5">
        <div className="rounded-lg border border-white/[0.12] bg-white/[0.05] p-5 animate-slideFadeIn" style={{ width: 280 }}>
          <div className="text-white/40 text-[13px] font-medium mb-3 text-center">BambooHR</div>
          <div className="space-y-1">
            {['Home', 'People', 'Hiring', 'Payroll', 'Time', 'Benefits', 'Talent', 'Culture', 'Apps', 'Analytics', 'Settings'].map(l => (
              <div key={l} className="text-[11px] text-white/25 px-2 py-0.5">{l}</div>
            ))}
          </div>
        </div>
        <div className="flex gap-3 animate-slideFadeIn" style={{ animationDelay: '300ms' }}>
          {['IT?', 'Finance?', 'Workplace?'].map(l => (
            <div key={l} className={`${redBox} px-4 py-2 text-[13px]`}>{l}</div>
          ))}
        </div>
        <div className="text-red-300/50 text-[12px] animate-slideFadeIn" style={{ animationDelay: '500ms' }}>Where do these go?</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-start gap-3">
        {[
          { name: 'BambooHR', items: ['People', 'Hiring', 'Payroll', 'Time', 'Benefits', 'Talent'], color: 'amber' },
          { name: 'BambooIT', items: ['Helpdesk', 'Incidents', 'Assets', 'Knowledge', 'Devices'], color: 'amber' },
          { name: 'BambooFinance', items: ['Expenses', 'Cards', 'Budgets', 'Travel', 'Reports'], color: 'amber' },
        ].map((product, pi) => (
          <div key={product.name} className="rounded-lg border border-amber-400/20 bg-amber-400/[0.06] p-3 animate-slideFadeIn" style={{ width: 160, animationDelay: `${pi * 200}ms` }}>
            <div className="text-amber-300/70 text-[12px] font-semibold mb-2 text-center">{product.name}</div>
            <div className="space-y-0.5">
              {product.items.map(l => (
                <div key={l} className="text-[10px] text-amber-300/40 px-1.5 py-0.5">{l}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 animate-slideFadeIn" style={{ animationDelay: '600ms' }}>
        <div className="h-px w-12 bg-amber-400/20" />
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-amber-400/25 bg-amber-400/[0.08]">
          <Icon name="grid-2-plus" size={12} className="text-amber-300/50" />
          <span className="text-amber-300/50 text-[12px] font-medium">Product Switcher</span>
        </div>
        <div className="h-px w-12 bg-amber-400/20" />
      </div>
    </div>
  );
}

// ─── Consolidated visual mapping ───
// Maps consolidated slide index + phase to the original visual components

const CONSOLIDATED_PROBLEM_VISUALS: React.FC<{ mode: Mode }>[][] = [
  // 0: No shared taxonomy (Taxonomy, Placement, NavOrder)
  [TaxonomyVisual, PlacementVisual, NavOrderVisual],
  // 1: Products don't have a front door (NavPresence, SettingsDamage, Invisible)
  [NavPresenceVisual, SettingsDamageVisual, InvisibleVisual],
  // 2: The nav doesn't work (SplitNav, ScreenRealEstate)
  [SplitNavVisual, ScreenRealEstateVisual],
  // 3: No contextual patterns (Settings, Reports, Ask, Insights)
  [ContextualSettingsVisual, ContextualReportsVisual, ContextualAskVisual, ContextualInsightsVisual],
  // 4: No wayfinding standards
  [WayfindingVisual],
  // 5: No multi-product strategy
  [MultiProductVisual],
];

const CONSOLIDATED_SOLUTION_VISUALS: (React.FC<{ mode: Mode }> | React.FC<{}>)[][] = [
  // 0: Product, Module, Feature (Taxonomy solution, TaxonomySpreadsheet, Placement solution)
  [TaxonomyVisual, TaxonomySpreadsheetVisual as React.FC<{}>, PlacementVisual],
  // 1: Every product gets a front door (NavPresence, SettingsDamage, Invisible solutions)
  [NavPresenceVisual, SettingsDamageVisual, InvisibleVisual],
  // 2: One nav, everything in it (SplitNav, NavOrder solutions)
  [SplitNavVisual, NavOrderVisual],
  // 3: In context, everywhere (Settings, Reports, Ask, Insights solutions)
  [ContextualSettingsVisual, ContextualReportsVisual, ContextualAskVisual, ContextualInsightsVisual],
  // 4: Breadcrumbs, back buttons, "you are here"
  [WayfindingVisual],
  // 5: A nav that scales to a platform
  [MultiProductVisual],
];

export function SlideVisual({ index, mode, noMargin, phase = 0 }: { index: number; mode: Mode; noMargin?: boolean; phase?: number }) {
  const visuals = mode === 'solution' ? CONSOLIDATED_SOLUTION_VISUALS : CONSOLIDATED_PROBLEM_VISUALS;
  const phaseVisuals = visuals[index];
  if (!phaseVisuals) return null;
  const Visual = phaseVisuals[Math.min(phase, phaseVisuals.length - 1)];
  if (!Visual) return null;

  // Some visuals (TaxonomySpreadsheet, RulebookDoc) don't take a mode prop
  const VisualAny = Visual as React.FC<any>;

  return (
    <div className={`${noMargin ? '' : 'mb-14'} flex justify-center`} style={{ transform: 'scale(1.15)', transformOrigin: 'center bottom' }}>
      <VisualAny mode={mode} />
    </div>
  );
}

/** Get the number of visual phases for a consolidated slide */
export function getConsolidatedPhaseCount(index: number, mode: Mode): number {
  const visuals = mode === 'solution' ? CONSOLIDATED_SOLUTION_VISUALS : CONSOLIDATED_PROBLEM_VISUALS;
  return visuals[index]?.length ?? 1;
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

// ─── Intro Visuals (Legacy mode, before the 11 problems) ───

// Slide 0: Scattered nav items filling the entire slide, building in slowly
function ScatteredNavVisual() {
  const { items, connections } = useMemo(() => {
    return computeScatteredLayout();
  }, []);

  return (
    // Fills parent absolute container
    <div className="absolute inset-0 pointer-events-none">
      <style>{`
        @keyframes scatterIn {
          from { opacity: 0; transform: rotate(var(--rot)) scale(0.5) translateY(30px); }
          to { opacity: 1; transform: rotate(var(--rot)) scale(1) translateY(0); }
        }
        @keyframes scatterFloat {
          0%, 100% { transform: rotate(var(--rot)) translateY(0px); }
          50% { transform: rotate(var(--rot)) translateY(-6px); }
        }
      `}</style>
      {/* Connection web — SVG lines between nearby items */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        {connections.map((conn, ci) => (
          <line
            key={ci}
            x1={`${conn.x1}%`} y1={`${conn.y1}%`}
            x2={`${conn.x2}%`} y2={`${conn.y2}%`}
            stroke="rgb(248,113,113)"
            strokeWidth={1.5}
            strokeOpacity={0}
          >
            <animate
              attributeName="stroke-opacity"
              from="0"
              to={`${conn.opacity}`}
              dur="0.8s"
              begin={`${conn.delay}s`}
              fill="freeze"
            />
          </line>
        ))}
      </svg>
      {items.map((item, i) => (
        <div
          key={i}
          className="absolute flex items-center gap-2 px-4 py-2 rounded-xl font-medium border"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.fontSize}px`,
            '--rot': `${item.rot}deg`,
            color: `rgba(248,113,113,${Math.min(item.opacity * 2.8 * item.depth, 0.9)})`,
            backgroundColor: `rgb(${Math.round((15 + item.opacity * 45) * item.depth)},${Math.round(8 * item.depth)},${Math.round(8 * item.depth)})`,
            borderColor: `rgba(248,113,113,${item.opacity * 0.6 * item.depth})`,
            zIndex: Math.round(item.depth * 10),
            opacity: 0,
            willChange: 'transform, opacity',
            animation: `scatterIn 0.6s ease-out ${item.delay}s forwards, scatterFloat ${4 + (i % 4)}s ease-in-out ${item.delay + 0.8}s infinite`,
          } as React.CSSProperties}
        >
          <Icon name={item.icon} size={Math.round(10 + item.depth * 8)} />
          {item.label}
        </div>
      ))}
    </div>
  );
}

function computeScatteredLayout() {
  // familiarity: 10 = most familiar (appears first), 1 = least familiar (appears last)
  const rawItems: { label: string; icon: IconName; x: number; y: number; rot: number; fam: number }[] = [
    // Row 1 — top edge
    { label: 'Home', icon: 'home', x: 3, y: 2, rot: -6, fam: 10 },
    { label: 'Custom Fields', icon: 'sliders', x: 22, y: 4, rot: 4, fam: 3 },
    { label: 'Recognition', icon: 'trophy', x: 42, y: 1, rot: -3, fam: 5 },
    { label: 'Settings', icon: 'gear', x: 62, y: 3, rot: 7, fam: 7 },
    { label: 'Career Pathing', icon: 'route', x: 80, y: 2, rot: -5, fam: 2 },
    // Row 2
    { label: 'Benefits', icon: 'heart', x: 8, y: 12, rot: 5, fam: 8 },
    { label: 'My Info', icon: 'circle-user', x: 32, y: 10, rot: -4, fam: 10 },
    { label: 'Dashboards', icon: 'chart-pie-simple', x: 55, y: 11, rot: 6, fam: 6 },
    { label: 'Payroll', icon: 'money-bill-1', x: 75, y: 13, rot: -8, fam: 9 },
    { label: 'Time Off', icon: 'umbrella-beach', x: 92, y: 10, rot: 3, fam: 10 },
    // Row 3
    { label: 'Training', icon: 'lightbulb', x: 2, y: 22, rot: -5, fam: 6 },
    { label: 'Hiring', icon: 'id-badge', x: 18, y: 20, rot: 7, fam: 8 },
    { label: 'Onboarding', icon: 'clipboard', x: 40, y: 21, rot: -3, fam: 7 },
    { label: 'Files', icon: 'file-lines', x: 60, y: 23, rot: 5, fam: 8 },
    { label: 'Reports', icon: 'chart-bar', x: 82, y: 22, rot: -7, fam: 7 },
    // Row 4
    { label: 'Performance', icon: 'circle-dot', x: 5, y: 33, rot: 4, fam: 7 },
    { label: 'Compensation', icon: 'coins', x: 25, y: 31, rot: -6, fam: 5 },
    { label: 'Apps', icon: 'compass', x: 48, y: 34, rot: 5, fam: 4 },
    { label: 'Job Postings', icon: 'bullhorn', x: 68, y: 32, rot: -4, fam: 5 },
    { label: 'Enrollment', icon: 'clipboard-check', x: 88, y: 33, rot: 6, fam: 4 },
    // Row 5 — near center
    { label: 'Time Tracking', icon: 'clock', x: 3, y: 43, rot: -3, fam: 8 },
    { label: 'Offboarding', icon: 'right-from-bracket', x: 22, y: 42, rot: 5, fam: 4 },
    { label: 'Org Chart', icon: 'sitemap', x: 72, y: 44, rot: -5, fam: 7 },
    { label: 'Ask', icon: 'message', x: 90, y: 42, rot: 4, fam: 6 },
    { label: 'Garnishments', icon: 'gavel', x: 10, y: 38, rot: 6, fam: 1 },
    { label: 'Tax Forms', icon: 'file-contract', x: 38, y: 38, rot: -7, fam: 3 },
    { label: 'Learning', icon: 'graduation-cap', x: 58, y: 38, rot: 3, fam: 5 },
    { label: 'Reviews', icon: 'star', x: 82, y: 38, rot: -4, fam: 6 },
    // Row 6 — center band
    { label: 'Inbox', icon: 'inbox', x: 4, y: 50, rot: 6, fam: 10 },
    { label: 'Feedback', icon: 'comments', x: 18, y: 48, rot: 5, fam: 5 },
    { label: 'Goals', icon: 'bullseye', x: 35, y: 50, rot: -6, fam: 6 },
    { label: 'Direct Deposit', icon: 'building-columns', x: 58, y: 49, rot: 4, fam: 6 },
    { label: 'Holidays', icon: 'flag', x: 78, y: 48, rot: 3, fam: 5 },
    { label: 'PTO', icon: 'plane', x: 90, y: 51, rot: -5, fam: 9 },
    // Row 7
    { label: 'Contractors', icon: 'handshake', x: 3, y: 57, rot: -4, fam: 3 },
    { label: '1099 Pay', icon: 'file-invoice', x: 20, y: 58, rot: -5, fam: 2 },
    { label: 'Logo & Color', icon: 'palette', x: 40, y: 57, rot: -3, fam: 3 },
    { label: 'Email Alerts', icon: 'bell', x: 60, y: 58, rot: 5, fam: 5 },
    { label: 'Notifications', icon: 'bell', x: 80, y: 56, rot: -7, fam: 6 },
    // Row 8
    { label: 'Employee Directory', icon: 'user-group', x: 2, y: 65, rot: -5, fam: 9 },
    { label: 'Wellbeing', icon: 'spa', x: 25, y: 64, rot: 4, fam: 3 },
    { label: 'ACA', icon: 'shield-halved', x: 45, y: 66, rot: -3, fam: 1 },
    { label: 'Approvals', icon: 'thumbs-up', x: 62, y: 63, rot: 7, fam: 6 },
    { label: 'Rewards', icon: 'gift', x: 80, y: 65, rot: -6, fam: 4 },
    // Row 9
    { label: 'Community', icon: 'people-group', x: 5, y: 74, rot: 5, fam: 4 },
    { label: 'E-Signatures', icon: 'pen-nib', x: 28, y: 75, rot: -4, fam: 3 },
    { label: 'Attendance', icon: 'calendar-check', x: 50, y: 76, rot: 6, fam: 5 },
    { label: 'Permissions', icon: 'lock', x: 70, y: 74, rot: -5, fam: 3 },
    { label: 'Scheduling', icon: 'calendar-days', x: 88, y: 75, rot: 3, fam: 4 },
    // Row 10
    { label: 'Compliance', icon: 'scale-balanced', x: 3, y: 84, rot: -6, fam: 2 },
    { label: 'Workflows', icon: 'arrows-rotate', x: 22, y: 85, rot: 5, fam: 3 },
    { label: 'Tax Filing', icon: 'file-invoice-dollar', x: 42, y: 86, rot: -3, fam: 2 },
    { label: 'Access Levels', icon: 'key', x: 62, y: 84, rot: 7, fam: 2 },
    { label: 'Deductions', icon: 'receipt', x: 82, y: 86, rot: -5, fam: 2 },
    // Row 11 — bottom edge
    { label: 'Candidates', icon: 'users', x: 8, y: 93, rot: 4, fam: 5 },
    { label: 'COBRA', icon: 'shield', x: 30, y: 94, rot: -7, fam: 1 },
    { label: 'Succession', icon: 'arrow-up-right-dots', x: 52, y: 93, rot: 5, fam: 1 },
    { label: 'Integrations', icon: 'plug', x: 75, y: 94, rot: -4, fam: 2 },
    { label: 'Billing', icon: 'credit-card', x: 92, y: 93, rot: 6, fam: 2 },
    // Extra fill
    { label: 'Documents', icon: 'folder-open', x: 14, y: 7, rot: -4, fam: 7 },
    { label: 'Interviews', icon: 'video', x: 50, y: 7, rot: 3, fam: 4 },
    { label: 'Analytics', icon: 'chart-line', x: 12, y: 16, rot: 5, fam: 5 },
    { label: 'Timesheets', icon: 'table', x: 85, y: 16, rot: 7, fam: 6 },
    { label: 'Plans', icon: 'list-check', x: 35, y: 27, rot: -5, fam: 3 },
    { label: 'Certifications', icon: 'certificate', x: 38, y: 69, rot: -4, fam: 2 },
    { label: 'Assets', icon: 'laptop', x: 58, y: 80, rot: -5, fam: 2 },
    { label: 'New Hires', icon: 'user-plus', x: 14, y: 90, rot: -7, fam: 5 },
    { label: 'Talent Pools', icon: 'users-rectangle', x: 45, y: 44, rot: 3, fam: 2 },
    { label: 'Surveys', icon: 'chart-pie' as any, x: 70, y: 55, rot: 4, fam: 3 },
  ];

  // Reassign positions: most familiar items get positions closest to center
  const cx = 50, cy = 50;
  const positions = rawItems.map(item => ({ x: item.x, y: item.y, rot: item.rot }));
  positions.sort((a, b) => {
    const da = Math.sqrt((a.x - cx) ** 2 + (a.y - cy) ** 2);
    const db = Math.sqrt((b.x - cx) ** 2 + (b.y - cy) ** 2);
    return da - db; // closest to center first
  });
  const sortedByFam = [...rawItems].sort((a, b) => b.fam - a.fam); // most familiar first
  const remapped = sortedByFam.map((item, i) => ({
    ...item,
    x: positions[i].x,
    y: positions[i].y,
    rot: positions[i].rot,
  }));

  const items = remapped.map((item, idx) => {
    const dx = item.x - cx;
    const dy = item.y - cy;
    const angle = Math.atan2(dy, dx);
    const cornerFactor = Math.abs(Math.sin(2 * angle));
    const pullIn = 1 - cornerFactor * 0.18;
    const nx = cx + dx * pullIn;
    let ny = cy + dy * pullIn;

    // Remap Y to avoid headline zone — dead zone tapers at edges
    const xDist = nx < 50 ? (50 - nx) : (nx - 50);
    const xRange = nx < 50 ? 45 : 40; // wider on left
    const edgeFactor = Math.max(0, 1 - xDist / xRange);
    const center = 49;
    const deadTop = center - 19 * edgeFactor;
    const deadBot = center + 19 * edgeFactor;
    if (ny <= center) {
      ny = (ny / center) * deadTop;
    } else {
      ny = deadBot + ((ny - center) / (100 - center)) * (100 - deadBot);
    }

    // Delay based on familiarity rank (remapped is already sorted by fam desc)
    const delay = (idx / (remapped.length - 1)) * 8;
    const opacity = 0.30;
    // Depth from familiarity: most familiar = biggest/brightest, least = smallest/faintest
    const depth = 0.6 + ((item.fam - 1) / 9) * 0.6; // fam 10 → 1.2, fam 1 → 0.6
    const fontSize = Math.round(13 + depth * 8);
    // Push items away from bottom nav dots area (y > 88%, x 25-75%)
    if (ny > 88 && nx > 25 && nx < 75) {
      ny = 88;
    }
    return { ...item, x: nx, y: ny, delay: Math.round(delay * 100) / 100, opacity, depth, fontSize };
  });

  // Pre-compute connections
  const maxConnDist = 35;
  const connections: { x1: number; y1: number; x2: number; y2: number; opacity: number; delay: number }[] = [];
  for (let i = 0; i < items.length; i++) {
    const dists = items.map((other, j) => ({
      j,
      dist: Math.sqrt((items[i].x - other.x) ** 2 + (items[i].y - other.y) ** 2),
    })).filter(d => d.j !== i && d.dist < maxConnDist).sort((a, b) => a.dist - b.dist);
    const numConns = 5 + (i % 3);
    for (let k = 0; k < Math.min(numConns, dists.length); k++) {
      const j = dists[k].j;
      if (i < j) {
        const connDelay = Math.max(items[i].delay, items[j].delay) + 0.3;
        const lineOpacity = Math.max(0.15, 0.35 - (dists[k].dist / maxConnDist) * 0.2);
        connections.push({
          x1: items[i].x + 3, y1: items[i].y + 1.5,
          x2: items[j].x + 3, y2: items[j].y + 1.5,
          opacity: lineOpacity,
          delay: connDelay,
        });
      }
    }
  }

  return { items, connections };
}

// Slide 1: Numbered problem labels floating and drifting
function ThirteenVisual() {
  const problems = [
    { label: 'No taxonomy', x: 8, y: 5, dx: 18, dy: 12, dur: 7 },
    { label: 'No placement rules', x: 55, y: 2, dx: -14, dy: 10, dur: 8.5 },
    { label: 'No nav presence', x: 30, y: 18, dx: 12, dy: -8, dur: 6.5 },
    { label: 'Settings bloat', x: 72, y: 15, dx: -10, dy: 14, dur: 9 },
    { label: 'Invisible products', x: 5, y: 32, dx: 16, dy: -6, dur: 7.5 },
    { label: 'Split navigation', x: 48, y: 30, dx: -12, dy: -10, dur: 8 },
    { label: 'No nav order', x: 78, y: 38, dx: -16, dy: 8, dur: 6 },
    { label: 'Screen real estate', x: 18, y: 50, dx: 14, dy: -12, dur: 9.5 },
    { label: 'Settings scavenger hunt', x: 52, y: 52, dx: -10, dy: 10, dur: 7 },
    { label: 'No contextual reports', x: 2, y: 68, dx: 18, dy: -8, dur: 8 },
    { label: 'No contextual AI/insights/automations', x: 42, y: 78, dx: -14, dy: -10, dur: 6.5 },
  ];

  return (
    <div className="mb-8 flex justify-center">
      <style>{`
        @keyframes floatIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div className="relative" style={{ width: 900, height: 480 }}>
        {problems.map((p, i) => (
          <div
            key={i}
            className="absolute flex items-center gap-3 px-5 py-3 rounded-2xl whitespace-nowrap"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              backgroundColor: 'rgba(248,113,113,0.08)',
              border: '1px solid rgba(248,113,113,0.18)',
              opacity: 0,
              animation: `floatIn 0.4s ease-out ${0.15 + i * 0.07}s forwards, problemDrift${i} ${p.dur}s ease-in-out ${0.5 + i * 0.07}s infinite`,
            }}
          >
            <span className="text-[22px] font-bold tabular-nums" style={{ color: 'rgba(248,113,113,0.5)' }}>{i + 1}</span>
            <span className="text-[20px] font-medium" style={{ color: 'rgba(248,113,113,0.85)' }}>{p.label}</span>
          </div>
        ))}
      </div>
      <style>{problems.map((p, i) => `
        @keyframes problemDrift${i} {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(${p.dx}px, ${p.dy}px); }
          66% { transform: translate(${-p.dx * 0.6}px, ${-p.dy * 0.4}px); }
        }
      `).join('')}</style>
    </div>
  );
}

// Slide 2: Four tall cards in a row, icon above label
function AgendaTimelineVisual() {
  const steps = [
    { label: ['11', 'Problems'], icon: 'skull' as const, color: '#f87171' },
    { label: ['Redesign v1', 'Prototype'], icon: 'compass' as const, color: '#fbbf24' },
    { label: ['Redesign v2', 'Prototype'], icon: 'arrows-rotate' as const, color: '#34d399' },
    { label: ['Redesign v3', 'Prototype'], sublabel: '(Space Exploration)', icon: 'rocket' as const, color: '#60a5fa' },
  ];

  return (
    <div className="mb-12 flex justify-center">
      <style>{`
        @keyframes agendaCardIn {
          from { opacity: 0; transform: translateY(24px) scale(0.92); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes agendaLineGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
      <div className="flex items-center">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <div
              className="rounded-2xl border flex flex-col items-center justify-center gap-7"
              style={{
                width: 300,
                height: 320,
                borderColor: `${step.color}30`,
                backgroundColor: `${step.color}08`,
                opacity: 0,
                animation: `agendaCardIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + i * 0.5}s forwards`,
              }}
            >
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${step.color}18`, color: step.color }}
              >
                <Icon name={step.icon} size={44} />
              </div>
              <div className="text-center px-4 leading-tight" style={{ color: step.color }}>
                <div className="text-[24px] font-semibold">{step.label[0]}</div>
                <div className="text-[24px] font-semibold">{step.label[1]}</div>
                {'sublabel' in step && step.sublabel && (
                  <div className="text-[15px] font-normal mt-1 opacity-60">{step.sublabel}</div>
                )}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div
                className="h-[2px] origin-left"
                style={{
                  width: 40,
                  backgroundColor: `${step.color}40`,
                  opacity: 0,
                  transform: 'scaleX(0)',
                  animation: `agendaCardIn 0.4s ease ${1.0 + i * 0.5}s forwards, agendaLineGrow 0.4s ease ${1.0 + i * 0.5}s forwards`,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Purpose slide — agenda-card style row of purpose items
function PurposeVisual() {
  const items = [
    { label: 'Project update', icon: 'chart-line' as IconName },
    { label: 'Design walkthrough', icon: 'compass' as IconName },
    { label: 'Collect feedback', icon: 'comments' as IconName },
    { label: 'Q & A', icon: 'circle-question' as IconName },
    { label: 'Next steps', icon: 'chevron-right' as IconName },
  ];
  return (
    <div>
      <style>{`
        @keyframes purposeIn {
          from { opacity: 0; transform: translateX(16px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      <div className="flex flex-col gap-8">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-6"
            style={{
              opacity: 0,
              animation: `purposeIn 0.5s ease-out ${0.3 + i * 0.15}s forwards`,
            }}
          >
            <div className="w-14 h-14 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center shrink-0">
              <Icon name={item.icon} size={24} style={{ color: 'rgba(255,255,255,0.4)' }} />
            </div>
            <div className="text-[34px] font-medium text-white/60">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Methodology slide — timeline showing 25 years / 2.5 years / 2.5 weeks
function MethodologyVisual({ phase = 0 }: { phase?: number }) {
  const bars = [
    { label: '25 years', icon: 'pen' as IconName, width: 800, special: null as null | 'bhr', brightBg: 'rgba(251,191,36,0.25)', dimBg: 'rgba(251,191,36,0.08)', brightBorder: 'rgba(251,191,36,0.4)', dimBorder: 'rgba(251,191,36,0.12)', brightText: 'rgba(251,191,36,0.9)', dimText: 'rgba(251,191,36,0.25)' },
    { label: '2.5 years', icon: 'pen' as IconName, width: 400, special: 'bhr' as null | 'bhr', brightBg: 'rgba(52,211,153,0.25)', dimBg: 'rgba(52,211,153,0.08)', brightBorder: 'rgba(52,211,153,0.4)', dimBorder: 'rgba(52,211,153,0.12)', brightText: 'rgba(52,211,153,0.9)', dimText: 'rgba(52,211,153,0.25)' },
    { label: '2.5 weeks', icon: 'rocket' as IconName, width: 230, special: null as null | 'bhr', brightBg: 'rgba(96,165,250,0.25)', dimBg: 'rgba(96,165,250,0.08)', brightBorder: 'rgba(96,165,250,0.4)', dimBorder: 'rgba(96,165,250,0.12)', brightText: 'rgba(96,165,250,0.9)', dimText: 'rgba(96,165,250,0.25)' },
  ];
  const gap = 12;
  const totalBarWidth = bars.reduce((s, b) => s + b.width, 0) + (bars.length - 1) * gap;
  return (
    <div className="mb-8 flex justify-center">
      <style>{`
        @keyframes methBarGrow {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }
      `}</style>
      {/* Container */}
      <div
        className="rounded-full border p-3 flex"
        style={{ gap, width: totalBarWidth + 36, borderColor: 'rgba(255,255,255,0.12)' }}
      >
        {bars.map((bar, i) => {
          if (i > phase) return <div key={i} className="rounded-full" style={{ width: bar.width, height: 84 }} />;
          const isCurrent = i === phase;
          const borderColor = isCurrent ? bar.brightBorder : bar.dimBorder;
          const bgColor = isCurrent ? bar.brightBg : bar.dimBg;
          const textColor = isCurrent ? bar.brightText : bar.dimText;
          return (
            <div
              key={i}
              className="origin-left rounded-full border flex items-center gap-3 px-7 transition-all duration-400"
              style={{
                width: bar.width,
                height: 84,
                borderColor,
                backgroundColor: bgColor,
                ...(i === phase ? { animation: 'methBarGrow 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' } : {}),
              }}
            >
              {bar.special === 'bhr' ? (
                <svg width="22" height="17" viewBox="0 0 37 29.35" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, transition: 'opacity 0.4s' }}>
                  <path d="M7.26601 0C7.24121 -0.00826622 7.22881 0.0206656 7.24534 0.0413311C10.3658 3.56274 12.6267 7.82398 13.7591 10.556C12.3291 9.02258 10.9651 7.4272 9.43589 6.36499C6.33193 4.19924 3.06264 3.1329 0.0247987 2.72785C0 2.72785 -0.0123993 2.75679 0.00826622 2.77332C7.4396 8.73326 5.70783 11.8496 15.4082 13.0813C15.4248 13.0813 15.4413 13.0648 15.433 13.0482C13.9988 8.62994 13.5318 5.35238 11.0974 2.74852C10.3328 1.93016 8.0761 0.281052 7.26601 0Z" fill={textColor}/>
                  <path d="M27.0471 9.29537C23.5257 9.29537 21.641 10.5022 20.3184 11.8166L19.9588 12.1968V0H16.9168V19.7025C16.9168 25.6418 21.4922 29.3451 26.7412 29.3451C32.5235 29.3451 36.9046 24.8937 36.9046 19.1735C36.9046 13.8625 32.3375 9.29537 27.0471 9.29537ZM26.7412 26.5263C22.9098 26.5263 19.6653 23.505 19.6653 19.4587C19.6653 15.4124 22.3973 12.0852 26.8074 12.0852C31.2174 12.0852 33.813 15.6521 33.813 19.3843C33.813 23.4471 31.0645 26.5263 26.7371 26.5263H26.7412Z" fill={textColor}/>
                </svg>
              ) : (
                <Icon name={bar.icon} size={22} style={{ color: textColor, transition: 'color 0.4s' }} />
              )}
              <span className="text-[24px] font-semibold whitespace-nowrap transition-colors duration-400" style={{ color: textColor }}>{bar.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const INTRO_VISUALS: (React.FC | null)[] = [
  ScatteredNavVisual, // IA problem slide (rendered fullscreen separately)
  ThirteenVisual,
  PurposeVisual,
  MethodologyVisual,
  null, // phases slide (handled separately)
  AgendaTimelineVisual,
];

export function IntroSlideVisual({ index, noMargin, phase }: { index: number; noMargin?: boolean; phase?: number }) {
  const Visual = INTRO_VISUALS[index];
  if (!Visual) return null;
  // Scattered nav (index 0) renders as fixed fullscreen, handled separately
  if (index === 0) return <Visual />;
  // Methodology (index 3) needs phase prop
  if (index === 3) return (
    <div className={`${noMargin ? '' : 'mb-0'} flex justify-center`}>
      <MethodologyVisual phase={phase ?? 0} />
    </div>
  );
  return (
    <div className={`${noMargin ? '' : 'mb-0'} flex justify-center`}>
      <Visual />
    </div>
  );
}

const SECTION_ICONS: Record<string, { icon: IconName; color: string }> = {
  legacy: { icon: 'skull', color: '#f87171' },
  new: { icon: 'compass', color: '#fbbf24' },
  new2: { icon: 'arrows-rotate', color: '#34d399' },
  space: { icon: 'rocket', color: '#60a5fa' },
};

export function SectionTitleVisual({ mode }: { mode: string }) {
  const section = SECTION_ICONS[mode];
  if (!section) return null;
  return (
    <div className="mb-6 flex justify-center">
      <style>{`
        @keyframes sectionIconIn {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div
        style={{
          color: section.color,
          opacity: 0,
          animation: 'sectionIconIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards',
        }}
      >
        <Icon name={section.icon} size={72} />
      </div>
    </div>
  );
}

export default SlideVisual;
