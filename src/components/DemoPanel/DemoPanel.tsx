import { useState, useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getDemoNote } from '../../data/demoNotes';

const TABS = ['JTBD', 'Competitors'] as const;
type Tab = typeof TABS[number];

const PERSONA_LABELS = [
  { key: 'employee' as const, label: 'Employee' },
  { key: 'manager' as const, label: 'Manager' },
  { key: 'hrAdmin' as const, label: 'HR Admin' },
  { key: 'exec' as const, label: 'Exec' },
];

/** Settings categorization for the demo highlight feature */
export const SETTINGS_HIGHLIGHT_KEY = 'bhr-settings-highlights';

/** Nav section highlight feature */
export const NAV_HIGHLIGHT_KEY = 'bhr-nav-highlights';

export interface NavSection {
  id: string;
  label: string;
  color: string;
  description: string;
  items: string[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    id: 'core',
    label: 'Core HR',
    color: '#22c55e',
    description: 'Foundation — always visible, every persona',
    items: ['home', 'inbox', 'my-info', 'people'],
  },
  {
    id: 'lifecycle',
    label: 'Employee Lifecycle',
    color: '#3b82f6',
    description: 'Ordered by the arc of employment',
    items: ['hiring', 'onboarding', 'payroll', 'benefits', 'performance', 'training', 'compensation', 'employee-community', 'rewards-recognition', 'wellbeing', 'time-and-attendance', 'offboarding'],
  },
  {
    id: 'cross-product',
    label: 'Cross-Product',
    color: '#f59e0b',
    description: 'Tools that span all products',
    items: ['reports', 'files', 'apps', 'settings'],
  },
];

export interface SettingsCategory {
  id: string;
  label: string;
  color: string;       // tailwind-compatible hex
  borderColor: string;  // for sub-nav left border
  items: string[];      // sub-nav item IDs
  description: string;  // short explanation for the presenter
}

export const SETTINGS_CATEGORIES: SettingsCategory[] = [
  {
    id: 'company',
    label: 'Company Settings',
    color: '#22c55e',
    borderColor: '#22c55e',
    description: 'True company-level settings that stay here',
    items: ['account', 'access-levels', 'employee-fields', 'approvals', 'ask-bamboohr', 'email-alerts', 'holidays', 'logo-color'],
  },
  {
    id: 'products',
    label: 'Should Be T1 Products',
    color: '#3b82f6',
    borderColor: '#3b82f6',
    description: 'These should be standalone T1 products in the new nav',
    items: ['apps', 'benefits', 'compensation', 'global-employment', 'onboarding', 'offboarding', 'performance', 'training'],
  },
  {
    id: 'product-settings',
    label: 'Belongs in Product Settings',
    color: '#f59e0b',
    borderColor: '#f59e0b',
    description: 'These belong in the settings gear for their T1 product',
    items: ['company-directory', 'custom-fields', 'employee-community', 'hiring', 'payroll', 'time-off', 'time-tracking'],
  },
  {
    id: 'modules',
    label: 'Should Be Modules',
    color: '#a855f7',
    borderColor: '#a855f7',
    description: 'These should be modules within a T1 product',
    items: ['employee-satisfaction', 'employee-wellbeing', 'total-rewards'],
  },
];

/** Product labels for product-settings items */
const PRODUCT_LABELS: Record<string, string> = {
  'company-directory': 'People',
  'custom-fields': 'People',
  'employee-community': 'Culture',
  'hiring': 'Hiring',
  'payroll': 'Payroll',
  'time-off': 'Time & Attendance',
  'time-tracking': 'Time & Attendance',
};

/** Product labels for module items */
const MODULE_LABELS: Record<string, string> = {
  'employee-satisfaction': 'Culture',
  'employee-wellbeing': 'Culture',
  'total-rewards': 'Compensation',
};

