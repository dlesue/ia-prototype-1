import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';

interface CommandItem {
  id: string;
  label: string;
  section: string;
  icon: string;
  path?: string;
  action?: () => void;
}

const COMMANDS: CommandItem[] = [
  // People
  { id: 'people', label: 'People', section: 'Navigate', icon: 'users', path: '/people' },
  { id: 'my-info', label: 'My Info', section: 'Navigate', icon: 'user', path: '/people/my-info' },
  { id: 'directory', label: 'Employee Directory', section: 'Navigate', icon: 'address-book', path: '/people/directory' },
  { id: 'org-chart', label: 'Org Chart', section: 'Navigate', icon: 'sitemap', path: '/people/org-chart' },

  // Hiring
  { id: 'hiring', label: 'Hiring', section: 'Navigate', icon: 'bullhorn', path: '/hiring' },
  { id: 'job-openings', label: 'Job Openings', section: 'Navigate', icon: 'briefcase', path: '/hiring' },
  { id: 'candidates', label: 'Candidates', section: 'Navigate', icon: 'user-plus', path: '/hiring/candidates' },

  // Time & Attendance
  { id: 'time-off', label: 'Time Off', section: 'Navigate', icon: 'calendar', path: '/time-and-attendance/time-off' },
  { id: 'time-tracking', label: 'Time Tracking', section: 'Navigate', icon: 'clock', path: '/time-and-attendance/time-tracking' },

  // Performance
  { id: 'performance', label: 'Performance', section: 'Navigate', icon: 'chart-line', path: '/performance' },
  { id: 'goals', label: 'Goals', section: 'Navigate', icon: 'bullseye', path: '/performance/goals' },

  // Payroll & Benefits
  { id: 'payroll', label: 'Payroll', section: 'Navigate', icon: 'money-bill', path: '/payroll' },
  { id: 'benefits', label: 'Benefits', section: 'Navigate', icon: 'heart', path: '/benefits' },

  // Other
  { id: 'compensation', label: 'Compensation', section: 'Navigate', icon: 'coins', path: '/compensation' },
  { id: 'training', label: 'Training', section: 'Navigate', icon: 'graduation-cap', path: '/training' },
  { id: 'onboarding', label: 'Onboarding', section: 'Navigate', icon: 'hand-wave', path: '/onboarding' },
  { id: 'culture', label: 'Culture', section: 'Navigate', icon: 'face-smile', path: '/culture' },
  { id: 'files', label: 'Files', section: 'Navigate', icon: 'folder', path: '/files' },
  { id: 'apps', label: 'Apps & Integrations', section: 'Navigate', icon: 'grid-2', path: '/apps' },
  { id: 'reports', label: 'Reports', section: 'Navigate', icon: 'chart-bar', path: '/reports' },
  { id: 'home', label: 'Home', section: 'Navigate', icon: 'house', path: '/home' },
  { id: 'inbox', label: 'Inbox', section: 'Navigate', icon: 'inbox', path: '/home/inbox' },

  // Quick actions
  { id: 'request-time-off', label: 'Request Time Off', section: 'Actions', icon: 'calendar-plus', path: '/time-and-attendance/time-off' },
  { id: 'add-employee', label: 'Add New Employee', section: 'Actions', icon: 'user-plus', path: '/people' },
  { id: 'run-report', label: 'Run a Report', section: 'Actions', icon: 'chart-bar', path: '/reports' },
];

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const filtered = query.trim()
    ? COMMANDS.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
    : COMMANDS;

  const sections = Array.from(new Set(filtered.map(c => c.section)));

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  const handleSelect = (item: CommandItem) => {
    if (item.path) navigate(item.path);
    if (item.action) item.action();
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  let itemIndex = -1;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Palette */}
      <div
        className="relative w-full max-w-[560px] bg-white rounded-xl shadow-2xl border border-[var(--border-neutral-xx-weak)] overflow-hidden animate-fadeIn"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-neutral-xx-weak)]">
          <Icon name="magnifying-glass" size={16} className="shrink-0 text-[var(--text-neutral-weak)]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search or jump to..."
            className="flex-1 text-[15px] text-[var(--text-neutral-xx-strong)] placeholder:text-[var(--text-neutral-weak)] bg-transparent outline-none"
          />
          <kbd className="text-[10px] text-[var(--text-neutral-weak)] bg-[var(--surface-neutral-xx-weak)] border border-[var(--border-neutral-xx-weak)] rounded px-1.5 py-0.5">ESC</kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[360px] overflow-y-auto py-2">
          {filtered.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-[var(--text-neutral-weak)]">No results found</p>
          )}
          {sections.map(section => {
            const sectionItems = filtered.filter(c => c.section === section);
            return (
              <div key={section}>
                <p className="px-4 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-neutral-weak)]">{section}</p>
                {sectionItems.map(item => {
                  itemIndex++;
                  const idx = itemIndex;
                  return (
                    <div
                      key={item.id}
                      data-index={idx}
                      className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors ${
                        idx === selectedIndex
                          ? 'bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)]'
                          : 'text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)]'
                      }`}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      <Icon
                        name={item.icon as IconName}
                        size={14}
                        className={idx === selectedIndex ? 'text-[var(--color-primary-strong)]' : 'text-[var(--icon-neutral-strong)]'}
                      />
                      <span className="text-[13px] font-medium">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-[var(--border-neutral-xx-weak)] bg-[var(--surface-neutral-xx-weak)]">
          <span className="flex items-center gap-1 text-[10px] text-[var(--text-neutral-weak)]">
            <kbd className="bg-white border border-[var(--border-neutral-xx-weak)] rounded px-1 py-0.5">↑↓</kbd> navigate
          </span>
          <span className="flex items-center gap-1 text-[10px] text-[var(--text-neutral-weak)]">
            <kbd className="bg-white border border-[var(--border-neutral-xx-weak)] rounded px-1 py-0.5">↵</kbd> select
          </span>
          <span className="flex items-center gap-1 text-[10px] text-[var(--text-neutral-weak)]">
            <kbd className="bg-white border border-[var(--border-neutral-xx-weak)] rounded px-1 py-0.5">esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
