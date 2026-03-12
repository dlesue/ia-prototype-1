import { useState, useEffect, useRef, useMemo } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import { useTheme } from '../../contexts/ThemeContext';
import { useScenario } from '../../contexts/ScenarioContext';
import avatarSmall from '../../assets/images/avatar-small.png';

const NAV_STORAGE_KEY = 'bhr-nav-expanded';
const T1_EXPANDED_KEY = 'bhr-nav-t1-expanded';

interface NavT2Item {
  path: string;
  label: string;
  locked?: boolean;
  separator?: boolean;
}

interface NavT1Item {
  id: string;
  path: string;
  label: string;
  icon: IconName;
  locked?: boolean;
  hasGear?: boolean;
  children: NavT2Item[];
}

const allNavItems: NavT1Item[] = [
  {
    id: 'home',
    path: '/home',
    label: 'Home',
    icon: 'home',
    hasGear: false,
    children: [
      { path: '/home/inbox', label: 'Inbox' },
      { path: '/home/calendar', label: 'Calendar' },
    ],
  },
  {
    id: 'people',
    path: '/people',
    label: 'People',
    icon: 'user-group',
    hasGear: true,
    children: [
      { path: '/people/my-direct-reports', label: 'My Direct Reports' },
      { path: '/people/my-department', label: 'My Department' },
      { path: '/people/my-division', label: 'My Division' },
      { path: '', label: '', separator: true },
      { path: '/people/hub', label: 'Hub' },
      { path: '/people/divisions', label: 'Divisions' },
      { path: '/people/departments', label: 'Departments' },
      { path: '/people/teams', label: 'Teams' },
    ],
  },
  {
    id: 'hiring',
    path: '/hiring',
    label: 'Hiring',
    icon: 'id-badge',
    hasGear: true,
    children: [
      { path: '/hiring/candidates', label: 'Candidates' },
      { path: '/hiring/talent-pools', label: 'Talent Pools' },
      { path: '/hiring/careers-site', label: 'Careers Site' },
    ],
  },
  {
    id: 'onboarding',
    path: '/onboarding',
    label: 'Onboarding',
    icon: 'clipboard',
    hasGear: true,
    children: [
      { path: '/onboarding/offboarding', label: 'Active Offboarding' },
      { path: '/onboarding/task-templates', label: 'Task Templates' },
      { path: '/onboarding/new-hire-packets', label: 'New Hire Packets' },
    ],
  },
  {
    id: 'payroll',
    path: '/payroll',
    label: 'Payroll',
    icon: 'circle-dollar',
    hasGear: true,
    children: [
      { path: '/payroll/history', label: 'History' },
      { path: '/payroll/off-cycle', label: 'Off-Cycle' },
      { path: '/payroll/reports', label: 'Reports' },
    ],
  },
  {
    id: 'benefits',
    path: '/benefits',
    label: 'Benefits',
    icon: 'shield',
    hasGear: true,
    children: [
      { path: '/benefits/enrollment', label: 'Enrollment' },
      { path: '/benefits/carriers', label: 'Carriers' },
    ],
  },
  {
    id: 'performance',
    path: '/performance',
    label: 'Performance',
    icon: 'bullseye',
    hasGear: true,
    children: [
      { path: '/performance/reviews', label: 'Reviews' },
      { path: '/performance/feedback', label: 'Feedback' },
      { path: '/performance/one-on-ones', label: '1:1s' },
    ],
  },
  {
    id: 'training',
    path: '/training',
    label: 'Training',
    icon: 'graduation-cap',
    hasGear: true,
    children: [
      { path: '/training/assignments', label: 'Assignments' },
      { path: '/training/certifications', label: 'Certifications' },
    ],
  },
  {
    id: 'compensation',
    path: '/compensation',
    label: 'Compensation',
    icon: 'chart-line',
    hasGear: true,
    locked: true,
    children: [
      { path: '/compensation/levels-and-bands', label: 'Levels & Bands', locked: true },
      { path: '/compensation/planning', label: 'Planning', locked: true },
      { path: '/compensation/total-rewards', label: 'Total Rewards', locked: true },
    ],
  },
  {
    id: 'culture',
    path: '/culture',
    label: 'Culture',
    icon: 'face-smile',
    hasGear: true,
    children: [
      { path: '/culture/recognition', label: 'Recognition' },
      { path: '/culture/surveys', label: 'Surveys & Wellbeing' },
    ],
  },
  {
    id: 'time-and-attendance',
    path: '/time-and-attendance',
    label: 'Time & Attendance',
    icon: 'clock',
    hasGear: true,
    children: [
      { path: '/time-and-attendance/time-off', label: 'Time Off' },
      { path: '/time-and-attendance/timesheets', label: 'Timesheets', locked: true },
    ],
  },
  {
    id: 'reports',
    path: '/reports',
    label: 'Reports',
    icon: 'chart-pie-simple',
    hasGear: true,
    children: [
      { path: '/reports/custom', label: 'Custom Reports' },
      { path: '/reports/benchmarks', label: 'Benchmarks', locked: true },
      { path: '/reports/dashboards', label: 'Dashboards' },
    ],
  },
  {
    id: 'files',
    path: '/files',
    label: 'Files',
    icon: 'file-lines',
    hasGear: true,
    children: [
      { path: '/files/e-signatures', label: 'E-Signatures' },
    ],
  },
  {
    id: 'apps',
    path: '/apps',
    label: 'Apps',
    icon: 'compass',
    hasGear: true,
    children: [
      { path: '/apps/installed', label: 'Installed' },
      { path: '/apps/api-access', label: 'API Access' },
    ],
  },
  {
    id: 'settings',
    path: '/settings',
    label: 'Settings',
    icon: 'gear',
    hasGear: false,
    children: [
      { path: '/settings/access-levels', label: 'Access Levels' },
      { path: '/settings/approvals', label: 'Approvals' },
      { path: '/settings/email-alerts', label: 'Email Alerts' },
      { path: '/settings/branding', label: 'Branding' },
    ],
  },
];