/** Readable names for sub-nav IDs */
const ITEM_NAMES: Record<string, string> = {
  'account': 'Account',
  'access-levels': 'Access Levels',
  'employee-fields': 'Employee Fields',
  'approvals': 'Approvals',
  'ask-bamboohr': 'Ask BambooHR',
  'email-alerts': 'Email Alerts',
  'holidays': 'Holidays',
  'logo-color': 'Logo & Color',
  'apps': 'Apps',
  'benefits': 'Benefits',
  'compensation': 'Compensation',
  'global-employment': 'Global Employment',
  'onboarding': 'Onboarding',
  'offboarding': 'Offboarding',
  'performance': 'Performance',
  'training': 'Training',
  'company-directory': 'Company Directory',
  'custom-fields': 'Custom Fields & Tables',
  'employee-community': 'Employee Community',
  'hiring': 'Hiring',
  'payroll': 'Payroll',
  'time-off': 'Time Off',
  'time-tracking': 'Time Tracking',
  'employee-satisfaction': 'Employee Satisfaction',
  'employee-wellbeing': 'Employee Wellbeing',
  'total-rewards': 'Total Rewards',
};

function broadcastHighlights(active: string[]) {
  localStorage.setItem(SETTINGS_HIGHLIGHT_KEY, JSON.stringify(active));
  window.dispatchEvent(new Event('storage'));
}

function broadcastNavHighlights(active: string[]) {
  localStorage.setItem(NAV_HIGHLIGHT_KEY, JSON.stringify(active));
  window.dispatchEvent(new Event('storage'));
}

// ─── Constellation Graph for Space Onboarding ───

interface ConstellationNode {
  id: number;
  x: number;
  y: number;
  r: number;
  label?: string;
  delay: number;
  group: number; // which wave the node belongs to
}

interface ConstellationEdge {
  from: number;
  to: number;
  delay: number;
}

// Seeded random for deterministic layout
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function generateConstellation(nodeCount: number, width: number, height: number) {
  const rng = seededRandom(42);
  const nodes: ConstellationNode[] = [];
  const edges: ConstellationEdge[] = [];
  const LABELS = ['Engineering', 'Marketing', 'Sales', 'HR', 'Design', 'Finance', 'Product', 'Support', 'Ops', 'Legal',
    'J. Smith', 'A. Chen', 'R. Patel', 'M. Johnson', 'K. Lee', 'S. Davis', 'T. Wilson', 'L. Garcia', 'D. Brown', 'N. Taylor',
    'B. Martinez', 'C. Anderson', 'E. Thomas', 'F. Moore', 'G. Jackson', 'H. White', 'I. Harris', 'P. Clark', 'Q. Lewis', 'V. Young',
    'W. Hall', 'X. Allen', 'Y. King', 'Z. Wright', 'Recruiting', 'Payroll', 'Benefits', 'Compliance', 'Training', 'Analytics'];
  const pad = 30;

  // Place nodes with collision avoidance
  for (let i = 0; i < nodeCount; i++) {
    let x: number, y: number, tries = 0;
    const isCluster = i < 8; // first 8 are department nodes (bigger)
    const r = isCluster ? 5 + rng() * 3 : 2.5 + rng() * 2;
    do {
      x = pad + rng() * (width - pad * 2);
      y = pad + rng() * (height - pad * 2);
      tries++;
    } while (tries < 50 && nodes.some(n => Math.hypot(n.x - x, n.y - y) < 22));

    const group = i < 3 ? 0 : i < 8 ? 1 : i < 16 ? 2 : 3;
    nodes.push({ id: i, x, y, r, label: LABELS[i % LABELS.length], delay: group * 0.8 + (i % 5) * 0.15, group });
  }

  // Connect nearby nodes with edges
  for (let i = 0; i < nodes.length; i++) {
    const dists = nodes
      .map((n, j) => ({ j, d: Math.hypot(n.x - nodes[i].x, n.y - nodes[i].y) }))
      .filter(e => e.j !== i)
      .sort((a, b) => a.d - b.d);
    const connections = Math.min(i < 8 ? 3 : 2, dists.length);
    for (let c = 0; c < connections; c++) {
      const to = dists[c].j;
      if (!edges.some(e => (e.from === i && e.to === to) || (e.from === to && e.to === i))) {
        const edgeDelay = Math.max(nodes[i].delay, nodes[to].delay) + 0.3;
        edges.push({ from: i, to, delay: edgeDelay });
      }
    }
  }

  return { nodes, edges };
}

