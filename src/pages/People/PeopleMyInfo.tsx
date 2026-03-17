import { useState } from 'react';
import { Icon } from '../../components/Icon';
import { Placeholder } from '../../components/Placeholder/Placeholder';
import { getEmployee } from '../../data/currentEmployee';
import { useScenario } from '../../contexts/ScenarioContext';

const TABS = ['Personal', 'Job', 'Time off', 'Documents', 'Timesheets', 'Performance', 'Emergency', 'Training'];

export default function PeopleMyInfo() {
  const [activeTab, setActiveTab] = useState('Personal');
  const { persona } = useScenario();
  const ee = getEmployee(persona);

  const VITALS = [
    { icon: 'phone' as const, value: ee.workPhone },
    { icon: 'mobile' as const, value: ee.mobilePhone },
    { icon: 'envelope' as const, value: ee.workEmail },
    { icon: 'linkedin' as const, value: ee.linkedIn },
    { icon: 'clock' as const, value: `${ee.localTime}\n${ee.location}` },
    { icon: 'building' as const, value: `${ee.department}\nFull-time` },
  ];

  return (
    <div className="min-h-full">
      {/* Dark green banner */}
      <div className="bg-[var(--color-primary-strong)] px-8 pt-6 pb-0">
        <div className="flex items-start gap-5 mb-5">
          <img
            src={ee.avatar}
            alt={`${ee.preferredName} ${ee.lastName}`}
            className="w-[100px] h-[100px] rounded-xl object-cover shrink-0 border-2 border-white/20"
          />
          <div className="flex-1 min-w-0 pt-1">
            <h1 className="text-[28px] font-bold leading-tight mb-1" style={{ color: '#ffffff' }}>
              {ee.preferredName} ({ee.firstName}) {ee.lastName}
            </h1>
            <p className="text-sm text-white/70">
              {ee.pronouns} · {ee.title}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 pt-1">
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/30 text-sm font-medium text-white hover:bg-white/10 transition-colors">
              Request a change
              <Icon name="caret-down" size={9} className="text-white/60" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors">
              <Icon name="ellipsis" size={16} />
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-0 -mb-px">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? 'text-white border-white'
                  : 'text-white/60 border-transparent hover:text-white/80'
              }`}
            >
              {tab}
            </button>
          ))}
          <button className="px-4 py-2.5 text-sm font-medium text-white/60 hover:text-white/80 transition-colors border-b-2 border-transparent flex items-center gap-1">
            More <Icon name="caret-down" size={9} />
          </button>
        </div>
      </div>

      {/* Body: sidebar + content */}
      <div className="flex">
        {/* Left sidebar */}
        <div className="w-[200px] shrink-0 px-6 py-6 border-r border-[var(--border-neutral-xx-weak)]">
          {/* Vitals */}
          <h3 className="text-xs font-semibold text-[var(--text-neutral-medium)] uppercase tracking-wide mb-3">Vitals</h3>
          <div className="space-y-2.5 mb-6">
            {VITALS.map((v, i) => (
              <div key={i} className="flex items-start gap-2">
                <Icon name={v.icon} size={13} className="text-[var(--text-neutral-weak)] mt-0.5 shrink-0" />
                <span className="text-[12px] text-[var(--text-neutral-x-strong)] whitespace-pre-line leading-tight">{v.value}</span>
              </div>
            ))}
          </div>

          {/* Hire Date */}
          <h3 className="text-xs font-semibold text-[var(--text-neutral-medium)] uppercase tracking-wide mb-2">Hire Date</h3>
          <div className="flex items-start gap-2 mb-6">
            <Icon name="calendar" size={13} className="text-[var(--text-neutral-weak)] mt-0.5 shrink-0" variant="regular" />
            <div>
              <p className="text-[12px] text-[var(--text-neutral-x-strong)] font-medium">{ee.hireDate}</p>
              <p className="text-[11px] text-[var(--text-neutral-medium)]">{ee.tenure}</p>
            </div>
          </div>

          {/* Manager */}
          <h3 className="text-xs font-semibold text-[var(--text-neutral-medium)] uppercase tracking-wide mb-2">Manager</h3>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-7 h-7 rounded-full bg-[#8b5cf6] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
              {ee.manager.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="text-[12px] text-[var(--text-neutral-x-strong)] font-medium">{ee.manager.name}</p>
              <p className="text-[11px] text-[var(--text-neutral-medium)]">{ee.manager.title}</p>
            </div>
          </div>

          {/* Direct Reports */}
          <h3 className="text-xs font-semibold text-[var(--text-neutral-medium)] uppercase tracking-wide mb-2">Direct Reports</h3>
          <div className="space-y-1.5">
            {ee.directReports.map(name => (
              <div key={name} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[var(--color-primary-medium)] flex items-center justify-center text-white text-[8px] font-bold shrink-0">
                  {name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-[12px] text-[var(--text-neutral-x-strong)]">{name}</span>
              </div>
            ))}
            <button className="text-[12px] text-[var(--color-primary-strong)] hover:underline ml-7">{ee.moreReportsCount} more...</button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 p-6">
          <Placeholder />
        </div>
      </div>
    </div>
  );
}
