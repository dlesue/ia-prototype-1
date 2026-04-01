import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useScenario } from '../../contexts/ScenarioContext';
import { Icon } from '../Icon';
import { useFeedbackPanel } from '../FeedbackOverlay/FeedbackOverlay';
import bambooLogo from '../../assets/images/bamboo-logo.png';
import type { PersonaType, PackageType, AddonType } from '../../contexts/ScenarioContext';

const PERSONAS: { value: PersonaType; label: string }[] = [
  { value: 'employee', label: 'Employee' },
  { value: 'manager', label: 'Manager' },
  { value: 'dept-head', label: 'Dept Head' },
  { value: 'executive', label: 'Executive' },
  { value: 'hr-admin', label: 'HR Admin' },
];

const PLATFORM_PERSONAS: { value: PersonaType; label: string }[] = [
  { value: 'employee', label: 'Employee' },
  { value: 'manager', label: 'Manager' },
  { value: 'dept-head', label: 'Dept Head' },
  { value: 'executive', label: 'Executive' },
  { value: 'hr-admin', label: 'HR Admin' },
  { value: 'it-admin', label: 'IT Admin' },
  { value: 'finance-admin', label: 'Finance Admin' },
  { value: 'workplace-admin', label: 'Workplace Admin' },
];

const PACKAGES: { value: PackageType; label: string }[] = [
  { value: 'core', label: 'Core' },
  { value: 'pro', label: 'Pro' },
  { value: 'elite', label: 'Elite' },
];

const METRICS_KEY = 'bhr-show-metrics';
const ASK_KEY = 'bhr-show-ask';
const INSIGHTS_KEY = 'bhr-show-insights';
const LOCKS_KEY = 'bhr-show-locks';
const AUTOMATIONS_KEY = 'bhr-show-automations';
const ASK_POSITION_KEY = 'bhr-ask-position';
const LEGACY_KEY = 'bhr-legacy-nav';
const DEMO_PANEL_KEY = 'bhr-demo-panel-open';
const SPACE_STAGE_KEY = 'bhr-space-stage';
const PROJECT_MODE_KEY = 'bhr-project-mode';
const STYLE_TAB_KEY = 'bhr-style-guide-tab';

export type ProjectMode = 'home' | 'prototypes' | 'docs' | 'style-guide';

