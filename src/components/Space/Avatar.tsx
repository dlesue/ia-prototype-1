import { useState } from 'react';
import type { Person } from '../../data/people';

interface AvatarProps {
  person: Person;
  size: number;
  fontSize?: number;
  className?: string;
}

export function Avatar({ person, size, fontSize, className = '' }: AvatarProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const fs = fontSize ?? Math.round(size * 0.35);

  return (
    <div
      className={`rounded-full flex items-center justify-center font-medium text-white shrink-0 overflow-hidden ${className}`}
      style={{ width: size, height: size, minWidth: size, backgroundColor: person.avatarColor }}
    >
      {!imgFailed && person.avatar ? (
        <img
          src={person.avatar}
          alt={person.name}
          className="w-full h-full object-cover"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span style={{ fontSize: fs }}>{person.initials}</span>
      )}
    </div>
  );
}
