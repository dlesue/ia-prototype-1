import React from 'react';
import { ContentBlock } from '../../components/ContentBlock';

export default function CultureRewards() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-6">Rewards</h1>
      <div className="space-y-4">
        <ContentBlock height={200} />
        <ContentBlock height={300} />
      </div>
    </div>
  );
}