function ConstellationGraph({ phase, msgCount }: { phase: string; msgCount: number }) {
  const W = 308;
  const H = 500;
  const blue = '#3b82f6';
  const blueLight = '#93c5fd';
  const blueFaint = '#1e3a5f';

  // Determine how many nodes to show based on progress
  let targetNodes = 0;
  if (phase === 'welcome') targetNodes = 0;
  else if (phase === 'chat') targetNodes = 3 + Math.min(msgCount, 6) * 2; // 3→15 nodes during chat
  else if (phase === 'upload') targetNodes = 16;
  else if (phase === 'processing') targetNodes = 38;
  else if (phase === 'done') targetNodes = 38;

  const prevCountRef = useRef(0);
  const [visibleNodes, setVisibleNodes] = useState(0);

  useEffect(() => {
    if (targetNodes > prevCountRef.current) {
      // Animate nodes appearing
      const start = prevCountRef.current;
      const end = targetNodes;
      let current = start;
      const interval = setInterval(() => {
        current += 1;
        setVisibleNodes(current);
        if (current >= end) clearInterval(interval);
      }, 80);
      prevCountRef.current = end;
      return () => clearInterval(interval);
    } else {
      prevCountRef.current = targetNodes;
      setVisibleNodes(targetNodes);
    }
  }, [targetNodes]);

  const { nodes, edges } = generateConstellation(38, W, H);
  const activeNodes = nodes.slice(0, visibleNodes);
  const activeNodeIds = new Set(activeNodes.map(n => n.id));
  const activeEdges = edges.filter(e => activeNodeIds.has(e.from) && activeNodeIds.has(e.to));

  return (
    <div className="relative" style={{ width: W, height: H }}>
      <svg width={W} height={H} className="absolute inset-0">
        {/* Edges */}
        {activeEdges.map((e, i) => {
          const from = nodes[e.from];
          const to = nodes[e.to];
          return (
            <line
              key={`e-${i}`}
              x1={from.x} y1={from.y} x2={to.x} y2={to.y}
              stroke={blueFaint}
              strokeWidth={0.8}
              style={{ animation: `constellEdgeIn 0.6s ease-out forwards`, opacity: 0 }}
            />
          );
        })}

        {/* Node glows */}
        {activeNodes.map(n => (
          <circle
            key={`glow-${n.id}`}
            cx={n.x} cy={n.y} r={n.r * 3}
            fill={blue}
            opacity={0}
            style={{ animation: `constellGlowIn 0.8s ease-out forwards` }}
          />
        ))}

        {/* Nodes */}
        {activeNodes.map(n => (
          <circle
            key={`n-${n.id}`}
            cx={n.x} cy={n.y} r={n.r}
            fill={n.id < 8 ? blueLight : blue}
            opacity={0}
            style={{ animation: `constellNodeIn 0.5s ease-out forwards` }}
          />
        ))}

        {/* Labels for department nodes (first 8) */}
        {activeNodes.filter(n => n.id < 8).map(n => (
          <text
            key={`lbl-${n.id}`}
            x={n.x}
            y={n.y + n.r + 12}
            textAnchor="middle"
            fill={blueLight}
            fontSize={9}
            fontWeight={500}
            opacity={0}
            style={{ animation: `constellNodeIn 0.5s ease-out 0.2s forwards` }}
          >
            {n.label}
          </text>
        ))}
      </svg>

      <style>{`
        @keyframes constellNodeIn {
          from { opacity: 0; transform: scale(0); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes constellGlowIn {
          from { opacity: 0; }
          to { opacity: 0.08; }
        }
        @keyframes constellEdgeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes constellPulse {
          0%, 100% { opacity: 0.06; }
          50% { opacity: 0.12; }
        }
      `}</style>
    </div>
  );
}

interface DemoPanelProps {
  isOpen: boolean;
}

