import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';

export interface CardGridItem {
  name: string;
  icon: IconName;
  count?: number;
}

interface CardGridProps {
  items: CardGridItem[];
  columns?: number;
  /** If provided, clicking a card navigates to `${linkPrefix}/${encodeURIComponent(item.name)}` */
  linkPrefix?: string;
  /** Show an x button on hover to remove items */
  dismissable?: boolean;
}

export function CardGrid({ items, columns = 4, linkPrefix, dismissable }: CardGridProps) {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState<Set<string>>(new Set());

  const visibleItems = items.filter(item => !hidden.has(item.name));

  if (visibleItems.length === 0) return null;

  return (
    <div className={`grid gap-3`} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {visibleItems.map((item) => (
        <button
          key={item.name}
          className="group/card relative flex items-center gap-2.5 rounded-xl border border-[var(--border-neutral-xx-weak)] bg-white px-3.5 py-3 text-left hover:shadow-sm hover:border-[var(--border-neutral-weak)] transition-all cursor-pointer"
          onClick={linkPrefix ? () => navigate(`${linkPrefix}/${encodeURIComponent(item.name)}`) : undefined}
        >
          <div className="w-7 h-7 rounded-lg bg-[var(--surface-neutral-xx-weak)] flex items-center justify-center shrink-0">
            <Icon name={item.icon} size={14} className="text-[var(--text-neutral-medium)]" />
          </div>
          <span className="text-sm font-medium text-[var(--text-neutral-xx-strong)] truncate">
            {item.name}{item.count != null ? ` (${item.count})` : ''}
          </span>
          {dismissable && (
            <div
              className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center rounded-md hover:bg-[var(--surface-neutral-xx-weak)] opacity-0 group-hover/card:opacity-100 transition-opacity"
              onClick={(e) => { e.stopPropagation(); setHidden(prev => new Set(prev).add(item.name)); }}
            >
              <Icon name="xmark" size={10} className="text-[var(--text-neutral-weak)]" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

export default CardGrid;
