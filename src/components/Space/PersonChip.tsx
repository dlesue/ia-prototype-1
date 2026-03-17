import type { Person } from '../../data/people';
import { Avatar } from './Avatar';

interface PersonChipProps {
  person: Person;
  onClick?: () => void;
}

export function PersonChip({ person, onClick }: PersonChipProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border hover:border-[#B8CDD8] transition-colors text-[13px]"
      style={{ backgroundColor: '#F0F5F8', borderColor: '#D6E4EC' }}
    >
      <Avatar person={person} size={20} fontSize={9} />
      <span className="text-[#1C1917] font-medium">{person.name}</span>
    </button>
  );
}
