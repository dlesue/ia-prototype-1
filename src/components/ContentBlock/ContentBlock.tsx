import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faUserGroup, faUsers, faBriefcase, faShield, faLaptop, faWallet, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { useScenario } from '../../contexts/ScenarioContext';
import { PAGE_JTBD } from '../../data/pageJtbd';
import type { PersonaType } from '../../data/personas-and-packaging';

const PERSONA_CONFIG: Record<PersonaType, { icon: typeof faCircleUser; label: string }> = {
  employee: { icon: faCircleUser, label: 'Employee' },
  manager: { icon: faUserGroup, label: 'Manager' },
  'dept-head': { icon: faUsers, label: 'Dept Head' },
  executive: { icon: faBriefcase, label: 'Executive' },
  'hr-admin': { icon: faShield, label: 'HR Admin' },
  'it-admin': { icon: faLaptop, label: 'IT Admin' },
  'finance-admin': { icon: faWallet, label: 'Finance Admin' },
  'workplace-admin': { icon: faBuilding, label: 'Workplace Admin' },
};

interface ContentBlockProps {
  label?: string;
  height?: number;
  variant?: 'default' | 'white';
  showJtbd?: boolean;
  fillHeight?: boolean;
}

export function ContentBlock({ label, height = 200, variant = 'default', showJtbd = false, fillHeight = false }: ContentBlockProps) {
  const location = useLocation();
  const { persona } = useScenario();

  const jtbdForPage = showJtbd ? PAGE_JTBD[location.pathname] : null;
  const jtbdRaw = jtbdForPage?.[persona];
  const jtbdItems = jtbdRaw ? (Array.isArray(jtbdRaw) ? jtbdRaw : [jtbdRaw]) : [];
  const personaConfig = PERSONA_CONFIG[persona];

  return (
    <div
      className={`rounded-lg flex items-center justify-center ${
        variant === 'white'
          ? 'bg-white border border-[var(--border-neutral-xx-weak)]'
          : 'bg-[var(--border-neutral-xx-weak)]'
      } ${fillHeight ? 'flex-1' : ''}`}
      style={fillHeight ? { minHeight: 200 } : { height }}
    >
      {showJtbd && jtbdItems.length > 0 && personaConfig ? (
        <div className="flex flex-col items-center text-center px-16 gap-3 max-w-2xl">
          <FontAwesomeIcon
            icon={personaConfig.icon}
            className="text-[var(--text-neutral-x-weak)]"
            style={{ fontSize: 28 }}
          />
          <span className="text-xs font-medium tracking-wide uppercase text-[var(--text-neutral-x-weak)]">
            {personaConfig.label}
          </span>
          <ol className="flex flex-col gap-2 text-left">
            {jtbdItems.map((item, i) => (
              <li key={i} className="text-[15px] leading-relaxed text-[var(--text-neutral-weak)] flex gap-2">
                <span className="text-[var(--text-neutral-x-weak)] font-medium shrink-0">{i + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : label ? (
        <span className="text-sm text-[var(--text-neutral-weak)]">{label}</span>
      ) : null}
    </div>
  );
}

export default ContentBlock;
