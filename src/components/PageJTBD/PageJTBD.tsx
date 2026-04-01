import { useLocation } from 'react-router-dom';
import { useScenario } from '../../contexts/ScenarioContext';
import { PAGE_JTBD } from '../../data/pageJtbd';

export function PageJTBD() {
  const location = useLocation();
  const { persona } = useScenario();

  const jtbdForPage = PAGE_JTBD[location.pathname];
  if (!jtbdForPage) return null;

  const description = jtbdForPage[persona];
  if (!description) return null;

  return (
    <div className="px-6 pt-4 pb-0">
      <div className="px-4 py-3 rounded-lg bg-white border border-[var(--border-neutral-xx-weak)] text-[13px] text-[var(--text-neutral-medium)] leading-relaxed">
        {description}
      </div>
    </div>
  );
}

export default PageJTBD;
