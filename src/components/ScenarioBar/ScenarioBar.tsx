import { useState } from 'react';
import { useScenario } from '../../contexts/ScenarioContext';
import { Icon } from '../Icon';
import type { PersonaType, PackageType, AddonType } from '../../contexts/ScenarioContext';

const PERSONAS: { value: PersonaType; label: string }[] = [
  { value: 'employee', label: 'Employee' },
  { value: 'manager', label: 'Manager' },
  { value: 'hr-admin', label: 'HR Admin' },
];

const PACKAGES: { value: PackageType; label: string }[] = [
  { value: 'core', label: 'Core' },
  { value: 'pro', label: 'Pro' },
  { value: 'elite', label: 'Elite' },
];

const ADDONS: { value: AddonType; label: string }[] = [
  { value: 'payroll', label: 'Payroll' },
  { value: 'benefits', label: 'Benefits' },
  { value: 'time-tracking', label: 'Time' },
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

export function ScenarioBar() {
  const { persona, pkg, addons, hiddenProducts, setPersona, setPkg, toggleAddon, toggleProductHidden } = useScenario();
  const [showMetrics, setShowMetrics] = useState(() => localStorage.getItem(METRICS_KEY) !== 'false');
  const [showAsk, setShowAsk] = useState(() => localStorage.getItem(ASK_KEY) !== 'false');
  const [showInsights, setShowInsights] = useState(() => localStorage.getItem(INSIGHTS_KEY) !== 'false');
  const [showLocks, setShowLocks] = useState(() => localStorage.getItem(LOCKS_KEY) !== 'false');
  const [showAutomations, setShowAutomations] = useState(() => localStorage.getItem(AUTOMATIONS_KEY) === 'true');
  const [askPosition, setAskPosition] = useState<'top' | 'bottom'>(() => {
    return localStorage.getItem(ASK_POSITION_KEY) === 'bottom' ? 'bottom' : 'top';
  });
  const [navMode, setNavMode] = useState<'legacy' | 'new' | 'new2' | 'space'>(() => {
    const stored = localStorage.getItem(LEGACY_KEY);
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

  const setNavModeTo = (mode: 'legacy' | 'new' | 'new2' | 'space') => {
    const stored = mode === 'legacy' ? 'true' : mode === 'new2' ? 'new2' : mode === 'space' ? 'space' : 'false';
    localStorage.setItem(LEGACY_KEY, stored);
    setNavMode(mode);
    window.dispatchEvent(new Event('storage'));
  };


  const toggleDemoPanel = () => {
    const next = !demoPanelOpen;
    localStorage.setItem(DEMO_PANEL_KEY, String(next));
    setDemoPanelOpen(next);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="flex items-center gap-x-3 px-4 py-1.5 bg-[#1e1e1e] shrink-0 z-[60]">
      {/* Nav mode toggle */}
      <div className="flex rounded-md overflow-hidden border border-[#444]">
        {(['legacy', 'new', 'new2', 'space'] as const).map(mode => (
          <button
            key={mode}
            onClick={() => setNavModeTo(mode)}
            className={`px-2 py-0.5 text-[11px] font-medium transition-colors ${
              navMode === mode
                ? mode === 'legacy'
                  ? 'bg-red-500/25 text-red-300'
                  : mode === 'new2'
                    ? 'bg-emerald-500/25 text-emerald-300'
                    : mode === 'space'
                      ? 'bg-blue-500/25 text-blue-300'
                      : 'bg-amber-500/25 text-amber-300'
                : 'bg-[#2e2e2e] text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {mode === 'legacy' ? 'Legacy' : mode === 'new' ? 'New' : mode === 'new2' ? 'New 2' : 'Space'}
          </button>
        ))}
      </div>

      {navMode === 'space' && (
        <>
          <span className="text-neutral-700">|</span>
          <div className="flex rounded-md overflow-hidden border border-[#444]">
            {(['blank', 'established', 'library'] as const).map(stage => (
              <button
                key={stage}
                onClick={() => {
                  localStorage.setItem(SPACE_STAGE_KEY, stage);
                  setSpaceStage(stage);
                  window.dispatchEvent(new Event('storage'));
                }}
                className={`px-2 py-0.5 text-[11px] font-medium transition-colors ${
                  spaceStage === stage
                    ? 'bg-blue-500/25 text-blue-300'
                    : 'bg-[#2e2e2e] text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {stage === 'blank' ? 'Blank State' : stage === 'established' ? 'Established' : 'Design Library'}
              </button>
            ))}
          </div>
        </>
      )}

      <span className="text-neutral-700">|</span>

      {/* Persona */}
      <div className="flex rounded-md overflow-hidden border border-[#444]">
        {PERSONAS.map(p => (
          <button
            key={p.value}
            onClick={() => setPersona(p.value)}
            className={`px-2 py-0.5 text-[11px] font-medium transition-colors ${
              persona === p.value
                ? 'bg-amber-500/25 text-amber-300'
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
            className={`px-2 py-0.5 text-[11px] font-medium transition-colors ${
              pkg === p.value
                ? 'bg-amber-500/25 text-amber-300'
                : 'bg-[#2e2e2e] text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <span className="text-neutral-700">|</span>

      {/* Add-ons */}
      <div className="flex gap-1">
        {ADDONS.map(a => (
          <button
            key={a.value}
            onClick={() => toggleAddon(a.value)}
            className={`px-2 py-0.5 text-[11px] font-medium rounded-md border transition-colors ${
              addons.includes(a.value)
                ? 'bg-amber-500/25 text-amber-300 border-amber-500/40'
                : 'bg-[#2e2e2e] text-neutral-500 border-[#444] hover:text-neutral-300'
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      <span className="text-neutral-700">|</span>

      {/* Extended products toggle */}
      <button
        onClick={() => toggleProductHidden(['training', 'onboarding', 'offboarding', 'apps', 'performance', 'employee-community', 'rewards-recognition', 'wellbeing'])}
        className={`px-2 py-0.5 text-[11px] font-medium rounded-md border transition-colors ${
          !hiddenProducts.includes('training')
            ? 'bg-amber-500/25 text-amber-300 border-amber-500/40'
            : 'bg-[#2e2e2e] text-neutral-500 border-[#444] hover:text-neutral-300'
        }`}
      >
        Extended
      </button>

      <span className="text-neutral-700">|</span>

      {/* Hub Header toggles */}
      <div className="flex gap-1 items-center">
        <button
          onClick={toggleLocks}
          className={`px-2 py-0.5 text-[11px] font-medium rounded-md border transition-colors ${
            showLocks
              ? 'bg-amber-500/25 text-amber-300 border-amber-500/40'
              : 'bg-[#2e2e2e] text-neutral-500 border-[#444] hover:text-neutral-300'
          }`}
        >
          Locks
        </button>
        <button
          onClick={toggleMetrics}
          className={`px-2 py-0.5 text-[11px] font-medium rounded-md border transition-colors ${
            showMetrics
              ? 'bg-amber-500/25 text-amber-300 border-amber-500/40'
              : 'bg-[#2e2e2e] text-neutral-500 border-[#444] hover:text-neutral-300'
          }`}
        >
          Metrics
        </button>
        <span className="text-neutral-700">|</span>
        <button
          onClick={toggleAsk}
          className={`px-2 py-0.5 text-[11px] font-medium rounded-md border transition-colors ${
            showAsk
              ? 'bg-amber-500/25 text-amber-300 border-amber-500/40'
              : 'bg-[#2e2e2e] text-neutral-500 border-[#444] hover:text-neutral-300'
          }`}
        >
          Ask
        </button>
        <button
          onClick={toggleInsights}
          className={`px-2 py-0.5 text-[11px] font-medium rounded-md border transition-colors ${
            showInsights
              ? 'bg-amber-500/25 text-amber-300 border-amber-500/40'
              : 'bg-[#2e2e2e] text-neutral-500 border-[#444] hover:text-neutral-300'
          }`}
        >
          Insights
        </button>
        <button
          onClick={toggleAutomations}
          className={`px-2 py-0.5 text-[11px] font-medium rounded-md border transition-colors ${
            showAutomations
              ? 'bg-amber-500/25 text-amber-300 border-amber-500/40'
              : 'bg-[#2e2e2e] text-neutral-500 border-[#444] hover:text-neutral-300'
          }`}
        >
          Automations
        </button>
        {(showAsk || showInsights || showAutomations) && (
          <div className="flex rounded-md overflow-hidden border border-[#444] ml-1">
            {(['top', 'bottom'] as const).map(pos => (
              <button
                key={pos}
                onClick={() => {
                  localStorage.setItem(ASK_POSITION_KEY, pos);
                  setAskPosition(pos);
                  window.dispatchEvent(new Event('storage'));
                }}
                className={`px-2 py-0.5 text-[11px] font-medium transition-colors ${
                  askPosition === pos
                    ? 'bg-amber-500/25 text-amber-300'
                    : 'bg-[#2e2e2e] text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {pos === 'top' ? 'Top' : 'Bottom'}
              </button>
            ))}
          </div>
        )}
      </div>


      {/* Spacer to push Demo Notes to right */}
      <div className="flex-1" />

      {/* Demo Notes toggle — icon only */}
      <button
        onClick={toggleDemoPanel}
        className={`w-6 h-6 flex items-center justify-center rounded-md border transition-colors shrink-0 ${
          demoPanelOpen
            ? 'bg-amber-500/25 text-amber-300 border-amber-500/40'
            : 'bg-[#2e2e2e] text-neutral-400 border-[#444] hover:text-neutral-200'
        }`}
        title="Demo Notes"
      >
        <Icon name="clipboard" size={12} />
      </button>
    </div>
  );
}

export default ScenarioBar;
