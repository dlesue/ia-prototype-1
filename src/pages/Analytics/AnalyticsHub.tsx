import { ContentBlock } from '../../components/ContentBlock/ContentBlock';

export default function AnalyticsHub() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-6">Analytics</h1>
      <div className="space-y-4">
        <ContentBlock height={160} />
        <ContentBlock height={280} />
      </div>
    </div>
  );
}
