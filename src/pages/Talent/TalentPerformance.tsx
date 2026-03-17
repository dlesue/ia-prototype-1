import { ContentBlock } from '../../components/ContentBlock/ContentBlock';

export default function TalentPerformance() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-6">Performance</h1>
      <div className="space-y-4">
        <ContentBlock height={150} />
        <ContentBlock height={290} />
        <ContentBlock height={200} />
      </div>
    </div>
  );
}
