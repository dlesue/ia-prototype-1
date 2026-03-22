import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import { useScenario } from '../../contexts/ScenarioContext';
import { getEmployee } from '../../data/currentEmployee';
import { ProductSettingsModal } from '../ProductSettingsModal/ProductSettingsModal';

const PLATFORM_T1_IDS = new Set(['apps', 'analytics', 'settings']);
const NAV_STORAGE_KEY = 'bhr-nav-v2-expanded';
const T1_EXPANDED_KEY = 'bhr-nav-v2-t1-expanded';

export interface NavT2Item {
  path: string;
  label: string;
}

export interface NavT1Item {
  id: string;
  path: string;
  label: string;
  icon: IconName;
  hasGear?: boolean;
  children: NavT2Item[];
}

const topItems: NavT1Item[] = [
  { id: 'inbox', path: '/home/inbox', label: 'Inbox', icon: 'inbox', children: [] },
  { id: 'my-info', path: '/people/my-info', label: 'My Info', icon: 'circle-user', children: [] },
];

export const navItems: NavT1Item[] = [
  { id: 'home', path: '/home', label: 'Home', icon: 'home', children: [] },
  {
    id: 'people', path: '/people', label: 'People', icon: 'user-group', hasGear: true,
    children: [
      { path: '/people/directory', label: 'Employee Directory' },
      { path: '/people/org-chart', label: 'Org Chart' },
      { path: '/people/onboarding', label: 'Onboarding' },
      { path: '/people/offboarding', label: 'Offboarding' },
      { path: '/people/documents', label: 'Documents' },
      { path: '/people/compliance', label: 'Compliance' },
    ],
  },
  {
    id: 'hiring', path: '/hiring', label: 'Hiring', icon: 'id-badge', hasGear: true,
    children: [
      { path: '/hiring/job-postings', label: 'Job Postings' },
      { path: '/hiring/candidates', label: 'Candidates' },
      { path: '/hiring/interviews', label: 'Interview Scheduling' },
      { path: '/hiring/offers', label: 'Offer Management' },
      { path: '/hiring/analytics', label: 'Hiring Analytics' },
    ],
  },
  {
    id: 'payroll', path: '/payroll', label: 'Payroll', icon: 'money-bill-1', hasGear: true,
    children: [
      { path: '/payroll/run', label: 'Run Payroll' },
      { path: '/payroll/history', label: 'Payroll History' },
      { path: '/payroll/tax-filing', label: 'Tax Filing & Forms' },
      { path: '/payroll/deductions', label: 'Deductions & Garnishments' },
      { path: '/payroll/off-cycle', label: 'Off-Cycle Payments' },
      { path: '/payroll/contractors', label: 'Contractors / 1099 Pay' },
    ],
  },
  {
    id: 'time', path: '/time', label: 'Time', icon: 'clock', hasGear: true,
    children: [
      { path: '/time/tracking', label: 'Time Tracking' },
      { path: '/time/time-off', label: 'Time Off' },
      { path: '/time/scheduling', label: 'Scheduling' },
      { path: '/time/attendance', label: 'Attendance' },
    ],
  },
  {
    id: 'benefits', path: '/benefits', label: 'Benefits', icon: 'heart', hasGear: true,
    children: [
      { path: '/benefits/enrollment', label: 'Enrollment' },
      { path: '/benefits/plans', label: 'Plans' },
      { path: '/benefits/cobra', label: 'COBRA Administration' },
      { path: '/benefits/aca', label: 'ACA Compliance' },
      { path: '/benefits/reports', label: 'Benefits Reports' },
    ],
  },
  {
    id: 'talent', path: '/talent', label: 'Talent', icon: 'star', hasGear: true,
    children: [
      { path: '/talent/performance', label: 'Performance' },
      { path: '/talent/learning', label: 'Learning' },
      { path: '/talent/compensation', label: 'Compensation' },
      { path: '/talent/succession', label: 'Succession Planning' },
      { path: '/talent/career-pathing', label: 'Career Pathing' },
    ],
  },
  {
    id: 'culture', path: '/culture', label: 'Culture', icon: 'face-smile', hasGear: true,
    children: [
      { path: '/culture/community', label: 'Community' },
      { path: '/culture/rewards', label: 'Rewards' },
      { path: '/culture/recognition', label: 'Recognition' },
      { path: '/culture/wellbeing', label: 'Wellbeing' },
    ],
  },
  {
    id: 'analytics', path: '/analytics', label: 'Analytics', icon: 'chart-pie-simple', hasGear: true,
    children: [
      { path: '/analytics/dashboards', label: 'Dashboards' },
      { path: '/analytics/reports', label: 'Reports' },
      { path: '/analytics/workforce-planning', label: 'Workforce Planning' },
    ],
  },
  {
    id: 'settings', path: '/settings', label: 'Settings', icon: 'gear',
    children: [
      { path: '/settings/company', label: 'Company' },
      { path: '/settings/permissions', label: 'Permissions & Roles' },
      { path: '/settings/workflows', label: 'Workflows & Automations' },
      { path: '/settings/integrations', label: 'Integrations / App Directory' },
      { path: '/settings/notifications', label: 'Notifications' },
      { path: '/settings/billing', label: 'Billing & Plan' },
    ],
  },
];

