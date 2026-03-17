import type { Person } from '../../data/people';
import { PersonChip } from './PersonChip';
import { Avatar } from './Avatar';
import { PEOPLE } from '../../data/people';

interface PersonProfileProps {
  person: Person;
  onBack: () => void;
}

export function PersonProfile({ person, onBack }: PersonProfileProps) {
  const manager = person.manager ? PEOPLE.find(p => p.name === person.manager) : null;

  const fields = [
    { label: 'Department', value: person.department },
    { label: 'Location', value: person.location },
    { label: 'Start date', value: new Date(person.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
    { label: 'Direct reports', value: String(person.directReports) },
    { label: 'PTO balance', value: `${person.ptoBalance} days` },
    { label: 'Status', value: person.status },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0" style={{ backgroundColor: '#E8F0F5' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white" style={{ borderBottom: '1px solid #D6E4EC' }}>
        <button onClick={onBack} className="text-[#78716C] hover:text-[#1C1917] transition-colors flex items-center gap-2 text-[14px]">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Back
        </button>
        <span className="text-[15px] font-medium text-[#1C1917]">Profile</span>
        <button onClick={onBack} className="text-[#78716C] hover:text-[#1C1917] transition-colors">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 5l8 8M13 5l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
          {/* Header */}
          <div className="flex items-start gap-4 sm:gap-6 mb-8 sm:mb-10">
            <Avatar person={person} size={64} fontSize={22} className="sm:!w-[88px] sm:!h-[88px] sm:!min-w-[88px]" />
            <div className="pt-1">
              <h1 className="text-[24px] sm:text-[32px] font-medium text-[#1C1917] leading-tight">{person.name}</h1>
              <div className="text-[15px] sm:text-[17px] text-[#78716C] mt-1">{person.title}</div>
              <div className="flex items-center gap-3 mt-3">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium ${
                  person.status === 'Active' ? 'text-[#2D6A35]' :
                  person.status === 'On Leave' ? 'bg-[#FEF3E2] text-[#9A6B3A]' :
                  'bg-[#EDF2F7] text-[#5A7A8A]'
                }`} style={person.status === 'Active' ? { backgroundColor: '#E8F5EE' } : undefined}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    person.status === 'Active' ? 'bg-[#2D6A35]' :
                    person.status === 'On Leave' ? 'bg-[#9A6B3A]' :
                    'bg-[#5A7A8A]'
                  }`} />
                  {person.status}
                </span>
                <span className="text-[13px] text-[#9CA3A0]">{person.location}</span>
              </div>
            </div>
          </div>

          {/* Reports to */}
          {manager && (
            <div className="mb-8">
              <div className="text-[13px] text-[#9CA3A0] mb-2">Reports to</div>
              <PersonChip person={manager} />
            </div>
          )}

          {/* Field grid */}
          <div className="rounded-2xl border bg-white p-4 sm:p-6 mb-8" style={{ borderColor: '#D6E4EC' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 sm:gap-y-6">
              {fields.map(f => (
                <div key={f.label}>
                  <div className="text-[13px] text-[#9CA3A0] mb-1">{f.label}</div>
                  <div className="text-[16px] text-[#1C1917] font-medium">{f.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions — all secondary */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {['Message', 'Request 1:1', 'View team'].map((action) => (
              <button
                key={action}
                className="px-5 py-2.5 rounded-full text-[14px] font-medium transition-colors bg-white text-[#1C1917] border hover:border-[#B8CDD8]"
                style={{ borderColor: '#D6E4EC' }}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
