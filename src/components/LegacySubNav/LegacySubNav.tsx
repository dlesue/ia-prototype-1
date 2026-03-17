import { useState, useEffect, useMemo } from 'react';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import { SETTINGS_HIGHLIGHT_KEY, SETTINGS_CATEGORIES } from '../DemoPanel/DemoPanel';

export interface SubNavItem {
  id: string;
  label: string;
  icon?: IconName;
  badge?: string;
}

interface LegacySubNavProps {
  items: SubNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

/** Build a map from item ID → highlight color based on active categories */
function buildHighlightMap(activeCategories: string[]): Record<string, string> {
  const map: Record<string, string> = {};
  for (const cat of SETTINGS_CATEGORIES) {
    if (activeCategories.includes(cat.id)) {
      for (const itemId of cat.items) {
        map[itemId] = cat.borderColor;
      }
    }
  }
  return map;
}

export function LegacySubNav({ items, activeId, onSelect }: LegacySubNavProps) {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  useEffect(() => {
    const read = () => {
      const stored = localStorage.getItem(SETTINGS_HIGHLIGHT_KEY);
      setActiveCategories(stored ? JSON.parse(stored) : []);
    };
    read();
    window.addEventListener('storage', read);
    return () => window.removeEventListener('storage', read);
  }, []);

  const highlightMap = useMemo(() => buildHighlightMap(activeCategories), [activeCategories]);

  return (
    <div className="w-[220px] shrink-0 space-y-0.5">
      {items.map((item) => {
        const active = item.id === activeId;
        const highlightColor = highlightMap[item.id];
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-all text-left ${
              active
                ? 'bg-[var(--color-primary-strong)] text-white font-medium'
                : 'text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)]'
            }`}
            style={highlightColor ? {
              border: `2px solid ${highlightColor}`,
              backgroundColor: active ? undefined : `${highlightColor}10`,
            } : undefined}
          >
            {item.icon && (
              <Icon
                name={item.icon}
                size={14}
                className={active ? 'text-white' : 'text-[var(--text-neutral-weak)]'}
              />
            )}
            <span className="flex-1 min-w-0">{item.label}</span>
            {item.badge && (
              <span className={`text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0 ${
                active ? 'bg-white/20 text-white' : 'bg-[var(--color-primary-strong)] text-white'
              }`}>
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default LegacySubNav;