interface GlobalNavV2Props {
  className?: string;
}

export function GlobalNavV2({ className = '' }: GlobalNavV2Props) {
  const [isExpanded, setIsExpanded] = useState(() => {
    const stored = localStorage.getItem(NAV_STORAGE_KEY);
    return stored ? JSON.parse(stored) : true;
  });
  const [expandedT1, setExpandedT1] = useState<string | null>(() => {
    return localStorage.getItem(T1_EXPANDED_KEY) || 'home';
  });
  const [hoveredT1, setHoveredT1] = useState<string | null>(null);
  const [isTablet, setIsTablet] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [settingsProduct, setSettingsProduct] = useState<string | null>(null);
  const avatarMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { scenario } = useScenario();
  const ee = getEmployee(scenario.persona);

  useEffect(() => {
    if (!avatarMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (avatarMenuRef.current && !avatarMenuRef.current.contains(e.target as Node)) {
        setAvatarMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [avatarMenuOpen]);

  useEffect(() => {
    const checkTablet = () => setIsTablet(window.innerWidth < 1024);
    checkTablet();
    window.addEventListener('resize', checkTablet);
    return () => window.removeEventListener('resize', checkTablet);
  }, []);

  useEffect(() => {
    localStorage.setItem(NAV_STORAGE_KEY, JSON.stringify(isExpanded));
  }, [isExpanded]);

  useEffect(() => {
    if (expandedT1) localStorage.setItem(T1_EXPANDED_KEY, expandedT1);
  }, [expandedT1]);

  // Auto-expand T1 based on current route
  useEffect(() => {
    const currentT1 = navItems.find(item => isT1Active(item));
    if (currentT1) setExpandedT1(currentT1.id);
  }, [location.pathname]);

  const effectiveExpanded = isTablet ? false : isExpanded;

  const handleT1Click = (item: NavT1Item) => {
    navigate(item.path);
    setExpandedT1(item.id);
  };

  const isT1Active = (item: NavT1Item) => {
    const onPath = location.pathname.startsWith(item.path + '/') || location.pathname === item.path;
    if (item.id === 'people' && location.pathname.startsWith('/people/my-info')) return false;
    if (item.id === 'home' && location.pathname.startsWith('/home/inbox')) return false;
    return onPath;
  };

  const isTopItemActive = (item: NavT1Item) => {
    return location.pathname.startsWith(item.path + '/') || location.pathname === item.path;
  };

  return (
    <>
    <nav
      className={`
        absolute left-0 top-0 h-full z-50 flex flex-col
        bg-[var(--surface-neutral-xx-weak)]
        border-r border-[var(--border-neutral-xx-weak)]
        transition-[width] duration-300 ease-in-out
        ${effectiveExpanded ? 'w-[260px]' : 'w-[72px]'}
        ${className}
      `}
      style={{ overflow: 'hidden' }}
    >
      {/* Top Chrome */}
      <div className={`shrink-0 ${effectiveExpanded ? 'px-4 pt-5 pb-1' : 'px-3 pt-5 pb-1'}`}>
        <div className="flex items-center justify-between mb-1.5">
          {effectiveExpanded ? (
            <>
              <button onClick={() => navigate('/home')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: 'var(--color-primary-strong)' }}>
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <span className="font-semibold text-sm text-[var(--text-neutral-xx-strong)] whitespace-nowrap">Acme Corp</span>
              </button>
              <div className="flex items-center gap-1">
                <button
                  className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--surface-neutral-xx-weak)] transition-colors shrink-0"
                  title="Help"
                  onClick={() => {
                    const isOpen = localStorage.getItem('bhr-chat-panel-open') === 'true';
                    if (isOpen) {
                      localStorage.setItem('bhr-chat-panel-open', 'false');
                    } else {
                      const payload = { type: 'help', ts: Date.now() };
                      localStorage.setItem('bhr-help-payload', JSON.stringify(payload));
                      localStorage.setItem('bhr-chat-panel-open', 'true');
                    }
                    window.dispatchEvent(new Event('storage'));
                  }}
                >
                  <Icon name="circle-question" size={16} className="text-[var(--text-neutral-weak)]" variant="regular" />
                </button>
                <button
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white border border-[var(--border-neutral-x-weak)] text-[13px] font-medium text-[var(--text-neutral-xx-strong)] hover:border-[var(--border-neutral-weak)] shadow-[0_1px_2px_rgba(0,0,0,0.06)] active:shadow-none active:translate-y-px transition-all shrink-0"
                  onClick={() => { const isOpen = localStorage.getItem('bhr-chat-panel-open') === 'true'; if (!isOpen) { localStorage.setItem('bhr-ask-reset', JSON.stringify({ ts: Date.now() })); } localStorage.setItem('bhr-chat-panel-open', String(!isOpen)); window.dispatchEvent(new Event('storage')); }}
                >
                  <Icon name="sparkles" size={12} className="text-[var(--text-neutral-medium)]" />
                  <span>Ask</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <button onClick={() => navigate('/home')} className="w-10 h-10 rounded-md flex items-center justify-center hover:opacity-80 transition-opacity" style={{ background: 'var(--color-primary-strong)' }}>
                <span className="text-white text-sm font-bold">A</span>
              </button>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[var(--border-neutral-x-weak)] hover:border-[var(--border-neutral-weak)] shadow-[0_1px_2px_rgba(0,0,0,0.06)] active:shadow-none active:translate-y-px transition-all"
                title="Ask"
                onClick={() => { const isOpen = localStorage.getItem('bhr-chat-panel-open') === 'true'; if (!isOpen) { localStorage.setItem('bhr-ask-reset', JSON.stringify({ ts: Date.now() })); } localStorage.setItem('bhr-chat-panel-open', String(!isOpen)); window.dispatchEvent(new Event('storage')); }}
              >
                <Icon name="sparkles" size={13} className="text-[var(--text-neutral-medium)]" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* T0 Chrome: Search + Inbox + My Info */}
      <div className="shrink-0 px-2 py-0.5 space-y-0.5">
        {/* Search */}
        <div
          className={`
            relative flex items-center cursor-pointer group
            transition-colors duration-150
            ${effectiveExpanded ? 'px-3 py-1.5' : 'w-12 h-10 justify-center mx-auto'}
            rounded-[10px]
            hover:bg-white/50
          `}
          title="Search"
          onClick={() => window.dispatchEvent(new Event('bhr-open-search'))}
        >
          <Icon name="magnifying-glass" size={16} className="shrink-0 text-[var(--icon-neutral-x-strong)]" />
          {effectiveExpanded && (
            <>
              <span className="ml-2.5 flex-1 text-[13px] font-medium text-[var(--text-neutral-xx-strong)]">Search</span>
              <span className="text-[10px] text-[var(--text-neutral-weak)] opacity-0 group-hover:opacity-100 transition-opacity">{'\u2318'}K</span>
            </>
          )}
        </div>
        {topItems.map((item) => {
          const active = isTopItemActive(item);
          return (
            <div
              key={item.id}
              className={`
                relative flex items-center cursor-pointer
                transition-colors duration-150
                ${effectiveExpanded ? 'px-3 py-1.5' : 'w-12 h-10 justify-center mx-auto'}
                rounded-[10px]
                ${active ? 'bg-white' : 'hover:bg-white/50'}
              `}
              onClick={() => navigate(item.path)}
            >
              <Icon
                name={item.icon}
                size={16}
                variant={active ? 'solid' : 'regular'}
                className={`shrink-0 transition-colors duration-200 ${active ? 'text-[var(--color-primary-strong)]' : 'text-[var(--icon-neutral-x-strong)]'}`}
              />
              {effectiveExpanded && (
                <span className={`ml-2.5 flex-1 text-[13px] whitespace-nowrap truncate ${active ? 'font-semibold text-[var(--color-primary-strong)]' : 'font-medium text-[var(--text-neutral-xx-strong)]'}`}>
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Separator */}
      <div className="shrink-0 h-px bg-[var(--border-neutral-xx-weak)] mx-3 mb-2 mt-1" />

      {/* Product Nav - Scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'none' }}>
        <div className="px-2 py-1 space-y-0.5">
          {navItems.filter(item => !PLATFORM_T1_IDS.has(item.id)).map((item) => {
            const t1Active = isT1Active(item);
            const isT1Expanded = expandedT1 === item.id;

            return (
              <div key={item.id}>
                {/* T1 Row */}
                <div
                  className={`
                    relative flex items-center cursor-pointer
                    transition-colors duration-150 group
                    ${effectiveExpanded ? 'px-3 py-1.5' : 'w-12 h-10 justify-center mx-auto'}
                    rounded-[10px]
                    ${t1Active ? 'bg-white' : 'hover:bg-white/50'}
                  `}
                  onClick={() => handleT1Click(item)}
                  onMouseEnter={() => setHoveredT1(item.id)}
                  onMouseLeave={() => setHoveredT1(null)}
                >
                  <Icon
                    name={item.icon}
                    size={16}
                    variant={t1Active ? 'solid' : 'regular'}
                    className={`shrink-0 transition-colors duration-200 ${t1Active ? 'text-[var(--color-primary-strong)]' : 'text-[var(--icon-neutral-x-strong)]'}`}
                  />
                  {effectiveExpanded && (
                    <>
                      <span className={`ml-2.5 flex-1 text-[13px] whitespace-nowrap truncate ${t1Active ? 'font-semibold text-[var(--color-primary-strong)]' : 'font-medium text-[var(--text-neutral-xx-strong)]'}`}>
                        {item.label}
                      </span>
                      {item.hasGear && scenario.persona === 'hr-admin' && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setSettingsProduct(item.label); }}
                          className={`relative group/gear w-5 h-5 flex items-center justify-center rounded hover:bg-[var(--border-neutral-xx-weak)] transition-all shrink-0 ml-1 ${hoveredT1 === item.id ? 'opacity-100' : 'opacity-0'}`}
                        >
                          <Icon name="gear" size={11} className="text-[var(--icon-neutral-strong)]" />
                          <span className="pointer-events-none absolute right-0 -top-8 px-2 py-1 text-[11px] font-medium text-white bg-[#1e1e1e] rounded whitespace-nowrap opacity-0 group-hover/gear:opacity-100 transition-opacity z-50">
                            {item.label} Settings
                          </span>
                        </button>
                      )}
                    </>
                  )}
                </div>

                {/* T2 Children */}
                {effectiveExpanded && isT1Expanded && item.children.length > 0 && (
                  <div className="ml-[34px] mt-0.5 mb-1 space-y-0.5">
                    {item.children.map((t2) => {
                      const t2Active = location.pathname === t2.path || location.pathname.startsWith(t2.path + '/');
                      return (
                        <NavLink
                          key={t2.path}
                          to={t2.path}
                          className={`
                            flex items-center px-2 py-1
                            text-[13px] transition-colors duration-150
                            ${t2Active
                              ? 'text-[var(--color-primary-strong)] font-semibold'
                              : 'text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)]'
                            }
                          `}
                        >
                          <span className="truncate">{t2.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Separator between Domain and Platform sections */}
        <div className="shrink-0 h-px bg-[var(--border-neutral-xx-weak)] mx-3 my-1.5" />

        {/* Platform Nav (Apps, Analytics, Settings) */}
        <div className="px-2 pb-1 space-y-0.5">
          {navItems.filter(item => PLATFORM_T1_IDS.has(item.id)).map((item) => {
            const t1Active = isT1Active(item);
            const isT1Expanded = expandedT1 === item.id;

            return (
              <div key={item.id}>
                <div
                  className={`
                    relative flex items-center cursor-pointer
                    transition-colors duration-150 group
                    ${effectiveExpanded ? 'px-3 py-1.5' : 'w-12 h-10 justify-center mx-auto'}
                    rounded-[10px]
                    ${t1Active ? 'bg-white' : 'hover:bg-white/50'}
                  `}
                  onClick={() => handleT1Click(item)}
                  onMouseEnter={() => setHoveredT1(item.id)}
                  onMouseLeave={() => setHoveredT1(null)}
                >
                  <Icon
                    name={item.icon}
                    size={16}
                    variant={t1Active ? 'solid' : 'regular'}
                    className={`shrink-0 transition-colors duration-200 ${t1Active ? 'text-[var(--color-primary-strong)]' : 'text-[var(--icon-neutral-x-strong)]'}`}
                  />
                  {effectiveExpanded && (
                    <>
                      <span className={`ml-2.5 flex-1 text-[13px] whitespace-nowrap truncate ${t1Active ? 'font-semibold text-[var(--color-primary-strong)]' : 'font-medium text-[var(--text-neutral-xx-strong)]'}`}>
                        {item.label}
                      </span>
                      {item.hasGear && scenario.persona === 'hr-admin' && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setSettingsProduct(item.label); }}
                          className={`relative group/gear w-5 h-5 flex items-center justify-center rounded hover:bg-[var(--border-neutral-xx-weak)] transition-all shrink-0 ml-1 ${hoveredT1 === item.id ? 'opacity-100' : 'opacity-0'}`}
                        >
                          <Icon name="gear" size={11} className="text-[var(--icon-neutral-strong)]" />
                          <span className="pointer-events-none absolute right-0 -top-8 px-2 py-1 text-[11px] font-medium text-white bg-[#1e1e1e] rounded whitespace-nowrap opacity-0 group-hover/gear:opacity-100 transition-opacity z-50">
                            {item.label} Settings
                          </span>
                        </button>
                      )}
                    </>
                  )}
                </div>

                {effectiveExpanded && isT1Expanded && item.children.length > 0 && (
                  <div className="ml-[34px] mt-0.5 mb-1 space-y-0.5">
                    {item.children.map((t2) => {
                      const t2Active = location.pathname === t2.path || location.pathname.startsWith(t2.path + '/');
                      return (
                        <NavLink
                          key={t2.path}
                          to={t2.path}
                          className={`
                            flex items-center px-2 py-1
                            text-[13px] transition-colors duration-150
                            ${t2Active
                              ? 'text-[var(--color-primary-strong)] font-semibold'
                              : 'text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)]'
                            }
                          `}
                        >
                          <span className="truncate">{t2.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Collapse/Expand */}
      {!isTablet && (
        <div className="shrink-0 px-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center rounded-[10px] transition-colors hover:bg-[var(--surface-neutral-xx-weak)] ${effectiveExpanded ? 'px-3 py-1.5' : 'w-12 h-8 justify-center mx-auto'}`}
            title={effectiveExpanded ? 'Collapse' : 'Expand'}
          >
            <Icon name={effectiveExpanded ? 'arrow-left-from-line' : 'arrow-right-from-line'} size={15} className="shrink-0 text-[var(--text-neutral-weak)]" />
          </button>
        </div>
      )}

      {/* Bottom Chrome */}
      <div className="shrink-0 border-t border-[var(--border-neutral-xx-weak)] px-2 py-2">
        <div ref={avatarMenuRef} className="relative">
          <button
            onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
            className={`flex items-center rounded-[10px] transition-colors hover:bg-[var(--surface-neutral-xx-weak)] ${effectiveExpanded ? 'w-full px-2 py-2 gap-2.5' : 'w-10 h-10 justify-center mx-auto'}`}
          >
            <img src={ee.avatar} alt={`${ee.preferredName} ${ee.lastName}`} className="w-7 h-7 shrink-0 rounded-md object-cover" />
            {effectiveExpanded && (
              <div className="flex flex-col items-start min-w-0">
                <span className="text-sm font-medium text-[var(--text-neutral-xx-strong)] truncate leading-tight">{ee.preferredName} {ee.lastName}</span>
                <span className="text-xs text-[var(--text-neutral-medium)] truncate leading-tight">{ee.title}</span>
              </div>
            )}
          </button>
          {avatarMenuOpen && (
            <div className="absolute left-full bottom-0 ml-2 w-52 py-1 rounded-xl shadow-lg border border-[var(--border-neutral-weak)] bg-[var(--surface-neutral-white)]" style={{ zIndex: 100 }}>
              <button onClick={() => { setAvatarMenuOpen(false); navigate('/people/my-info'); }} className="w-full text-left px-4 py-2.5 text-sm text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">My Info</button>
              <button onClick={() => { setAvatarMenuOpen(false); navigate('/home/inbox'); }} className="w-full text-left px-4 py-2.5 text-sm text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">Inbox</button>
              <div className="h-px bg-[var(--border-neutral-xx-weak)] my-1" />
              <button className="w-full text-left px-4 py-2.5 text-sm text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">Sign out</button>
            </div>
          )}
        </div>
      </div>
    </nav>
    <ProductSettingsModal
      productLabel={settingsProduct || ''}
      isOpen={!!settingsProduct}
      onClose={() => setSettingsProduct(null)}
    />
    </>
  );
}

export default GlobalNavV2;
