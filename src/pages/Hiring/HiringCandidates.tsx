import React from 'react';
import { Placeholder } from '../../components/Placeholder/Placeholder';

export default function HiringCandidates() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-6">Candidates</h1>
      <Placeholder variant="table" />
    </div>
  );
}
