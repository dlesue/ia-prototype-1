import { ContentBlock } from '../../components/ContentBlock/ContentBlock';

export default function SettingsNotifications() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-6">Notifications</h1>
      <div className="space-y-4">
        <ContentBlock height={150} />
        <ContentBlock height={240} />
      </div>
    </div>
  );
}
