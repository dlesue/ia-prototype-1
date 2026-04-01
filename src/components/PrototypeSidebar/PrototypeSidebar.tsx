import { useState, useEffect } from 'react';
import { Icon } from '../Icon';
const LEGACY_KEY = 'bhr-legacy-nav';

interface PrototypeEntry {
  id: string;
  label: string;
  icon: 'skull' | 'compass' | 'arrows-rotate' | 'rocket';
  storageValue: string;
  accentColor: string;
}

const PROTOTYPES: PrototypeEntry[] = [
  { id: 'legacy', label: 'Legacy', icon: 'skull', storageValue: 'true', accentColor: '#f87171' },
  { id: 'new', label: 'New', icon: 'compass', storageValue: 'false', accentColor: '#34d399' },
  { id: 'space', label: 'Space', icon: 'rocket', storageValue: 'space', accentColor: '#60a5fa' },
];

export function getNavMode(): string {
  const stored = localStorage.getItem(LEGACY_KEY);
  if (stored === 'true') return 'legacy';
  if (stored === 'space') return 'space';
  if (stored === 'none' || stored === 'intro' || stored === null) return 'new';
  return 'new';
}

export function PrototypeSidebar() {
  const [activeId, setActiveId] = useState(getNavMode);

  useEffect(() => {
    const handler = () => setActiveId(getNavMode());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const selectPrototype = (entry: PrototypeEntry) => {
    localStorage.setItem(LEGACY_KEY, entry.storageValue);
    setActiveId(entry.id);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="w-44 shrink-0 bg-[#1e1e1e] overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <div className="text-[9px] font-semibold uppercase tracking-wider text-neutral-500 mb-1.5 px-2">
            Prototypes
          </div>
          {PROTOTYPES.map(entry => {
            const isActive = activeId === entry.id;
            return (
              <button
                key={entry.id}
                onClick={() => selectPrototype(entry)}
                className={`w-full text-left px-2 py-1.5 rounded text-[11px] transition-colors flex items-center gap-2 ${
                  isActive
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200'
                }`}
              >
                <Icon name={entry.icon} size={10} style={isActive ? { color: entry.accentColor } : undefined} />
                {entry.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PrototypeSidebar;
