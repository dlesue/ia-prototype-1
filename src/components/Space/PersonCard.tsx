import type { Person } from '../../data/people';
import { Avatar } from './Avatar';

interface PersonCardProps {
  person: Person;
  onClick?: () => void;
  showPto?: boolean;
}

export function PersonCard({ person, onClick, showPto }: PersonCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 px-4 py-3.5 rounded-full border bg-white hover:border-[#B8CDD8] transition-all text-left w-full"
      style={{ borderColor: '#D6E4EC' }}
    >
      <Avatar person={person} size={40} fontSize={13} />
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-medium text-[#1C1917] truncate">{person.name}</div>
        <div className="text-[13px] text-[#78716C] truncate mt-0.5">{person.title}</div>
      </div>
      {showPto && (
        <div className="text-right shrink-0">
          <div className="text-[22px] font-medium text-[#1C1917]">{person.ptoBalance}</div>
          <div className="text-[11px] text-[#9CA3A0]">days</div>
        </div>
      )}
    </button>
  );
}
