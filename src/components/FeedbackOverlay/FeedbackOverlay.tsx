import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../Icon';

// ── Types ────────────────────────────────────────────────────────────

interface FeedbackEntry {
  id: number;
  name: string;
  comment: string;
  timestamp: string;
  projectMode: string;
  pageContext: string;
}

// ── Storage ──────────────────────────────────────────────────────────

const STORAGE_KEY = 'bhr-feedback-entries';
const USERNAME_KEY = 'bhr-feedback-username';
const PANEL_OPEN_KEY = 'bhr-feedback-panel';

function loadEntries(): FeedbackEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

function saveEntries(entries: FeedbackEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

let nextId = Date.now();

// ── Context helpers ──────────────────────────────────────────────────

function getProjectMode(): string {
  const mode = localStorage.getItem('bhr-project-mode') || 'prototypes';
  if (mode === 'prototypes') return 'Prototypes';
  if (mode === 'docs') return 'Project Docs';
  if (mode === 'style-guide') return 'Style Guide';
  return mode;
}

function getPageContext(): string {
  const mode = localStorage.getItem('bhr-project-mode') || 'prototypes';
  if (mode === 'docs') {
    const docId = localStorage.getItem('bhr-selected-doc') || '';
    return docId || 'unknown doc';
  }
  if (mode === 'style-guide') {
    const tab = localStorage.getItem('bhr-style-guide-tab') || 'nav';
    return tab === 'nav' ? 'Nav System' : 'Slides System';
  }
  // Prototypes — use the current URL path
  return window.location.pathname;
}

function formatTimestamp(): string {
  return new Date().toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  });
}

// ── Markdown export ──────────────────────────────────────────────────

function generateMarkdown(entries: FeedbackEntry[]): string {
  const lines = [
    '# Project Feedback',
    `Generated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
    '', '---', '',
  ];
  for (const entry of entries) {
    lines.push(`## ${entry.projectMode} — ${entry.pageContext}`);
    lines.push(`**From:** ${entry.name} | **Date:** ${entry.timestamp}`);
    lines.push('', entry.comment, '', '---', '');
  }
  return lines.join('\n');
}