export function DemoPanel({ isOpen }: DemoPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('JTBD');
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [activeNavSections, setActiveNavSections] = useState<string[]>([]);
  const [isSpaceMode, setIsSpaceMode] = useState(() => localStorage.getItem('bhr-legacy-nav') === 'space');
  const [spaceStage, setSpaceStage] = useState(() => localStorage.getItem('bhr-space-stage') || 'established');
  const [onboardPhase, setOnboardPhase] = useState(() => localStorage.getItem('bhr-space-onboard-phase') || 'welcome');
  const [onboardMsgs, setOnboardMsgs] = useState(() => parseInt(localStorage.getItem('bhr-space-onboard-msgs') || '0', 10));

  useEffect(() => {
    const handler = () => {
      setIsSpaceMode(localStorage.getItem('bhr-legacy-nav') === 'space');
      setSpaceStage(localStorage.getItem('bhr-space-stage') || 'established');
      setOnboardPhase(localStorage.getItem('bhr-space-onboard-phase') || 'welcome');
      setOnboardMsgs(parseInt(localStorage.getItem('bhr-space-onboard-msgs') || '0', 10));
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const location = useLocation();
  const note = getDemoNote(location.pathname);
  const isSettings = location.pathname.startsWith('/settings');
  const isHome = location.pathname === '/home' || location.pathname === '/';

  // Derive page name from pathname
  const segments = location.pathname.split('/').filter(Boolean);
  const pageName = segments[0]?.replace(/-/g, ' ') || 'Home';
  const pageTitle = pageName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const toggleCategory = useCallback((catId: string) => {
    setActiveCategories(prev => {
      const next = prev.includes(catId) ? [] : [catId];
      broadcastHighlights(next);
      return next;
    });
  }, []);

  const toggleNavSection = useCallback((sectionId: string) => {
    setActiveNavSections(prev => {
      const next = prev.includes(sectionId) ? [] : [sectionId];
      broadcastNavHighlights(next);
      return next;
    });
  }, []);

  // Clear highlights when leaving settings
  const prevIsSettings = location.pathname.startsWith('/settings');
  if (!prevIsSettings && activeCategories.length > 0) {
    broadcastHighlights([]);
  }
  // Clear nav highlights when leaving home
  if (!isHome && activeNavSections.length > 0) {
    broadcastNavHighlights([]);
  }

  if (!isOpen) return null;

  // Space mode — constellation graph
  if (isSpaceMode) {
    const phaseLabel = onboardPhase === 'welcome' ? 'Waiting for input...'
      : onboardPhase === 'chat' ? 'Learning about your company...'
      : onboardPhase === 'upload' ? 'Ready for data import'
      : onboardPhase === 'processing' ? 'Building your org...'
      : 'Organization mapped';

    const nodeCount = onboardPhase === 'welcome' ? 0
      : onboardPhase === 'chat' ? 3 + Math.min(onboardMsgs, 6) * 2
      : onboardPhase === 'upload' ? 16
      : onboardPhase === 'processing' ? 38
      : 38;

    return (
      <div className="w-[340px] shrink-0 h-full bg-[#1e1e1e] border-l border-[#333] flex flex-col overflow-hidden">
        <div className="px-4 pt-4 pb-3 border-b border-[#333]">
          <p className="text-[11px] text-neutral-500 uppercase tracking-wider mb-1">Space</p>
          <p className="text-sm font-semibold text-neutral-200">
            {spaceStage === 'blank' ? 'Employee Graph' : spaceStage === 'library' ? 'Design Library' : 'Home Dashboard'}
          </p>
        </div>

        {spaceStage === 'blank' ? (
          <>
            <div className="px-4 py-3 border-b border-[#333]">
              <p className="text-[12px] text-neutral-400 leading-relaxed">{phaseLabel}</p>
              {nodeCount > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-1 rounded-full bg-[#2a2a2a] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${Math.min(100, (nodeCount / 38) * 100)}%`, backgroundColor: '#3b82f6' }}
                    />
                  </div>
                  <span className="text-[11px] tabular-nums" style={{ color: '#93c5fd' }}>{nodeCount} nodes</span>
                </div>
              )}
            </div>
            <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden px-4">
              <ConstellationGraph phase={onboardPhase} msgCount={onboardMsgs} />
            </div>
          </>
        ) : (
          <div className="flex-1 min-h-0 px-4 py-4">
            <p className="text-[12px] text-neutral-500">
              {spaceStage === 'library' ? 'Design system primitives and tokens.' : 'Widget-based home dashboard with AI briefings.'}
            </p>
          </div>
        )}
      </div>
    );
  }

  // Settings-specific panel
  if (isSettings) {
    return (
      <div className="w-[340px] shrink-0 h-full bg-[#1e1e1e] border-l border-[#333] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-[#333]">
          <p className="text-[11px] text-neutral-500 uppercase tracking-wider mb-1">Demo Notes</p>
          <p className="text-sm font-semibold text-neutral-200">Legacy Settings Analysis</p>
        </div>

        <div className="px-4 py-3 border-b border-[#333]">
          <p className="text-[12px] text-neutral-400 leading-relaxed">
            Toggle categories to highlight where each settings item should live in the new IA.
          </p>
        </div>

        {/* Category toggles */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-4">
          {SETTINGS_CATEGORIES.map(cat => {
            const isActive = activeCategories.includes(cat.id);
            return (
              <div key={cat.id}>
                <button
                  onClick={() => toggleCategory(cat.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all ${
                    isActive
                      ? 'ring-1 ring-opacity-60'
                      : 'hover:bg-[#2a2a2a]'
                  }`}
                  style={{
                    backgroundColor: isActive ? `${cat.color}20` : 'transparent',
                    borderColor: isActive ? cat.color : undefined,
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-sm shrink-0"
                    style={{ backgroundColor: cat.color, opacity: isActive ? 1 : 0.4 }}
                  />
                  <span className={`text-[13px] font-semibold ${isActive ? 'text-neutral-100' : 'text-neutral-200'}`}>
                    {cat.label}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Home-specific panel with nav section highlights
  if (isHome) {
    return (
      <div className="w-[340px] shrink-0 h-full bg-[#1e1e1e] border-l border-[#333] flex flex-col overflow-hidden">
        <div className="px-4 pt-4 pb-3 border-b border-[#333]">
          <p className="text-[11px] text-neutral-500 uppercase tracking-wider mb-1">Demo Notes</p>
          <p className="text-sm font-semibold text-neutral-200">Nav Sections</p>
        </div>

        <div className="px-4 py-3 border-b border-[#333]">
          <p className="text-[12px] text-neutral-400 leading-relaxed">
            Toggle sections to highlight how the nav is organized.
          </p>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-4">
          {NAV_SECTIONS.map(section => {
            const isActive = activeNavSections.includes(section.id);
            return (
              <div key={section.id}>
                <button
                  onClick={() => toggleNavSection(section.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all ${
                    isActive
                      ? 'ring-1 ring-opacity-60'
                      : 'hover:bg-[#2a2a2a]'
                  }`}
                  style={{
                    backgroundColor: isActive ? `${section.color}20` : 'transparent',
                    borderColor: isActive ? section.color : undefined,
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-sm shrink-0"
                    style={{ backgroundColor: section.color, opacity: isActive ? 1 : 0.4 }}
                  />
                  <div>
                    <span className={`text-[13px] font-semibold ${isActive ? 'text-neutral-100' : 'text-neutral-200'}`}>
                      {section.label}
                    </span>
                    <p className="text-[11px] text-neutral-500 mt-0.5">{section.description}</p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Standard JTBD / Competitors panel
  return (
    <div className="w-[340px] shrink-0 h-full bg-[#1e1e1e] border-l border-[#333] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-[#333]">
        <p className="text-[11px] text-neutral-500 uppercase tracking-wider mb-1">Demo Notes</p>
        <p className="text-sm font-semibold text-neutral-200">{pageTitle}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#333]">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2 text-[12px] font-medium transition-colors ${
              activeTab === tab
                ? 'text-amber-300 border-b-2 border-amber-400'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4">
        {!note ? (
          <p className="text-[13px] text-neutral-500 italic">No demo notes for this page yet.</p>
        ) : activeTab === 'Competitors' ? (
          <p className="text-[13px] leading-relaxed text-neutral-300">{note.competitors}</p>
        ) : (
          <div className="space-y-5">
            {PERSONA_LABELS.map(({ key, label }) => (
              <div key={key}>
                <p className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-1.5">{label}</p>
                <p className="text-[13px] leading-relaxed text-neutral-300">{note.jtbd[key]}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DemoPanel;
