import React from 'react';
import { Placeholder } from '../../components/Placeholder/Placeholder';

export default function SettingsHub() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-6">Settings</h1>
      <h2 className="text-lg font-semibold text-[var(--text-neutral-xx-strong)] mb-4">Account</h2>
      <Placeholder />
    </div>
  );
}
