import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import { useTheme } from '../../contexts/ThemeContext';
import { useScenario } from '../../contexts/ScenarioContext';
import { getEmployee } from '../../data/currentEmployee';
import { ProductSettingsModal } from '../ProductSettingsModal/ProductSettingsModal';
import { NAV_HIGHLIGHT_KEY, NAV_SECTIONS } from '../DemoPanel/DemoPanel';

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
    children: [],
  },
  {
    id: 'inbox',
    path: '/home/inbox',
    label: 'Inbox',
    icon: 'inbox',
    hasGear: false,
    children: [],
  },
  {
    id: 'my-info',
    path: '/people/my-info',
    label: 'My Info',
    icon: 'circle-user',
    hasGear: false,
    children: [],
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
      { path: '/onboarding/task-templates', label: 'Task Templates' },
      { path: '/onboarding/new-hire-packets', label: 'New Hire Packets' },
    ],
  },
  {
    id: 'payroll',
    path: '/payroll',
    label: 'Payroll',
    icon: 'money-bill-1',
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
    icon: 'heart',
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
    icon: 'circle-dot',
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
    icon: 'lightbulb',
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
    icon: 'chart-bar',
    hasGear: true,
    children: [
      { path: '/compensation/benchmarks', label: 'Benchmarks' },
      { path: '/compensation/levels-and-bands', label: 'Levels & Bands' },
      { path: '/compensation/planning', label: 'Planning' },
      { path: '/compensation/total-rewards', label: 'Total Rewards' },
    ],
  },
  {
    id: 'employee-community',
    path: '/employee-community',
    label: 'Employee Community',
    icon: 'comments',
    hasGear: true,
    children: [],
  },
  {
    id: 'rewards-recognition',
    path: '/rewards-recognition',
    label: 'Rewards & Recognition',
    icon: 'star',
    hasGear: true,
    children: [],
  },
  {
    id: 'wellbeing',
    path: '/wellbeing',
    label: 'Wellbeing',
    icon: 'face-smile',
    hasGear: true,
    children: [],
  },
  {
    id: 'time-and-attendance',
    path: '/time-and-attendance',
    label: 'Time & Attendance',
    icon: 'clock',
    hasGear: true,
    children: [
      { path: '/home/calendar', label: 'Calendar' },
      { path: '/time-and-attendance/time-off', label: 'Time Off' },
      { path: '/time-and-attendance/timesheets', label: 'Timesheets', locked: true },
    ],
  },
  {
    id: 'offboarding',
    path: '/offboarding',
    label: 'Offboarding',
    icon: 'handshake',
    hasGear: true,
    children: [],
  },
  {
    id: 'reports',
    path: '/reports',
    label: 'Reports',
    icon: 'chart-pie-simple',
    hasGear: true,
    children: [
      { path: '/reports/standard', label: 'Standard Reports' },
      { path: '/reports/custom', label: 'Custom Reports' },
      { path: '/reports/benchmarks', label: 'Benchmarks' },
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
    id: 'automations',
    path: '/automations',
    label: 'Automations',
    icon: 'bolt',
    hasGear: false,
    children: [],
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
  const [navHovered, setNavHovered] = useState(false);
  const [settingsProduct, setSettingsProduct] = useState<string | null>(null);
  const [showLocks, setShowLocks] = useState(() => localStorage.getItem('bhr-show-locks') !== 'false');
  const [showAutomations, setShowAutomations] = useState(() => localStorage.getItem('bhr-show-automations') === 'true');
  const [navHighlights, setNavHighlights] = useState<string[]>([]);
  const avatarMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { scenario } = useScenario();
  const ee = getEmployee(scenario.persona);

  // Listen for nav highlight changes
  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem(NAV_HIGHLIGHT_KEY);
      setNavHighlights(stored ? JSON.parse(stored) : []);
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  // Build highlight color map from active nav sections
  const navHighlightMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const section of NAV_SECTIONS) {
      if (navHighlights.includes(section.id)) {
        for (const itemId of section.items) {
          map[itemId] = section.color;
        }
      }
    }
    return map;
  }, [navHighlights]);

  // Listen for locks toggle changes
  useEffect(() => {
    const handler = () => {
      setShowLocks(localStorage.getItem('bhr-show-locks') !== 'false');
      setShowAutomations(localStorage.getItem('bhr-show-automations') === 'true');
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  // Compute scenario-filtered nav items
  const navItems = useMemo(() => {
    // When locks are on: show locked products with lock icons
    // When locks are off: hide locked products entirely
    const allVisible = showLocks
      ? [...scenario.visibleProducts, ...scenario.lockedProducts]
      : scenario.visibleProducts;

    return allNavItems
      .filter(item => {
        // Automations T1: only show for HR Admin when toggle is on
        if (item.id === 'automations') return showAutomations && scenario.persona === 'hr-admin';
        return allVisible.includes(item.id);
      })
      .map(item => {
        const isLockedByScenario = scenario.lockedProducts.includes(item.id);

        // Filter T2 children
        let children = item.children.filter(child => {
          if (child.separator) return true;
          if (scenario.hiddenT2Paths.includes(child.path)) return false;
          // When locks off, hide locked T2 items
          if (!showLocks && (child.locked || scenario.lockedT2Paths.includes(child.path))) return false;
          return true;
        });

        // Remove orphaned separators
        const sepIdx = children.findIndex(c => c.separator);
        if (sepIdx !== -1) {
          const beforeSep = children.slice(0, sepIdx).filter(c => !c.separator);
          const afterSep = children.slice(sepIdx + 1).filter(c => !c.separator);
          if (beforeSep.length === 0 || afterSep.length === 0) {
            children = children.filter(c => !c.separator);
          }
        }

        // Apply locked state to T2 items (only when locks are on)
        if (showLocks) {
          children = children.map(child => ({
            ...child,
            locked: child.locked || scenario.lockedT2Paths.includes(child.path),
          }));
          // Move locked T2s to the bottom
          const unlockedChildren = children.filter(c => !c.locked && !c.separator);
          const lockedChildren = children.filter(c => c.locked);
          children = [...unlockedChildren, ...lockedChildren];
        }

        return {
          ...item,
          locked: showLocks ? (isLockedByScenario || item.locked) : false,
          children,
        };
      });
  }, [scenario, showLocks, showAutomations]);

  // Track newly appeared T1 items for staggered entrance animation
  const prevNavIdsRef = useRef<Set<string>>(new Set(navItems.map(i => i.id)));
  const [animatingIds, setAnimatingIds] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    const currentIds = new Set(navItems.map(i => i.id));
    const prevIds = prevNavIdsRef.current;
    const newIdSet = new Set(navItems.filter(i => !prevIds.has(i.id)).map(i => i.id));
    prevNavIdsRef.current = currentIds;

    if (newIdSet.size > 0) {
      // Assign stagger index based on position in full nav order (top to bottom)
      const map = new Map<string, number>();
      let staggerIdx = 0;
      for (const item of navItems) {
        if (newIdSet.has(item.id)) {
          map.set(item.id, staggerIdx++);
        }
      }
      setAnimatingIds(map);
      const timer = setTimeout(() => setAnimatingIds(new Map()), 800 + newIdSet.size * 100);
      return () => clearTimeout(timer);
    }
  }, [navItems]);

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
  }, [location.pathname, navItems]);

  const effectiveExpanded = isTablet ? false : isExpanded;

  const handleT1Click = (item: NavT1Item) => {
    if (item.locked) {
      navigate(`/upsell/${item.id}`);
    } else {
      navigate(item.path);
      setExpandedT1(item.id);
    }
  };

  const handleGearClick = (e: React.MouseEvent, _item: NavT1Item) => {
    e.stopPropagation();
  };

  const isT1Active = (item: NavT1Item) => {
    const onPath = location.pathname.startsWith(item.path + '/') || location.pathname === item.path;
    // My Info lives under /people/my-info but is its own T1 — don't let People claim it
    if (item.id === 'people' && location.pathname.startsWith('/people/my-info')) return false;
    // Inbox lives under /home/inbox but is its own T1 — don't let Home claim it
    if (item.id === 'home' && location.pathname.startsWith('/home/inbox')) return false;
    return onPath;
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
      onMouseEnter={() => setNavHovered(true)}
      onMouseLeave={() => setNavHovered(false)}
    >
      {/* Top Chrome */}
      <div className={`shrink-0 ${effectiveExpanded ? 'px-4 pt-5 pb-1' : 'px-3 pt-5 pb-1'}`}>
        {/* Row 1: Logo + Help */}
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

      {/* Search — styled like a T1 item, in same padding context */}
      <div className="shrink-0 px-2 py-1">
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
              <span className="text-[10px] text-[var(--text-neutral-weak)] opacity-0 group-hover:opacity-100 transition-opacity">⌘K</span>
            </>
          )}
        </div>
      </div>

      {/* Separator */}
      <div className="shrink-0 h-px bg-[var(--border-neutral-xx-weak)] mx-3 mb-2" />

      {/* Product Nav - Scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'none' }}>
        <div className="px-2 py-1 space-y-0.5">
          {(() => {
            const unlocked = navItems.filter(i => !i.locked);
            const locked = navItems.filter(i => i.locked);
            const sorted = [...unlocked, ...locked];

            // Group items into sections
            const sectionStartIds = new Set(['hiring', 'reports']);
            const groups: { sectionId: string; items: typeof sorted }[] = [];
            let currentGroup: typeof sorted = [];
            let currentSectionIdx = 0;
            const sectionIds = ['core', 'lifecycle', 'cross-product'];

            for (const item of sorted) {
              if (!item.locked && sectionStartIds.has(item.id) && currentGroup.length > 0) {
                groups.push({ sectionId: sectionIds[currentSectionIdx], items: currentGroup });
                currentSectionIdx++;
                currentGroup = [];
              }
              currentGroup.push(item);
            }
            if (currentGroup.length > 0) {
              groups.push({ sectionId: sectionIds[currentSectionIdx] || 'locked', items: currentGroup });
            }

            // If there are locked items, they form their own group at the end
            if (locked.length > 0) {
              const lastGroup = groups[groups.length - 1];
              const hasLocked = lastGroup.items.some(i => i.locked);
              if (hasLocked) {
                const unlockedInLast = lastGroup.items.filter(i => !i.locked);
                const lockedItems = lastGroup.items.filter(i => i.locked);
                if (unlockedInLast.length > 0) {
                  lastGroup.items = unlockedInLast;
                  groups.push({ sectionId: 'locked', items: lockedItems });
                }
              }
            }

            return groups.map((group, gi) => {
              const sectionHighlight = NAV_SECTIONS.find(s => s.id === group.sectionId);
              const isHighlighted = sectionHighlight && navHighlights.includes(group.sectionId);
              const highlightColor = isHighlighted ? sectionHighlight.color : null;

              return (
                <React.Fragment key={group.sectionId}>
                  {gi > 0 && (
                    <div className="h-px bg-[var(--border-neutral-xx-weak)] mx-1 my-1.5" />
                  )}
                  <div
                    className={`space-y-0.5 transition-all duration-200 ${highlightColor ? 'rounded-xl p-1' : ''}`}
                    style={highlightColor ? {
                      outline: `2px solid ${highlightColor}`,
                      outlineOffset: '0px',
                      backgroundColor: `${highlightColor}10`,
                    } : undefined}
                  >
                    {group.items.map((item) => {
                      const t1Active = isT1Active(item);
                      const isT1Expanded = expandedT1 === item.id;
                      const animIndex = animatingIds.get(item.id);
                      const isAnimating = animIndex !== undefined;

                      return (
                        <div
                          key={item.id}
                          className={isAnimating ? 'animate-navSlideIn' : ''}
                          style={isAnimating ? {
                            animationDelay: `${animIndex * 100}ms`,
                          } : undefined}
                        >
                          {/* T1 Row */}
                          <div
                            className={`
                              relative flex items-center cursor-pointer
                              transition-all duration-150 group
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
                                {item.locked && <Icon name="lock" size={12} className="shrink-0 ml-1 text-[var(--text-neutral-weak)]" />}
                                {!item.locked && item.hasGear && scenario.persona === 'hr-admin' && (
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
                          {effectiveExpanded && isT1Expanded && (
                            <div className="ml-[34px] mt-0.5 mb-1 space-y-0.5">
                              {item.children.map((child, idx) => {
                                if (child.separator) {
                                  return <div key={`sep-${idx}`} className="h-px bg-[var(--border-neutral-xx-weak)] my-1.5" />;
                                }
                                const t2Active = location.pathname === child.path;
                                const t2Slug = child.path.split('/').pop() || '';
                                const t2Href = child.locked ? `/upsell/${t2Slug}` : child.path;
                                return (
                                  <NavLink
                                    key={child.path}
                                    to={t2Href}
                                    className={`
                                      flex items-center justify-between px-2 py-1
                                      text-[13px] transition-colors duration-150
                                      ${t2Active
                                        ? 'text-[var(--color-primary-strong)] font-semibold'
                                        : 'text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)]'
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
                </React.Fragment>
              );
            });
          })()}
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
      <div className={`shrink-0 border-t border-[var(--border-neutral-xx-weak)] px-2 py-2`}>
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

export default GlobalNav;
