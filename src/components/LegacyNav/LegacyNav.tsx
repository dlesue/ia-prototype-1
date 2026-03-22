import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import { useScenario } from '../../contexts/ScenarioContext';

interface LegacyNavItem {
  id: string;
  label: string;
  icon: IconName;
  path: string;
}

const NAV_ITEMS: LegacyNavItem[] = [
  { id: 'home', label: 'Home', icon: 'home', path: '/home' },
  { id: 'inbox', label: 'Inbox', icon: 'inbox', path: '/home/inbox' },
  { id: 'my-info', label: 'My Info', icon: 'circle-user', path: '/people/my-info' },
  { id: 'people', label: 'People', icon: 'user-group', path: '/people' },
  { id: 'hiring', label: 'Hiring', icon: 'id-badge', path: '/hiring' },
  { id: 'onboarding', label: 'Onboarding', icon: 'clipboard', path: '/onboarding' },
  { id: 'payroll', label: 'Payroll', icon: 'money-bill-1', path: '/payroll' },
  { id: 'benefits', label: 'Benefits', icon: 'heart', path: '/benefits' },
  { id: 'performance', label: 'Performance', icon: 'circle-dot', path: '/performance' },
  { id: 'training', label: 'Training', icon: 'lightbulb', path: '/training' },
  { id: 'compensation', label: 'Compensation', icon: 'chart-bar', path: '/compensation' },
  { id: 'culture', label: 'Culture', icon: 'comments', path: '/culture' },
  { id: 'time-and-attendance', label: 'Time & Attendance', icon: 'clock', path: '/time-and-attendance' },
  { id: 'reports', label: 'Reports', icon: 'chart-pie-simple', path: '/reports' },
  { id: 'files', label: 'Files', icon: 'file-lines', path: '/files' },
  { id: 'apps', label: 'Apps', icon: 'compass', path: '/apps' },
  { id: 'settings', label: 'Settings', icon: 'gear', path: '/settings' },
];

export function LegacyNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { scenario } = useScenario();

  const visibleIds = new Set([
    ...scenario.visibleProducts,
    'my-info',
  ]);

  const visibleItems = NAV_ITEMS.filter((item) => item.id !== 'settings' && item.id !== 'inbox' && visibleIds.has(item.id));

  const isActive = (item: LegacyNavItem) => {
    // My Info lives under /people but is its own nav item
    if (item.id === 'people' && location.pathname.startsWith('/people/my-info')) return false;
    // Inbox lives under /home but is its own nav item
    if (item.id === 'home' && location.pathname.startsWith('/home/inbox')) return false;
    return location.pathname === item.path || location.pathname.startsWith(item.path + '/');
  };

  return (
    <div className="absolute left-0 top-0 h-full w-[260px] bg-white border-r border-[var(--border-neutral-xx-weak)] z-20 flex flex-col">
      {/* Nav items */}
      <div className="flex-1 py-3 px-3 space-y-1">
        {visibleItems.map((item) => {
          const active = isActive(item);
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] transition-colors ${
                active
                  ? 'bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)] font-medium'
                  : 'text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)]'
              }`}
            >
              <Icon
                name={item.icon}
                size={18}
                className={active ? 'text-[var(--color-primary-strong)]' : 'text-[var(--text-neutral-weak)]'}
              />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Bottom: user avatar + menu */}
      <div className="px-3 py-3 border-t border-[var(--border-neutral-xx-weak)] flex flex-col gap-2">
        <button className="w-8 h-8 rounded-full bg-[var(--surface-neutral-x-weak)] flex items-center justify-center overflow-hidden">
          <Icon name="circle-user" size={20} className="text-[var(--text-neutral-weak)]" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
          <Icon name="ellipsis" size={16} className="text-[var(--text-neutral-weak)]" />
        </button>
      </div>
    </div>
  );
}

export default LegacyNav;
