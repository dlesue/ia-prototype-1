import type { ReactNode } from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { GlobalNav } from '../components/GlobalNav';
import { GlobalNavV2 } from '../components/GlobalNav/GlobalNavV2';
import { LegacyNav } from '../components/LegacyNav';
import { LegacyHeader } from '../components/LegacyHeader';
import { AIChatPanel } from '../components/AIChatPanel';
import { DemoPanel } from '../components/DemoPanel';
import { CommandPalette } from '../components/CommandPalette';
import { ScenarioBar } from '../components/ScenarioBar';
import { ProblemSlides } from '../components/ProblemSlides/ProblemSlides';
import { SpaceLayout } from './SpaceLayout';

const LEGACY_KEY = 'bhr-legacy-nav';
const DEMO_PANEL_KEY = 'bhr-demo-panel-open';

const NAV_STORAGE_KEY = 'bhr-nav-expanded';
const CHAT_PANEL_STORAGE_KEY = 'bhr-chat-panel-open';
const CHAT_EXPANDED_STORAGE_KEY = 'bhr-chat-expanded';

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  const [isNavExpanded, setIsNavExpanded] = useState(() => {
    const stored = localStorage.getItem(NAV_STORAGE_KEY);
    return stored ? JSON.parse(stored) : true;
  });
  const [isChatPanelOpen, setIsChatPanelOpen] = useState(() => {
    return localStorage.getItem(CHAT_PANEL_STORAGE_KEY) === 'true';
  });
  const [isChatExpanded, setIsChatExpanded] = useState(() => {
    return localStorage.getItem(CHAT_EXPANDED_STORAGE_KEY) === 'true';
  });
  const [isTablet, setIsTablet] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [navMode, setNavMode] = useState<'legacy' | 'new' | 'new2' | 'space'>(() => {
    const stored = localStorage.getItem(LEGACY_KEY);
    if (stored === 'true') return 'legacy';
    if (stored === 'new2') return 'new2';
    if (stored === 'space') return 'space';
    return 'new';
  });
  const [isDemoPanelOpen, setIsDemoPanelOpen] = useState(() => localStorage.getItem(DEMO_PANEL_KEY) === 'true');
  const scenarioBarRef = useRef<HTMLDivElement>(null);
  const [scenarioBarH, setScenarioBarH] = useState(32);

  // Measure ScenarioBar height dynamically
  useEffect(() => {
    const el = scenarioBarRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setScenarioBarH(el.offsetHeight);
    });
    ro.observe(el);
    setScenarioBarH(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  // ⌘K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Listen for search open requests from GlobalNav
  useEffect(() => {
    const handler = () => setIsCommandPaletteOpen(true);
    window.addEventListener('bhr-open-search', handler);
    return () => window.removeEventListener('bhr-open-search', handler);
  }, []);

  const handleCloseCommandPalette = useCallback(() => setIsCommandPaletteOpen(false), []);

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem(NAV_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed !== isNavExpanded) setIsNavExpanded(parsed);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isNavExpanded]);

  useEffect(() => {
    const interval = setInterval(() => {
      const isOpen = localStorage.getItem(CHAT_PANEL_STORAGE_KEY) === 'true';
      if (isOpen !== isChatPanelOpen) setIsChatPanelOpen(isOpen);
      const isExpanded = localStorage.getItem(CHAT_EXPANDED_STORAGE_KEY) === 'true';
      if (isExpanded !== isChatExpanded) setIsChatExpanded(isExpanded);
    }, 100);
    return () => clearInterval(interval);
  }, [isChatPanelOpen, isChatExpanded]);

  const handleCloseChatPanel = () => {
    localStorage.setItem(CHAT_PANEL_STORAGE_KEY, 'false');
    localStorage.setItem(CHAT_EXPANDED_STORAGE_KEY, 'false');
    setIsChatPanelOpen(false);
    setIsChatExpanded(false);
  };

  const handleChatExpandChange = (expanded: boolean) => {
    localStorage.setItem(CHAT_EXPANDED_STORAGE_KEY, String(expanded));
    setIsChatExpanded(expanded);
  };

  useEffect(() => {
    const checkTablet = () => setIsTablet(window.innerWidth < 1024);
    checkTablet();
    window.addEventListener('resize', checkTablet);
    return () => window.removeEventListener('resize', checkTablet);
  }, []);

  // Listen for legacy nav toggle
  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem(LEGACY_KEY);
      setNavMode(stored === 'true' ? 'legacy' : stored === 'new2' ? 'new2' : stored === 'space' ? 'space' : 'new');
      setIsDemoPanelOpen(localStorage.getItem(DEMO_PANEL_KEY) === 'true');
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const effectiveExpanded = isTablet ? false : isNavExpanded;
  const navWidth = navMode === 'legacy' ? 260 : (effectiveExpanded ? 260 : 72);
  const chatWidth = isChatPanelOpen ? 383 : 0;
  const demoPanelWidth = isDemoPanelOpen ? 340 : 0;

  if (navMode === 'space') {
    return (
      <div className="h-screen flex flex-col overflow-hidden" style={{ '--scenario-bar-h': `${scenarioBarH}px`, backgroundColor: '#E8F0F5' } as React.CSSProperties}>
        <div ref={scenarioBarRef}>
          <ScenarioBar />
        </div>
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <SpaceLayout />
        </div>
        <ProblemSlides />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[var(--surface-neutral-white)]" style={{ '--scenario-bar-h': `${scenarioBarH}px`, '--nav-w': `${navWidth}px`, '--chat-w': `${chatWidth}px`, '--demo-w': `${demoPanelWidth}px` } as React.CSSProperties}>
      <div ref={scenarioBarRef}>
        <ScenarioBar />
      </div>
      <div className="flex-1 min-h-0 relative flex">
        {navMode === 'legacy' ? <LegacyNav /> : navMode === 'new2' ? <GlobalNavV2 /> : <GlobalNav />}
        <div
          className="flex-1 flex flex-col min-h-0 min-w-0 transition-all duration-500 ease-in-out"
          style={{ marginLeft: navWidth }}
        >
          {navMode === 'legacy' && <LegacyHeader />}
          <div className="flex-1 flex min-h-0 min-w-0">
          <main className="flex-1 flex flex-col min-h-0 min-w-0 bg-[var(--surface-neutral-xx-weak)] overflow-y-auto transition-all duration-500 ease-in-out">
            {children}
          </main>
          <div
            className="shrink-0 h-full transition-all duration-500 ease-in-out overflow-hidden"
            style={{ width: chatWidth }}
          >
            <AIChatPanel
              isOpen={isChatPanelOpen}
              onClose={handleCloseChatPanel}
              isExpanded={isChatExpanded}
              onExpandChange={handleChatExpandChange}
            />
          </div>
          </div>
        </div>
        <div
          className="shrink-0 h-full transition-all duration-500 ease-in-out overflow-hidden"
          style={{ width: demoPanelWidth }}
        >
          <DemoPanel isOpen={isDemoPanelOpen} />
        </div>
      </div>
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={handleCloseCommandPalette} />
      <ProblemSlides />
    </div>
  );
}

export { AppLayout };
export default AppLayout;
