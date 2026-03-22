import { useState, useEffect } from 'react';
import MarkdownContent from '../MarkdownContent/MarkdownContent';
import { projectDocs } from '../../data/projectDocs';
import type { ProjectDoc } from '../../data/projectDocs';

const SELECTED_DOC_KEY = 'bhr-selected-doc';

// ── Doc style constants (matches docStyles.ts) ──────────────────────

const FIELDS = "'Fields', Georgia, serif";
const INTER = "'Inter', system-ui, sans-serif";
const CHARCOAL = '#333333';
const SLATE = '#555555';
const LEAF_GREEN = '#73C41D';
const CLOUD = '#EAEAE4';

// ── Standard content width ──────────────────────────────────────────

const CONTENT_WIDTH = 800;

// ── Sidebar ─────────────────────────────────────────────────────────

export function ProjectDocsSidebar() {
  const [selectedId, setSelectedId] = useState(() => {
    return localStorage.getItem(SELECTED_DOC_KEY) || projectDocs[0]?.id || '';
  });

  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem(SELECTED_DOC_KEY);
      if (stored && stored !== selectedId) setSelectedId(stored);
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [selectedId]);

  const selectDoc = (id: string) => {
    localStorage.setItem(SELECTED_DOC_KEY, id);
    setSelectedId(id);
    window.dispatchEvent(new Event('storage'));
  };

  const categories = [
    { key: 'spec' as const, label: 'Specs' },
    { key: 'ia-review' as const, label: 'IA Review' },
    { key: 'research' as const, label: 'Research' },
  ];

  const docsByCategory = (cat: ProjectDoc['category']) =>
    projectDocs.filter(d => d.category === cat);

  const selectedDoc = projectDocs.find(d => d.id === selectedId) || projectDocs[0];

  return (
    <div className="w-44 shrink-0 bg-[#1e1e1e] overflow-hidden">
      <div className="h-full overflow-y-auto">
      <div className="p-3">
        {categories.map(cat => {
          const docs = docsByCategory(cat.key);
          if (docs.length === 0) return null;
          return (
            <div key={cat.key} className="mb-4">
              <div className="text-[9px] font-semibold uppercase tracking-wider text-neutral-500 mb-1.5 px-2">
                {cat.label}
              </div>
              {docs.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => selectDoc(doc.id)}
                  className={`w-full text-left px-2 py-1.5 rounded text-[11px] transition-colors ${
                    selectedDoc?.id === doc.id
                      ? 'bg-white/10 text-white font-medium'
                      : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200'
                  }`}
                >
                  {doc.title}
                </button>
              ))}
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}

// ── Helper: strip front matter and H1 from markdown ─────────────────

function stripMarkdownMeta(text: string): string {
  // Strip YAML front matter
  let cleaned = text.replace(/^---\n[\s\S]*?\n---\n*/, '');
  // Strip the first H1 (since DocPage renders the title)
  cleaned = cleaned.replace(/^\s*#\s+[^\n]+\n*/, '');
  return cleaned;
}

// ── Content area ────────────────────────────────────────────────────

export function ProjectDocsContent() {
  const [selectedId, setSelectedId] = useState(() => {
    return localStorage.getItem(SELECTED_DOC_KEY) || projectDocs[0]?.id || '';
  });

  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem(SELECTED_DOC_KEY);
      if (stored && stored !== selectedId) setSelectedId(stored);
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [selectedId]);

  const selectedDoc = projectDocs.find(d => d.id === selectedId) || projectDocs[0];

  if (!selectedDoc) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white" style={{ fontFamily: INTER, fontSize: 14, color: SLATE }}>
        No document selected
      </div>
    );
  }

  const DocComponent = selectedDoc.component;

  return (
    <div className="flex-1 overflow-y-auto bg-white scrollbar-none" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
      <div style={{ padding: '40px 48px' }}>
        {/* Title — consistent across all docs */}
        <div style={{ maxWidth: selectedDoc.wide ? 1100 : CONTENT_WIDTH, marginLeft: 'auto', marginRight: 'auto' }}>
          <h1 style={{
            fontFamily: FIELDS,
            fontSize: '2.25rem',
            fontWeight: 700,
            color: CHARCOAL,
            lineHeight: 1.15,
            margin: 0,
          }}>
            {selectedDoc.title}
          </h1>
          {selectedDoc.subtitle && (
            <p style={{
              fontFamily: INTER,
              fontSize: 15,
              color: SLATE,
              lineHeight: 1.5,
              marginTop: 8,
              marginBottom: 0,
            }}>
              {selectedDoc.subtitle}
            </p>
          )}
          <div style={{ height: 1, backgroundColor: CLOUD, marginTop: 24, marginBottom: 32 }} />
        </div>

        {/* Content — standard width, or wider for docs that need it */}
        {DocComponent ? (
          <div style={{ maxWidth: selectedDoc.wide ? 1100 : CONTENT_WIDTH, marginLeft: 'auto', marginRight: 'auto' }}>
            <DocComponent />
          </div>
        ) : selectedDoc.content ? (
          <div style={{ maxWidth: CONTENT_WIDTH, marginLeft: 'auto', marginRight: 'auto' }}>
            <MarkdownContent text={stripMarkdownMeta(selectedDoc.content)} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProjectDocsContent;