export function ScenarioBar({ projectBarOnly = false, subBarOnly = false }: { projectBarOnly?: boolean; subBarOnly?: boolean } = {}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { panelOpen: feedbackOpen, togglePanel: toggleFeedback, feedbackCount } = useFeedbackPanel();
  const isStyleGuide = location.pathname === '/style-guide';
  const { persona, pkg, addonsOn, expansionOn, hiddenProducts, setPersona, setPkg, toggleAddonsOn, toggleExpansion, toggleProductHidden } = useScenario();
  const [showMetrics, setShowMetrics] = useState(() => localStorage.getItem(METRICS_KEY) !== 'false');
  const [showAsk, setShowAsk] = useState(() => localStorage.getItem(ASK_KEY) !== 'false');
  const [showInsights, setShowInsights] = useState(() => localStorage.getItem(INSIGHTS_KEY) !== 'false');
  const [showLocks, setShowLocks] = useState(() => localStorage.getItem(LOCKS_KEY) !== 'false');
  const [showAutomations, setShowAutomations] = useState(() => localStorage.getItem(AUTOMATIONS_KEY) === 'true');
  const [askPosition, setAskPosition] = useState<'top' | 'bottom'>(() => {
    return localStorage.getItem(ASK_POSITION_KEY) === 'bottom' ? 'bottom' : 'top';
  });
  const [navMode, setNavMode] = useState<'intro' | 'legacy' | 'new' | 'new2' | 'space'>(() => {
    const stored = localStorage.getItem(LEGACY_KEY);
    if (stored === 'intro') return 'new'; // Intro is no longer a nav mode — default to v1
    if (stored === 'true') return 'legacy';
    if (stored === 'new2') return 'new2';
    if (stored === 'space') return 'space';
    return 'new';
  });
  const [demoPanelOpen, setDemoPanelOpen] = useState(() => localStorage.getItem(DEMO_PANEL_KEY) === 'true');
  const [spaceStage, setSpaceStage] = useState<'blank' | 'established' | 'library'>(() => {
    const stored = localStorage.getItem(SPACE_STAGE_KEY);
    if (stored === 'blank') return 'blank';
    if (stored === 'library') return 'library';
    return 'established';
  });
  const [projectMode, setProjectMode] = useState<ProjectMode>(() => {
    const stored = localStorage.getItem(PROJECT_MODE_KEY);
    if (stored === 'home') return 'home';
    if (stored === 'docs') return 'docs';
    if (stored === 'style-guide') return 'style-guide';
    if (stored === 'prototypes') return 'prototypes';
    return 'home';
  });

  // Sync projectMode from external changes (e.g. slides landOn)
  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem(PROJECT_MODE_KEY);
      const mode: ProjectMode = stored === 'home' ? 'home' : stored === 'docs' ? 'docs' : stored === 'style-guide' ? 'style-guide' : stored === 'prototypes' ? 'prototypes' : 'home';
      setProjectMode(mode);
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const [styleTab, setStyleTab] = useState<'nav' | 'slides' | 'docs'>(() => {
    const stored = localStorage.getItem(STYLE_TAB_KEY);
    if (stored === 'slides') return 'slides';
    if (stored === 'docs') return 'docs';
    return 'nav';
  });

  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem(STYLE_TAB_KEY);
      if (stored === 'nav' || stored === 'slides' || stored === 'docs') setStyleTab(stored);
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const switchStyleTab = (tab: 'nav' | 'slides' | 'docs') => {
    localStorage.setItem(STYLE_TAB_KEY, tab);
    setStyleTab(tab);
    window.dispatchEvent(new Event('storage'));
  };

  const switchProjectMode = (mode: ProjectMode) => {
    localStorage.setItem(PROJECT_MODE_KEY, mode);
    setProjectMode(mode);
    window.dispatchEvent(new Event('storage'));
    if (mode === 'style-guide') {
      navigate('/style-guide');
    } else if (location.pathname === '/style-guide') {
      navigate('/home');
    }
  };

  const toggleMetrics = () => {
    const next = !showMetrics;
    localStorage.setItem(METRICS_KEY, String(next));
    setShowMetrics(next);
    window.dispatchEvent(new Event('storage'));
  };

  const toggleAsk = () => {
    const next = !showAsk;
    localStorage.setItem(ASK_KEY, String(next));
    setShowAsk(next);
    window.dispatchEvent(new Event('storage'));
  };

  const toggleInsights = () => {
    const next = !showInsights;
    localStorage.setItem(INSIGHTS_KEY, String(next));
    setShowInsights(next);
    window.dispatchEvent(new Event('storage'));
  };

  const toggleLocks = () => {
    const next = !showLocks;
    localStorage.setItem(LOCKS_KEY, String(next));
    setShowLocks(next);
    window.dispatchEvent(new Event('storage'));
  };

  const toggleAutomations = () => {
    const next = !showAutomations;
    localStorage.setItem(AUTOMATIONS_KEY, String(next));
    setShowAutomations(next);
    window.dispatchEvent(new Event('storage'));
  };

  const setNavModeTo = (mode: 'intro' | 'legacy' | 'new' | 'space') => {
    const stored = mode === 'intro' ? 'intro' : mode === 'legacy' ? 'true' : mode === 'space' ? 'space' : 'false';
    localStorage.setItem(LEGACY_KEY, stored);
    setNavMode(mode);
    window.dispatchEvent(new Event('storage'));
  };

  // Sync navMode from external changes (e.g. ProblemSlides chaining)
  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem(LEGACY_KEY);
      const mode = stored === 'intro' ? 'intro' : stored === 'true' ? 'legacy' : stored === 'space' ? 'space' : 'new';
      setNavMode(mode);
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const toggleDemoPanel = () => {
    const next = !demoPanelOpen;
    localStorage.setItem(DEMO_PANEL_KEY, String(next));
    setDemoPanelOpen(next);
    window.dispatchEvent(new Event('storage'));
  };

  // Active highlight color based on current nav mode
  const accentBg = navMode === 'intro' ? 'bg-white/15' : navMode === 'legacy' ? 'bg-red-500/25' : navMode === 'space' ? 'bg-blue-500/25' : 'bg-emerald-500/25';
  const accentText = navMode === 'intro' ? 'text-white' : navMode === 'legacy' ? 'text-red-300' : navMode === 'space' ? 'text-blue-300' : 'text-emerald-300';
  const accentBorder = navMode === 'intro' ? 'border-white/30' : navMode === 'legacy' ? 'border-red-500/40' : navMode === 'space' ? 'border-blue-500/40' : 'border-emerald-500/40';
  const activeToggle = `${accentBg} ${accentText}`;
  const activeChip = `${accentBg} ${accentText} ${accentBorder}`;

  return (
    <div className="shrink-0 z-[60]">
      {/* Project Bar */}
      {!subBarOnly && <div className="flex items-center px-5 py-2 bg-[#191919] border-b border-[#2a2a2a]">
        {/* Left: Logo + Title */}
        <button
          onClick={() => switchProjectMode('home')}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <img src={bambooLogo} alt="" className="h-5 w-5 object-contain" />
          <span className="text-[13px] font-semibold text-white/80">BHR IA Project</span>
          <span className="text-[13px] text-white/20">|</span>
          <span className="text-[13px] text-white/25">Dave Lesue</span>
        </button>

        {/* Center: Mode Tabs as pills */}
        <div className="flex-1 flex justify-center">
          <div className="flex gap-0.5 bg-[#252525] rounded-lg p-0.5">
            {(['home', 'prototypes', 'docs', 'style-guide'] as const).map(mode => {
              const config = {
                home: { label: 'Home', icon: 'home' as const },
                prototypes: { label: 'Prototypes', icon: 'puzzle-piece' as const },
                docs: { label: 'Project Docs', icon: 'file-lines' as const },
                'style-guide': { label: 'Style Guide', icon: 'palette' as const },
              }[mode];
              return (
                <button
                  key={mode}
                  onClick={() => switchProjectMode(mode)}
                  className={`px-3 py-1 text-[12px] font-medium transition-all flex items-center gap-1.5 rounded-md ${
                    projectMode === mode
                      ? 'bg-[#333] text-white shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  <Icon name={config.icon} size={10} />
                  {config.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Present + Feedback */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', key: ' ', bubbles: true }));
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium text-neutral-500 hover:text-neutral-300 transition-colors"
            title="Open slides (spacebar)"
          >
            <Icon name="play" size={10} />
            Present
          </button>
          <button
            onClick={toggleFeedback}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
              feedbackOpen
                ? 'bg-white/15 text-white'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Icon name="comment" size={11} />
            Feedback
            {feedbackCount > 0 && (
              <span className="text-[10px] text-neutral-500 ml-0.5">{feedbackCount}</span>
            )}
          </button>
        </div>
      </div>}

      {!projectBarOnly && <>
      {/* Sub Bar — Style Guide sub-tabs */}
      {projectMode === 'style-guide' && (
      <div className="flex justify-center gap-x-3 px-4 py-1.5 bg-[#1e1e1e]">
        <div className="flex rounded-md overflow-hidden border border-[#444]">
          {(['nav', 'slides', 'docs'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => switchStyleTab(tab)}
              className={`px-2 py-0.5 text-[10px] font-medium transition-colors ${
                styleTab === tab
                  ? 'bg-white/15 text-white'
                  : 'bg-[#2e2e2e] text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {tab === 'nav' ? 'Nav System' : tab === 'slides' ? 'Slides System' : 'Doc Styles'}
            </button>
          ))}
        </div>
      </div>
      )}

      {/* Sub Bar — only in Prototypes mode */}
      {projectMode === 'prototypes' && (
      <div className="flex items-center gap-x-3 px-4 py-1.5 bg-[#1e1e1e]">

      {navMode === 'space' && (
        <>
          <div className="flex rounded-md overflow-hidden border border-[#444]">
            {(['blank', 'established', 'library'] as const).map(stage => (
              <button
                key={stage}
                onClick={() => {
                  localStorage.setItem(SPACE_STAGE_KEY, stage);
                  setSpaceStage(stage);
                  window.dispatchEvent(new Event('storage'));
                }}
                className={`px-2 py-0.5 text-[10px] font-medium transition-colors ${
                  spaceStage === stage
                    ? activeToggle
                    : 'bg-[#2e2e2e] text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {stage === 'blank' ? 'Blank State' : stage === 'established' ? 'Established' : 'Design Library'}
              </button>
            ))}
          </div>
          <span className="text-neutral-700">|</span>
        </>
      )}

      {!isStyleGuide && <>
      {/* Persona */}
      <div className="flex rounded-md overflow-hidden border border-[#444]">
        {(navMode === 'new' || navMode === 'new2' ? PLATFORM_PERSONAS : PERSONAS).map(p => (
          <button
            key={p.value}
            onClick={() => setPersona(p.value)}
            className={`px-2 py-0.5 text-[10px] font-medium transition-colors ${
              persona === p.value
                ? activeToggle
                : 'bg-[#2e2e2e] text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <span className="text-neutral-700">|</span>

      {/* Package */}
      <div className="flex rounded-md overflow-hidden border border-[#444]">
        {PACKAGES.map(p => (
          <button
            key={p.value}
            onClick={() => setPkg(p.value)}
            className={`px-2 py-0.5 text-[10px] font-medium transition-colors ${
              pkg === p.value
                ? activeToggle
                : 'bg-[#2e2e2e] text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <span className="text-neutral-700">|</span>

      {/* Add-ons (Payroll, Benefits, Time Tracking) */}
      <button
        onClick={toggleAddonsOn}
        className={`px-2 py-0.5 text-[10px] font-medium rounded-md border transition-colors ${
          addonsOn
            ? activeChip
            : 'bg-[#2e2e2e] text-neutral-500 border-[#444] hover:text-neutral-300'
        }`}
      >
        Add-ons
      </button>

      {/* Expansion (IT, Finance, Workplace) */}
      <button
        onClick={toggleExpansion}
        className={`px-2 py-0.5 text-[10px] font-medium rounded-md border transition-colors ${
          expansionOn
            ? activeChip
            : 'bg-[#2e2e2e] text-neutral-500 border-[#444] hover:text-neutral-300'
        }`}
      >
        Expansion
      </button>

      <span className="text-neutral-700">|</span>

      {/* Intel toggle (Metrics + Ask + Insights + Automations) */}
      <button
        onClick={() => {
          const next = !(showMetrics && showAsk && showInsights && showAutomations);
          localStorage.setItem(METRICS_KEY, String(next));
          localStorage.setItem(ASK_KEY, String(next));
          localStorage.setItem(INSIGHTS_KEY, String(next));
          localStorage.setItem(AUTOMATIONS_KEY, String(next));
          localStorage.setItem(ASK_POSITION_KEY, 'bottom');
          setShowMetrics(next);
          setShowAsk(next);
          setShowInsights(next);
          setShowAutomations(next);
          setAskPosition('bottom');
          window.dispatchEvent(new Event('storage'));
        }}
        className={`px-2 py-0.5 text-[10px] font-medium rounded-md border transition-colors ${
          showMetrics && showAsk && showInsights && showAutomations
            ? activeChip
            : 'bg-[#2e2e2e] text-neutral-500 border-[#444] hover:text-neutral-300'
        }`}
      >
        Intel
      </button>


      {/* Demo Notes toggle — icon only */}
      <span className="text-neutral-700">|</span>
      <button
        onClick={toggleDemoPanel}
        className={`w-6 h-6 flex items-center justify-center rounded-md border transition-colors shrink-0 ${
          demoPanelOpen
            ? activeChip
            : 'bg-[#2e2e2e] text-neutral-400 border-[#444] hover:text-neutral-200'
        }`}
        title="Demo Notes"
      >
        <Icon name="clipboard" size={12} />
      </button>
      </>}
      </div>
      )}
      </>}
    </div>
  );
}

export default ScenarioBar;
