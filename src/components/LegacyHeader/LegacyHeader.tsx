import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';

export function LegacyHeader() {
  const navigate = useNavigate();

  return (
    <div className="h-[60px] shrink-0 flex items-center justify-between px-5 bg-white border-b border-[var(--border-neutral-xx-weak)] z-30">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-[var(--color-primary-strong)] flex items-center justify-center">
          <span className="text-white text-xs font-bold">A</span>
        </div>
        <span className="font-semibold text-sm text-[var(--text-neutral-xx-strong)]">Acme Corp</span>
      </div>

      {/* Right side: search + utility icons */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 border border-[var(--border-neutral-weak)] rounded-lg px-3 py-1.5 w-[200px] bg-[var(--surface-neutral-xx-weak)]">
          <Icon name="magnifying-glass" size={13} className="text-[var(--text-neutral-weak)]" />
          <span className="text-sm text-[var(--text-neutral-weak)]">Search...</span>
        </div>

        {/* Inbox */}
        <button onClick={() => navigate('/inbox')} className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
          <Icon name="inbox" size={16} className="text-[var(--text-neutral-x-strong)]" />
          <span className="absolute -top-0.5 -right-0.5 bg-[var(--color-primary-strong)] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            14
          </span>
        </button>

        {/* Help */}
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
          <Icon name="circle-question" size={16} className="text-[var(--text-neutral-x-strong)]" />
        </button>

        {/* Settings gear */}
        <button onClick={() => navigate('/settings')} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
          <Icon name="gear" size={16} className="text-[var(--text-neutral-x-strong)]" />
        </button>

        {/* Ask button */}
        <button
          onClick={() => {
            const isOpen = localStorage.getItem('bhr-chat-panel-open') === 'true';
            if (!isOpen) {
              localStorage.setItem('bhr-ask-reset', JSON.stringify({ ts: Date.now() }));
            }
            localStorage.setItem('bhr-chat-panel-open', String(!isOpen));
            window.dispatchEvent(new Event('storage'));
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--color-primary-strong)] text-[var(--color-primary-strong)] text-sm font-medium hover:bg-[var(--color-primary-strong)]/5 transition-colors"
        >
          <Icon name="sparkles" size={13} />
          Ask
        </button>
      </div>
    </div>
  );
}

export default LegacyHeader;
