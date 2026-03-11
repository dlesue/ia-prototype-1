import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { GlobalNav } from '../components/GlobalNav';
import { AIChatPanel } from '../components/AIChatPanel';

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

  const effectiveExpanded = isTablet ? false : isNavExpanded;
  const navWidth = effectiveExpanded ? 260 : 72;
  const chatPanelWidth = (isChatPanelOpen && !isChatExpanded) ? 375 : 0;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[var(--surface-neutral-white)]">
      <GlobalNav />
      <div
        className="flex-1 flex flex-col min-h-0 transition-all duration-300 ease-in-out"
        style={{ marginLeft: navWidth, marginRight: chatPanelWidth }}
      >
        <main className="flex-1 flex flex-col min-h-0 pr-10 pb-10 pt-6">
          <div className="flex-1 flex flex-col min-h-0 bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-large)] overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
      <AIChatPanel
        isOpen={isChatPanelOpen}
        onClose={handleCloseChatPanel}
        isExpanded={isChatExpanded}
        onExpandChange={handleChatExpandChange}
      />
    </div>
  );
}

export { AppLayout };
export default AppLayout;
