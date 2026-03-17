import type { ReactNode } from 'react';

interface SpaceAppShellProps {
  appName: string;
  onBack: () => void;
  children: ReactNode;
}

export function SpaceAppShell({ appName, onBack, children }: SpaceAppShellProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0" style={{ backgroundColor: '#E8F0F5' }}>
      {/* Top chrome */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white" style={{ borderBottom: '1px solid #D6E4EC' }}>
        <button onClick={onBack} className="flex items-center gap-2 text-[14px] transition-colors" style={{ color: '#78716C' }} onMouseEnter={e => (e.currentTarget.style.color = '#1C1917')} onMouseLeave={e => (e.currentTarget.style.color = '#78716C')}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Back
        </button>
        <span className="text-[15px] font-medium" style={{ color: '#1C1917' }}>{appName}</span>
        <button onClick={onBack} className="transition-colors" style={{ color: '#78716C' }} onMouseEnter={e => (e.currentTarget.style.color = '#1C1917')} onMouseLeave={e => (e.currentTarget.style.color = '#78716C')}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 5l8 8M13 5l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
