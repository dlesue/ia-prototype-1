import { ContentBlock } from '../../components/ContentBlock/ContentBlock';

export default function SettingsWorkflows() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-6">Workflows & Automations</h1>
      <div className="space-y-4">
        <ContentBlock height={140} />
        <ContentBlock height={290} />
      </div>
    </div>
  );
}
