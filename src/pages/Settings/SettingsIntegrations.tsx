import { ContentBlock } from '../../components/ContentBlock/ContentBlock';

export default function SettingsIntegrations() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-6">Integrations / App Directory</h1>
      <div className="space-y-4">
        <ContentBlock height={180} />
        <ContentBlock height={260} />
        <ContentBlock height={170} />
      </div>
    </div>
  );
}