function downloadMarkdown(entries: FeedbackEntry[]) {
  const md = generateMarkdown(entries);
  const blob = new Blob([md], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'feedback.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── Component ────────────────────────────────────────────────────────

export function FeedbackOverlay() {
  const [entries, setEntries] = useState<FeedbackEntry[]>(loadEntries);
  const [userName, setUserName] = useState(() => localStorage.getItem(USERNAME_KEY) || '');
  const [panelOpen, setPanelOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Persist entries
  useEffect(() => { saveEntries(entries); }, [entries]);

  // Persist username
  useEffect(() => { localStorage.setItem(USERNAME_KEY, userName); }, [userName]);

  // Listen for panel open/close from Project Bar
  useEffect(() => {
    const handler = () => {
      const isOpen = localStorage.getItem(PANEL_OPEN_KEY) === 'true';
      setPanelOpen(isOpen);
    };
    window.addEventListener('storage', handler);
    window.addEventListener('bhr-open-feedback-panel', () => setPanelOpen(true));
    return () => {
      window.removeEventListener('storage', handler);
    };
  }, []);

  // Focus textarea when panel opens
  useEffect(() => {
    if (panelOpen) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [panelOpen]);

  // Sync panel state to localStorage
  useEffect(() => {
    localStorage.setItem(PANEL_OPEN_KEY, String(panelOpen));
    window.dispatchEvent(new Event('storage'));
  }, [panelOpen]);

  function handleSubmit() {
    if (!newComment.trim() || !userName.trim()) return;
    const entry: FeedbackEntry = {
      id: nextId++,
      name: userName.trim(),
      comment: newComment.trim(),
      timestamp: formatTimestamp(),
      projectMode: getProjectMode(),
      pageContext: getPageContext(),
    };
    setEntries(prev => [...prev, entry]);
    setNewComment('');
  }

  function handleDelete(id: number) {
    setEntries(prev => prev.filter(e => e.id !== id));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && e.metaKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const totalCount = entries.length;

  if (!panelOpen) return null;

  return createPortal(
    <div data-feedback-ui="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        style={{ zIndex: 10003, backgroundColor: 'rgba(0,0,0,0.4)' }}
        onClick={() => setPanelOpen(false)}
      />

      {/* Panel */}
      <div
        className="fixed top-0 right-0 h-full flex flex-col"
        style={{ width: 400, zIndex: 10004, backgroundColor: '#1e1e1e' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#2a2a2a]">
          <h2 className="text-[13px] font-semibold text-white">
            Feedback{totalCount > 0 ? ` (${totalCount})` : ''}
          </h2>
          <div className="flex items-center gap-3">
            {totalCount > 0 && (
              <button
                className="text-[10px] font-medium px-2.5 py-1 rounded border border-[#444] text-neutral-400 hover:text-white transition-colors"
                onClick={() => downloadMarkdown(entries)}
              >
                Download
              </button>
            )}
            <button
              className="text-neutral-500 hover:text-white text-sm transition-colors"
              onClick={() => setPanelOpen(false)}
            >
              <Icon name="xmark" size={14} />
            </button>
          </div>
        </div>

        {/* New feedback form */}
        <div className="px-5 py-4 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-[10px] text-neutral-500">
              {getProjectMode()} — <span className="text-neutral-400">{getPageContext()}</span>
            </div>
          </div>

          <input
            type="text"
            className="w-full px-2.5 py-1.5 bg-[#2a2a2a] border border-[#444] rounded text-[12px] text-white mb-2 focus:outline-none focus:border-neutral-500 placeholder-neutral-600"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            placeholder="Your name"
          />

          <textarea
            ref={textareaRef}
            className="w-full px-2.5 py-1.5 bg-[#2a2a2a] border border-[#444] rounded text-[12px] text-white mb-2 resize-none focus:outline-none focus:border-neutral-500 placeholder-neutral-600"
            rows={3}
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Leave feedback..."
          />

          <div className="flex items-center justify-between">
            <span className="text-[9px] text-neutral-600">Cmd+Enter to submit</span>
            <button
              className="px-3 py-1.5 rounded text-[11px] font-medium text-white bg-white/15 hover:bg-white/20 transition-colors disabled:opacity-30"
              onClick={handleSubmit}
              disabled={!newComment.trim() || !userName.trim()}
            >
              Submit
            </button>
          </div>
        </div>

        {/* Existing feedback */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {totalCount === 0 && (
            <p className="text-[12px] text-neutral-600 text-center mt-8">No feedback yet.</p>
          )}
          {entries.slice().reverse().map(entry => (
            <div key={entry.id} className="group mb-4 pb-4 border-b border-[#2a2a2a] last:border-b-0">
              <div className="flex items-baseline justify-between mb-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-[12px] font-semibold text-white">{entry.name}</span>
                  <span className="text-[9px] text-neutral-600">{entry.projectMode} — {entry.pageContext}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-neutral-600">{entry.timestamp}</span>
                  <button
                    className="opacity-0 group-hover:opacity-100 text-neutral-600 hover:text-red-400 text-[10px] transition-opacity"
                    onClick={() => handleDelete(entry.id)}
                  >
                    <Icon name="xmark" size={10} />
                  </button>
                </div>
              </div>
              <p className="text-[12px] text-neutral-300 leading-relaxed">{entry.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}

// Export hook for Project Bar
export function useFeedbackPanel() {
  const [panelOpen, setPanelOpen] = useState(() => localStorage.getItem(PANEL_OPEN_KEY) === 'true');

  useEffect(() => {
    const handler = () => setPanelOpen(localStorage.getItem(PANEL_OPEN_KEY) === 'true');
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const toggle = useCallback(() => {
    const next = !panelOpen;
    localStorage.setItem(PANEL_OPEN_KEY, String(next));
    setPanelOpen(next);
    window.dispatchEvent(new Event('storage'));
  }, [panelOpen]);

  const count = loadEntries().length;

  return { panelOpen, togglePanel: toggle, feedbackCount: count };
}

export default FeedbackOverlay;
