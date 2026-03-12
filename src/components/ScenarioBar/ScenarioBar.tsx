import { useNavigate } from 'react-router-dom';
import { useScenario, SCENARIOS } from '../../contexts/ScenarioContext';

const PERSONA_LABELS: Record<string, string> = {
  employee: 'Employee',
  manager: 'Manager',
  'hr-admin': 'HR Admin',
  exec: 'Exec',
};

const PACKAGE_LABELS: Record<string, string> = {
  core: 'Core',
  pro: 'Pro',
  elite: 'Elite',
};

const ADDON_LABELS: Record<string, string> = {
  payroll: 'Payroll',
  benefits: 'Benefits',
  'time-tracking': 'Time Tracking',
};

export function ScenarioBar() {
  const { scenario, setScenarioId } = useScenario();
  const navigate = useNavigate();

  const handleScenarioChange = (id: string) => {
    setScenarioId(id);
    navigate('/home');
  };

  return (
    <div className="sticky top-0 z-10 flex items-center gap-2.5 px-4 py-1.5 rounded-t-[var(--radius-large)] border-b border-[var(--border-neutral-x-weak)]"
      style={{ background: 'var(--surface-neutral-x-weak)' }}
    >
      {/* Demo badge */}
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-amber-100 text-amber-700">
        Demo
      </span>

      <span className="text-xs text-[var(--text-neutral-weak)]">Viewing as:</span>

      {/* Scenario selector */}
      <select
        value={scenario.id}
        onChange={(e) => handleScenarioChange(e.target.value)}
        className="text-xs font-semibold text-[var(--text-neutral-xx-strong)] bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-x-weak)] rounded-md px-2 py-1 cursor-pointer focus:outline-none focus:border-[var(--color-primary-medium)] transition-colors"
      >
        {SCENARIOS.map(s => (
          <option key={s.id} value={s.id}>{s.label}</option>
        ))}
      </select>

      <span className="text-[var(--border-neutral-medium)]">·</span>

      {/* Persona */}
      <span className="text-xs text-[var(--text-neutral-medium)]">
        Persona: <span className="font-medium text-[var(--text-neutral-x-strong)]">{PERSONA_LABELS[scenario.persona]}</span>
      </span>

      <span className="text-[var(--border-neutral-medium)]">·</span>

      {/* Package */}
      <span className="text-xs text-[var(--text-neutral-medium)]">
        Package: <span className="font-medium text-[var(--text-neutral-x-strong)]">{PACKAGE_LABELS[scenario.package]}</span>
      </span>

      {scenario.addons.length > 0 && (
        <>
          <span className="text-[var(--border-neutral-medium)]">·</span>
          <span className="text-xs text-[var(--text-neutral-medium)]">
            Add-ons:{' '}
            <span className="font-medium text-[var(--text-neutral-x-strong)]">
              {scenario.addons.map(a => ADDON_LABELS[a]).join(', ')}
            </span>
          </span>
        </>
      )}
    </div>
  );
}

export default ScenarioBar;