interface GlobalNavProps {
  className?: string;
}

export function GlobalNav({ className = '' }: GlobalNavProps) {
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
  const avatarMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { scenario } = useScenario();

  // Compute scenario-filtered nav items
  const navItems = useMemo(() => {
    const allVisible = [...scenario.visibleProducts, ...scenario.lockedProducts];

    return allNavItems
      .filter(item => allVisible.includes(item.id))
      .map(item => {
        const isLockedByScenario = scenario.lockedProducts.includes(item.id);

        // Filter T2 children
        let children = item.children.filter(child => {
          if (child.separator) return true; // handle separator below
          return !scenario.hiddenT2Paths.includes(child.path);
        });

        // Remove orphaned separators (separator with nothing before or after it)
        const sepIdx = children.findIndex(c => c.separator);
        if (sepIdx !== -1) {
          const beforeSep = children.slice(0, sepIdx).filter(c => !c.separator);
          const afterSep = children.slice(sepIdx + 1).filter(c => !c.separator);
          if (beforeSep.length === 0 || afterSep.length === 0) {
            children = children.filter(c => !c.separator);
          }
        }

        // Apply locked state to T2 items from scenario
        children = children.map(child => ({
          ...child,
          locked: child.locked || scenario.lockedT2Paths.includes(child.path),
        }));

        return {
          ...item,
          locked: isLockedByScenario || item.locked,
          children,
        };
      });
  }, [scenario]);

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
    const currentT1 = navItems.find(item =>
      location.pathname.startsWith(item.path + '/') || location.pathname === item.path
    );
    if (currentT1) setExpandedT1(currentT1.id);
  }, [location.pathname, navItems]);

  const effectiveExpanded = isTablet ? false : isExpanded;

  const handleT1Click = (item: NavT1Item) => {
    navigate(item.path);
    setExpandedT1(item.id);
  };

  const handleGearClick = (e: React.MouseEvent, _item: NavT1Item) => {
    e.stopPropagation();
  };

  const isT1Active = (item: NavT1Item) =>
    location.pathname.startsWith(item.path + '/') || location.pathname === item.path;

  return (
    <nav
      className={`
        fixed left-0 top-0 h-full z-50 flex flex-col
        bg-[var(--surface-neutral-white)]
        border-r border-[var(--border-neutral-xx-weak)]
        transition-[width] duration-300 ease-in-out
        ${effectiveExpanded ? 'w-[260px]' : 'w-[72px]'}
        ${className}
      `}
      style={{ overflow: 'hidden' }}
    >
      {/* Top Chrome */}
      <div className={`shrink-0 ${effectiveExpanded ? 'px-4 pt-5 pb-3' : 'px-3 pt-5 pb-3'}`}>
        {/* Row 1: Logo + Help */}
        <div className="flex items-center justify-between mb-3">
          {effectiveExpanded ? (
            <>
              <button onClick={() => navigate('/home')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: 'var(--color-primary-strong)' }}>
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <span className="font-semibold text-sm text-[var(--text-neutral-xx-strong)] whitespace-nowrap">Acme Corp</span>
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--surface-neutral-xx-weak)] transition-colors shrink-0" title="Help">
                <Icon name="circle-question" size={16} className="text-[var(--icon-neutral-strong)]" variant="regular" />
              </button>
            </>
          ) : (
            <button onClick={() => navigate('/home')} className="w-10 h-10 rounded-md flex items-center justify-center mx-auto hover:opacity-80 transition-opacity" style={{ background: 'var(--color-primary-strong)' }}>
              <span className="text-white text-sm font-bold">A</span>
            </button>
          )}
        </div>

        {/* Row 2: Ask button */}
        {effectiveExpanded ? (
          <button
            className="w-full flex items-center gap-2 px-3 py-2 mb-2 rounded-[var(--radius-xx-small)] text-sm font-medium transition-colors"
            style={{ background: 'var(--color-primary-weak)', color: 'var(--color-primary-strong)' }}
            onClick={() => { localStorage.setItem('bhr-chat-panel-open', 'true'); window.dispatchEvent(new Event('storage')); }}
          >
            <Icon name="sparkles" size={14} />
            <span>Ask BambooHR</span>
          </button>
        ) : (
          <button
            className="w-10 h-10 flex items-center justify-center mx-auto rounded-[var(--radius-xx-small)] mb-2 transition-colors hover:opacity-90"
            style={{ background: 'var(--color-primary-weak)', color: 'var(--color-primary-strong)' }}
            title="Ask BambooHR"
            onClick={() => { localStorage.setItem('bhr-chat-panel-open', 'true'); window.dispatchEvent(new Event('storage')); }}
          >
            <Icon name="sparkles" size={14} />
          </button>
        )}

        {/* Row 3: Search */}
        {effectiveExpanded ? (
          <div className="relative mb-1">
            <Icon name="magnifying-glass" size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--icon-neutral-strong)] pointer-events-none" />
            <input type="text" placeholder="Search..." className="w-full pl-8 pr-3 py-2 text-sm rounded-[var(--radius-xx-small)] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-xx-weak)] text-[var(--text-neutral-x-strong)] placeholder:text-[var(--text-neutral-weak)] focus:outline-none focus:border-[var(--color-primary-medium)] transition-colors" />
          </div>
        ) : (
          <button className="w-10 h-10 flex items-center justify-center mx-auto rounded-[var(--radius-xx-small)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors" title="Search">
            <Icon name="magnifying-glass" size={16} className="text-[var(--icon-neutral-strong)]" />
          </button>
        )}
      </div>

      {/* Separator */}
      <div className="shrink-0 h-px bg-[var(--border-neutral-xx-weak)] mx-3 mb-2" />

      {/* Product Nav - Scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'none' }}>
        <div className="px-2 py-1 space-y-0.5">
          {navItems.map((item) => {
            const t1Active = isT1Active(item);
            const isT1Expanded = expandedT1 === item.id;

            return (
              <div key={item.id}>
                {/* T1 Row */}
                <div
                  className={`
                    relative flex items-center rounded-[10px] cursor-pointer
                    transition-colors duration-150 group
                    ${effectiveExpanded ? 'px-3 py-2' : 'w-12 h-10 justify-center mx-auto'}
                    ${t1Active ? 'bg-[var(--surface-neutral-x-weak)]' : 'hover:bg-[var(--surface-neutral-xx-weak)]'}
                  `}
                  onClick={() => handleT1Click(item)}
                  onMouseEnter={() => setHoveredT1(item.id)}
                  onMouseLeave={() => setHoveredT1(null)}
                >
                  <Icon
                    name={item.icon}
                    size={18}
                    variant={t1Active ? 'solid' : 'regular'}
                    className={`shrink-0 transition-colors duration-200 ${t1Active ? 'text-[var(--color-primary-strong)]' : 'text-[var(--icon-neutral-x-strong)]'}`}
                  />
                  {effectiveExpanded && (
                    <>
                      <span className={`ml-2.5 flex-1 text-sm font-medium whitespace-nowrap truncate ${t1Active ? 'text-[var(--text-neutral-xx-strong)]' : 'text-[var(--text-neutral-x-strong)]'}`}>
                        {item.label}
                      </span>
                      <div className="flex items-center gap-1 ml-1 shrink-0">
                        {item.locked && <Icon name="lock" size={12} className="text-[var(--text-neutral-weak)]" />}
                        {item.hasGear && !item.locked && (
                          <button
                            onClick={(e) => handleGearClick(e, item)}
                            className={`w-5 h-5 flex items-center justify-center rounded hover:bg-[var(--border-neutral-xx-weak)] transition-all ${hoveredT1 === item.id ? 'opacity-100' : 'opacity-0'}`}
                            title={`Configure ${item.label}`}
                          >
                            <Icon name="gear" size={12} className="text-[var(--icon-neutral-strong)]" />
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* T2 Children */}
                {effectiveExpanded && isT1Expanded && (
                  <div className="mt-0.5 ml-2 pl-5 space-y-0.5 border-l border-[var(--border-neutral-xx-weak)]">
                    {item.children.map((child, idx) => {
                      if (child.separator) {
                        return <div key={`sep-${idx}`} className="h-px bg-[var(--border-neutral-xx-weak)] my-1.5" />;
                      }
                      const t2Active = location.pathname === child.path;
                      return (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={`
                            flex items-center justify-between px-2 py-1.5 rounded-[8px]
                            text-sm transition-colors duration-150
                            ${t2Active
                              ? 'bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-xx-strong)] font-medium'
                              : 'text-[var(--text-neutral-medium)] hover:bg-[var(--surface-neutral-xx-weak)] hover:text-[var(--text-neutral-x-strong)]'
                            }
                          `}
                        >
                          <span className="truncate">{child.label}</span>
                          {child.locked && <Icon name="lock" size={11} className="shrink-0 ml-1 text-[var(--text-neutral-weak)]" />}
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

      {/* Bottom Chrome */}
      <div className={`shrink-0 border-t border-[var(--border-neutral-xx-weak)] ${effectiveExpanded ? 'px-3 py-3' : 'px-2 py-3'}`}>
        <button
          onClick={toggleTheme}
          className={`flex items-center rounded-[10px] transition-colors hover:bg-[var(--surface-neutral-xx-weak)] mb-1 ${effectiveExpanded ? 'w-full px-3 py-2 gap-2.5' : 'w-10 h-10 justify-center mx-auto'}`}
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          <Icon name={isDark ? 'sun' : 'moon'} size={16} className="shrink-0 text-[var(--icon-neutral-x-strong)]" />
          {effectiveExpanded && <span className="text-sm text-[var(--text-neutral-x-strong)] font-medium">{isDark ? 'Light mode' : 'Dark mode'}</span>}
        </button>

        <div ref={avatarMenuRef} className="relative">
          <button
            onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
            className={`flex items-center rounded-[10px] transition-colors hover:bg-[var(--surface-neutral-xx-weak)] ${effectiveExpanded ? 'w-full px-2 py-2 gap-2.5' : 'w-10 h-10 justify-center mx-auto'}`}
          >
            <img src={avatarSmall} alt="Sam Rivera" className="w-7 h-7 shrink-0 rounded-md object-cover" />
            {effectiveExpanded && (
              <div className="flex flex-col items-start min-w-0">
                <span className="text-sm font-medium text-[var(--text-neutral-xx-strong)] truncate leading-tight">Sam Rivera</span>
                <span className="text-xs text-[var(--text-neutral-medium)] truncate leading-tight">UX Manager</span>
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

        {!isTablet && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center rounded-[10px] transition-colors hover:bg-[var(--surface-neutral-xx-weak)] mt-1 ${effectiveExpanded ? 'w-full px-3 py-2 gap-2.5' : 'w-10 h-10 justify-center mx-auto'}`}
            title={effectiveExpanded ? 'Collapse' : 'Expand'}
          >
            <Icon name={effectiveExpanded ? 'arrow-left-from-line' : 'arrow-right-from-line'} size={16} className="shrink-0 text-[var(--icon-neutral-x-strong)]" />
            {effectiveExpanded && <span className="text-sm text-[var(--text-neutral-x-strong)] font-medium">Collapse</span>}
          </button>
        )}
      </div>
    </nav>
  );
}

export default GlobalNav;
