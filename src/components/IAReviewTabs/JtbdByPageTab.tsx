import { useState } from 'react';
import { PAGE_JTBD } from '../../data/pageJtbd';
import type { PersonaType } from '../../data/personas-and-packaging';

const PERSONA_OPTIONS: { value: PersonaType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Personas' },
  { value: 'employee', label: 'Employee' },
  { value: 'manager', label: 'Manager' },
  { value: 'hr-admin', label: 'HR Admin' },
  { value: 'it-admin', label: 'IT Admin' },
  { value: 'finance-admin', label: 'Finance Admin' },
  { value: 'workplace-admin', label: 'Workplace Admin' },
];

const PERSONA_LABELS: Record<string, string> = {
  employee: 'Employee',
  manager: 'Manager',
  'hr-admin': 'HR Admin',
  'it-admin': 'IT Admin',
  'finance-admin': 'Finance Admin',
  'workplace-admin': 'Workplace Admin',
};

export default function JtbdByPageTab() {
  const [filter, setFilter] = useState<PersonaType | 'all'>('all');
  const [search, setSearch] = useState('');

  const entries = Object.entries(PAGE_JTBD)
    .flatMap(([path, personas]) =>
      Object.entries(personas).map(([persona, description]) => ({
        path,
        persona: persona as PersonaType,
        description: description as string,
      }))
    )
    .filter(entry => {
      if (filter !== 'all' && entry.persona !== filter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          entry.path.toLowerCase().includes(q) ||
          entry.description.toLowerCase().includes(q) ||
          PERSONA_LABELS[entry.persona]?.toLowerCase().includes(q)
        );
      }
      return true;
    });

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#1a1a1a' }}>
        JTBD by Page
      </h1>
      <p style={{ fontSize: 14, color: '#666', marginBottom: 24, lineHeight: 1.5 }}>
        What each persona does on every page and why. These descriptions appear as contextual banners in the prototype.
      </p>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value as PersonaType | 'all')}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid #ddd',
            fontSize: 13,
            color: '#333',
            background: 'white',
          }}
        >
          {PERSONA_OPTIONS.map(p => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search pages or descriptions..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid #ddd',
            fontSize: 13,
            flex: 1,
            maxWidth: 300,
          }}
        />
        <span style={{ fontSize: 12, color: '#999' }}>{entries.length} entries</span>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e5e5e5' }}>
            <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: '#666', width: 200 }}>Page</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: '#666', width: 130 }}>Persona</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: '#666' }}>Jobs to Be Done</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={`${entry.path}-${entry.persona}`} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 === 0 ? '#fafafa' : 'white' }}>
              <td style={{ padding: '8px 12px', fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 12, color: '#444' }}>
                {entry.path}
              </td>
              <td style={{ padding: '8px 12px', color: '#555' }}>
                {PERSONA_LABELS[entry.persona] || entry.persona}
              </td>
              <td style={{ padding: '8px 12px', color: '#333', lineHeight: 1.5 }}>
                {entry.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
